// src/app/blog/[category]/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { buildPostMetadata } from '@/lib/seo/metadata'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { listCategories, listPosts } from '@/lib/blog/fs'
import { parsePost } from '@/lib/blog/parse'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import PageWrapper from '@/components/Wrapper/PageWrapper'
import CardWrapper from '@/components/Wrapper/CardWrapper'
import PostHeader from '@/app/blog/components/PostHeader'
import PostBody from '@/app/blog/components/PostBody'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
type ParamsShape = { category: string; slug: string }
type Params = Promise<ParamsShape>
export const dynamicParams = false
export async function generateStaticParams() {
  const params: ParamsShape[] = []
  for (const category of listCategories()) {
    for (const p of listPosts(category)) {
      params.push({ category, slug: p.slug })
    }
  }
  return params
}
export async function generateMetadata({ params }: { params: Params }) {
  const { category, slug } = await params
  const meta = getAllPostMeta().find(
    (m) => m.category === category && m.slug === slug
  )
  return meta ? buildPostMetadata(meta) : {}
}
const Page = async ({ params }: { params: Params }) => {
  const { category, slug } = await params
  const dirName = getAllPostMeta().find(
    (m) => m.category === category && m.slug === slug
  )?.dirName
  if (!dirName) return notFound()
  const post = parsePost(category, dirName)
  if (!post) return notFound()
  return (
    <PageWrapper>
      <SectionWrapper $spacious>
        <Breadcrumbs
          items={[
            { href: '/blog', label: 'Blog' },
            { href: `/blog/${category}`, label: category },
            { label: post.meta.title },
          ]}
        />
        <PostHeader meta={post.meta} />
      </SectionWrapper>
      <SectionWrapper>
        <CardWrapper>
          <div style={{ padding: 16 }}>
            <PostBody post={post} />
          </div>
        </CardWrapper>
      </SectionWrapper>
    </PageWrapper>
  )
}
export default Page
