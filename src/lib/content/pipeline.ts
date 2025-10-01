// src/lib/content/pipeline.ts
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import { compile } from '@mdx-js/mdx'
import type { VFileCompatible } from 'vfile'
import type { Root } from 'hast'
import readingTime from 'reading-time'
import matter from 'gray-matter'
import { toPublicAssetUrl } from './helpers/paths'
import { SITE_URL } from '@/lib/blog/constants'
import { createSlugger, slugify } from './slug'

export type TOCItem = { id: string; depth: 2 | 3; text: string }
export type Frontmatter = {
  title: string
  excerpt?: string
  date?: string
  updated?: string
  tags?: string[]
  draft?: boolean
  cover?: string
  canonicalUrl?: string
  summary?: string
  cta?: { label?: string; href?: string }
}
export type PipelineInput = {
  source: VFileCompatible
  assetBase?: { category?: string; dirName?: string; baseHref?: string }
}
export type HtmlResult = {
  html: string
  toc: TOCItem[]
  readingTime: number
  words: number
  minutes: number
}
export type MdxResult = {
  code: string
  toc: TOCItem[]
  readingTime: number
  words: number
  minutes: number
}

export const parseFrontmatter = (source: VFileCompatible) => {
  const text = typeof source === 'string' ? source : String(source as any)
  const { data, content } = matter(text)
  return { data: (data || {}) as Frontmatter, content }
}

const walk = (
  node: any,
  _parent: any,
  visit: (n: any, i: number, p: any) => void
) => {
  const children: any[] = node?.children || []
  for (let i = 0; i < children.length; i++) {
    visit(children[i], i, node)
    walk(children[i], node, visit)
  }
}

const textFrom = (node: any): string => {
  if (!node) return ''
  if (typeof node.value === 'string') return node.value
  const children: any[] = node.children || []
  return children.map((c) => textFrom(c)).join('')
}

const isHttpUrl = (s: string) => /^https?:\/\//i.test(s)
const isSchemeUrl = (s: string) =>
  /^([a-z]+:)?\/\//i.test(s) ||
  s.startsWith('data:') ||
  s.startsWith('blob:') ||
  s.startsWith('mailto:') ||
  s.startsWith('tel:')

const isSameOrigin = (href: string) => {
  if (!isHttpUrl(href)) return false
  try {
    const a = new URL(href)
    const b = new URL(SITE_URL)
    return a.origin === b.origin
  } catch {
    return false
  }
}

const slugPlugin = () => () => async (tree: Root) => {
  const slugger = createSlugger()
  walk(tree as any, null, (node) => {
    if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
      const depth = Number(node.tagName.slice(1))
      if (depth < 1 || depth > 6) return
      const already = node.properties?.id as string | undefined
      if (already && already.trim()) return
      const id = slugger(textFrom(node))
      node.properties = { ...(node.properties || {}), id }
    }
  })
}

const tocPlugin = (list: TOCItem[]) => () => async (tree: Root) => {
  walk(tree as any, null, (node) => {
    if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
      const depth = Number(node.tagName.slice(1))
      const id = (node.properties?.id as string) || ''
      if ((depth === 2 || depth === 3) && id) {
        list.push({ id, depth: depth as 2 | 3, text: textFrom(node) })
      }
    }
  })
}

const assetsPlugin =
  (assetBase?: { category?: string; dirName?: string; baseHref?: string }) =>
  () =>
  async (tree: Root) => {
    const toUrl = (src: string): string => {
      if (!src) return src
      if (isSchemeUrl(src) || src.startsWith('/')) return src
      if (assetBase?.baseHref) {
        const clean = src.replace(/^\.?\//, '')
        return `${assetBase.baseHref.replace(/\/+$/, '')}/${clean}`.replace(
          /\/{2,}/g,
          '/'
        )
      }
      if (assetBase?.category && assetBase?.dirName) {
        return toPublicAssetUrl(assetBase.category, assetBase.dirName, src)
      }
      return src
    }

    walk(tree as any, null, (node) => {
      if (node.type !== 'element') return

      if (node.tagName === 'img' && node.properties) {
        const src = String(node.properties.src || '')
        node.properties.src = toUrl(src)
        if (node.properties.srcset) {
          const set = String(node.properties.srcset)
          node.properties.srcset = set
            .split(',')
            .map((part) => {
              const [u, d] = part.trim().split(/\s+/)
              return [toUrl(u), d].filter(Boolean).join(' ')
            })
            .join(', ')
        }
      }

      if (node.tagName === 'source' && node.properties) {
        if (node.properties.src)
          node.properties.src = toUrl(String(node.properties.src))
        if (node.properties.srcset) {
          const set = String(node.properties.srcset)
          node.properties.srcset = set
            .split(',')
            .map((part) => {
              const [u, d] = part.trim().split(/\s+/)
              return [toUrl(u), d].filter(Boolean).join(' ')
            })
            .join(', ')
        }
      }

      if (node.tagName === 'track' && node.properties?.src) {
        node.properties.src = toUrl(String(node.properties.src))
      }

      if (node.tagName === 'a' && node.properties?.href) {
        const href = String(node.properties.href)
        if (href.startsWith('#')) return
        if (isSchemeUrl(href)) {
          if (isHttpUrl(href) && !isSameOrigin(href)) {
            node.properties.target = '_blank'
            node.properties.rel = 'noopener noreferrer nofollow'
          }
          return
        }
        if (href.startsWith('/')) {
          node.properties.href = href
          return
        }
        node.properties.href = toUrl(href)
      }
    })
  }

export const renderToHTML = async ({
  source,
  assetBase,
}: PipelineInput): Promise<HtmlResult> => {
  const raw = typeof source === 'string' ? source : String(source as any)
  const { content } = matter(raw)
  const rt = readingTime(content)
  const toc: TOCItem[] = []

  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(slugPlugin())
    .use(rehypeAutolinkHeadings, { behavior: 'append' })
    .use(tocPlugin(toc))
    .use(assetsPlugin(assetBase))
    .use(rehypeStringify)
    .process(raw)

  return {
    html: String(file.value || ''),
    toc,
    readingTime: Math.max(1, Math.round(rt.minutes)),
    words: rt.words,
    minutes: Math.ceil(rt.minutes),
  }
}

export const compileToMdx = async ({
  source,
  assetBase,
}: PipelineInput): Promise<MdxResult> => {
  const raw = typeof source === 'string' ? source : String(source as any)
  const { content } = matter(raw)
  const rt = readingTime(content)
  const toc: TOCItem[] = []

  const compiled = await compile(raw, {
    jsx: true,
    remarkPlugins: [
      remarkParse as any,
      remarkMdx as any,
      remarkGfm as any,
      [remarkFrontmatter as any, ['yaml', 'toml']],
    ],
    rehypePlugins: [
      [slugPlugin() as any] as any,
      [rehypeAutolinkHeadings as any, { behavior: 'append' }] as any,
      [tocPlugin(toc) as any] as any,
      [assetsPlugin(assetBase) as any] as any,
    ] as any,
    format: 'mdx',
    providerImportSource: '@mdx-js/react',
  })

  return {
    code: String(compiled.value || ''),
    toc,
    readingTime: Math.max(1, Math.round(rt.minutes)),
    words: rt.words,
    minutes: Math.ceil(rt.minutes),
  }
}
