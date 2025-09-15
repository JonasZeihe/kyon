import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import PostList from '@/app/blog/components/PostList'
import Pagination from '@/app/blog/components/Pagination'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import { getAllPostMeta, getPostsByCategory } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import { getPageParamFromSearchParams, paginate } from '@/lib/blog/pagination'

type Params = { category: string }

export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = false

export async function generateStaticParams() {
  const cats = Array.from(new Set(getAllPostMeta().map((m) => m.category)))
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
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <Breadcrumbs
          items={[{ href: '/blog', label: 'Blog' }, { label: category }]}
        />
      </div>

      <header style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <Typography variant="h1" align="center" color="primary.main">
          {category}
        </Typography>
        <Typography align="center" color="text.subtle">
          {all.length} Beitrag{all.length === 1 ? '' : 'e'} in „{category}“
        </Typography>
      </header>

      {p.items.length ? (
        <PostList posts={p.items} />
      ) : (
        <Typography align="center">
          Keine Beiträge in dieser Kategorie.
        </Typography>
      )}

      <Pagination
        basePath={`/blog/${category}`}
        page={p.page}
        pageCount={p.pageCount}
      />
    </SectionWrapper>
  )
}
