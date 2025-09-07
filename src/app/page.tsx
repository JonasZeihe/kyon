// src/app/page.tsx
'use client'

import { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MeshGradientBackground from '@/components/meshedgradientbackground/MeshGradientBackground'

import Typography from '@/styles/Typography'
import Button from '@/components/button/Button'
import ButtonGrid from '@/components/button/ButtonGrid'
import BadgeGrid from '@/components/badge/BadgeGrid'
import CardGrid from '@/components/card/CardGrid'
import FeatureCard from '@/components/card/FeatureCard'
import ProjectCard from '@/components/card/ProjectCard'
import ListComponent from '@/components/data-display/ListComponent'
import MediaDisplay from '@/components/data-display/MediaDisplay'
import HeroWrapper from '@/components/Wrapper/HeroWrapper'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import PageWrapper from '@/components/Wrapper/PageWrapper'
import CardWrapper from '@/components/Wrapper/CardWrapper'

export default function Page() {
  const navSections = useMemo(
    () => [
      { id: 'intro', label: 'Einführung' },
      { id: 'typography', label: 'Typografie' },
      { id: 'colors', label: 'Farben' },
      { id: 'buttons', label: 'Buttons' },
      { id: 'badges', label: 'Badges' },
      { id: 'cards', label: 'Cards' },
      { id: 'lists', label: 'Listen' },
      { id: 'media', label: 'Media/Lightbox' },
    ],
    []
  )

  const theme = useTheme()

  const sampleBadges = [
    { badgeKey: 'ux', label: 'UX' },
    { badgeKey: 'ui', label: 'UI' },
    { badgeKey: 'react', label: 'React' },
    { badgeKey: 'typescript', label: 'TypeScript' },
  ]

  const media = [
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
      alt: 'Sample Image 1',
      caption: 'Klick zum Zoomen · Swipe/Arrows zum Navigieren',
    },
    {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
      alt: 'Sample Image 2',
      caption: 'Light/Dark kompatibel',
    },
    {
      type: 'video' as const,
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      alt: 'Sample Video',
      caption: 'Video mit Captions-Slot',
      trackSrc: '',
      trackLang: 'en',
    },
  ]

  return (
    <>
      <MeshGradientBackground />
      <Header navSections={navSections} />
      <Main>
        <PageWrapper>
          <SectionWrapper id="intro" $spacious>
            <HeroWrapper $spacious>
              <Typography variant="h1" color="primary.main" align="center">
                kyon Designsystem Showcase
              </Typography>
              <Typography align="center">
                Prozess statt Pose. Natürlichkeit vor Methode.
              </Typography>
              <ButtonGrid>
                <Button variant="primary">Get Started</Button>
                <Button variant="success">Doku</Button>
              </ButtonGrid>
            </HeroWrapper>
          </SectionWrapper>

          <SectionWrapper id="typography">
            <Typography variant="h2" color="accent.main" align="center">
              Typografie
            </Typography>
            <CardGrid>
              <CardWrapper>
                <Pad>
                  <Typography variant="h1">Überschrift H1</Typography>
                  <Typography variant="h2">Überschrift H2</Typography>
                  <Typography variant="h3">Überschrift H3</Typography>
                  <Typography variant="subhead">Subhead</Typography>
                  <Typography>Body Copy – Lesefluss und Rhythmus.</Typography>
                  <Typography variant="caption">Caption · Meta-Info</Typography>
                </Pad>
              </CardWrapper>
              <CardWrapper>
                <Pad>
                  <Typography variant="h2" color="secondary.main">
                    Farbige Varianten
                  </Typography>
                  <Typography color="primary.main">Primary Text</Typography>
                  <Typography color="secondary.main">Secondary Text</Typography>
                  <Typography color="accent.main">Accent Text</Typography>
                  <Typography color="highlight.main">Highlight Text</Typography>
                </Pad>
              </CardWrapper>
            </CardGrid>
          </SectionWrapper>

          <SectionWrapper id="colors">
            <Typography variant="h2" color="accent.main" align="center">
              Farben
            </Typography>
            <PaletteGrid>
              {(['primary', 'secondary', 'accent', 'highlight'] as const).map(
                (group) => (
                  <PaletteColumn key={group}>
                    <Typography variant="subhead" color={`${group}.main`}>
                      {group}
                    </Typography>
                    <SwatchRow>
                      {['0', '1', '2', 'main', '4', '5', '6'].map((k) => {
                        const val = (theme as any)?.colors?.[group]?.[k]
                        return (
                          <Swatch key={`${group}-${k}`}>
                            <ColorBox style={{ background: val }} />
                            <Label>{k}</Label>
                          </Swatch>
                        )
                      })}
                    </SwatchRow>
                  </PaletteColumn>
                )
              )}
              <PaletteColumn>
                <Typography variant="subhead" color="primary.main">
                  Surface
                </Typography>
                <SwatchRow>
                  {['0', '1', '2', 'main', '4', 'card', 'hover'].map((k) => {
                    const val = (theme as any)?.colors?.surface?.[k]
                    return (
                      <Swatch key={`surface-${k}`}>
                        <ColorBox style={{ background: val }} />
                        <Label>{k}</Label>
                      </Swatch>
                    )
                  })}
                </SwatchRow>
              </PaletteColumn>
            </PaletteGrid>
          </SectionWrapper>

          <SectionWrapper id="buttons">
            <Typography variant="h2" color="accent.main" align="center">
              Buttons
            </Typography>
            <ButtonGrid>
              <Button variant="primary">Primary</Button>
              <Button variant="github">GitHub</Button>
              <Button variant="casestudy">Case Study</Button>
              <Button variant="prototype">Prototype</Button>
              <Button variant="success">Success</Button>
            </ButtonGrid>
          </SectionWrapper>

          <SectionWrapper id="badges">
            <Typography variant="h2" color="accent.main" align="center">
              Badges
            </Typography>
            <BadgeGrid
              badges={sampleBadges}
              align="center"
              gapSize={1.2}
              marginSize={1}
            />
          </SectionWrapper>

          <SectionWrapper id="cards" $spacious>
            <Typography variant="h2" color="accent.main" align="center">
              Cards
            </Typography>
            <CardGrid>
              <FeatureCard
                title="Feature Highlight"
                description="Komponierte Wrapper, konsistente Abstände und anpassbare Gradients."
                badges={[]}
                targetId="media"
                gradient="backgroundPrimary"
                buttonText="Zum Media-Beispiel"
              />
              {[
                {
                  image:
                    'https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1200&auto=format&fit=crop',
                  name: 'Projekt A',
                  description:
                    'Ein modernes Interface mit responsiven Komponenten.',
                  buttons: [
                    {
                      text: 'GitHub',
                      link: 'https://github.com',
                      variant: 'github',
                    },
                    {
                      text: 'Case Study',
                      link: 'https://example.com',
                      variant: 'casestudy',
                    },
                  ],
                },
                {
                  image:
                    'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop',
                  name: 'Projekt B',
                  description: 'Designsystem mit Fokus auf Zugänglichkeit.',
                  buttons: [
                    {
                      text: 'Prototype',
                      link: 'https://example.com',
                      variant: 'prototype',
                    },
                  ],
                },
              ].map((p) => (
                <ProjectCard key={p.name} project={p} onOpen={() => {}} />
              ))}
            </CardGrid>
          </SectionWrapper>

          <SectionWrapper id="lists">
            <Typography variant="h2" color="accent.main" align="center">
              Listen
            </Typography>
            <CardWrapper>
              <Pad>
                <ListComponent
                  items={[
                    { id: 'a', icon: '✨', text: 'Konsistente Typo-Skala' },
                    { id: 'b', icon: '🧩', text: 'Theming mit Light/Dark' },
                    {
                      id: 'c',
                      icon: '⚡',
                      text: 'Schnelle, sanfte Transitions',
                    },
                  ]}
                />
              </Pad>
            </CardWrapper>
          </SectionWrapper>

          <SectionWrapper id="media" $spacious>
            <Typography variant="h2" color="accent.main" align="center">
              Media & Lightbox
            </Typography>
            <MediaDisplay media={media} variant="medium" />
          </SectionWrapper>
        </PageWrapper>
      </Main>
      <Footer />
    </>
  )
}

const Main = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
`

const Pad = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.2)};
`

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing(2)};
`

const PaletteColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => (theme as any).colors.surface.card};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  padding: ${({ theme }) => theme.spacing(1.5)};
`

const SwatchRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing(1)};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Swatch = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
  align-items: center;
  text-align: center;
`

const ColorBox = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
`

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => (theme as any).colors.text.subtle};
`
