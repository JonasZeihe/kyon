// src/app/blog/page.tsx
import Link from 'next/link'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
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
      <ContainerWrapper>
        <SectionWrapper $spacious>
          <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
            <Typography variant="h1" align="center" color="primary.main">
              Blog
            </Typography>
            <Typography align="center" color="text.subtle">
              Prozess statt Pose. Natürlichkeit vor Methode.
            </Typography>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          {items.length ? (
            <AutoGrid $min="260px" $gap={1.5}>
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
            <p>Keine Beiträge gefunden.</p>
          )}

          <nav
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 20,
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
      </ContainerWrapper>
    </main>
  )
}
