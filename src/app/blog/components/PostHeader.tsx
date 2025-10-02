// src/app/blog/components/PostHeader.tsx
'use client'

import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import Typography from '@/styles/Typography'
import Badge from '@/components/badge/Badge'
import type { PostMeta } from '@/lib/blog/types'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'

type Props = { post: PostMeta }

export default function PostHeader({ post }: Props) {
  const cover = post.cover
    ? toPublicAssetUrl(post.category, post.dirName, post.cover)
    : null

  const tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : []

  const published = post.date ? new Date(post.date) : null
  const updated = post.updated ? new Date(post.updated) : null
  const validPub = published && !isNaN(published.getTime()) ? published : null
  const validUpd = updated && !isNaN(updated.getTime()) ? updated : null
  const showUpd =
    validPub && validUpd ? validUpd.getTime() > validPub.getTime() : !!validUpd

  const fmt = (d: Date) =>
    d.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

  return (
    <Wrap data-post-header>
      {cover ? (
        <Hero>
          <HeroMedia>
            <Image
              src={cover}
              alt={post.title}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 90vw, 1200px"
              priority
              fetchPriority="high"
              style={{ objectFit: 'cover' }}
            />
            <HeroShade />
          </HeroMedia>
          <HeroBar />
        </Hero>
      ) : (
        <HeroPlaceholder />
      )}

      <Header>
        <Title>
          <Typography variant="h1" align="left">
            {post.title}
          </Typography>
        </Title>

        <Meta aria-label="Artikel-Metadaten">
          {validPub ? (
            <time dateTime={validPub.toISOString()}>
              {showUpd ? 'Veröffentlicht am' : 'Am'} {fmt(validPub)}
            </time>
          ) : null}
          {showUpd && validUpd ? (
            <span aria-label="Aktualisiert am">
              · Aktualisiert:{' '}
              <time dateTime={validUpd.toISOString()}>{fmt(validUpd)}</time>
            </span>
          ) : null}
          {post.readingTime ? <span>· ⏱️ {post.readingTime} min</span> : null}
        </Meta>

        {tags.length > 0 ? (
          <TagsWrap aria-label="Tags">
            {tags.map((t) => (
              <TagLink
                key={t}
                href={{ pathname: '/blog', query: { tag: t } }}
                title={`Beiträge mit „${t}“ anzeigen`}
              >
                <Badge label={`#${t}`} pill style={{ cursor: 'pointer' }} />
              </TagLink>
            ))}
          </TagsWrap>
        ) : null}

        {post.excerpt ? <Excerpt>{post.excerpt}</Excerpt> : null}
      </Header>
    </Wrap>
  )
}

const Wrap = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};
  max-width: 72rem;
  margin-inline: auto;
  padding: 0;
`

const Hero = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  background: ${({ theme }) => theme.colors.surface.card};
`

const HeroMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 21 / 9;
  background: ${({ theme }) => theme.colors.surface.card};
`

const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.12) 0%,
    rgba(0, 0, 0, 0.07) 38%,
    rgba(0, 0, 0, 0.02) 70%
  );
  pointer-events: none;
`

const HeroBar = styled.div`
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 8px;
  background: ${({ theme }) => theme.gradients.rainbow};
  opacity: 0.9;
`

const HeroPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 21 / 9;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.colors.surface.card};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
`

const Header = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const Title = styled.div`
  max-width: 52rem;
  letter-spacing: -0.01em;
`

const Meta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacingHalf(2)};
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1.2)}`};
  width: fit-content;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.colors.surface[1]};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
  time {
    color: inherit;
  }
`

const TagsWrap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacingHalf(2)} ${({ theme }) => theme.spacing(1)};
`

const TagLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.main};
    outline-offset: 2px;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent[2]}55;
    border-radius: ${({ theme }) => theme.borderRadius.pill};
  }
`

const Excerpt = styled.p`
  max-width: 70ch;
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.main};
  opacity: 0.92;
`
