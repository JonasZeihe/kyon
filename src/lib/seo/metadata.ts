// src/lib/seo/metadata.ts
import type { Metadata } from 'next'
import {
  BASE_PATH,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from '../blog/constants'
import { PostMeta } from '../blog/types'
import { toPublicAssetUrl } from '../blog/fs'

const toAbsolute = (p: string) => {
  if (/^https?:\/\//i.test(p)) return p
  const base = SITE_URL.replace(/\/+$/, '')
  const bp = (BASE_PATH || '').replace(/\/+$/, '')
  const path = p.startsWith('/') ? p : `/${p}`
  return `${base}${bp}${path}`
}

const coverFor = (meta: PostMeta) => {
  if (meta.cover)
    return toAbsolute(toPublicAssetUrl(meta.category, meta.dirName, meta.cover))
  return toAbsolute(DEFAULT_OG_IMAGE)
}

export const buildPostMetadata = (meta: PostMeta): Metadata => {
  const title = meta.title ? `${meta.title} · ${SITE_NAME}` : SITE_NAME
  const description = meta.excerpt || ''
  const url = toAbsolute(`/blog/${meta.category}/${meta.slug}`)
  const images = [
    { url: coverFor(meta), width: 1200, height: 630, alt: meta.title },
  ]

  return {
    title,
    description,
    alternates: { canonical: meta.canonicalUrl || url },
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images,
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  }
}
