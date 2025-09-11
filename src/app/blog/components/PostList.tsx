// src/app/blog/components/PostList.tsx
'use client'

import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import CardGrid from '@/components/card/CardGrid'
import CardWrapper from '@/components/Wrapper/CardWrapper'
import Typography from '@/styles/Typography'
import { PostMeta } from '@/lib/blog/types'
import { toPublicAssetUrl } from '@/lib/blog/urls'

type Props = { posts: PostMeta[] }

export default function PostList({ posts }: Props) {
  if (!posts?.length) return <p>Keine Beiträge gefunden.</p>

  return (
    <CardGrid>
      {posts.map((m) => {
        const href = `/blog/${m.category}/${m.slug}`
        const cover = m.cover
          ? toPublicAssetUrl(m.category, m.dirName, m.cover)
          : null
        return (
          <CardWrapper key={m.id}>
            {cover ? (
              <CoverLink href={href}>
                <Cover>
                  <Image
                    src={cover}
                    alt={m.title}
                    fill
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={false}
                  />
                </Cover>
              </CoverLink>
            ) : null}
            <Inner>
              <Typography variant="h3" gutter={false}>
                <Link href={href}>{m.title}</Link>
              </Typography>
              <Meta>
                {new Date(m.updated || m.date).toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
                {typeof m.readingTime === 'number' && m.readingTime > 0
                  ? ` · ⏱️ ${m.readingTime} min`
                  : ''}
              </Meta>
              {m.excerpt ? <Excerpt>{m.excerpt}</Excerpt> : null}
            </Inner>
          </CardWrapper>
        )
      })}
    </CardGrid>
  )
}

const CoverLink = styled(Link)`
  display: block;
`

const Cover = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`

const Inner = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
`

const Meta = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
`

const Excerpt = styled.p`
  margin: 0;
`
