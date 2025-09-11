// src/lib/blog/urls.ts
export const assetPrefix =
  (process.env.NEXT_PUBLIC_ASSET_PREFIX ??
    process.env.NEXT_PUBLIC_BASE_PATH ??
    '') ||
  ''

const normalize = (s: string) => s.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '')

export const contentPublicBase = (() => {
  const joined = `${assetPrefix}/content`.replace(/\/{2,}/g, '/')
  return joined.startsWith('/') ? joined : `/${joined}`
})()

export const toPublicAssetUrl = (
  category: string,
  dirName: string,
  filename: string
) => {
  const parts = [contentPublicBase, category, dirName, filename]
    .filter(Boolean)
    .map(normalize)
  return `/${parts.join('/')}`.replace(/\/{2,}/g, '/')
}
