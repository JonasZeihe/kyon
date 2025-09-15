// src/app/impressum/page.tsx
import Link from 'next/link'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'

export const dynamic = 'force-static'

export default function ImpressumPage() {
  return (
    <main>
      <SectionWrapper $spacious>
        <div
          style={{
            maxWidth: '64rem',
            margin: '0 auto',
            display: 'grid',
            gap: '1.25rem',
          }}
        >
          <Typography variant="h1" align="left" color="primary.main">
            Impressum
          </Typography>

          <section>
            <Typography variant="h3" align="left">
              Angaben gemäß § 5 TMG
            </Typography>
            <p>Jonas Zeihe</p>
            <p>[Straße Hausnummer]</p>
            <p>[PLZ] [Ort]</p>
            <p>Deutschland</p>
          </section>

          <section>
            <Typography variant="h3" align="left">
              Kontakt
            </Typography>
            <p>
              E-Mail:{' '}
              <Link href="mailto:jonaszeihe@gmail.com">
                jonaszeihe@gmail.com
              </Link>
            </p>
            <p>
              GitHub:{' '}
              <Link
                href="https://github.com/jonaszeihe"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/jonaszeihe
              </Link>
            </p>
            <p>
              LinkedIn:{' '}
              <Link
                href="https://de.linkedin.com/in/jonas-zeihe"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </Link>
            </p>
          </section>

          <section>
            <Typography variant="h3" align="left">
              Umsatzsteuer-ID
            </Typography>
            <p>USt-IdNr.: [falls vorhanden, sonst entfernen]</p>
          </section>

          <section>
            <Typography variant="h3" align="left">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </Typography>
            <p>Jonas Zeihe, Anschrift wie oben</p>
          </section>

          <section>
            <Typography variant="h3" align="left">
              Haftung für Inhalte
            </Typography>
            <p>
              Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte
              auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen
              zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <Typography variant="h3" align="left">
              Haftung für Links
            </Typography>
            <p>
              Diese Seite enthält Links zu externen Websites Dritter, auf deren
              Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <Typography variant="h3" align="left">
              Urheberrecht
            </Typography>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung.
            </p>
          </section>
        </div>
      </SectionWrapper>
    </main>
  )
}
