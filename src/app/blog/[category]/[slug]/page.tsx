// src/app/blog/[category]/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { buildPostMetadata } from '@/lib/seo/metadata'
import { getAllPostMeta, getPostBySlug } from '@/lib/blog/indexer'
import type { Metadata } from 'next'
import type { TOCItem as BlogTOCItem } from '@/lib/blog/types'
import PostHeader from '@/app/blog/components/PostHeader'
import PostBody from '@/app/blog/components/PostBody'
import fs from 'node:fs'
import path from 'node:path'
import {
  renderToHTML,
  compileToMdx,
  type TOCItem as PipelineTOCItem,
} from '@/lib/content/pipeline'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import ArticleGrid from '@/components/blog/ArticleGrid'
import BlogMetaLayer, { BreadcrumbItem } from '@/layouts/BlogMetaLayer'

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
  const ext = path.extname(meta.sourcePath).toLowerCase()
  const isMDX = ext === '.mdx'

  const post = await (async () => {
    if (isMDX) {
      const mdx = await compileToMdx({
        source: raw,
        assetBase: { category: meta.category, dirName: meta.dirName },
      })
      return {
        meta,
        isMDX: true as const,
        raw,
        bodyMdx: { code: mdx.code },
        toc: mdx.toc,
        readingTime: mdx.readingTime,
      }
    }
    const html = await renderToHTML({
      source: raw,
      assetBase: { category: meta.category, dirName: meta.dirName },
    })
    return {
      meta,
      isMDX: false as const,
      raw,
      bodySource: html.html,
      toc: html.toc,
      readingTime: html.readingTime,
    }
  })()

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
      <ContainerWrapper $size="wide" $padY>
        <ArticleGrid>
          <SectionWrapper $spacious data-toc-anchor>
            <PostHeader post={post.meta} />
          </SectionWrapper>
          <SectionWrapper $spacious>
            <PostBody post={post as any} />
          </SectionWrapper>
        </ArticleGrid>
      </ContainerWrapper>
    </main>
  )
}
