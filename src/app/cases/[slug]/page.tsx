// src/app/cases/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import { getAllCaseMeta } from '@/lib/blog/indexer'
import {
  renderToHTML,
  compileToMdx,
  type TOCItem as PipelineTOCItem,
} from '@/lib/content/pipeline'
import type { TOCItem as BlogTOCItem } from '@/lib/blog/types'
import { SITE_URL } from '@/lib/blog/constants'
import { abs, toPublicAssetUrl } from '@/lib/content/helpers/paths'
import PostHeader from '@/app/blog/components/PostHeader'
import PostBody from '@/app/blog/components/PostBody'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import ArticleLayout from '@/components/blog/ArticleLayout'
import StickyToc from '@/components/blog/StickyToc'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import ArticleGrid from '@/components/blog/ArticleGrid'

export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = false

export async function generateStaticParams() {
  return getAllCaseMeta().map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = getAllCaseMeta().find((m) => m.slug === slug)
  if (!meta) return {}
  const title = meta.title
  const description = meta.excerpt || ''
  const url = abs(`/cases/${meta.slug}`)
  const canonical = meta.canonicalUrl
    ? /^https?:\/\//i.test(meta.canonicalUrl)
      ? meta.canonicalUrl
      : abs(meta.canonicalUrl)
    : url
  const ogUrl = meta.cover
    ? toPublicAssetUrl(meta.category, meta.dirName, meta.cover)
    : abs('/og-default.png')
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url,
      siteName: 'Kyon',
      title,
      description,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
    },
    metadataBase: new URL(SITE_URL),
  }
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = getAllCaseMeta().find((m) => m.slug === slug) || null
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

  const hasTOC =
    Array.isArray(toc) && toc.some((i) => i.depth === 2 || i.depth === 3)

  const crumbs = [
    { href: '/cases', label: 'Cases' },
    { label: post.meta.title },
  ]

  return (
    <main>
      <ContainerWrapper>
        <SectionWrapper>
          <Breadcrumbs items={crumbs} />
        </SectionWrapper>
      </ContainerWrapper>

      <ContainerWrapper $size="wide">
        <ArticleGrid aside={hasTOC ? <StickyToc items={toc} /> : undefined}>
          <ArticleLayout>
            <SectionWrapper $spacious data-toc-anchor>
              <PostHeader post={post.meta} />
            </SectionWrapper>
            <SectionWrapper $spacious>
              <PostBody post={post as any} />
            </SectionWrapper>
          </ArticleLayout>
        </ArticleGrid>
      </ContainerWrapper>
    </main>
  )
}
