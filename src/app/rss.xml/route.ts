// src/app/rss.xml/route.ts
import { NextResponse } from 'next/server'
import { getAllPostMeta, postPath } from '@/lib/blog/indexer'
import { BASE_PATH, SITE_NAME, SITE_URL } from '@/lib/blog/constants'

export const dynamic = 'force-static'
export const revalidate = false

const abs = (p: string) => {
  const base = SITE_URL.replace(/\/+$/, '')
  const bp = (BASE_PATH || '').replace(/\/+$/, '')
  const path = p.startsWith('/') ? p : `/${p}`
  return `${base}${bp}${path}`
}

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export async function GET() {
  const items = getAllPostMeta().slice(0, 200)
  const latest =
    items[0]?.updated || items[0]?.date || new Date().toISOString().slice(0, 10)
  const feed =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss version="2.0"><channel>` +
    `<title>${esc(SITE_NAME)}</title>` +
    `<link>${abs('/')}</link>` +
    `<description>${esc(SITE_NAME)} Feed</description>` +
    `<lastBuildDate>${new Date(latest).toUTCString()}</lastBuildDate>` +
    items
      .map((m) => {
        const url = abs(postPath(m))
        const pub = new Date(m.updated || m.date).toUTCString()
        const desc = m.excerpt
          ? `<description><![CDATA[${m.excerpt}]]></description>`
          : ''
        return `<item><title>${esc(m.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${pub}</pubDate>${desc}</item>`
      })
      .join('') +
    `</channel></rss>`

  return new NextResponse(feed, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control':
        'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
    },
  })
}
