// src/app/page.tsx
import Link from 'next/link'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import LumenWrapper from '@/components/Wrapper/LumenWrapper'
import PostList from '@/app/blog/components/PostList'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta } from '@/lib/blog/indexer'

export const dynamic = 'force-static'

export default async function HomePage() {
  const all = getAllPostMeta()
  const items = all.slice(0, POSTS_PER_PAGE)

  return (
    <main>
      <SectionWrapper $spacious>
        <LumenWrapper as="header" variant="subtle" radius="large">
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
                aria-label="Alle Blogbeiträge anzeigen"
                style={{
                  display: 'inline-block',
                  padding: '0.6rem 1rem',
                  borderRadius: '0.55rem',
                  background: 'var(--btn-bg, rgba(0,0,0,0.04))',
                  textDecoration: 'none',
                }}
              >
                Alle Beiträge ansehen →
              </Link>
            </div>
          </div>
        </LumenWrapper>
      </SectionWrapper>

      <SectionWrapper $spacious>
        <LumenWrapper as="section" variant="subtle" radius="large">
          <Typography variant="h2" align="left" gutter>
            Neueste Beiträge
          </Typography>
          {items.length === 0 ? (
            <Typography color="text.subtle">
              Keine Beiträge gefunden.
            </Typography>
          ) : (
            <PostList posts={items} />
          )}
        </LumenWrapper>
      </SectionWrapper>
    </main>
  )
}
