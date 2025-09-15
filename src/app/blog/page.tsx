import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import PostList from '@/app/blog/components/PostList'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { getPageParamFromSearchParams } from '@/lib/blog/pagination'
import { parseFrontmatter } from '@/lib/content/pipeline'

export const dynamic = 'force-static'

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = (await searchParams) || {}
  const page = getPageParamFromSearchParams(sp)
  const all = getAllPostMeta()
  const start = (page - 1) * POSTS_PER_PAGE
  const items = all.slice(start, start + POSTS_PER_PAGE)
  const pageCount = Math.ceil(all.length / Math.max(1, POSTS_PER_PAGE))

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
  } catch (_) {
    caseTeaser = null
  }

  return (
    <main>
      <SectionWrapper $spacious>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
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
          <div
            style={{
              display: 'grid',
              gap: '0.75rem',
              padding: '1.25rem',
              borderRadius: '1rem',
              border: '1px solid rgba(120,130,150,0.25)',
              background: 'var(--cb-bg, transparent)',
            }}
          >
            <Typography variant="h3" gutter={false}>
              Case-Highlight: {caseTeaser.title}
            </Typography>
            {caseTeaser.summary && (
              <Typography color="text.subtle">{caseTeaser.summary}</Typography>
            )}
            <Link
              href={caseTeaser.href || '/cases'}
              style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                padding: '0.6rem 1rem',
                borderRadius: '0.55rem',
                background: 'var(--btn-bg, transparent)',
                textDecoration: 'none',
              }}
              aria-label={`Case öffnen: ${caseTeaser.title}`}
            >
              Case lesen →
            </Link>
          </div>
        </SectionWrapper>
      )}

      <SectionWrapper>
        {items.length ? (
          <PostList posts={items} />
        ) : (
          <p>Keine Beiträge gefunden.</p>
        )}

        <nav
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 20,
            justifyContent: 'center',
          }}
        >
          <Link
            aria-disabled={page <= 1}
            href={page <= 1 ? '#' : `/blog?page=${page - 1}`}
          >
            ← Zurück
          </Link>
          <span>
            Seite {page} / {pageCount}
          </span>
          <Link
            aria-disabled={page >= pageCount}
            href={page >= pageCount ? '#' : `/blog?page=${page + 1}`}
          >
            Weiter →
          </Link>
        </nav>
      </SectionWrapper>
    </main>
  )
}
