// src/lib/blog/meta-config.ts
export const ARTICLE_PATH_REGEX = (() => {
  const raw =
    typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_ARTICLE_PATH_REGEX
      : ''
  if (raw) {
    try {
      const parts = raw.match(/^\/(.+)\/([gimsuy]*)$/)
      if (parts) return new RegExp(parts[1], parts[2])
    } catch {}
  }
  return /^\/blog\/[^/]+\/[^/]+\/?$/
})()

export const ARTICLE_ANCHOR_SELECTOR =
  (typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_ARTICLE_ANCHOR_SELECTOR) ||
  '[data-toc-anchor]'

export const TOC_ASIDE_SELECTOR =
  (typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_TOC_ASIDE_SELECTOR) ||
  '[data-toc-aside]'

const boolFromEnv = (v: string | undefined, fallback = true) => {
  if (v == null || v === '') return fallback
  const s = String(v).trim().toLowerCase()
  if (['1', 'true', 'yes', 'on'].includes(s)) return true
  if (['0', 'false', 'no', 'off'].includes(s)) return false
  return fallback
}

export const FEATURE_READING_PROGRESS = boolFromEnv(
  typeof process !== 'undefined'
    ? process.env.NEXT_PUBLIC_FEATURE_READING_PROGRESS
    : undefined,
  true
)

export const FEATURE_STICKY_TOC = boolFromEnv(
  typeof process !== 'undefined'
    ? process.env.NEXT_PUBLIC_FEATURE_STICKY_TOC
    : undefined,
  true
)

export const FEATURE_BREADCRUMBS = boolFromEnv(
  typeof process !== 'undefined'
    ? process.env.NEXT_PUBLIC_FEATURE_BREADCRUMBS
    : undefined,
  true
)

export const metaConfig = {
  ARTICLE_PATH_REGEX,
  ARTICLE_ANCHOR_SELECTOR,
  TOC_ASIDE_SELECTOR,
  FEATURE_READING_PROGRESS,
  FEATURE_STICKY_TOC,
  FEATURE_BREADCRUMBS,
}

export type MetaConfig = typeof metaConfig
