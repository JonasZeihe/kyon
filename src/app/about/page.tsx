// src/app/about/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'

export const dynamic = 'force-static'

export default function AboutPage() {
  return (
    <main>
      <section
        style={{
          background: 'var(--about-hero-bg, transparent)',
          borderBottom: '1px solid var(--about-hero-br, rgba(0,0,0,0.06))',
        }}
      >
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            padding: '2rem 1rem 1rem',
            display: 'grid',
            gap: '1.25rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1.25rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '21/9',
                borderRadius: '0.9rem',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/assets/about/hero.webp"
                alt="Über mich"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <Typography variant="h1" align="left" color="primary.main">
                Wer &amp; Warum
              </Typography>
              <Typography align="left" color="text.subtle">
                Prozess statt Pose. Natürlichkeit vor Methode. Wofür Kyon steht
                – und wer dahinter steckt.
              </Typography>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper $spacious>
        <div
          style={{
            display: 'grid',
            gap: '1.4rem',
            maxWidth: '64rem',
            margin: '0 auto',
          }}
        >
          <Typography variant="h2" align="left">
            Intention
          </Typography>
          <Typography>
            Kyon ist mein Raum für klare Gedanken, scharfes Handwerk und
            ehrliches Produktdenken. Keine Show, sondern Substanz: Systeme, die
            tragfähig sind – Design, das Haltung hat – und Code, der morgen noch
            lesbar ist.
          </Typography>
          <Typography>
            Die Leitfrage: <em>Was hilft Menschen wirklich?</em> Daraus
            entstehen Artikel, Notizen, kleine Fallstudien und Bausteine, die
            sich wiederverwenden lassen.
          </Typography>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div
          style={{
            display: 'grid',
            gap: '1.4rem',
            maxWidth: '64rem',
            margin: '0 auto',
          }}
        >
          <Typography variant="h2" align="left">
            Über mich
          </Typography>
          <Typography>
            Ich bin Jonas Zeihe – Produktmensch, Designer und Entwickler. Ich
            mag klare Kanten, opake Flächen, kräftige Farben und eine
            Typografie, die trägt. Meine Arbeit verbindet Systematik mit
            Intuition: erst Prinzipien, dann Politur.
          </Typography>
          <ul className="numbered-summary">
            <li>
              <div>Designsysteme &amp; Frontend-Architektur</div>
            </li>
            <li>
              <div>UX Writing, Informationsarchitektur, Flow</div>
            </li>
            <li>
              <div>MD/MDX-Content, Publishing-Pipelines, SEO-Basics</div>
            </li>
          </ul>
          <Typography>
            Schreib mir gern:{' '}
            <Link href="mailto:jonaszeihe@gmail.com">jonaszeihe@gmail.com</Link>
          </Typography>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div
          style={{
            display: 'grid',
            gap: '0.9rem',
            maxWidth: '64rem',
            margin: '0 auto',
          }}
        >
          <Typography variant="h2" align="left">
            Was dich hier erwartet
          </Typography>
          <ul>
            <li>Analysen und Hands-on-Guides, schnell anwendbar</li>
            <li>Case-Notes aus echten Projekten</li>
            <li>Komponenten, Patterns, kleine Tools</li>
          </ul>
          <Typography>
            Starte hier: <Link href="/blog">Blog</Link> ·{' '}
            <Link href="/search">Suche</Link>
          </Typography>
        </div>
      </SectionWrapper>
    </main>
  )
}
