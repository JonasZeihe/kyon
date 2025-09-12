// src/app/tags/[tag]/page.tsx
import Link from 'next/link'
import PageWrapper from '@/components/Wrapper/PageWrapper'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import Typography from '@/styles/Typography'
import PostList from '@/app/blog/components/PostList'
import Pagination from '@/app/blog/components/Pagination'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { paginate, getPageParamFromSearchParams } from '@/lib/blog/pagination'
import { searchPosts } from '@/lib/blog/indexer'

type Params = { tag: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const metas = getAllPostMeta()
  const tags = new Set<string>()
  for (const m of metas) for (const t of m.tags || []) tags.add(t)
  return Array.from(tags).map((tag) => ({ tag }))
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams?: Promise<SearchParams>
}) {
  const { tag } = await params
  const sp = (await searchParams) || {}
  const pageNum = getPageParamFromSearchParams(sp)
  const results = searchPosts({ tags: [tag] })
  const { items, page, pageCount } = paginate(results, pageNum, POSTS_PER_PAGE)

  return (
    <PageWrapper>
      <SectionWrapper $spacious>
        <Typography variant="h1" align="center" color="accent.main">
          #{tag}
        </Typography>
        <Typography align="center">Beiträge mit dem Tag „{tag}“</Typography>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <Link href="/blog">Alle Beiträge</Link>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        {items.length > 0 ? (
          <PostList posts={items} />
        ) : (
          <Typography align="center">Keine Beiträge gefunden.</Typography>
        )}
      </SectionWrapper>

      {pageCount > 1 && (
        <SectionWrapper>
          <Pagination
            basePath={`/tags/${encodeURIComponent(tag)}`}
            page={page}
            pageCount={pageCount}
          />
        </SectionWrapper>
      )}
    </PageWrapper>
  )
}
