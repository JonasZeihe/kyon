// src/app/blog/[category]/page.tsx
import Typography from '@/design/typography'
import SectionRecipe from '@/components/pagekit/recipes/SectionRecipe'
import GridRecipe from '@/components/pagekit/recipes/GridRecipe'
import Pager from '@/components/pagination/Pager'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta, getPostsByCategory } from '@/lib/blog/indexer'
import { getPageParamFromSearchParams, paginate } from '@/lib/blog/pagination'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'
import Card from '@/components/blog/Card'
import { resolveSkin } from '@/components/pagekit/skins'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'

export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = false

type Params = { category: string }
type PageProps = {
  params: Promise<Params>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export async function generateStaticParams() {
  const cats = Array.from(new Set(getAllPostMeta().map((m) => m.category)))
  return cats.map((c) => ({ category: c }))
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params
  const sp = (await searchParams) || {}
  const page = getPageParamFromSearchParams(sp)
  const skin = resolveSkin('blogCategory')

  const all = getPostsByCategory(category)
  const {
    items,
    page: current,
    pageCount,
    hasPrev,
    hasNext,
  } = paginate(all, page, POSTS_PER_PAGE)

  const prevHref = hasPrev ? `/blog/${category}?page=${current - 1}` : null
  const nextHref = hasNext ? `/blog/${category}?page=${current + 1}` : null

  return (
    <main>
      <SectionRecipe
        title={
          <Typography
            as="h1"
            variant="h1"
            align="center"
            accent={skin.accentKey}
          >
            {category}
          </Typography>
        }
        intro={
          <Typography
            as="p"
            variant="subtitle"
            align="center"
            color="fg"
            style={{ opacity: 0.88 }}
          >
            {all.length} Beitrag{all.length === 1 ? '' : 'e'} in „{category}“
          </Typography>
        }
        surface="none"
        accent={skin.accentKey}
        titleId="category-title"
      >
        <Stack gap={1.5}>
          <Surface
            tone="elevated"
            accent={skin.accentKey}
            radius="large"
            bordered
            padding="clamp(1rem, 2vw, 1.4rem)"
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
                Keine Beiträge in dieser Kategorie.
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
