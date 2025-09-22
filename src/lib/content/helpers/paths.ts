// src/lib/content/helpers/paths.ts
import { BASE_PATH, SITE_URL } from '@/lib/blog/constants'

const trimSlashes = (s: string) => String(s || '').replace(/^\/+|\/+$/g, '')
const ensureLeading = (s: string) => (s.startsWith('/') ? s : `/${s}`)

const withBase = (p: string) => {
  const bp = trimSlashes(BASE_PATH || '')
  const clean = ensureLeading(trimSlashes(p || '/'))
  return bp ? `/${bp}${clean}` : clean
}

export const abs = (p: string) => {
  const origin = (SITE_URL || '').replace(/\/+$/, '')
  return `${origin}${withBase(p)}`
}

export const toPublicAssetUrl = (
  category: string,
  dirName: string,
  file: string
) => {
  const safeCategory = encodeURIComponent(String(category || ''))
  const safeDir = encodeURIComponent(String(dirName || ''))
  const cleanFile = trimSlashes(String(file || '').replace(/^\.?\//, ''))
  return withBase(`/content/${safeCategory}/${safeDir}/${cleanFile}`)
}

export const extractSlug = (s: string) => {
  const name =
    trimSlashes(String(s || '').replace(/\\/g, '/'))
      .split('/')
      .filter(Boolean)
      .pop() || ''
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
}

export const parseDateFromDir = (dirName: string) => {
  const m = String(dirName || '').match(/^(\d{4})(\d{2})(\d{2})/)
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2]) - 1
  const d = Number(m[3])
  const dt = new Date(Date.UTC(y, mo, d))
  return isNaN(dt.getTime()) ? null : dt.toISOString().slice(0, 10)
}
