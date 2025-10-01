// src/app/blog/page.tsx
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import BentoSection from '@/components/Wrapper/BentoSection'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { getPageParamFromSearchParams, paginate } from '@/lib/blog/pagination'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'
import Card from '@/components/blog/Card'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import Pager from '@/components/pagination/Pager'

export const dynamic = 'force-static'

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
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
      <SectionWrapper $spacious>
        <ContainerWrapper>
          <Typography variant="h1" align="center" color="primary.main" as="h1">
            Blog
          </Typography>
          <Typography
            variant="subhead"
            align="center"
            color="text.subtle"
            as="p"
          >
            Gedanken, Notizen und Systembau – ruhig, präzise, nützlich.
          </Typography>
        </ContainerWrapper>
      </SectionWrapper>

      <ContainerWrapper $padY>
        {items.length ? (
          <BentoSection columns="auto" gap={2} padY={false}>
            {items.map((m) => {
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
            })}
          </BentoSection>
        ) : (
          <SectionWrapper>
            <ContainerWrapper>
              <Typography align="center" color="text.subtle">
                Keine Beiträge gefunden.
              </Typography>
            </ContainerWrapper>
          </SectionWrapper>
        )}
      </ContainerWrapper>

      <SectionWrapper>
        <ContainerWrapper>
          <Pager
            current={current}
            pageCount={pageCount}
            prevHref={prevHref}
            nextHref={nextHref}
            ariaLabel="Seitennavigation"
          />
        </ContainerWrapper>
      </SectionWrapper>
    </main>
  )
}
