// src/lib/blog/constants.ts
import path from 'path'

export const SITE_NAME = process.env.SITE_NAME ?? 'Kyon'

export const SITE_URL = (
  process.env.SITE_URL ?? 'http://localhost:3000'
).replace(/\/+$/, '')

export const CONTENT_DIR = 'public/content'
export const POSTS_PER_PAGE = Number(process.env.POSTS_PER_PAGE ?? 12)

export const ENABLE_DRAFTS = process.env.NODE_ENV !== 'production'
export const ENABLE_MDX = true
export const ENABLE_SEARCH = true
export const ENABLE_TAG_PAGES = true

export const REGEX_DIR_PREFIX = /^\d{8}_/

export const ASSET_EXTENSIONS = [
  'webp',
  'png',
  'jpg',
  'jpeg',
  'gif',
  'svg',
  'mp4',
  'pdf',
] as const

export const IMAGE_EXTENSIONS = [
  'webp',
  'png',
  'jpg',
  'jpeg',
  'gif',
  'svg',
] as const

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(
  /\/+$/,
  ''
)
export const ASSET_PREFIX = (
  process.env.NEXT_PUBLIC_ASSET_PREFIX ?? BASE_PATH
).replace(/\/+$/, '')

export const DEFAULT_OG_IMAGE = path.posix.join(
  ASSET_PREFIX || '/',
  'og-default.png'
)

export const CONTENT_PUBLIC_BASE = path.posix.join(
  ASSET_PREFIX || '/',
  'content'
)

export const FEATURE_BASEPATH_REWRITE =
  (process.env.FEATURE_BASEPATH_REWRITE ?? 'true').toLowerCase() === 'true'
