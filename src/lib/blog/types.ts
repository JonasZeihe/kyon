// src/lib/blog/types.ts
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type Category = string

export type TOCItem = {
  depth: number
  value: string
  id: string
}

export type AssetRef = {
  filename: string
  path: string
  url?: string
}

export type Frontmatter = {
  title: string
  excerpt?: string
  date?: string
  updated?: string
  author?: string
  tags?: string[]
  draft?: boolean
  cover?: string
  canonicalUrl?: string
  readingTime?: number
  ogImage?: string
  summary?: string
  cta?: { label?: string; href?: string }
}

export type PostMeta = {
  id: string
  category: Category
  dirName: string
  slug: string
  date: string
  updated?: string
  title: string
  excerpt?: string
  tags?: string[]
  cover?: string
  draft?: boolean
  canonicalUrl?: string
  readingTime?: number
  sourcePath: string
  assetBasePath: string
}

export type PostFull = {
  meta: PostMeta
  bodySource: string
  isMDX: boolean
  bodyMdx?: MDXRemoteSerializeResult
  toc?: TOCItem[]
  raw?: string
  assets?: AssetRef[]
}
