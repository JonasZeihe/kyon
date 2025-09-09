// src/app/blog/[category]/page.tsx
import Link from 'next/link'
import { getPostsByCategory, getAllPostMeta } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import PageWrapper from '@/components/Wrapper/PageWrapper'
import CardWrapper from '@/components/Wrapper/CardWrapper'

type Params = Promise<{ category: string }>

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const categories = Array.from(
    new Set(getAllPostMeta().map((m) => m.category))
  )
  return categories.map((category) => ({ category }))
}

export default async function CategoryIndex({ params }: { params: Params }) {
  const { category } = await params
  const metas = getPostsByCategory(category).slice(0, POSTS_PER_PAGE)

  return (
    <PageWrapper>
      <SectionWrapper $spacious>
        <Typography variant="h1" align="center" color="accent.main">
          {category}
        </Typography>
      </SectionWrapper>

      <SectionWrapper>
        <div style={{ display: 'grid', gap: '16px' }}>
          {metas.map((m) => (
            <CardWrapper key={m.id}>
              <div style={{ padding: 16, display: 'grid', gap: 8 }}>
                <Typography variant="h3">
                  <Link href={`/blog/${m.category}/${m.slug}`}>{m.title}</Link>
                </Typography>
                <Typography variant="caption">{m.updated || m.date}</Typography>
                {m.excerpt && <Typography>{m.excerpt}</Typography>}
              </div>
            </CardWrapper>
          ))}
        </div>
      </SectionWrapper>
    </PageWrapper>
  )
}
