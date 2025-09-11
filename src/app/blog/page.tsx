// src/app/blog/page.tsx
import Link from 'next/link'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import PageWrapper from '@/components/Wrapper/PageWrapper'
import CardWrapper from '@/components/Wrapper/CardWrapper'
const BlogIndex = async () => {
  const metas = getAllPostMeta().slice(0, POSTS_PER_PAGE)
  return (
    <PageWrapper>
      <SectionWrapper $spacious>
        <Typography variant="h1" align="center" color="accent.main">
          Blog
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
                <Typography variant="caption">
                  {new Date(m.updated || m.date).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                  {typeof m.readingTime === 'number' && m.readingTime > 0
                    ? ` · ⏱️ ${m.readingTime} min`
                    : ''}
                </Typography>
                {m.excerpt && <Typography>{m.excerpt}</Typography>}
              </div>
            </CardWrapper>
          ))}
        </div>
      </SectionWrapper>
    </PageWrapper>
  )
}
export default BlogIndex
