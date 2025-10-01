// src/components/blog/Card.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import Typography from '@/styles/Typography'

export type CardProps = {
  href: string
  title: string
  cover?: string | null
  date: string
  readingTime?: number
  excerpt?: string
  tag?: string
}

export default function Card({
  href,
  title,
  cover,
  date,
  readingTime,
  excerpt,
  tag,
}: CardProps) {
  const dateISO = new Date(date).toISOString()
  const dateLabel = new Date(date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return (
    <CardWrap>
      <CardLink href={href} aria-label={title}>
        {cover ? (
          <Thumb>
            <Image
              src={cover}
              alt={title}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 400px"
              style={{ objectFit: 'cover' }}
              priority={false}
            />
            {tag ? <Tag aria-hidden="true">{tag}</Tag> : null}
          </Thumb>
        ) : (
          <ThumbFallback aria-hidden="true" />
        )}

        <Content>
          <Title variant="h3" gutter={false}>
            {title}
          </Title>

          {excerpt ? <Excerpt color="text.subtle">{excerpt}</Excerpt> : null}

          <Meta>
            <time dateTime={dateISO}>{dateLabel}</time>
            {readingTime ? <span>· {readingTime} min</span> : null}
          </Meta>
        </Content>
      </CardLink>
    </CardWrap>
  )
}

const CardWrap = styled.article`
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  background: ${({ theme }) => theme.colors.surface.card};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:has(a:focus-visible),
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    &:hover {
      transform: none;
      box-shadow: ${({ theme }) => theme.boxShadow.xs};
    }
  }
`

const CardLink = styled(Link)`
  display: grid;
  grid-template-rows: auto 1fr;
  text-decoration: none;
  color: inherit;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent[2]}55 inset;
  }
`

const Thumb = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`

const ThumbFallback = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.gradients.rainbow};
`

const Tag = styled.span`
  position: absolute;
  bottom: 8px;
  left: 8px;
  padding: 0.35rem 0.6rem;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: 1;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  color: ${({ theme }) => theme.colors.text.inverse};
  background: ${({ theme }) => theme.colors.primary.base};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
`

const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
`

const Title = styled(Typography)`
  text-decoration: none;
`

const Excerpt = styled(Typography)`
  opacity: 0.9;
`

const Meta = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
  opacity: 0.8;
`
