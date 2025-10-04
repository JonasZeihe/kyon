// src/lib/blog/indexer.ts
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Frontmatter, PostMeta } from './types'
import { parseDateFromDir } from '@/lib/content/helpers/paths'
import { slugify } from '@/lib/content/slug'

const CONTENT_ROOT = path.join(process.cwd(), 'public', 'content')

type SourcePath = { file: string; isMDX: boolean }

const exists = (p: string) => {
  try {
    fs.accessSync(p, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}

const readIf = (p: string) => (exists(p) ? fs.readFileSync(p, 'utf8') : '')

const listDirs = (dir: string) => {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
  } catch {
    return [] as string[]
  }
}

const buildSourcePath = (base: string): SourcePath | null => {
  const mdx = path.join(base, 'index.mdx')
  const md = path.join(base, 'index.md')
  if (exists(mdx)) return { file: mdx, isMDX: true }
  if (exists(md)) return { file: md, isMDX: false }
  return null
}

const stripDatePrefix = (dirName: string) =>
  dirName.replace(/^(\d{8})[_-]?/, '')

const toSlugFromDir = (dirName: string) =>
  slugify(stripDatePrefix(dirName).replace(/[_]+/g, ' '))

type CacheState = { metas: PostMeta[] | null }
const CACHE: CacheState = { metas: null }

const scanAll = (): PostMeta[] => {
  if (CACHE.metas) return CACHE.metas

  const categories = listDirs(CONTENT_ROOT)
  const items: PostMeta[] = []

  for (const category of categories) {
    const catDir = path.join(CONTENT_ROOT, category)
    const entries = listDirs(catDir)

    for (const dirName of entries) {
      const base = path.join(catDir, dirName)
      const src = buildSourcePath(base)
      if (!src) continue

      const raw = readIf(src.file)
      const fm = matter(raw).data as Frontmatter

      const title =
        fm?.title ||
        stripDatePrefix(dirName)
          .replace(/[_-]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/\b\w/g, (m) => m.toUpperCase())

      const datedFromDir = parseDateFromDir(dirName)
      const date =
        fm?.updated ||
        fm?.date ||
        datedFromDir ||
        new Date().toISOString().slice(0, 10)

      const slug = toSlugFromDir(dirName)

      const meta: PostMeta = {
        id: `${category}/${dirName}`,
        category,
        dirName,
        slug,
        date,
        updated: fm?.updated,
        title,
        excerpt: fm?.summary || fm?.excerpt,
        tags: fm?.tags || [],
        cover: fm?.cover,
        draft: !!fm?.draft,
        canonicalUrl: fm?.canonicalUrl,
        readingTime: fm?.readingTime,
        sourcePath: src.file,
        assetBasePath: `/content/${category}/${dirName}`,
      }

      items.push(meta)
    }
  }

  items.sort((a, b) => {
    const da = new Date(a.updated || a.date).getTime()
    const db = new Date(b.updated || b.date).getTime()
    return db - da
  })

  CACHE.metas = items
  return items
}

export const invalidateMetaCache = () => {
  CACHE.metas = null
}

export const getAllMeta = () => scanAll()

export const getAllPostMeta = () => scanAll().filter((m) => !m.draft)

export const getAllCaseMeta = () =>
  scanAll().filter((m) => m.category === 'cases' && !m.draft)

export const getPostsByCategory = (category: string) =>
  scanAll().filter((m) => m.category === category && !m.draft)

export const getPostBySlug = (category: string, slug: string) =>
  scanAll().find(
    (m) => m.category === category && (m.slug === slug || m.dirName === slug)
  )

export const categoriesFromMetas = () => {
  const s = new Set<string>()
  for (const m of getAllPostMeta()) s.add(m.category)
  return Array.from(s)
}

export const postPath = (m: PostMeta) => {
  const base = `/blog/${m.category}/${m.slug}`
  return base.endsWith('/') ? base : `${base}/`
}
