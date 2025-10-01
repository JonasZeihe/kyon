// src/app/blog/components/PostBody.tsx
import matter from 'gray-matter'
import { MarkdownStyles } from '@/styles/MarkdownStyles'
import type { PostFull } from '@/lib/blog/types'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMDXComponents } from '@/lib/markdown/mdx-components'
import HeadingEnhancer from './HeadingEnhancer'

type Props = { post: PostFull }

export default function PostBody({ post }: Props) {
  const raw = post.raw || ''
  const { content } = matter(raw)

  return (
    <MarkdownStyles as="div" data-toc-anchor>
      <MDXRemote
        source={content}
        components={getMDXComponents(post.meta.assetBasePath) as any}
      />
      <HeadingEnhancer />
    </MarkdownStyles>
  )
}
