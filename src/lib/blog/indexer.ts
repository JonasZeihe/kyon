// src/lib/blog/indexer.ts
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Frontmatter, PostMeta } from './types'

const CONTENT_ROOT = path.join(process.cwd(), 'public', 'content')

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

const removeDiacritics = (s: string) =>
  s.normalize('NFKD').replace(/\p{Diacritic}+/gu, '')

const toSlug = (dirName: string) =>
  removeDiacritics(
    dirName
      .trim()
      .toLowerCase()
      .replace(/^\d+[_-]?/, '')
      .replace(/[^a-z0-9/_-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/\/+/g, '/')
  ).replace(/(^-|-$)/g, '')

const buildSourcePath = (base: string) => {
  const mdx = path.join(base, 'index.mdx')
  const md = path.join(base, 'index.md')
  if (exists(mdx)) return { file: mdx, isMDX: true }
  if (exists(md)) return { file: md, isMDX: false }
  return null
}

const parseDatePrefix = (dirName: string) => {
  const m = dirName.match(/^(\d{4})(\d{2})(\d{2})/)
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2]) - 1
  const d = Number(m[3])
  const dt = new Date(Date.UTC(y, mo, d))
  return isNaN(dt.getTime()) ? null : dt.toISOString().slice(0, 10)
}

let CACHE: PostMeta[] | null = null

const scanAll = (): PostMeta[] => {
  if (CACHE) return CACHE

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
        dirName.replace(/[_-]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())

      const datedFromDir = parseDatePrefix(dirName)
      const date =
        fm?.updated ||
        fm?.date ||
        datedFromDir ||
        new Date().toISOString().slice(0, 10)
      const slug = toSlug(dirName)

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

  CACHE = items
  return items
}

export const getAllMeta = () => scanAll()

export const getAllPostMeta = () =>
  scanAll().filter((m) => m.category !== 'cases' && !m.draft)

export const getAllCaseMeta = () =>
  scanAll().filter((m) => m.category === 'cases' && !m.draft)

export const getPostsByCategory = (category: string) =>
  scanAll().filter(
    (m) => m.category === category && category !== 'cases' && !m.draft
  )

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
  const base =
    m.category === 'cases'
      ? `/cases/${m.slug}`
      : `/blog/${m.category}/${m.slug}`
  return base.endsWith('/') ? base : `${base}/`
}

export const __resetIndexerCache = () => {
  CACHE = null
}
