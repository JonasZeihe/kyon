// src/app/blog/page.tsx
import Typography from '@/design/typography'
import SectionRecipe from '@/components/pagekit/recipes/SectionRecipe'
import GridRecipe from '@/components/pagekit/recipes/GridRecipe'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { getPageParamFromSearchParams, paginate } from '@/lib/blog/pagination'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'
import Card from '@/components/blog/Card'
import Pager from '@/components/pagination/Pager'
import { resolveSkin } from '@/components/pagekit/skins'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'

export const dynamic = 'force-static'

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const skin = resolveSkin('blogIndex')
  const sp = (await searchParams) || {}
  const page = getPageParamFromSearchParams(sp)

  const all = getAllPostMeta()
  const {
    items,
    page: current,
    pageCount,
    hasPrev,
    hasNext,
  } = paginate(all, page, POSTS_PER_PAGE)

  const prevHref = hasPrev ? `/blog?page=${current - 1}` : null
  const nextHref = hasNext ? `/blog?page=${current + 1}` : null

  return (
    <main>
      <SectionRecipe
        title={
          <Typography
            variant="h1"
            align="center"
            accent={skin.accentKey}
            as="h1"
          >
            Blog
          </Typography>
        }
        intro={
          <Typography variant="subtitle" align="center" color="mutedFg" as="p">
            Gedanken, Notizen und Systembau – ruhig, präzise, nützlich.
          </Typography>
        }
        surface="none"
        accent={skin.accentKey}
        titleId="blog-title"
      >
        <Stack gap={1.25}>
          <Surface
            tone="accent"
            accent={skin.accentKey}
            radius="large"
            bordered
            padding="clamp(0.9rem, 2.2vw, 1.25rem)"
          >
            {items.length ? (
              <GridRecipe
                items={items}
                min={skin.gridProps?.min}
                columns={skin.gridProps?.columns}
                gap={skin.gridProps?.gap}
                renderItem={(m) => {
                  const href = `/blog/${m.category}/${m.slug}`
                  const cover = m.cover
                    ? toPublicAssetUrl(m.category, m.dirName, m.cover)
                    : undefined
                  return (
                    <Card
                      key={m.id}
                      href={href}
                      title={m.title}
                      cover={cover}
                      date={m.updated || m.date}
                      readingTime={m.readingTime}
                      excerpt={m.excerpt}
                      tag={m.category}
                    />
                  )
                }}
              />
            ) : (
              <Typography align="center" color="mutedFg">
                Keine Beiträge gefunden.
              </Typography>
            )}
          </Surface>

          <Pager
            current={current}
            pageCount={pageCount}
            prevHref={prevHref}
            nextHref={nextHref}
            ariaLabel="Seitennavigation"
          />
        </Stack>
      </SectionRecipe>
    </main>
  )
}
