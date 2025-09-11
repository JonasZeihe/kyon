// src/app/blog/page.tsx
import { getAllPostMeta } from '@/lib/blog/indexer'
import { getPageParamFromSearchParams } from '@/lib/blog/pagination'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import PostList from '@/app/blog/components/PostList'
import Link from 'next/link'

export const dynamic = 'force-static'

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const page = getPageParamFromSearchParams(searchParams || {})
  const all = getAllPostMeta()
  const start = (page - 1) * POSTS_PER_PAGE
  const items = all.slice(start, start + POSTS_PER_PAGE)
  const pageCount = Math.max(
    1,
    Math.ceil(all.length / Math.max(1, POSTS_PER_PAGE))
  )

  return (
    <main>
      <h1 style={{ margin: '1rem 0' }}>Blog</h1>
      {items.length === 0 ? (
        <p>Keine Beiträge gefunden.</p>
      ) : (
        <PostList posts={items} />
      )}
      <nav style={{ display: 'flex', gap: 12, marginTop: 16 }}>
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
    </main>
  )
}
