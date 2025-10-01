// src/app/blog/[category]/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { buildPostMetadata } from '@/lib/seo/metadata'
import { getAllPostMeta, getPostBySlug } from '@/lib/blog/indexer'
import type { Metadata } from 'next'
import type { TOCItem as BlogTOCItem } from '@/lib/blog/types'
import PostHeader from '@/app/blog/components/PostHeader'
import PostBody from '@/app/blog/components/PostBody'
import fs from 'node:fs'
import {
  compileToMdx,
  type TOCItem as PipelineTOCItem,
} from '@/lib/content/pipeline'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import BlogMetaLayer, { BreadcrumbItem } from '@/layouts/BlogMetaLayer'
import LumenWrapper from '@/components/Wrapper/LumenWrapper'

export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = false

type RouteParams = { category: string; slug: string }
type PageProps = { params: Promise<RouteParams> }

export async function generateStaticParams() {
  return getAllPostMeta().map((m) => ({ category: m.category, slug: m.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params
  const meta = getPostBySlug(category, slug)
  if (!meta) return {}
  return buildPostMetadata(meta)
}

export default async function BlogPostPage({ params }: PageProps) {
  const { category, slug } = await params
  const meta = getPostBySlug(category, slug)
  if (!meta) notFound()

  const raw = fs.readFileSync(meta.sourcePath, 'utf8')

  const mdx = await compileToMdx({
    source: raw,
    assetBase: { category: meta.category, dirName: meta.dirName },
  })

  const post = {
    meta,
    isMDX: true as const,
    raw,
    bodyMdx: { code: mdx.code },
    toc: mdx.toc,
    readingTime: mdx.readingTime,
  }

  const toc: BlogTOCItem[] = (post.toc || []).map((t: PipelineTOCItem) => ({
    id: t.id,
    depth: t.depth,
    value: t.text,
  }))

  const crumbs: BreadcrumbItem[] = [
    { href: '/blog', label: 'Blog' },
    { href: `/blog/${post.meta.category}`, label: post.meta.category },
    { label: post.meta.title },
  ]

  return (
    <main>
      <BlogMetaLayer toc={toc} breadcrumbs={crumbs} showProgress />
      <SectionWrapper $spacious>
        <LumenWrapper
          as="header"
          variant="subtle"
          radius="large"
          data-toc-anchor
        >
          <PostHeader post={post.meta} />
        </LumenWrapper>
      </SectionWrapper>
      <SectionWrapper $spacious>
        <LumenWrapper
          as="article"
          variant="subtle"
          radius="large"
          data-reading-root
        >
          <PostBody post={post as any} />
        </LumenWrapper>
      </SectionWrapper>
    </main>
  )
}
