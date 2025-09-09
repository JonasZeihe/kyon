// src/lib/markdown/remark.ts
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

type Pipeline = {
  remarkPlugins: unknown[]
  rehypePlugins: unknown[]
}

export const createRemarkRehypePipeline = (): Pipeline => ({
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug],
})
