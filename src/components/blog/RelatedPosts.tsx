// src/components/blog/RelatedPosts.tsx
'use client'

import styled from 'styled-components'
import Typography from '@/design/typography'
import type { PostMeta } from '@/lib/blog/types'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'
import Card from '@/components/blog/Card'

type Props = { posts: PostMeta[] }

export default function RelatedPosts({ posts }: Props) {
  if (!posts?.length) return null

  return (
    <Wrap>
      <Typography variant="h2" align="center" accent="primary">
        Ähnliche Beiträge
      </Typography>

      <Grid>
        {posts.map((m) => {
          const href = `/blog/${m.category}/${m.slug}`
          const cover = m.cover
            ? toPublicAssetUrl(m.category, m.dirName, m.cover)
            : undefined

          return (
            <Card
              key={m.id || `${m.category}:${m.slug}`}
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
      </Grid>
    </Wrap>
  )
}

const Wrap = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${({ theme }) => theme.spacing(2)};
`
