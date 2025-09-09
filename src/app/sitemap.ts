// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import {
  getAllPostMeta,
  categoriesFromMetas,
  postPath,
} from '@/lib/blog/indexer'
import { BASE_PATH, SITE_URL } from '@/lib/blog/constants'

export const dynamic = 'force-static'
export const revalidate = false

const abs = (p: string) => {
  const base = SITE_URL.replace(/\/+$/, '')
  const bp = (BASE_PATH || '').replace(/\/+$/, '')
  const path = p.startsWith('/') ? p : `/${p}`
  return `${base}${bp}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const metas = getAllPostMeta()
  const cats = categoriesFromMetas()

  const baseEntries: MetadataRoute.Sitemap = [
    { url: abs('/'), lastModified: new Date() },
    {
      url: abs('/blog'),
      lastModified: new Date(metas[0]?.updated || metas[0]?.date || Date.now()),
    },
  ]

  const categoryEntries: MetadataRoute.Sitemap = cats.map((c) => {
    const latest = metas.filter((m) => m.category === c)[0]
    return {
      url: abs(`/blog/${c}`),
      lastModified: latest
        ? new Date(latest.updated || latest.date)
        : new Date(),
    }
  })

  const postEntries: MetadataRoute.Sitemap = metas.map((m) => ({
    url: abs(postPath(m)),
    lastModified: new Date(m.updated || m.date),
  }))

  return [...baseEntries, ...categoryEntries, ...postEntries]
}
