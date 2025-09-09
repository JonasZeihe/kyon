// src/lib/markdown/mdx.ts
import { Frontmatter, TOCItem } from '../blog/types'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=\[\]{};:'",.<>/?\\|]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const extractTOC = (source: string): TOCItem[] => {
  const lines = source.split(/\r?\n/)
  const toc: TOCItem[] = []
  let inCode = false
  for (const line of lines) {
    const fence = line.match(/^```/)
    if (fence) {
      inCode = !inCode
      continue
    }
    if (inCode) continue
    const m = line.match(/^(#{1,6})\s+(.+?)\s*$/)
    if (!m) continue
    const depth = m[1].length
    const text = m[2].replace(/\s*#*$/, '').trim()
    if (!text) continue
    toc.push({ depth, value: text, id: slugify(text) })
  }
  return toc
}

const estimateReadingTime = (text: string, fallback?: number) => {
  if (typeof fallback === 'number' && fallback > 0) return Math.ceil(fallback)
  const words = (text.match(/\b[\p{L}\p{N}’'-]+\b/gu) || []).length
  const minutes = Math.max(1, Math.ceil(words / 220))
  return minutes
}

export const serializeMarkdown = (source: string, fm: Frontmatter) => {
  const toc = extractTOC(source)
  const readingTime = estimateReadingTime(source, fm.readingTime)
  return { mdxSource: source, toc, readingTime }
}
