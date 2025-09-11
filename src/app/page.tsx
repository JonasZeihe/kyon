// src/app/page.tsx
import Link from 'next/link'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import PageWrapper from '@/components/Wrapper/PageWrapper'
import Typography from '@/styles/Typography'
import Button from '@/components/button/Button'
import ButtonGrid from '@/components/button/ButtonGrid'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import PostList from '@/app/blog/components/PostList'
const Page = async () => {
  const metas = getAllPostMeta().slice(0, POSTS_PER_PAGE)
  return (
    <PageWrapper>
      <SectionWrapper $spacious>
        <Typography variant="h1" align="center" color="accent.main">
          Kyon
        </Typography>
        <Typography align="center" gutter>
          Prozess statt Pose. Natürlichkeit vor Methode.
        </Typography>
        <ButtonGrid>
          <Link href="/blog">
            <Button variant="primary">Alle Beiträge</Button>
          </Link>
          <Link href="/rss.xml">
            <Button variant="prototype">RSS</Button>
          </Link>
        </ButtonGrid>
      </SectionWrapper>
      <SectionWrapper>
        <Typography variant="h2" align="center" color="primary.main">
          Neueste Beiträge
        </Typography>
        <PostList posts={metas} />
      </SectionWrapper>
    </PageWrapper>
  )
}
export default Page
