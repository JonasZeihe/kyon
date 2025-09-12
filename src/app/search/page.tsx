// src/app/search/page.tsx
import { getAllPostMeta } from '@/lib/blog/indexer'
import type { Metadata } from 'next'
import SearchClient from './SearchClient'

export const dynamic = 'force-static'
export const revalidate = false

export const metadata: Metadata = {
  title: 'Suche',
  description: 'Beiträge durchsuchen',
}

export default function Page() {
  const metas = getAllPostMeta()
  return <SearchClient metas={metas} />
}
