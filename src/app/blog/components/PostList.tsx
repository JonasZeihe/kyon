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
        const dateLabel = new Date(m.updated || m.date).toLocaleDateString(
          'de-DE',
          { day: '2-digit', month: 'short', year: 'numeric' }
        )
        return (
          <ItemCard key={m.id}>
            {cover ? (
              <CoverLink href={href} aria-label={m.title}>
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
              <Title variant="h3" gutter={false}>
                <Link href={href}>{m.title}</Link>
              </Title>
              <Meta>
                <span>{dateLabel}</span>
                {typeof m.readingTime === 'number' && m.readingTime > 0 ? (
                  <span>· ⏱️ {m.readingTime} min</span>
                ) : null}
              </Meta>
              {m.excerpt ? <Excerpt>{m.excerpt}</Excerpt> : null}
              <More href={href} aria-label={`${m.title} lesen`}>
                Weiter lesen
              </More>
            </Inner>
          </ItemCard>
        )
      })}
    </CardGrid>
  )
}

const ItemCard = styled(CardWrapper)`
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition:
    box-shadow 0.18s ease,
    transform 0.18s ease,
    filter 0.18s ease;

  &:hover,
  &:focus-within {
    transform: translateY(-1px);
    filter: none;
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
`

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
  padding: ${({ theme }) => theme.spacing(1.5)};
`

const Title = styled(Typography)`
  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover,
  a:focus-visible {
    text-decoration: underline;
  }
`

const Meta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacingHalf(2)};
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.colors.surface[1]};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
`

const Excerpt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.main};
  opacity: 0.92;
`

const More = styled(Link)`
  justify-self: start;
  margin-top: ${({ theme }) => theme.spacingHalf(2)};
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  background: ${({ theme }) => theme.colors.surface[1]};
  color: ${({ theme }) => theme.colors.primary.main};
  transition:
    background 0.18s ease,
    transform 0.12s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surface.hover};
    transform: translateY(-1px);
    outline: none;
  }
`
