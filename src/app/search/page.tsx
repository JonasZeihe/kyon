// src/app/search/page.tsx
import { getAllPostMeta } from '@/lib/blog/indexer'
import type { Metadata } from 'next'
import Typography from '@/styles/Typography'
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
          <Typography variant="h1" align="center" color="primary.main" as="h1">
            Suche
          </Typography>
        }
        intro={
          <Typography align="center" color="text.subtle" as="p">
            Du suchst – und findest. Ohne Reibung.
          </Typography>
        }
        surface={skin.surface}
        rhythm={skin.rhythm}
        accent={skin.accent as any}
        titleId="search-title"
        ariaLabel="Suche"
      >
        <></>
      </SectionRecipe>

      <SectionRecipe
        surface={skin.surface}
        rhythm={skin.rhythm}
        accent={skin.accent as any}
      >
        <SearchClient metas={metas} />
      </SectionRecipe>
    </main>
  )
}
