// src/app/search/page.tsx
import { getAllPostMeta } from '@/lib/blog/indexer'
import type { Metadata } from 'next'
import Typography from '@/design/typography'
import SectionRecipe from '@/components/pagekit/recipes/SectionRecipe'
import SearchClient from './SearchClient'
import { resolveSkin } from '@/components/pagekit/skins'

export const dynamic = 'force-static'
export const revalidate = false

export const metadata: Metadata = {
  title: 'Suche',
  description: 'Beiträge durchsuchen',
}

export default function Page() {
  const skin = resolveSkin('search')
  const metas = getAllPostMeta()

  return (
    <main>
      <SectionRecipe
        title={
          <Typography
            variant="h1"
            align="center"
            as="h1"
            accent={skin.accentKey}
          >
            Suche
          </Typography>
        }
        intro={
          <Typography align="center" color="mutedFg" as="p">
            Du suchst – und findest. Ohne Reibung.
          </Typography>
        }
        surface="none"
        accent={skin.accentKey}
        titleId="search-title"
        ariaLabel="Suche"
      >
        <SearchClient metas={metas} />
      </SectionRecipe>
    </main>
  )
}
