// src/app/search/page.tsx
import PageWrapper from '@/components/Wrapper/PageWrapper'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import Typography from '@/styles/Typography'
import PostList from '@/app/blog/components/PostList'
import Pagination from '@/app/blog/components/Pagination'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { searchPosts } from '@/lib/blog/indexer'
import { paginate, getPageParamFromSearchParams } from '@/lib/blog/pagination'

type SearchParams = { [key: string]: string | string[] | undefined }

export default function SearchPage({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  const sp =
    (searchParams as Record<string, string | string[] | undefined>) || {}
  const qRaw = sp.q
  const q = Array.isArray(qRaw) ? qRaw[0] : qRaw || ''
  const pageNum = getPageParamFromSearchParams(sp)
  const trimmed = q.trim()

  if (!trimmed) {
    return (
      <PageWrapper>
        <SectionWrapper $spacious>
          <Typography variant="h1" align="center" color="accent.main">
            Suche
          </Typography>
          <Typography align="center">
            Bitte gib einen Suchbegriff in der Kopfzeile oder auf der
            Blog-Startseite ein.
          </Typography>
        </SectionWrapper>
      </PageWrapper>
    )
  }

  const results = searchPosts({ query: trimmed })
  const { items, page, pageCount } = paginate(results, pageNum, POSTS_PER_PAGE)

  return (
    <PageWrapper>
      <SectionWrapper $spacious>
        <Typography variant="h1" align="center" color="accent.main">
          Suche
        </Typography>
        <Typography align="center">Ergebnisse für „{trimmed}“</Typography>
      </SectionWrapper>

      <SectionWrapper>
        {items.length > 0 ? (
          <PostList posts={items} />
        ) : (
          <Typography align="center">Keine Treffer gefunden.</Typography>
        )}
      </SectionWrapper>

      {pageCount > 1 && (
        <SectionWrapper>
          <Pagination
            page={page}
            pageCount={pageCount}
            makeHref={(p) =>
              `/search?q=${encodeURIComponent(trimmed)}&page=${p}`
            }
          />
        </SectionWrapper>
      )}
    </PageWrapper>
  )
}
