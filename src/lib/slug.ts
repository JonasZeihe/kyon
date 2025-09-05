// src/lib/slug.ts
export function dirToSlug(dir: string) {
  const name =
    dir.replace(/\\/g, '/').split('/').filter(Boolean).slice(-2, -1)[0] || ''
  return name.replace(/_/g, '-')
}
