// src/app/page.tsx
import Link from 'next/link'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import PageWrapper from '@/components/Wrapper/PageWrapper'
import Typography from '@/styles/Typography'
import Button from '@/components/button/Button'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import PostList from '@/app/blog/components/PostList'

export default async function Page() {
  const metas = getAllPostMeta().slice(0, POSTS_PER_PAGE)
  return (
    <PageWrapper>
      <SectionWrapper $spacious>
        <Typography variant="h1" align="center" color="accent.main">
          Blog
        </Typography>
        <Typography align="center">
          Prozess statt Pose. Natürlichkeit vor Methode.
        </Typography>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}
        >
          <Link href="/blog">
            <Button variant="primary">Alle Beiträge</Button>
          </Link>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <PostList posts={metas} />
      </SectionWrapper>
    </PageWrapper>
  )
}
