// --- src/app/(site)/page.tsx ---
import Image from 'next/image'
import Link from 'next/link'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import PostList from '@/app/blog/components/PostList'
import { getAllPostMeta } from '@/lib/blog/indexer'
import { POSTS_PER_PAGE } from '@/lib/blog/constants'
import styled from 'styled-components'

export const dynamic = 'force-static'

export default function HomePage() {
  const all = getAllPostMeta()
  const items = all.slice(0, POSTS_PER_PAGE)

  return (
    <>
      <HeroSection>
        <HeroContent>
          <div>
            <Typography variant="h1" align="left" color="text.main">
              Prozess statt Pose.
            </Typography>
            <Typography variant="subhead" align="left" color="text.subtle">
              Natürlichkeit vor Methode. Ein technischer Blog mit Haltung –
              klar, opak, präzise.
            </Typography>
            <HeroActions>
              <HeroLink href="/blog" $primary>
                Neueste Beiträge
              </HeroLink>
              <HeroLink href="/about">Purpose & About</HeroLink>
            </HeroActions>
          </div>
          <HeroImageWrapper>
            <Image
              src="/assets/hero/home-hero.webp"
              alt="Kyon – klares, farbstarkes Layout"
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 600px"
              priority
              style={{ objectFit: 'cover' }}
            />
          </HeroImageWrapper>
        </HeroContent>
      </HeroSection>

      <SectionWrapper>
        <Typography variant="h2" align="left" color="text.main">
          Neueste Beiträge
        </Typography>
        {items.length === 0 ? (
          <Typography>Keine Beiträge gefunden.</Typography>
        ) : (
          <PostList posts={items} />
        )}
      </SectionWrapper>
    </>
  )
}

const HeroSection = styled(SectionWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const HeroActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`

const HeroLink = styled(Link)<{ $primary?: boolean }>`
  display: inline-block;
  padding: 0.7rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  box-shadow: ${({ theme, $primary }) =>
    $primary ? theme.boxShadow.sm : 'none'};
  background: ${({ theme, $primary }) =>
    $primary
      ? `linear-gradient(115deg, ${theme.colors.primary.main}, ${theme.colors.accent.main})`
      : theme.colors.surface.card};
  color: ${({ theme, $primary }) =>
    $primary ? theme.colors.text.inverse : theme.colors.text.main};
  border: ${({ theme, $primary }) =>
    $primary ? 'none' : `1px solid ${theme.colors.neutral.border}`};
  transition: all 0.22s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    outline: none;
  }
`

const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  background: ${({ theme }) => theme.colors.surface[2]};
`
