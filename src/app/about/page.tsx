// src/app/about/page.tsx
import Image from 'next/image'
import Typography from '@/styles/Typography'
import BadgeGrid from '@/components/badge/BadgeGrid'
import ListComponent from '@/components/data-display/ListComponent'
import BentoSection from '@/components/Wrapper/BentoSection'
import HighlightText from '@/components/utilities/HighlightText'
import HeroRecipe from '@/components/pagekit/recipes/HeroRecipe'
import SectionRecipe from '@/components/pagekit/recipes/SectionRecipe'
import Spotlight from '@/components/pagekit/motifs/Spotlight'

export const dynamic = 'force-static'

export default function AboutPage() {
  return (
    <main>
      <HeroRecipe
        kicker={
          <Typography as="p" variant="caption" color="text.subtle">
            Über
          </Typography>
        }
        title={
          <Typography variant="h1" as="h1" id="about-hero">
            Wer &amp; warum
          </Typography>
        }
        lead={
          <Typography as="p" variant="body" color="text.subtle" gutter={false}>
            Prozess statt Pose. Natürlichkeit vor Methode. Ich baue Interfaces
            und Systeme, die sich ruhig anfühlen und lange halten.
          </Typography>
        }
        media={
          <Image
            src="/og-default.png"
            alt="Kyon – ruhige, opake Flächen mit klarer Typografie"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ objectFit: 'cover' }}
          />
        }
        container="wide"
        motif={Spotlight.hero.motif}
        accent="accent"
      />

      <SectionRecipe
        title={
          <Typography variant="h2" as="h2">
            Ich in kurz
          </Typography>
        }
        rhythm="default"
        surface="subtle"
        motif={Spotlight.section.motif}
      >
        <BentoSection columns="auto" padY>
          <div>
            <Typography as="p" variant="body">
              Ich bin <HighlightText>Jonas Zeihe</HighlightText> (1989),
              Designer &amp; Entwickler in Niederbayern. Mich interessiert, wie
              Produkte Menschen wirklich helfen: mit klarer
              Informationsarchitektur, guter Sprache und pragmatischem Code. Ich
              arbeite gern iterativ – kleine Schritte, sichtbarer Fortschritt.
            </Typography>
          </div>
          <div>
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
          </div>
        </BentoSection>
      </SectionRecipe>

      <SectionRecipe
        title={
          <Typography variant="h2" as="h2">
            Arbeit &amp; Haltung
          </Typography>
        }
        rhythm="default"
        surface="subtle"
      >
        <BentoSection columns="auto" padY>
          <div>
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
          </div>
        </BentoSection>
      </SectionRecipe>

      <SectionRecipe
        title={
          <Typography variant="h2" as="h2">
            Womit ich arbeite
          </Typography>
        }
        rhythm="default"
        surface="subtle"
      >
        <BentoSection columns={2} min="20rem" padY>
          <div>
            <Typography variant="h3" as="h3">
              Design
            </Typography>
            <ul>
              <li>IA, Wireframes, UI-Kits, Design-Tokens</li>
              <li>Farb- &amp; Typo-Systeme, Kontrast &amp; Lesbarkeit</li>
              <li>Content mit MD/MDX, Bildbearbeitung</li>
            </ul>
          </div>
          <div>
            <Typography variant="h3" as="h3">
              Entwicklung
            </Typography>
            <ul>
              <li>React, Next.js, TypeScript</li>
              <li>Node-Basics, einfache Pipelines</li>
              <li>Tests &amp; Zugänglichkeit im Alltag</li>
            </ul>
          </div>
        </BentoSection>
      </SectionRecipe>

      <SectionRecipe
        title={
          <Typography variant="h2" as="h2">
            Abseits vom Bildschirm
          </Typography>
        }
        rhythm="default"
        surface="subtle"
      >
        <BentoSection columns="auto" padY>
          <div>
            <Typography as="p" variant="body">
              Natur, Wandern und <em>ruhige Praxis</em>: Yoga, Qigong,
              Meditation. Außerdem Kochen &amp; Backen (gelernter Bäcker) und
              Fotografie – vor allem draußen. Wichtigster Titel:{' '}
              <HighlightText>Vater</HighlightText>.
            </Typography>
          </div>
        </BentoSection>
      </SectionRecipe>
    </main>
  )
}
