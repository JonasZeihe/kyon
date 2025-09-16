// --- src/app/page.tsx ---
import Link from 'next/link'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import PostList from '@/app/blog/components/PostList'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta } from '@/lib/blog/indexer'

export const dynamic = 'force-static'

export default async function HomePage() {
  const all = getAllPostMeta()
  const items = all.slice(0, POSTS_PER_PAGE)

  return (
    <>
      <SectionWrapper $spacious>
        <div style={{ display: 'grid', gap: '0.75rem', textAlign: 'center' }}>
          <Typography variant="h1" align="center" color="primary.main">
            Kyon
          </Typography>
          <Typography align="center" color="text.subtle">
            Prozess statt Pose. Natürlichkeit vor Methode.
          </Typography>
          <div style={{ marginTop: '0.5rem' }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-block',
                padding: '0.55rem 0.95rem',
                borderRadius: '0.55rem',
                background: 'var(--btn-bg, transparent)',
                boxShadow: 'var(--btn-shadow, none)',
                textDecoration: 'none',
              }}
              aria-label="Alle Blogbeiträge anzeigen"
            >
              Alle Beiträge ansehen →
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <Typography variant="h2" align="left">
          Neueste Beiträge
        </Typography>
        {items.length === 0 ? (
          <Typography>Keine Beiträge gefunden.</Typography>
        ) : (
          <PostList posts={items} />
        )}
      </SectionWrapper>
    </>
  )
}
