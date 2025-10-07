// src/app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import Typography from '@/design/typography'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'
import HeroRecipe from '@/components/pagekit/recipes/HeroRecipe'
import SectionRecipe from '@/components/pagekit/recipes/SectionRecipe'
import GridRecipe from '@/components/pagekit/recipes/GridRecipe'
import Card from '@/components/blog/Card'
import Button from '@/components/button/Button'
import ButtonGrid from '@/components/button/ButtonGrid'
import { resolveSkin } from '@/components/pagekit/skins'

export const dynamic = 'force-static'

export default async function HomePage() {
  const skin = resolveSkin('home')
  const all = getAllPostMeta().filter((p) => !p.draft)
  const latest = all.slice(0, POSTS_PER_PAGE)

  return (
    <main>
      <HeroRecipe
        variant="split"
        isPageHeader
        title={
          <Typography variant="h1" as="h1">
            Prozess statt Pose <span aria-hidden="true">·</span> Natürlichkeit
            vor Methode
          </Typography>
        }
        lead={
          <Typography as="p" variant="subtitle" color="mutedFg" gutter={false}>
            Mein Blog zwischen Design und Entwicklung – klar, präzise,
            praxisnah.
          </Typography>
        }
        container="wide"
        accent={skin.accentKey}
        mediaAspect="16/9"
        media={
          <Image
            src="/og-default.png"
            alt="Kyon – klare, ruhige Oberfläche"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ objectFit: 'cover' }}
            priority
          />
        }
      />

      <SectionRecipe
        title={
          <Typography variant="h2" as="h2">
            Neu &amp; lesenswert
          </Typography>
        }
        surface="intense"
        accent={skin.accentKey}
        titleId="home-latest"
      >
        {latest.length === 0 ? (
          <Typography align="center" color="mutedFg">
            Keine Beiträge gefunden.
          </Typography>
        ) : (
          <GridRecipe
            items={latest}
            min={skin.gridProps?.min}
            columns={skin.gridProps?.columns}
            gap={skin.gridProps?.gap}
            renderItem={(p) => {
              const href = `/blog/${p.category}/${p.slug}`
              const cover = p.cover
                ? toPublicAssetUrl(p.category, p.dirName, p.cover)
                : undefined
              return (
                <Card
                  key={p.id}
                  href={href}
                  title={p.title}
                  cover={cover}
                  date={p.updated || p.date}
                  readingTime={p.readingTime}
                  excerpt={p.excerpt}
                  tag={p.category}
                />
              )
            }}
          />
        )}

        <ButtonGrid>
          <Button as={Link} href="/blog" variant="primary">
            Neueste Beiträge
          </Button>
          <Button as={Link} href="/about" variant="secondary">
            Purpose &amp; About
          </Button>
        </ButtonGrid>
      </SectionRecipe>
    </main>
  )
}
