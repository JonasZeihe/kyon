// src/app/blog/components/PostList.tsx
'use client'

import CardGrid from '@/components/card/CardGrid'
import Card from '@/components/blog/Card'
import styled from 'styled-components'
import type { PostMeta } from '@/lib/blog/types'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'

type Props = { posts: PostMeta[] }

export default function PostList({ posts }: Props) {
  if (!posts?.length) return <EmptyState>Keine Beiträge gefunden.</EmptyState>

  return (
    <CardGrid>
      {posts.map((m) => {
        const href = `/blog/${m.category}/${m.slug}/`
        const cover = m.cover
          ? toPublicAssetUrl(m.category, m.dirName, m.cover)
          : null

        return (
          <Card
            key={m.id}
            href={href}
            title={m.title}
            cover={cover}
            date={m.updated || m.date}
            readingTime={m.readingTime}
            excerpt={m.excerpt}
          />
        )
      })}
    </CardGrid>
  )
}

const EmptyState = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text.subtle};
  background: ${({ theme }) => theme.colors.surface[1]};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`
