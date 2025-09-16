// --- src/app/blog/page.tsx ---
import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import Image from 'next/image'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import AutoGrid from '@/components/Wrapper/AutoGrid'
import CardWrapper from '@/components/Wrapper/CardWrapper'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { getPageParamFromSearchParams, paginate } from '@/lib/blog/pagination'
import { parseFrontmatter } from '@/lib/content/pipeline'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'

export const dynamic = 'force-static'

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
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

  const caseFile = path.join(
    process.cwd(),
    'public',
    'content',
    'cases',
    'over-9000-demo',
    'index.mdx'
  )
  let caseTeaser: null | { title: string; summary?: string; href?: string } =
    null
  try {
    const raw = fs.readFileSync(caseFile, 'utf8')
    const { data } = parseFrontmatter(raw)
    if ((data as any).type === 'case') {
      caseTeaser = {
        title: (data as any).title,
        summary: (data as any).summary,
        href: (data as any)?.cta?.href || '/cases',
      }
    }
  } catch {}

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

        {caseTeaser && (
          <SectionWrapper>
            <CardWrapper>
              <div style={{ padding: '1.1rem' }}>
                <Typography variant="h3" gutter={false}>
                  Case-Highlight: {caseTeaser.title}
                </Typography>
                {caseTeaser.summary && (
                  <Typography color="text.subtle">
                    {caseTeaser.summary}
                  </Typography>
                )}
                <Link
                  href={caseTeaser.href || '/cases'}
                  style={{
                    display: 'inline-block',
                    marginTop: '0.6rem',
                    padding: '0.6rem 1rem',
                    borderRadius: '0.55rem',
                    textDecoration: 'none',
                    border: '1px solid rgba(120,130,150,0.25)',
                  }}
                  aria-label={`Case öffnen: ${caseTeaser.title}`}
                >
                  Case lesen →
                </Link>
              </div>
            </CardWrapper>
          </SectionWrapper>
        )}

        <SectionWrapper>
          {items.length ? (
            <AutoGrid $min="260px" $gap={1.5}>
              {items.map((m) => {
                const href =
                  m.category === 'cases'
                    ? `/cases/${m.slug}`
                    : `/blog/${m.category}/${m.slug}`
                const cover = m.cover
                  ? toPublicAssetUrl(m.category, m.dirName, m.cover)
                  : null
                return (
                  <CardWrapper key={m.id}>
                    {cover ? (
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '16/9',
                        }}
                      >
                        <Image
                          src={cover}
                          alt={m.title}
                          fill
                          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 600px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ) : null}
                    <div style={{ padding: '0.9rem 1rem 1.1rem' }}>
                      <Link
                        href={href}
                        style={{
                          textDecoration: 'none',
                          display: 'inline-block',
                          marginBottom: '0.25rem',
                        }}
                        aria-label={`Beitrag öffnen: ${m.title}`}
                      >
                        <Typography variant="h3" gutter={false}>
                          {m.title}
                        </Typography>
                      </Link>
                      {m.excerpt ? (
                        <Typography color="text.subtle">{m.excerpt}</Typography>
                      ) : null}
                      <div
                        style={{
                          marginTop: '0.6rem',
                          fontSize: '0.9rem',
                          opacity: 0.8,
                        }}
                      >
                        {m.date
                          ? new Date(m.date).toLocaleDateString('de-DE')
                          : null}
                        {m.readingTime ? ` · ⏱️ ${m.readingTime} min` : null}
                      </div>
                    </div>
                  </CardWrapper>
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
