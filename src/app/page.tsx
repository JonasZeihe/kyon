// src/app/page.tsx
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta } from '@/lib/blog/indexer'
import Link from 'next/link'
import PostList from '@/app/blog/components/PostList'

export const dynamic = 'force-static'

export default async function HomePage() {
  const all = getAllPostMeta()
  const items = all.slice(0, POSTS_PER_PAGE)

  return (
    <main>
      <section>
        <h1 style={{ margin: '1rem 0' }}>Neueste Beiträge</h1>
        {items.length === 0 ? (
          <p>Keine Beiträge gefunden.</p>
        ) : (
          <PostList posts={items} />
        )}
        <p style={{ marginTop: '1rem' }}>
          <Link href="/blog">Alle Beiträge ansehen</Link>
        </p>
      </section>
    </main>
  )
}
