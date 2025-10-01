// src/app/about/page.tsx
'use client'

import Image from 'next/image'
import styled from 'styled-components'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import LumenWrapper from '@/components/Wrapper/LumenWrapper'
import Typography from '@/styles/Typography'
import BadgeGrid from '@/components/badge/BadgeGrid'
import ListComponent from '@/components/data-display/ListComponent'

export const dynamic = 'force-static'

export default function AboutPage() {
  return (
    <main>
      <SectionWrapper $spacious>
        <LumenWrapper as="section" variant="subtle" radius="large">
          <HeroGrid>
            <HeroMedia>
              <Image
                src="/og-default.png"
                alt="Kyon – ruhige, opake Flächen mit klarer Typografie"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                style={{ objectFit: 'cover' }}
              />
            </HeroMedia>
            <HeroCopy>
              <HeroKicker>Über</HeroKicker>
              <HeroTitle>Wer &amp; warum</HeroTitle>
              <p>
                Prozess statt Pose. Natürlichkeit vor Methode. Ich baue
                Interfaces und Systeme, die sich ruhig anfühlen und lange
                halten.
              </p>
            </HeroCopy>
          </HeroGrid>
        </LumenWrapper>
      </SectionWrapper>

      <SectionWrapper $spacious>
        <LumenWrapper as="section" variant="subtle" radius="large">
          <Narrow>
            <Typography variant="h2">Ich in kurz</Typography>
            <p>
              Ich bin <strong>Jonas Zeihe</strong> (1989), Designer &amp;
              Entwickler in Niederbayern. Mich interessiert, wie Produkte
              Menschen wirklich helfen: mit klarer Informationsarchitektur,
              guter Sprache und pragmatischem Code. Ich arbeite gern iterativ –
              kleine Schritte, sichtbarer Fortschritt.
            </p>
            <BadgeGrid
              badges={[
                { label: 'UX' },
                { label: 'UI' },
                { label: 'React' },
                { label: 'TypeScript' },
                { label: 'Java' },
                { label: 'Python' },
                { label: 'MD/MDX' },
                { label: 'Accessibility' },
              ]}
              align="flex-start"
            />
          </Narrow>
        </LumenWrapper>
      </SectionWrapper>

      <SectionWrapper $spacious>
        <LumenWrapper as="section" variant="subtle" radius="large">
          <Narrow>
            <Typography variant="h2">Arbeit &amp; Haltung</Typography>
            <ListComponent
              items={[
                {
                  id: 'ia',
                  icon: '🧭',
                  text: 'Klare Informationsarchitektur vor Effekten. Erst Struktur, dann Politur.',
                },
                {
                  id: 'copy',
                  icon: '✍️',
                  text: 'Sprache als Interface: Labels, Microcopy und Lesefluss entscheiden über Tempo.',
                },
                {
                  id: 'tokens',
                  icon: '🎛️',
                  text: 'Token-getriebenes UI (Farbe, Radius, Shadow, Motion) reduziert Drift und Wartung.',
                },
                {
                  id: 'code',
                  icon: '⚙️',
                  text: 'Bevorzugt React/TypeScript. Lesbarer Code, kleine Komponenten, wenig Magie.',
                },
                {
                  id: 'process',
                  icon: '🪴',
                  text: 'Natürlicher Prozess: beobachten, reduzieren, testen – wiederholen.',
                },
              ]}
            />
          </Narrow>
        </LumenWrapper>
      </SectionWrapper>

      <SectionWrapper $spacious>
        <LumenWrapper as="section" variant="subtle" radius="large">
          <Narrow>
            <Typography variant="h2">Womit ich arbeite</Typography>
            <TwoCol>
              <div>
                <Subhead>Design</Subhead>
                <ul>
                  <li>IA, Wireframes, UI-Kits, Design-Tokens</li>
                  <li>Farb- &amp; Typo-Systeme, Kontrast &amp; Lesbarkeit</li>
                  <li>Content mit MD/MDX, Bildbearbeitung</li>
                </ul>
              </div>
              <div>
                <Subhead>Entwicklung</Subhead>
                <ul>
                  <li>React, Next.js, TypeScript</li>
                  <li>Node-Basics, einfache Pipelines</li>
                  <li>Tests &amp; Zugänglichkeit im Alltag</li>
                </ul>
              </div>
            </TwoCol>
          </Narrow>
        </LumenWrapper>
      </SectionWrapper>

      <SectionWrapper $spacious>
        <LumenWrapper as="section" variant="subtle" radius="large">
          <Narrow>
            <Typography variant="h2">Abseits vom Bildschirm</Typography>
            <p>
              Natur, Wandern und <em>ruhige Praxis</em>: Yoga, Qigong,
              Meditation. Außerdem Kochen &amp; Backen (gelernter Bäcker) und
              Fotografie – vor allem draußen. Wichtigster Titel:{' '}
              <strong>Vater</strong>.
            </p>
          </Narrow>
        </LumenWrapper>
      </SectionWrapper>
    </main>
  )
}

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(2)};
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(3)};
  }
`

const HeroMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 21 / 9;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface[2]};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    aspect-ratio: 16 / 9;
  }
`

const HeroCopy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.subtle};
  }
`

const HeroKicker = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
`

const HeroTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  background: ${({ theme }) => theme.gradients.rainbow};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Narrow = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};
`

const TwoCol = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
  ul {
    margin: 0.25rem 0 0 1.1rem;
  }
`

const Subhead = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
`
