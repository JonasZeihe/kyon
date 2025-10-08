// src/app/blog/[category]/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { buildPostMetadata } from '@/lib/seo/metadata'
import { getAllPostMeta, getPostBySlug } from '@/lib/blog/indexer'
import type { Metadata } from 'next'
import type { TOCItem as BlogTOCItem } from '@/lib/blog/types'
import PostHeader from '@/app/blog/components/PostHeader'
import PostBody from '@/app/blog/components/PostBody'
import HeadingEnhancer from '@/app/blog/components/HeadingEnhancer'
import fs from 'node:fs'
import matter from 'gray-matter'
import {
  compileToMdx,
  type TOCItem as PipelineTOCItem,
} from '@/lib/content/pipeline'
import ArticleRecipe from '@/components/pagekit/recipes/ArticleRecipe'
import PageMeta from '@/components/pagekit/islands/PageMeta'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import Container from '@/components/primitives/Container'
import ProgressIsland from '@/components/pagekit/islands/ProgressIsland'
import Typography from '@/design/typography'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'

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
  const { content } = matter(raw)
  const mdx = await compileToMdx({
    source: raw,
    assetBase: { category: meta.category, dirName: meta.dirName },
  })

  const post = {
    meta,
    isMDX: true as const,
    raw,
    bodySource: content,
    bodyMdx: { code: mdx.code },
    toc: mdx.toc,
    readingTime: mdx.readingTime,
  }

  const toc: BlogTOCItem[] = (post.toc || []).map((t: PipelineTOCItem) => ({
    id: t.id,
    depth: t.depth,
    value: t.text,
  }))

  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: meta.category, href: `/blog/${meta.category}` },
    { label: meta.title },
  ]

  const hasToc =
    Array.isArray(toc) && toc.some((i) => i.depth === 2 || i.depth === 3)

  return (
    <main>
      <ProgressIsland rootSelector="[data-reading-root]" />
      <Container max="default">
        <Breadcrumbs items={breadcrumbs} />
      </Container>
      <ArticleRecipe
        header={<PostHeader post={post.meta} />}
        body={
          <>
            <HeadingEnhancer />
            <PostBody post={post as any} />
            <Stack gap={2} style={{ marginTop: 'clamp(2rem, 5vw, 3rem)' }}>
              <Surface
                tone="neutral"
                bordered
                radius="large"
                padding="clamp(0.9rem, 2vw, 1.25rem)"
              >
                <Typography as="p" variant="body" align="center">
                  💬 Fragen oder Gedanken? Schreib mir gern an{' '}
                  <a
                    href="mailto:jonaszeihe@gmail.com"
                    style={{ textDecoration: 'underline', color: 'inherit' }}
                  >
                    jonaszeihe@gmail.com
                  </a>
                </Typography>
              </Surface>
            </Stack>
          </>
        }
        asideMeta={
          hasToc ? (
            <PageMeta
              tocItems={toc}
              showProgress
              ariaLabel="Artikel-Navigation"
            />
          ) : null
        }
        surface="subtle"
        accent="primary"
        narrow={false}
        bodyWidth="default"
      />
    </main>
  )
}
