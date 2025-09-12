// src/app/blog/[category]/page.tsx
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import PostList from '@/app/blog/components/PostList'
import Pagination from '@/app/blog/components/Pagination'
import { getAllPostMeta, getPostsByCategory } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getPageParamFromSearchParams, paginate } from '@/lib/blog/pagination'

type Params = { category: string }

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const metas = getAllPostMeta()
  const cats = Array.from(new Set(metas.map((m) => m.category)))
  return cats.map((c) => ({ category: c }))
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const { category } = await params
  const sp = (await searchParams) || {}
  const pageNum = getPageParamFromSearchParams(sp)
  const all = getPostsByCategory(category)
  const p = paginate(all, pageNum, POSTS_PER_PAGE)

  return (
    <SectionWrapper $spacious>
      <Typography variant="h1" align="center" color="primary.main">
        {category}
      </Typography>
      <PostList posts={p.items} />
      <Pagination
        basePath={`/blog/${category}`}
        page={p.page}
        pageCount={p.pageCount}
      />
    </SectionWrapper>
  )
}
