// src/app/blog/components/PostList.tsx
'use client'

import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import CardGrid from '@/components/card/CardGrid'
import CardWrapper from '@/components/Wrapper/CardWrapper'
import Typography from '@/styles/Typography'
import { PostMeta } from '@/lib/blog/types'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'

type Props = { posts: PostMeta[] }

export default function PostList({ posts }: Props) {
  if (!posts?.length) return <EmptyState>Keine Beiträge gefunden.</EmptyState>

  return (
    <CardGrid>
      {posts.map((m) => {
        const href =
          m.category === 'cases'
            ? `/cases/${m.slug}/`
            : `/blog/${m.category}/${m.slug}/`

        const cover = m.cover
          ? toPublicAssetUrl(m.category, m.dirName, m.cover)
          : null

        const isoDate = new Date(m.updated || m.date).toISOString().slice(0, 10)
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
                <time dateTime={isoDate}>{dateLabel}</time>
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

const EmptyState = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text.subtle};
  background: ${({ theme }) => theme.colors.surface[1]};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`

const ItemCard = styled(CardWrapper)`
  background: ${({ theme }) => theme.colors.surface.card};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition:
    box-shadow 0.18s ease,
    transform 0.18s ease;

  &:hover,
  &:focus-within {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
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
  background: ${({ theme }) => theme.colors.surface[2]};
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
    outline: none;
  }
`

const Meta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.colors.surface[1]};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
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
  margin-top: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  background: ${({ theme }) => theme.colors.surface[1]};
  color: ${({ theme }) => theme.colors.primary.main};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  transition:
    background 0.18s ease,
    transform 0.12s ease,
    box-shadow 0.18s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surface.hover};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
    outline: none;
  }
`
