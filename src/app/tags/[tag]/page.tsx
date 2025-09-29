// src/app/tags/[tag]/page.tsx
import Link from 'next/link'
import styled from 'styled-components'
import PageLayout from '@/layouts/PageLayout'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'
import Typography from '@/styles/Typography'
import PostList from '@/app/blog/components/PostList'
import Pagination from '@/app/blog/components/Pagination'
import Breadcrumbs from '@/app/blog/meta/Breadcrumbs'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { paginate, getPageParamFromSearchParams } from '@/lib/blog/pagination'

type Params = { tag: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = false

export async function generateStaticParams() {
  const metas = getAllPostMeta()
  const tags = new Set<string>()
  for (const m of metas) for (const t of m.tags || []) tags.add(t)
  return Array.from(tags).map((tag) => ({ tag }))
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams?: Promise<SearchParams>
}) {
  const { tag } = await params
  const sp = (await searchParams) || {}
  const pageNum = getPageParamFromSearchParams(sp)
  const results = getAllPostMeta().filter((m) => (m.tags || []).includes(tag))
  const { items, page, pageCount } = paginate(results, pageNum, POSTS_PER_PAGE)

  return (
    <PageLayout variant="none" size="default">
      <ContainerWrapper $padY>
        <Breadcrumbs
          items={[{ href: '/blog', label: 'Blog' }, { label: `#${tag}` }]}
        />
        <Header>
          <Typography variant="h1" align="center" color="accent.main">
            #{tag}
          </Typography>
          <Typography align="center" color="text.subtle">
            Beiträge mit dem Tag „{tag}“
          </Typography>
          <BackLink href="/blog">← Alle Beiträge</BackLink>
        </Header>
        {items.length > 0 ? (
          <PostList posts={items} />
        ) : (
          <Typography align="center">Keine Beiträge gefunden.</Typography>
        )}
        {pageCount > 1 && (
          <Pagination
            basePath={`/tags/${encodeURIComponent(tag)}`}
            page={page}
            pageCount={pageCount}
          />
        )}
      </ContainerWrapper>
    </PageLayout>
  )
}

const Header = styled.header`
  text-align: center;
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.55rem 0.9rem;
  border-radius: 0.55rem;
  text-decoration: none;
  border: 1px solid rgba(120, 130, 150, 0.25);
  color: inherit;
  transition:
    background 0.15s ease,
    transform 0.12s ease,
    box-shadow 0.18s ease;
  &:hover,
  &:focus-visible {
    background: rgba(140, 150, 170, 0.08);
    transform: translateY(-1px);
    outline: none;
  }
`
