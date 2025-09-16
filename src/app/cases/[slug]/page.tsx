// src/app/cases/[slug]/page.tsx
import { notFound } from 'next/navigation'
import fs from 'node:fs'
import path from 'node:path'
import { getAllCaseMeta } from '@/lib/blog/indexer'
import {
  renderToHTML,
  compileToMdx,
  type TOCItem as PipelineTOCItem,
} from '@/lib/content/pipeline'
import type { TOCItem as BlogTOCItem } from '@/lib/blog/types'
import PostHeader from '@/app/blog/components/PostHeader'
import PostBody from '@/app/blog/components/PostBody'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import Typography from '@/styles/Typography'
import Link from 'next/link'

export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = false

export async function generateStaticParams() {
  return getAllCaseMeta().map((m) => ({ slug: m.slug }))
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

  const crumbs = [
    { href: '/cases', label: 'Cases' },
    { label: post.meta.title },
  ]

  return (
    <main>
      <div
        style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.25rem' }}
      >
        <Breadcrumbs items={crumbs} />
      </div>

      <article>
        <PostHeader post={post.meta} />
        <PostBody post={post as any} toc={toc} />
      </article>

      <SectionWrapper>
        <div
          style={{
            display: 'grid',
            gap: '0.6rem',
            textAlign: 'center',
            marginTop: '0.25rem',
          }}
        >
          <Typography align="center" color="text.subtle">
            Weitere Cases folgen. Zurück zum Blog?
          </Typography>
          <Link
            href="/blog"
            style={{
              justifySelf: 'center',
              padding: '0.55rem 0.9rem',
              borderRadius: '0.55rem',
              textDecoration: 'none',
              border: '1px solid var(--btn-sec-bd, rgba(120,130,150,.25))',
            }}
          >
            ← Zum Blog
          </Link>
        </div>
      </SectionWrapper>
    </main>
  )
}
