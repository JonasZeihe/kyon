'use client'

import styled from 'styled-components'
import Image from 'next/image'
import Typography from '@/styles/Typography'
import BadgeGrid from '@/components/badge/BadgeGrid'
import type { PostMeta } from '@/lib/blog/types'

type Props = { post: PostMeta }

const assetPrefix =
  process.env.NEXT_PUBLIC_ASSET_PREFIX ||
  process.env.NEXT_PUBLIC_BASE_PATH ||
  ''

const toPublicAssetUrl = (
  category: string,
  dirName: string,
  filename: string
) => {
  const parts = [assetPrefix, 'content', category, dirName, filename]
    .filter(Boolean)
    .map((s) => s.replace(/(^\/+|\/+$)/g, ''))
    .join('/')
  return '/' + parts
}

export default function PostHeader({ post }: Props) {
  const cover = post.cover
    ? toPublicAssetUrl(post.category, post.dirName, post.cover)
    : null
  const badges = (post.tags || []).map((t) => ({ label: t }))

  const dateObj = post.date ? new Date(post.date as unknown as string) : null
  const validDate = dateObj && !isNaN(dateObj.getTime()) ? dateObj : null
  const dateISO = validDate ? validDate.toISOString() : ''
  const dateLabel = validDate
    ? validDate.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <Wrap>
      {cover ? (
        <Hero>
          <HeroMedia>
            <Image
              src={cover}
              alt={post.title}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 90vw, 1200px"
              priority
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

        <Meta>
          {dateLabel && <time dateTime={dateISO}>{dateLabel}</time>}
          {post.readingTime ? <span>{post.readingTime} min</span> : null}
        </Meta>

        {badges.length ? (
          <Badges>
            <BadgeGrid badges={badges} />
          </Badges>
        ) : null}

        {post.excerpt ? <Excerpt>{post.excerpt}</Excerpt> : null}
      </Header>
    </Wrap>
  )
}

const Wrap = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  max-width: 72rem;
  margin-inline: auto;
  padding: ${({ theme }) => theme.spacing(2)};
`

const Hero = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  background: ${({ theme }) => theme.gradients.hero};
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
  background:
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.16) 0%,
      rgba(0, 0, 0, 0.08) 40%,
      rgba(0, 0, 0, 0) 70%
    ),
    radial-gradient(
      80% 60% at 50% 100%,
      rgba(0, 0, 0, 0.18) 0%,
      rgba(0, 0, 0, 0) 62%
    );
  pointer-events: none;
`

const HeroBar = styled.div`
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 10px;
  background: ${({ theme }) => theme.gradients.backgroundPrimary};
  opacity: 0.9;
`

const HeroPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 21 / 9;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.gradients.backgroundSurface};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
`

const Header = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

const Title = styled.div`
  max-width: 52rem;
  letter-spacing: -0.01em;
`

const Meta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacingHalf(2)};
  padding: ${({ theme }) => theme.spacingHalf(2)}
    ${({ theme }) => theme.spacing(1.5)};
  width: fit-content;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.colors.surface.card};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};

  & > span::before {
    content: '•';
    margin: 0 ${({ theme }) => theme.spacingHalf(2)};
    opacity: 0.6;
  }
`

const Badges = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacingHalf(2)} ${({ theme }) => theme.spacing(1)};
`

const Excerpt = styled.p`
  max-width: 70ch;
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.subtle};
`
