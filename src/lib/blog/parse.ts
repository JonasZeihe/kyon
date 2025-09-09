// src/lib/blog/parse.ts
import matter from 'gray-matter'
import path from 'path'
import { ENABLE_DRAFTS, REGEX_DIR_PREFIX } from './constants'
import { PostFull, PostMeta, Frontmatter, AssetRef } from './types'
import { readPostFiles, toPublicAssetUrl } from './fs'
import { serializeMarkdown } from '../markdown/mdx'

const parseDateFromDir = (dirName: string) => {
  if (!REGEX_DIR_PREFIX.test(dirName)) return null
  const y = dirName.slice(0, 4)
  const m = dirName.slice(4, 6)
  const d = dirName.slice(6, 8)
  return `${y}-${m}-${d}`
}

const normalizeExcerpt = (body: string, explicit?: string) => {
  if (explicit && explicit.trim().length > 0) return explicit.trim()
  const clean = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^\s*#.+$/gm, '')
    .trim()
  const para = clean.split(/\n{2,}/).find((p) => p && p.trim().length > 0) || ''
  return para.replace(/\n/g, ' ').trim()
}

const deriveTitle = (fm: Frontmatter, body: string) => {
  if (fm.title && fm.title.trim()) return fm.title.trim()
  const m = body.match(/^\s*#\s+(.+?)\s*$/m)
  return m ? m[1].trim() : 'Untitled'
}

const mapAssets = (
  category: string,
  dirName: string,
  files: string[]
): AssetRef[] =>
  files.map((filename) => {
    const url = toPublicAssetUrl(category, dirName, filename)
    const p = path.join('content', category, dirName, filename)
    return { filename, path: p, url }
  })

export const parsePost = (
  category: string,
  dirName: string
): PostFull | null => {
  const files = readPostFiles(category, dirName)
  if (!files) return null
  const { content, isMDX, indexPath, assets, assetDirPath } = files
  const { data, content: body } = matter(content)
  const fm = (data || {}) as Frontmatter
  if (fm.draft && !ENABLE_DRAFTS) return null
  const derivedDate =
    fm.date ||
    parseDateFromDir(dirName) ||
    new Date().toISOString().slice(0, 10)
  const title = deriveTitle(fm, body)
  const excerpt = normalizeExcerpt(body, fm.excerpt)
  const reading = serializeMarkdown(body, fm)
  const slug = REGEX_DIR_PREFIX.test(dirName) ? dirName.slice(9) : dirName
  const id = `${category}/${dirName}`
  const assetBasePath = assetDirPath
  const cover = fm.cover ? fm.cover : undefined
  const meta: PostMeta = {
    id,
    category,
    dirName,
    slug,
    date: derivedDate,
    updated: fm.updated,
    title,
    excerpt,
    tags: fm.tags,
    cover,
    draft: Boolean(fm.draft),
    canonicalUrl: fm.canonicalUrl,
    readingTime: reading.readingTime,
    sourcePath: indexPath,
    assetBasePath,
  }
  const full: PostFull = {
    meta,
    bodySource: reading.mdxSource,
    isMDX,
    toc: reading.toc,
    raw: content,
    assets: mapAssets(category, dirName, assets),
  }
  return full
}
