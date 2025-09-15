// --- src/lib/markdown/mdx.ts ---
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import { visit } from 'unist-util-visit'
import { Frontmatter, TOCItem } from '../blog/types'
import { toPublicAssetUrl } from '../content/helpers/paths'

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
      if (node.tagName === 'source' && node.properties?.srcset) {
        const set = String(node.properties.srcset)
        node.properties.srcset = set
          .split(',')
          .map((part) => {
            const [u, d] = part.trim().split(/\s+/)
            if (!u) return part
            const isAbs = /^([a-z]+:)?\/\//i.test(u) || u.startsWith('/')
            const url = isAbs
              ? u
              : toPublicAssetUrl(assetBase.category, assetBase.dirName, u)
            return [url, d].filter(Boolean).join(' ')
          })
          .join(', ')
      }
      if (node.tagName === 'a' && node.properties?.href) {
        const href = String(node.properties.href)
        const isAbs =
          /^https?:\/\//i.test(href) ||
          href.startsWith('#') ||
          href.startsWith('/')
        if (!isAbs) {
          node.properties.href = toPublicAssetUrl(
            assetBase.category,
            assetBase.dirName,
            href
          )
        }
        if (/^https?:\/\//i.test(String(node.properties.href))) {
          node.properties.target = '_blank'
          node.properties.rel = 'noopener noreferrer nofollow'
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
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'append' })
    .use(rehypeRewriteAssetUrls(opts?.assetBase))
    .use(rehypeStringify)

  const file = processor.processSync(source)
  const html = String(file.value)
  const toc = extractTOC(source)
  const readingTime = estimateReadingTime(source, fm.readingTime)

  return { mdxSource: html, toc, readingTime }
}
