// src/app/impressum/page.tsx
import Link from 'next/link'
import Typography from '@/design/typography'
import SectionRecipe from '@/components/pagekit/recipes/SectionRecipe'
import HeroRecipe from '@/components/pagekit/recipes/HeroRecipe'
import { resolveSkin } from '@/components/pagekit/skins'

export const dynamic = 'force-static'

export default function ImpressumPage() {
  const skin = resolveSkin('impressum')

  return (
    <main>
      <HeroRecipe
        isPageHeader
        title={
          <Typography variant="h1" as="h1">
            Impressum
          </Typography>
        }
        lead={
          <Typography as="p" variant="subtitle" color="mutedFg" gutter={false}>
            Rechtliche Angaben, Kontakt und Hinweise.
          </Typography>
        }
        container="narrow"
        accent={skin.accentKey}
      />

      <SectionRecipe
        surface={skin.surfaceTone}
        accent={skin.accentKey}
        narrow
        ariaLabel="Impressum – Rechtliche Angaben"
      >
        <section aria-labelledby="angaben">
          <Typography variant="h3" as="h2" id="angaben">
            Angaben gemäß § 5 TMG
          </Typography>
          <address style={{ fontStyle: 'normal' }}>
            <Typography as="p">Jonas Zeihe</Typography>
            <Typography as="p">[Straße Hausnummer]</Typography>
            <Typography as="p">[PLZ] [Ort]</Typography>
            <Typography as="p">Deutschland</Typography>
          </address>
        </section>

        <section aria-labelledby="kontakt">
          <Typography variant="h3" as="h2" id="kontakt">
            Kontakt
          </Typography>
          <Typography as="p">
            E-Mail:{' '}
            <Link href="mailto:jonaszeihe@gmail.com">jonaszeihe@gmail.com</Link>
          </Typography>
          <Typography as="p">
            GitHub:{' '}
            <Link
              href="https://github.com/jonaszeihe"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/jonaszeihe
            </Link>
          </Typography>
          <Typography as="p">
            LinkedIn:{' '}
            <Link
              href="https://de.linkedin.com/in/jonas-zeihe"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </Link>
          </Typography>
        </section>

        <section aria-labelledby="ust">
          <Typography variant="h3" as="h2" id="ust">
            Umsatzsteuer-ID
          </Typography>
          <Typography as="p">
            USt-IdNr.: [falls vorhanden, sonst entfernen]
          </Typography>
        </section>

        <section aria-labelledby="verantwortlich">
          <Typography variant="h3" as="h2" id="verantwortlich">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </Typography>
          <Typography as="p">Jonas Zeihe, Anschrift wie oben</Typography>
        </section>

        <section aria-labelledby="haftung-inhalte">
          <Typography variant="h3" as="h2" id="haftung-inhalte">
            Haftung für Inhalte
          </Typography>
          <Typography as="p">
            Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </Typography>
        </section>

        <section aria-labelledby="haftung-links">
          <Typography variant="h3" as="h2" id="haftung-links">
            Haftung für Links
          </Typography>
          <Typography as="p">
            Diese Seite enthält Links zu externen Websites Dritter, auf deren
            Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden
            Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
            verantwortlich.
          </Typography>
        </section>

        <section aria-labelledby="urheberrecht">
          <Typography variant="h3" as="h2" id="urheberrecht">
            Urheberrecht
          </Typography>
          <Typography as="p">
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung.
          </Typography>
        </section>
      </SectionRecipe>
    </main>
  )
}
