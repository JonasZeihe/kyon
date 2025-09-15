import Link from 'next/link'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import Typography from '@/styles/Typography'
import PostList from '@/app/blog/components/PostList'
import Pagination from '@/app/blog/components/Pagination'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { paginate, getPageParamFromSearchParams } from '@/lib/blog/pagination'

type Params = { tag: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = false

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
  const results = getAllPostMeta().filter((m) => (m.tags || []).includes(tag))
  const { items, page, pageCount } = paginate(results, pageNum, POSTS_PER_PAGE)

  return (
    <main>
      <SectionWrapper $spacious>
        <div style={{ textAlign: 'center', display: 'grid', gap: '0.5rem' }}>
          <Typography variant="h1" align="center" color="accent.main">
            #{tag}
          </Typography>
          <Typography align="center" color="text.subtle">
            Beiträge mit dem Tag „{tag}“
          </Typography>
          <div style={{ marginTop: 12 }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-block',
                padding: '0.55rem 0.9rem',
                borderRadius: '0.55rem',
                textDecoration: 'none',
                border: '1px solid var(--btn-sec-bd, rgba(120,130,150,.25))',
              }}
            >
              ← Alle Beiträge
            </Link>
          </div>
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
    </main>
  )
}
