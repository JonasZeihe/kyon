// src/lib/markdown/remark.ts
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { visit } from 'unist-util-visit'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'

type Pipeline = {
  remarkPlugins: unknown[]
  rehypePlugins: unknown[]
}

type AssetBase = {
  category: string
  dirName: string
}

const isExternal = (url: string) =>
  /^([a-z]+:)?\/\//i.test(url) ||
  url.startsWith('/') ||
  url.startsWith('data:') ||
  url.startsWith('blob:')

const normalizeRel = (s: string) => s.replace(/^\.?\//, '')

const rehypeRewriteRelativeAssets = (base?: AssetBase) => (tree: any) => {
  if (!base) return
  visit(tree, 'element', (node: any) => {
    if (!node?.properties) return
    const props = node.properties as Record<string, unknown>

    if (node.tagName === 'img' && typeof props.src === 'string') {
      const src = props.src as string
      if (!isExternal(src)) {
        props.src = toPublicAssetUrl(
          base.category,
          base.dirName,
          normalizeRel(src)
        )
      }
    }

    if (node.tagName === 'source' && typeof props.src === 'string') {
      const src = props.src as string
      if (!isExternal(src)) {
        props.src = toPublicAssetUrl(
          base.category,
          base.dirName,
          normalizeRel(src)
        )
      }
    }

    if (node.tagName === 'a' && typeof props.href === 'string') {
      const href = props.href as string
      if (!isExternal(href)) {
        props.href = toPublicAssetUrl(
          base.category,
          base.dirName,
          normalizeRel(href)
        )
      }
    }
  })
}

export const createRemarkRehypePipeline = (
  assetBase?: AssetBase
): Pipeline => ({
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug, rehypeRewriteRelativeAssets(assetBase)],
})

export const getMdxRuntimeOptions = (assetBase?: AssetBase) => {
  const p = createRemarkRehypePipeline(assetBase)
  return {
    mdxOptions: {
      remarkPlugins: p.remarkPlugins,
      rehypePlugins: p.rehypePlugins,
    },
  }
}
