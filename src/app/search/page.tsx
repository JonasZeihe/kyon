// src/app/search/page.tsx
import { getAllPostMeta } from '@/lib/blog/indexer'
import type { Metadata } from 'next'
import Typography from '@/styles/Typography'
import SectionRecipe from '@/components/pagekit/recipes/SectionRecipe'
import SearchClient from './SearchClient'

export const dynamic = 'force-static'
export const revalidate = false

export const metadata: Metadata = {
  title: 'Suche',
  description: 'Beiträge durchsuchen',
}

export default function Page() {
  const metas = getAllPostMeta()

  return (
    <main>
      <SectionRecipe surface="subtle" rhythm="default">
        <Typography variant="h1" align="center" color="primary.main" as="h1">
          Suche
        </Typography>
        <Typography align="center" color="text.subtle" as="p">
          Beiträge durchsuchen
        </Typography>
      </SectionRecipe>

      <SectionRecipe surface="subtle" rhythm="default">
        <SearchClient metas={metas} />
      </SectionRecipe>
    </main>
  )
}
