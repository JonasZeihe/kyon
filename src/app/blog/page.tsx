// src/app/blog/page.tsx
import Link from 'next/link'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import AutoGrid from '@/components/Wrapper/AutoGrid'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { getPageParamFromSearchParams, paginate } from '@/lib/blog/pagination'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'
import Card from '@/components/blog/Card'

export const dynamic = 'force-static'

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const sp = (await searchParams) || {}
  const page = getPageParamFromSearchParams(sp)

  const all = getAllPostMeta()
  const {
    items,
    page: current,
    pageCount,
    hasPrev,
    hasNext,
  } = paginate(all, page, POSTS_PER_PAGE)

  return (
    <main>
      <SectionWrapper $spacious>
        <header style={{ textAlign: 'center' }}>
          <Typography variant="h1" align="center" color="primary.main">
            Blog
          </Typography>
          <Typography align="center" color="text.subtle">
            Prozess statt Pose. Natürlichkeit vor Methode.
          </Typography>
        </header>
      </SectionWrapper>

      <SectionWrapper $spacious>
        {items.length ? (
          <AutoGrid $min="260px" $gap={2}>
            {items.map((m) => {
              const href = `/blog/${m.category}/${m.slug}`
              const cover = m.cover
                ? toPublicAssetUrl(m.category, m.dirName, m.cover)
                : undefined
              return (
                <Card
                  key={m.id}
                  href={href}
                  title={m.title}
                  cover={cover}
                  date={m.updated || m.date}
                  readingTime={m.readingTime}
                  excerpt={m.excerpt}
                  tag={m.category}
                />
              )
            })}
          </AutoGrid>
        ) : (
          <Typography align="center" color="text.subtle">
            Keine Beiträge gefunden.
          </Typography>
        )}
      </SectionWrapper>

      <SectionWrapper>
        <nav
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          aria-label="Seitennavigation"
        >
          {hasPrev ? (
            <Link href={`/blog?page=${current - 1}`}>← Zurück</Link>
          ) : (
            <span aria-disabled="true" style={{ opacity: 0.5 }}>
              ← Zurück
            </span>
          )}
          <span>
            Seite {current} / {pageCount}
          </span>
          {hasNext ? (
            <Link href={`/blog?page=${current + 1}`}>Weiter →</Link>
          ) : (
            <span aria-disabled="true" style={{ opacity: 0.5 }}>
              Weiter →
            </span>
          )}
        </nav>
      </SectionWrapper>
    </main>
  )
}
