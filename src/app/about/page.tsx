// src/app/about/page.tsx
import Image from 'next/image'
import Typography from '@/design/typography'
import BadgeGrid from '@/components/badge/BadgeGrid'
import ListComponent from '@/components/data-display/ListComponent'
import HighlightText from '@/components/utilities/HighlightText'
import HeroRecipe from '@/components/pagekit/recipes/HeroRecipe'
import SectionRecipe from '@/components/pagekit/recipes/SectionRecipe'
import BentoSection from '@/components/Wrapper/BentoSection'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import { resolveSkin } from '@/components/pagekit/skins'
import { withBase } from '@/lib/content/helpers/paths'

export const dynamic = 'force-static'

export default function AboutPage() {
  const skin = resolveSkin('about')

  return (
    <main>
      <HeroRecipe
        variant="split"
        title={
          <Typography variant="h1" as="h1" id="about-hero">
            Ich bin, was ich tue
          </Typography>
        }
        lead={
          <Typography as="p" variant="body" color="mutedFg" gutter={false}>
            Prozess, Wachstum und Natürlichkeit. Ich baue Interfaces und
            Systeme, die sich intuitiv und stromlinienförmig anfühlen.
          </Typography>
        }
        media={
          <Image
            src={withBase('/about_cover.webp')}
            alt="Kyon – ruhige, opake Flächen mit klarer Typografie"
            width={0}
            height={0}
            sizes="100vw"
            style={{ display: 'block', width: '100%', height: 'auto' }}
            priority
          />
        }
        container="wide"
        accent={skin.accentKey}
      />

      <SectionRecipe
        title={<Typography variant="h2">Ich in kurz</Typography>}
        surface="none"
        accent={skin.accentKey}
      >
        <Surface
          tone="elevated"
          radius="large"
          bordered
          padding="clamp(0.9rem, 2.2vw, 1.25rem)"
        >
          <BentoSection
            columns={3}
            min={skin.gridProps?.min}
            gap={2}
            layout={[{ col: 2 }, { col: 1 }]}
          >
            <div>
              <Typography as="p" variant="body">
                Ich bin Jonas{' '}
                <HighlightText>
                  (Dein Begleiter zwischen den Welten)
                </HighlightText>
                , Jahrgang 1989, Designer &amp; Entwickler in Niederbayern. Mich
                interessiert, wie Produkte Menschen wirklich helfen: mit klarer
                Informationsarchitektur, guter Sprache und pragmatischem Code.
                Ich arbeite gern iterativ – kleine Schritte, sichtbarer
                Fortschritt.
              </Typography>
            </div>
            <div>
              <BadgeGrid
                badges={[
                  { label: 'Design thinking- und Prozess' },
                  { label: 'UX/UI' },
                  { label: 'React/Next.js' },
                  { label: 'Java & Kotlin' },
                  { label: 'Python' },
                  { label: 'Accessibility' },
                ]}
                align="flex-start"
              />
            </div>
          </BentoSection>
        </Surface>
      </SectionRecipe>

      <SectionRecipe
        title={<Typography variant="h2">Arbeit &amp; Haltung</Typography>}
        surface="none"
        accent={skin.accentKey}
      >
        <Surface
          tone="neutral"
          radius="large"
          bordered
          padding="clamp(0.9rem, 2.2vw, 1.25rem)"
        >
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
                text: 'User centered Design, was sich gut anfühlt, barrierefrei ist und einem natürlichen Pfad folgt.',
              },
              {
                id: 'process',
                icon: '🪴',
                text: 'Organisch, intuitiv, authentisch.',
              },
            ]}
          />
        </Surface>
      </SectionRecipe>

      <SectionRecipe
        title={<Typography variant="h2">Womit ich arbeite</Typography>}
        surface="none"
        accent={skin.accentKey}
      >
        <Surface
          tone="elevated"
          radius="large"
          bordered
          padding="clamp(0.9rem, 2.2vw, 1.25rem)"
        >
          <BentoSection columns={2} min={skin.gridProps?.min} gap={2}>
            <div>
              <ListComponent
                title={<Typography variant="h3">Design</Typography>}
                mode="cards"
                align="center"
                items={[
                  {
                    id: 'uxui',
                    icon: '📐 Design thinking, User centered Design, User Journey, Storytelling',
                    text: '',
                  },
                  {
                    id: 'color',
                    icon: '🌈',
                    text: 'Farb- & Typo-Systeme, Kontrast & Lesbarkeit',
                  },
                  {
                    id: 'design',
                    icon: '🖼️',
                    text: 'IA, Wireframes, UI-Kits, Design-Tokens',
                  },
                ]}
              />
            </div>
            <div>
              <ListComponent
                title={<Typography variant="h3">Entwicklung</Typography>}
                mode="cards"
                align="center"
                items={[
                  {
                    id: 'react',
                    icon: '⚛️',
                    text: 'React, Next.js, Typescript, Java, Kotlin, Python',
                  },
                  { id: 'node', icon: '🔧', text: 'Node.js, CI/CD' },
                  {
                    id: 'tests',
                    icon: '✅',
                    text: '(TDD) Test Driven Development und (DDD) Domain Driven Design',
                  },
                ]}
              />
            </div>
          </BentoSection>
        </Surface>
      </SectionRecipe>

      <SectionRecipe
        title={<Typography variant="h2">Abseits vom Bildschirm</Typography>}
        surface="none"
        accent={skin.accentKey}
      >
        <Surface
          tone="neutral"
          radius="large"
          bordered
          padding="clamp(0.9rem, 2.2vw, 1.25rem)"
        >
          <Stack gap={1}>
            <Typography as="p" variant="body">
              Natur, Wandern und <em>ruhige Praxis</em>: Yoga, Qigong,
              Meditation. Außerdem Kochen &amp; Backen (gelernter Bäcker) und
              Fotografie – vor allem draußen. Wichtigster Titel:{' '}
              <HighlightText>Vater</HighlightText>.
            </Typography>
          </Stack>
        </Surface>
      </SectionRecipe>
    </main>
  )
}
