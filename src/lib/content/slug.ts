// src/lib/content/slug.ts
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{Diacritic}+/gu, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

export const createSlugger = () => {
  const counts = new Map<string, number>()
  return (text: string) => {
    const base = slugify(text || 'section') || 'section'
    const n = (counts.get(base) || 0) + 1
    counts.set(base, n)
    return n === 1 ? base : `${base}-${n}`
  }
}
