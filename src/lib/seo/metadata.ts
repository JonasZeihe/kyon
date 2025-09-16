// --- src/lib/seo/metadata.ts ---
import type { Metadata } from 'next'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '../blog/constants'
import { PostMeta } from '../blog/types'
import { abs, toPublicAssetUrl } from '@/lib/content/helpers/paths'

const coverFor = (meta: PostMeta) =>
  meta.cover
    ? toPublicAssetUrl(meta.category, meta.dirName, meta.cover)
    : abs(DEFAULT_OG_IMAGE)

export const buildPostMetadata = (meta: PostMeta): Metadata => {
  const title = meta.title ? `${meta.title} · ${SITE_NAME}` : SITE_NAME
  const description = meta.excerpt || ''
  const url = abs(`/blog/${meta.category}/${meta.slug}`)
  const canonical = meta.canonicalUrl
    ? /^https?:\/\//i.test(meta.canonicalUrl)
      ? meta.canonicalUrl
      : abs(meta.canonicalUrl)
    : url

  const images = [
    { url: coverFor(meta), width: 1200, height: 630, alt: meta.title },
  ]

  return {
    title,
    description,
    alternates: { canonical },
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
    metadataBase: new URL(SITE_URL),
  }
}
