// src/app/(site)/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import LumenWrapper from '@/components/Wrapper/LumenWrapper'
import AutoGrid from '@/components/Wrapper/AutoGrid'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import Typography from '@/styles/Typography'
import Card from '@/components/blog/Card'
import { toPublicAssetUrl } from '@/lib/content/helpers/paths'

export const dynamic = 'force-static'

export default function HomePage() {
  const all = getAllPostMeta().filter((p) => !p.draft)
  const latest = all.slice(0, POSTS_PER_PAGE)

  const tagCounts = new Map<string, number>()
  for (const m of all)
    for (const t of m.tags || []) tagCounts.set(t, (tagCounts.get(t) || 0) + 1)
  const topTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16)
    .map(([tag]) => tag)

  return (
    <main>
      <SectionWrapper $spacious>
        <LumenWrapper as="header" variant="subtle" radius="large">
          <div style={{ textAlign: 'center' }}>
            <GradientTitle>
              Prozess statt Pose <span>·</span> Natürlichkeit vor Methode
            </GradientTitle>
            <Subtitle>
              Ein technischer Blog mit Haltung – klar, präzise, praxisnah.
            </Subtitle>
            <CTAGroup>
              <CTA href="/blog" data-variant="primary">
                Neueste Beiträge
              </CTA>
              <CTA href="/about">Purpose & About</CTA>
            </CTAGroup>
          </div>
          <HeroVisual>
            <Image
              src="/og-default.png"
              alt="Kyon – klare, ruhige Oberfläche"
              fill
              sizes="(max-width: 768px) 100vw, 960px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </HeroVisual>
        </LumenWrapper>
      </SectionWrapper>

      <SectionWrapper $spacious>
        <LumenWrapper as="section" variant="subtle" radius="large">
          <Typography variant="h2" align="left" gutter>
            Neu & lesenswert
          </Typography>
          {latest.length === 0 ? (
            <EmptyHint>Keine Beiträge gefunden.</EmptyHint>
          ) : (
            <AutoGrid $min="260px" $gap={1.5}>
              {latest.map((p) => {
                const href = `/blog/${p.category}/${p.slug}`
                const cover = p.cover
                  ? toPublicAssetUrl(p.category, p.dirName, p.cover)
                  : undefined
                return (
                  <Card
                    key={p.id}
                    href={href}
                    title={p.title}
                    cover={cover}
                    date={p.updated || p.date}
                    readingTime={p.readingTime}
                    excerpt={p.excerpt}
                    tag={p.category}
                  />
                )
              })}
            </AutoGrid>
          )}
        </LumenWrapper>
      </SectionWrapper>

      <SectionWrapper $spacious>
        <LumenWrapper as="section" variant="subtle" radius="large">
          <Typography variant="h2" align="left" gutter>
            Themen
          </Typography>
          <AutoGrid $min="10rem" $gap={1.2} $columns="auto">
            {topTags.length === 0 ? (
              <EmptyHint>Keine Tags vorhanden.</EmptyHint>
            ) : (
              topTags.map((t) => (
                <TagLink key={t} href={`/tags/${encodeURIComponent(t)}`}>
                  #{t}
                </TagLink>
              ))
            )}
          </AutoGrid>
        </LumenWrapper>
      </SectionWrapper>
    </main>
  )
}

const GradientTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  background: ${({ theme }) => theme.gradients.rainbow};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  span {
    opacity: 0.4;
  }
`

const Subtitle = styled.p`
  margin: 0.5rem 0 1rem 0;
  color: ${({ theme }) => theme.colors.text.subtle};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
`

const CTAGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(1)};
`

const CTA = styled(Link)`
  display: inline-block;
  padding: 0.65rem 0.95rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  background: ${({ theme }) => theme.colors.surface.card};
  color: ${({ theme }) => theme.colors.text.main};
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
  &[data-variant='primary'] {
    border: none;
    background: ${({ theme }) => theme.gradients.primary};
    color: ${({ theme }) => theme.colors.text.inverse};
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    outline: none;
  }
`

const HeroVisual = styled.div`
  position: relative;
  margin-top: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  background: ${({ theme }) => theme.colors.surface[2]};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
`

const TagLink = styled(Link)`
  display: inline-block;
  width: 100%;
  text-decoration: none;
  padding: 0.55rem 0.75rem;
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.surface[1]};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  color: ${({ theme }) => theme.colors.text.main};
  transition:
    background 0.15s ease,
    transform 0.12s ease,
    box-shadow 0.18s ease;
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surface.hover};
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
    transform: translateY(-1px);
    outline: none;
  }
`

const EmptyHint = styled(Typography)`
  opacity: 0.8;
  text-align: center;
`
