// src/app/(site)/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import Typography from '@/styles/Typography'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'
import Card from '@/components/blog/Card'
import HeroRecipe from '@/components/pagekit/recipes/HeroRecipe'
import SectionRecipe from '@/components/pagekit/recipes/SectionRecipe'
import GridRecipe from '@/components/pagekit/recipes/GridRecipe'
import Button from '@/components/button/Button'
import { resolveSkin } from '@/components/pagekit/skins'

export const dynamic = 'force-static'

export default function HomePage() {
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
        isPageHeader
        title={
          <span>
            Prozess statt Pose <span aria-hidden="true">·</span> Natürlichkeit
            vor Methode
          </span>
        }
        kicker="Kyon"
        lead="Ein technischer Blog mit Haltung – klar, präzise, praxisnah."
        motif="edgeToEdge"
        accent={skin.accent as any}
        container="wide"
        media={
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '1rem',
              overflow: 'hidden',
              border: '1px solid var(--_border, rgba(0,0,0,0.08))',
            }}
          >
            <Image
              src="/og-default.png"
              alt="Kyon – klare, ruhige Oberfläche"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
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

      <SectionRecipe
        title={
          <Typography variant="h2" as="h2">
            Themen
          </Typography>
        }
        surface={skin.surface}
        rhythm={skin.rhythm}
        accent={skin.accent as any}
        titleId="home-topics"
      >
        {topTags.length === 0 ? (
          <Typography align="center" color="text.subtle">
            Keine Tags vorhanden.
          </Typography>
        ) : (
          <GridRecipe
            items={topTags}
            min="10rem"
            columns="auto"
            gap={1.2 as any}
            renderItem={(t) => (
              <Button
                as={Link}
                href={`/tags/${encodeURIComponent(t)}`}
                variant="ghost"
              >
                #{t}
              </Button>
            )}
          />
        )}
      </SectionRecipe>
    </main>
  )
}
