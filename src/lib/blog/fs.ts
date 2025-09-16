// src/lib/blog/fs.ts
import fs from 'fs'
import path from 'path'
import { ASSET_EXTENSIONS, CONTENT_DIR, REGEX_DIR_PREFIX } from './constants'

export type PostDirEntry = {
  category: string
  dirName: string
  slug: string
  indexPath: string
  isMDX: boolean
}

const isDir = (p: string) => {
  try {
    return fs.statSync(p).isDirectory()
  } catch {
    return false
  }
}

const exists = (p: string) => {
  try {
    fs.accessSync(p, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}

const readDir = (p: string) => {
  try {
    return fs.readdirSync(p)
  } catch {
    return [] as string[]
  }
}

const hasIndex = (dir: string) => {
  const mdx = path.join(dir, 'index.mdx')
  const md = path.join(dir, 'index.md')
  if (exists(mdx)) return { path: mdx, isMDX: true }
  if (exists(md)) return { path: md, isMDX: false }
  return null
}

const extractSlug = (dirName: string) =>
  REGEX_DIR_PREFIX.test(dirName) ? dirName.slice(9) : dirName

export const getContentRoot = () => path.join(process.cwd(), CONTENT_DIR)

export const listCategories = (): string[] =>
  readDir(getContentRoot())
    .map((name) => ({ name, full: path.join(getContentRoot(), name) }))
    .filter((e) => isDir(e.full))
    .map((e) => e.name)
    .sort()

export const listPosts = (category: string): PostDirEntry[] => {
  const catDir = path.join(getContentRoot(), category)
  if (!isDir(catDir)) return []
  return readDir(catDir)
    .filter((name) => isDir(path.join(catDir, name)))
    .map((dirName) => {
      const full = path.join(catDir, dirName)
      const idx = hasIndex(full)
      if (!idx) return null
      return {
        category,
        dirName,
        slug: extractSlug(dirName),
        indexPath: idx.path,
        isMDX: idx.isMDX,
      } as PostDirEntry
    })
    .filter((v): v is PostDirEntry => Boolean(v))
    .sort((a, b) => a.dirName.localeCompare(b.dirName))
    .reverse()
}

export const readPostFiles = (category: string, dirName: string) => {
  const postDir = path.join(getContentRoot(), category, dirName)
  const idx = hasIndex(postDir)
  if (!idx) return null

  const body = fs.readFileSync(idx.path, 'utf8')
  const assets = readDir(postDir).filter((f) => {
    const ext = f.split('.').pop()?.toLowerCase() ?? ''
    return (
      ASSET_EXTENSIONS.includes(ext as any) &&
      f !== 'index.md' &&
      f !== 'index.mdx'
    )
  })

  return {
    indexPath: idx.path,
    isMDX: idx.isMDX,
    content: body,
    assets,
    assetDirPath: postDir,
  }
}
