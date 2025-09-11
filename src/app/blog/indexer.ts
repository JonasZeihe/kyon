import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ENABLE_DRAFTS, REGEX_DIR_PREFIX } from './constants'
import { PostMeta } from './types'
import { getContentRoot, listCategories, listPosts } from './fs'

type Cache = { metas: PostMeta[]; mtime: number }

let cache: Cache | null = null

const extractSlug = (dirName: string) =>
  REGEX_DIR_PREFIX.test(dirName) ? dirName.slice(9) : dirName

const parseDateFromDir = (dirName: string) => {
  if (!REGEX_DIR_PREFIX.test(dirName)) return null
  const y = dirName.slice(0, 4)
  const m = dirName.slice(4, 6)
  const d = dirName.slice(6, 8)
  return `${y}-${m}-${d}`
}

const firstParagraph = (body: string) => {
  const cleaned = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^\s*#.+$/gm, '')
    .trim()
  const para =
    cleaned.split(/\n{2,}/).find((p) => p && p.trim().length > 0) || ''
  return para.replace(/\n/g, ' ').trim()
}

const deriveTitle = (title: unknown, body: string) => {
  if (typeof title === 'string' && title.trim()) return title.trim()
  const m = body.match(/^\s*#\s+(.+?)\s*$/m)
  return m ? m[1].trim() : 'Untitled'
}

const estimateReadingTime = (text: string, fallback?: unknown) => {
  if (typeof fallback === 'number' && fallback > 0) return Math.ceil(fallback)
  const words = (text.match(/\b[\p{L}\p{N}’'-]+\b/gu) || []).length
  return Math.max(1, Math.ceil(words / 220))
}

const buildMeta = (
  category: string,
  dirName: string,
  indexPath: string
): PostMeta | null => {
  const raw = fs.readFileSync(indexPath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data || {}
  if (fm.draft && !ENABLE_DRAFTS) return null
  const slug = extractSlug(dirName)
  const date =
    (typeof fm.date === 'string' && fm.date) ||
    parseDateFromDir(dirName) ||
    new Date().toISOString().slice(0, 10)
  const title = deriveTitle(fm.title, content)
  const excerpt =
    (typeof fm.excerpt === 'string' && fm.excerpt.trim()) ||
    firstParagraph(content)
  const tags = Array.isArray(fm.tags)
    ? fm.tags.filter((t) => typeof t === 'string')
    : undefined
  const cover = typeof fm.cover === 'string' ? fm.cover : undefined
  const canonicalUrl =
    typeof fm.canonicalUrl === 'string' ? fm.canonicalUrl : undefined
  const readingTime = estimateReadingTime(content, fm.readingTime)
  const assetBasePath = path.join(getContentRoot(), category, dirName)
  return {
    id: `${category}/${dirName}`,
    category,
    dirName,
    slug,
    date,
    updated: typeof fm.updated === 'string' ? fm.updated : undefined,
    title,
    excerpt,
    tags,
    cover,
    draft: Boolean(fm.draft),
    canonicalUrl,
    readingTime,
    sourcePath: indexPath,
    assetBasePath,
  }
}

const sortByFreshness = (a: PostMeta, b: PostMeta) => {
  const ad = a.updated || a.date
  const bd = b.updated || b.date
  if (ad === bd) return a.title.localeCompare(b.title)
  return ad > bd ? -1 : 1
}

const buildAllMetas = (): PostMeta[] => {
  const result: PostMeta[] = []
  for (const category of listCategories()) {
    for (const entry of listPosts(category)) {
      const meta = buildMeta(category, entry.dirName, entry.indexPath)
      if (meta) result.push(meta)
    }
  }
  return result.sort(sortByFreshness)
}

export const clearIndexCache = () => {
  cache = null
}

const getCachedMetas = () => {
  if (process.env.NODE_ENV === 'development') return buildAllMetas()
  if (!cache) cache = { metas: buildAllMetas(), mtime: Date.now() }
  return cache.metas
}

export const getAllPostMeta = (): PostMeta[] => getCachedMetas()

export const getPostsByCategory = (category: string): PostMeta[] =>
  getCachedMetas().filter((p) => p.category === category)

export const getPostBySlug = (
  category: string,
  slug: string
): PostMeta | undefined =>
  getCachedMetas().find((p) => p.category === category && p.slug === slug)

const splitTerms = (q: string) =>
  q.toLowerCase().trim().replace(/\s+/g, ' ').split(' ').filter(Boolean)

export const searchPosts = (opts: {
  query?: string
  tags?: string[]
  from?: string
  to?: string
  category?: string
}): PostMeta[] => {
  let items = getCachedMetas()
  if (opts.category) items = items.filter((p) => p.category === opts.category)
  if (opts.from)
    items = items.filter((p) => (p.updated || p.date) >= opts.from!)
  if (opts.to) items = items.filter((p) => (p.updated || p.date) <= opts.to!)
  if (opts.tags && opts.tags.length) {
    const set = new Set(opts.tags.map((t) => t.toLowerCase()))
    items = items.filter((p) =>
      (p.tags || []).some((t) => set.has(t.toLowerCase()))
    )
  }

  const q = (opts.query || '').toLowerCase().trim()
  if (!q) return items

  const terms = splitTerms(q)

  const scored = items.map((p) => {
    const title = (p.title || '').toLowerCase()
    const excerpt = (p.excerpt || '').toLowerCase()
    const tags = (p.tags || []).map((t) => t.toLowerCase())
    let score = 0

    for (const t of terms) {
      if (!t) continue
      if (title.includes(t)) score += 5
      if (excerpt.includes(t)) score += 3
      if (tags.some((x) => x.includes(t))) score += 4
    }

    if (title.includes(q)) score += 6
    if (excerpt.includes(q)) score += 2

    return { p, score }
  })

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return sortByFreshness(a.p, b.p)
  })

  return scored.filter((s) => s.score > 0).map((s) => s.p)
}

export const postPath = (meta: PostMeta) =>
  `/blog/${meta.category}/${meta.slug}`

export const categoriesFromMetas = () =>
  Array.from(new Set(getCachedMetas().map((m) => m.category))).sort()
