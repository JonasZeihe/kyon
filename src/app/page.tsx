// src/app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import Typography from '@/styles/Typography'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'
import HeroRecipe from '@/components/pagekit/recipes/HeroRecipe'
import SectionRecipe from '@/components/pagekit/recipes/SectionRecipe'
import GridRecipe from '@/components/pagekit/recipes/GridRecipe'
import Card from '@/components/blog/Card'
import Button from '@/components/button/Button'
import BentoSection from '@/components/Wrapper/BentoSection'
import { resolveSkin } from '@/components/pagekit/skins'

export const dynamic = 'force-static'

export default async function HomePage() {
  const skin = resolveSkin('home')

  const all = getAllPostMeta().filter((p) => !p.draft)
  const latest = all.slice(0, POSTS_PER_PAGE)

  const tagCounts = new Map<string, number>()
  for (const m of all)
    for (const t of m.tags || []) tagCounts.set(t, (tagCounts.get(t) || 0) + 1)
  const topTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16)
    .map(([tag]) => tag)

  return (
    <main>
      <HeroRecipe
        variant="split"
        isPageHeader
        kicker="Kyon"
        title={
          <Typography variant="h1" as="h1">
            Prozess statt Pose <span aria-hidden="true">·</span> Natürlichkeit
            vor Methode
          </Typography>
        }
        lead={
          <Typography
            as="p"
            variant="subhead"
            color="text.subtle"
            gutter={false}
          >
            Ein technischer Blog mit Haltung – klar, präzise, praxisnah.
          </Typography>
        }
        container="wide"
        accent={skin.accent as any}
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
        surface={skin.surface}
        rhythm={skin.rhythm}
        accent={skin.accent as any}
        titleId="home-latest"
      >
        {latest.length === 0 ? (
          <Typography align="center" color="text.subtle">
            Keine Beiträge gefunden.
          </Typography>
        ) : (
          <GridRecipe
            items={latest}
            min={skin.grid?.min || '18rem'}
            columns={skin.grid?.columns ?? 'auto'}
            gap={skin.grid?.gap ?? 2}
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

        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            marginTop: '12px',
          }}
        >
          <Button as={Link} href="/blog" variant="primary">
            Neueste Beiträge
          </Button>
          <Button as={Link} href="/about" variant="secondary">
            Purpose &amp; About
          </Button>
        </div>
      </SectionRecipe>
    </main>
  )
}
