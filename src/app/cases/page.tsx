// src/app/cases/page.tsx
import { getAllCaseMeta } from '@/lib/blog/indexer'
import PostList from '@/app/blog/components/PostList'

export const dynamic = 'force-static'

export default function CasesIndex() {
  const items = getAllCaseMeta()
  return (
    <main>
      <h1 style={{ margin: '1rem 0' }}>Cases</h1>
      {items.length ? (
        <PostList posts={items} />
      ) : (
        <p>Keine Cases vorhanden.</p>
      )}
    </main>
  )
}
