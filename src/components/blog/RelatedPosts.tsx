// src/components/blog/RelatedPosts.tsx
'use client'

import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import Typography from '@/styles/Typography'
import CardWrapper from '@/components/Wrapper/CardWrapper'
import type { PostMeta } from '@/lib/blog/types'

type Props = {
  posts: PostMeta[]
}

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

export default function RelatedPosts({ posts }: Props) {
  if (!posts?.length) return null
  return (
    <Wrap>
      <Typography variant="h2" align="center" color="primary.main">
        Ähnliche Beiträge
      </Typography>
      <Grid>
        {posts.map((m) => {
          const href = `/blog/${m.category}/${m.slug}`
          const cover = m.cover
            ? toPublicAssetUrl(m.category, m.dirName, m.cover)
            : null
          return (
            <CardWrapper key={m.id}>
              <CardInner>
                <ThumbWrap>
                  <Link href={href} aria-label={m.title}>
                    {cover ? (
                      <Image
                        src={cover}
                        alt={m.title}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        priority={false}
                      />
                    ) : (
                      <ThumbFallback />
                    )}
                  </Link>
                </ThumbWrap>
                <Content>
                  <Typography variant="h3" gutter={false}>
                    <Link href={href}>{m.title}</Link>
                  </Typography>
                  <Meta>
                    <span>{m.date}</span>
                    {m.readingTime ? <span>· {m.readingTime} min</span> : null}
                  </Meta>
                </Content>
              </CardInner>
            </CardWrapper>
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

const CardInner = styled.article`
  display: grid;
  grid-template-rows: auto 1fr;
`

const ThumbWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.large};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.colors.surface[2]};
`

const ThumbFallback = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.gradients.backgroundSecondary};
`

const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
`

const Meta = styled.div`
  opacity: 0.8;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  display: flex;
  gap: 0.5rem;
  align-items: center;
`
