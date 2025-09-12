// src/app/blog/[category]/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { buildPostMetadata } from '@/lib/seo/metadata'
import { getAllPostMeta, getPostBySlug } from '@/lib/blog/indexer'
import { parsePost } from '@/lib/blog/parse'
import type { Metadata } from 'next'
import type { TOCItem } from '@/lib/blog/types'
import PostHeader from '@/app/blog/components/PostHeader'
import PostBody from '@/app/blog/components/PostBody'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'

type RouteParams = { category: string; slug: string }
type PageProps = { params: RouteParams }

export async function generateStaticParams() {
  const metas = getAllPostMeta()
  return metas.map((m) => ({ category: m.category, slug: m.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const { category, slug } = params
  const meta = getPostBySlug(category, slug)
  return meta ? buildPostMetadata(meta) : {}
}

export default async function Page({ params }: PageProps) {
  const { category, slug } = params
  const meta = getPostBySlug(category, slug)
  if (!meta) notFound()
  const post = parsePost(meta.category, meta.dirName)
  if (!post) notFound()

  const toc: TOCItem[] = post.toc || []

  const crumbs = [
    { href: '/blog', label: 'Blog' },
    { href: `/blog/${post.meta.category}`, label: post.meta.category },
    { label: post.meta.title },
  ]

  return (
    <main>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1rem' }}>
        <Breadcrumbs items={crumbs} />
      </div>
      <PostHeader post={post.meta} />
      <PostBody post={post} toc={toc} />
    </main>
  )
}
