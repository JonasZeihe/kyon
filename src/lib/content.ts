// src/lib/content.ts
import { dirToSlug } from './slug'
import { readingTime } from './readingTime'

type FM = {
  title?: string
  description?: string
  pubDate?: string
  updatedDate?: string
  author?: string
  slug?: string
  tags?: string[]
  draft?: boolean
  image?: { src?: string; alt?: string }
}

export type Post = {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  author?: string
  tags: string[]
  draft: boolean
  image?: { src: string; alt?: string }
  minutes: number
  path: string
}

type MdModule = { frontmatter: FM; Content: any }

const MODS = import.meta.glob('/src/content/**/index.md', {
  eager: true,
}) as Record<string, MdModule>
const RAWS = import.meta.glob('/src/content/**/index.md', {
  eager: true,
  as: 'raw',
}) as Record<string, string>
const IMGS = import.meta.glob(
  '/src/content/**/*.{png,jpg,jpeg,webp,avif,svg}',
  { eager: true, as: 'url' }
) as Record<string, string>

function normalizeDate(s?: string) {
  if (!s) return ''
  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

function resolveImage(
  dirPath: string,
  fmImg?: { src?: string; alt?: string }
): { src: string; alt?: string } | undefined {
  if (!fmImg?.src) return undefined
  const alt = fmImg.alt
  const src = String(fmImg.src)
  if (src.startsWith('/')) return { src, alt }
  const base = dirPath.endsWith('/') ? dirPath : dirPath + '/'
  const rel = src.replace(/^\.?\//, '')
  const key = base + rel // e.g. /src/content/2025.../kyon_banner.webp
  const url = IMGS[key]
  return url ? { src: url, alt } : undefined
}

function toPostEntry(path: string, mod: MdModule, raw: string): Post {
  const dir = path.replace(/index\.md$/, '')
  const fm: FM = mod.frontmatter || {}
  const folderSlug = dirToSlug(dir)
  const slug = (fm.slug && fm.slug.trim()) || folderSlug
  const date = normalizeDate(fm.pubDate) || normalizeDate(fm.updatedDate) || ''
  const updated = normalizeDate(fm.updatedDate) || undefined
  const rt = readingTime(raw)
  const image = resolveImage(dir, fm.image)

  return {
    slug,
    title: fm.title || slug,
    description: fm.description || '',
    date,
    updated,
    author: fm.author,
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    draft: Boolean(fm.draft),
    image,
    minutes: rt.minutes,
    path,
  }
}

const ENTRIES = Object.entries(MODS).map(([path, mod]) => {
  const raw = RAWS[path]
  const post = toPostEntry(path, mod, raw)
  return { path, mod, post }
})

const ALL_POSTS: Post[] = ENTRIES.map((e) => e.post).sort((a, b) =>
  a.date === b.date ? 0 : a.date < b.date ? 1 : -1
)

export function getAllPosts(opts: { includeDrafts?: boolean } = {}) {
  const list = opts.includeDrafts
    ? ALL_POSTS
    : ALL_POSTS.filter((p) => !p.draft)
  return list
}

export function getPostBySlug(slug: string) {
  return getAllPosts({ includeDrafts: true }).find((p) => p.slug === slug)
}

export function getPostModuleBySlug(slug: string) {
  const hit = ENTRIES.find((e) => e.post.slug === slug)
  return hit?.mod || null
}

export function paginate(page: number, perPage: number) {
  const all = getAllPosts()
  const total = all.length
  const pages = Math.max(1, Math.ceil(total / perPage))
  const p = Math.min(Math.max(1, page), pages)
  const start = (p - 1) * perPage
  return {
    items: all.slice(start, start + perPage),
    page: p,
    pages,
    total,
    perPage,
  }
}
