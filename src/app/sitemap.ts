// --- src/app/sitemap.ts ---
import type { MetadataRoute } from 'next'
import {
  getAllPostMeta,
  getAllCaseMeta,
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
  const posts = getAllPostMeta()
  const cases = getAllCaseMeta()
  const metas = [...posts, ...cases]
  const cats = categoriesFromMetas()

  const newest =
    metas
      .map((m) => m.updated || m.date)
      .filter(Boolean)
      .sort()
      .reverse()[0] || new Date().toISOString()

  const baseEntries: MetadataRoute.Sitemap = [
    { url: abs('/'), lastModified: new Date(newest) },
    { url: abs('/blog'), lastModified: new Date(newest) },
    { url: abs('/cases'), lastModified: new Date(newest) },
  ]

  const categoryEntries: MetadataRoute.Sitemap = cats.map((c) => {
    const latest = posts.find((m) => m.category === c)
    const lm = latest?.updated || latest?.date || newest
    return { url: abs(`/blog/${c}`), lastModified: new Date(lm) }
  })

  const postEntries: MetadataRoute.Sitemap = posts.map((m) => ({
    url: abs(postPath(m)),
    lastModified: new Date(m.updated || m.date),
  }))

  const caseEntries: MetadataRoute.Sitemap = cases.map((m) => ({
    url: abs(postPath(m)),
    lastModified: new Date(m.updated || m.date),
  }))

  return [...baseEntries, ...categoryEntries, ...postEntries, ...caseEntries]
}
