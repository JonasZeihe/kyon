// src/lib/markdown/mdx.ts
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { Frontmatter, TOCItem } from '../blog/types'
import { toPublicAssetUrl } from '../blog/urls'

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
    if (/^```/.test(line)) {
      inCode = !inCode
      continue
    }
    if (inCode) continue
    const m = line.match(/^(#{1,6})\s+(.+?)\s*$/)
    if (!m) continue
    const depth = m[1].length
    const text = m[2].replace(/\s*#*$/, '').trim()
    if (!text) continue
    if (depth === 2 || depth === 3)
      toc.push({ depth, value: text, id: slugify(text) })
  }
  return toc
}

const estimateReadingTime = (text: string, fallback?: number) => {
  if (typeof fallback === 'number' && fallback > 0) return Math.ceil(fallback)
  const words = (text.match(/\b[\p{L}\p{N}’'-]+\b/gu) || []).length
  return Math.max(1, Math.ceil(words / 220))
}

// rewrites <img src="relative.webp"> to /content/<category>/<dirName>/relative.webp
const rehypeRewriteAssetUrls =
  (assetBase?: { category: string; dirName: string }) => () => (tree: any) => {
    if (!assetBase) return
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'img' && node.properties?.src) {
        const src = String(node.properties.src)
        const isAbsolute = /^([a-z]+:)?\/\//i.test(src) || src.startsWith('/')
        if (!isAbsolute) {
          node.properties.src = toPublicAssetUrl(
            assetBase.category,
            assetBase.dirName,
            src
          )
        }
      }
    })
  }

export const serializeMarkdown = (
  source: string,
  fm: Frontmatter,
  opts?: { assetBase?: { category: string; dirName: string } }
) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeRewriteAssetUrls(opts?.assetBase))
    .use(rehypeStringify)

  const file = processor.processSync(source)
  const html = String(file.value)
  const toc = extractTOC(source)
  const readingTime = estimateReadingTime(source, fm.readingTime)

  return { mdxSource: html, toc, readingTime }
}
