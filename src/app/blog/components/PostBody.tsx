// src/app/blog/components/PostBody.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMDXComponents } from '@/lib/markdown/mdx-components'
import { PostFull } from '@/lib/blog/types'
import { MarkdownStyles } from '@/styles/MarkdownStyles'
import { toPublicAssetUrl } from '@/lib/blog/fs'
type Props = { post: PostFull }
const PostBody = ({ post }: Props) => {
  const { bodySource, meta } = post
  const base = toPublicAssetUrl(meta.category, meta.dirName, '')
  return (
    <MarkdownStyles>
      <MDXRemote source={bodySource} components={getMDXComponents(base)} />
    </MarkdownStyles>
  )
}
export default PostBody
