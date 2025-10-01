// src/app/page.tsx
import Link from 'next/link'
import Typography from '@/styles/Typography'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta } from '@/lib/blog/indexer'
import HeroRecipe from '@/components/pagekit/recipes/HeroRecipe'
import SectionRecipe from '@/components/pagekit/recipes/SectionRecipe'
import PostList from '@/app/blog/components/PostList'
import Button from '@/components/button/Button'
import { resolveSkin } from '@/components/pagekit/skins'

export const dynamic = 'force-static'

export default async function HomePage() {
  const skin = resolveSkin('home')
  const all = getAllPostMeta()
  const items = all.slice(0, POSTS_PER_PAGE)

  return (
    <main>
      <HeroRecipe
        isPageHeader
        title="Kyon"
        lead="Ruhige Interfaces. Klare Systeme. Substanz statt Show."
        container="default"
        motif="spotlight"
        accent={skin.accent as any}
      />
      <SectionRecipe
        title={
          <Typography variant="h2" align="center" as="h2">
            Neueste Beiträge
          </Typography>
        }
        surface={skin.surface}
        rhythm={skin.rhythm}
        accent={skin.accent as any}
        titleId="root-latest"
      >
        {items.length === 0 ? (
          <Typography color="text.subtle">Keine Beiträge gefunden.</Typography>
        ) : (
          <PostList posts={items} />
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '12px',
          }}
        >
          <Button as={Link} href="/blog" variant="primary">
            Alle Beiträge ansehen →
          </Button>
        </div>
      </SectionRecipe>
    </main>
  )
}
