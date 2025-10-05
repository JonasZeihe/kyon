// src/app/blog/components/PostBody.tsx
import Markdown from '@/components/markdown'
import type { PostFull } from '@/lib/blog/types'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMDXComponents } from '@/lib/markdown/mdx-components'

type Props = { post: PostFull }

export default function PostBody({ post }: Props) {
  const mdxCode =
    (post as any).bodyMdx?.code ||
    (typeof (post as any).bodySource === 'string'
      ? (post as any).bodySource
      : '')

  return (
    <Markdown as="div" data-toc-anchor>
      <MDXRemote
        source={mdxCode}
        components={getMDXComponents(post.meta.assetBasePath) as any}
      />
    </Markdown>
  )
}
