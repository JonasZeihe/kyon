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
            Impressum & Datenschutz
          </Typography>
        }
        lead={
          <Typography as="p" variant="subtitle" color="mutedFg" gutter={false}>
            Rechtliche Angaben, Datenschutz und Haftungshinweise.
          </Typography>
        }
        container="narrow"
        accent={skin.accentKey}
      />

      <SectionRecipe
        surface={skin.surfaceTone}
        accent={skin.accentKey}
        narrow
        ariaLabel="Impressum und Datenschutz"
      >
        <section aria-labelledby="anbieter">
          <Typography variant="h3" as="h2" id="anbieter">
            Diensteanbieter (§ 5 TMG) und Verantwortliche Stelle (Art. 4 Nr. 7
            DSGVO)
          </Typography>
          <address style={{ fontStyle: 'normal' }}>
            <Typography as="p">Jonas Zeihe</Typography>
            <Typography as="p">Weinbergstraße 2</Typography>
            <Typography as="p">94424 Arnstorf</Typography>
            <Typography as="p">Deutschland</Typography>
          </address>
          <Typography as="p">
            E-Mail:{' '}
            <Link href="mailto:jonaszeihe@gmail.com">jonaszeihe@gmail.com</Link>
          </Typography>
        </section>

        <section aria-labelledby="kontakt">
          <Typography variant="h3" as="h2" id="kontakt">
            Weitere Kontaktmöglichkeiten
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
              linkedin.com/in/jonas-zeihe
            </Link>
          </Typography>
        </section>

        <section aria-labelledby="verantwortlich">
          <Typography variant="h3" as="h2" id="verantwortlich">
            Verantwortlich für Inhalte nach § 55 Abs. 2 RStV
          </Typography>
          <Typography as="p">Jonas Zeihe, Anschrift wie oben</Typography>
        </section>

        <section aria-labelledby="datenschutz">
          <Typography variant="h3" as="h2" id="datenschutz">
            Datenschutz
          </Typography>

          <Typography variant="h3" as="h3">
            Grundsätze
          </Typography>
          <Typography as="p">
            Diese Website kann ohne Angabe personenbezogener Daten genutzt
            werden. Es werden keine Cookies gesetzt, keine Webanalyse und kein
            Tracking durchgeführt. Es findet keine Profilbildung statt.
          </Typography>

          <Typography variant="h3" as="h3">
            Hosting (GitHub Pages)
          </Typography>
          <Typography as="p">
            Die Website wird von{' '}
            <strong>
              GitHub Inc., 88 Colin P. Kelly Street, San Francisco, CA 94107,
              USA
            </strong>{' '}
            gehostet. Beim Aufruf der Seiten verarbeitet GitHub technisch
            notwendige Server-Logdaten (z.&nbsp;B. IP-Adresse, Datum/Uhrzeit,
            User-Agent, angeforderte URL), um die Website auszuliefern und die
            Sicherheit zu gewährleisten. Rechtsgrundlage ist Art.&nbsp;6
            Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an stabiler
            und sicherer Bereitstellung).
          </Typography>
          <Typography as="p">
            Ich erhalte aus diesen Logdaten keine personenbezogenen
            Auswertungen. Weitere Informationen:{' '}
            <Link
              href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
            >
              Datenschutzerklärung von GitHub
            </Link>
            .
          </Typography>

          <Typography variant="h3" as="h3">
            Internationale Datenübermittlung
          </Typography>
          <Typography as="p">
            Durch das Hosting bei GitHub können Verarbeitungen in den USA
            stattfinden. GitHub trifft nach eigenen Angaben geeignete
            Schutzmaßnahmen. Ein Zugriff von US-Behörden kann rechtlich nicht
            vollständig ausgeschlossen werden. Die Nutzung der Website ist
            freiwillig.
          </Typography>

          <Typography variant="h3" as="h3">
            Kontaktaufnahme per E-Mail
          </Typography>
          <Typography as="p">
            Bei Kontakt per E-Mail werden die von Ihnen übermittelten Daten
            ausschließlich zur Bearbeitung Ihrer Anfrage verwendet (Art.&nbsp;6
            Abs.&nbsp;1 lit.&nbsp;b DSGVO). Die Daten werden gelöscht, sobald
            die Anfrage abgeschlossen ist und keine gesetzlichen
            Aufbewahrungspflichten bestehen.
          </Typography>

          <Typography variant="h3" as="h3">
            Keine Cookies, keine Drittinhalte
          </Typography>
          <Typography as="p">
            Es werden keine Cookies gesetzt und keine externen Skripte,
            Schriftarten oder iframes von Drittanbietern eingebunden, die
            personenbezogene Daten übertragen könnten.
          </Typography>

          <Typography variant="h3" as="h3">
            Lokaler Speicher (LocalStorage)
          </Typography>
          <Typography as="p">
            Zur Bereitstellung von Seiteneinstellungen (z. B. Sprache oder
            Darstellungsmodus) nutzt die Website den Browser-Speicher
            (LocalStorage). Dabei werden keine personenbezogenen Daten
            gespeichert; die Daten verbleiben ausschließlich auf Ihrem Endgerät.
          </Typography>

          <Typography variant="h3" as="h3">
            Ihre Rechte
          </Typography>
          <Typography as="p">
            Sie haben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung
            der Verarbeitung, Datenübertragbarkeit sowie Widerspruch
            (Art.&nbsp;15–21 DSGVO). Wenden Sie sich hierzu an{' '}
            <Link href="mailto:jonaszeihe@gmail.com">jonaszeihe@gmail.com</Link>
            . Zudem besteht ein Beschwerderecht bei der zuständigen
            Aufsichtsbehörde.
          </Typography>

          <Typography variant="h3" as="h3">
            Sicherheit
          </Typography>
          <Typography as="p">
            Die Übertragung erfolgt verschlüsselt (HTTPS/TLS), sofern Ihr
            Browser dies unterstützt.
          </Typography>
        </section>

        <section aria-labelledby="haftung-inhalte">
          <Typography variant="h3" as="h2" id="haftung-inhalte">
            Haftung für Inhalte
          </Typography>
          <Typography as="p">
            Als Diensteanbieter bin ich gemäß §&nbsp;7 Abs.&nbsp;1 TMG für
            eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
            verantwortlich. Nach §§&nbsp;8 bis 10 TMG bin ich jedoch nicht
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
            Diese Website enthält Links zu externen Websites Dritter, auf deren
            Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte ist
            stets der jeweilige Anbieter oder Betreiber verantwortlich. Bei
            Bekanntwerden von Rechtsverletzungen werden entsprechende Links
            entfernt.
          </Typography>
        </section>

        <section aria-labelledby="urheberrecht">
          <Typography variant="h3" as="h2" id="urheberrecht">
            Urheberrecht und Medien
          </Typography>
          <Typography as="p">
            Die durch mich erstellten Inhalte und Werke unterliegen dem
            deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung
            und Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
            vorherigen Zustimmung. Downloads und Kopien dieser Seite sind nur
            für den privaten, nicht kommerziellen Gebrauch gestattet.
          </Typography>
          <Typography as="p">
            Soweit Inhalte auf dieser Seite nicht von mir erstellt wurden,
            werden die Urheberrechte Dritter beachtet. Sollten Sie auf eine
            Urheberrechtsverletzung aufmerksam werden, informieren Sie mich
            bitte.
          </Typography>
        </section>

        <section aria-labelledby="streitbeilegung">
          <Typography variant="h3" as="h2" id="streitbeilegung">
            Online-Streitbeilegung / Verbraucherstreitbeilegung
          </Typography>
          <Typography as="p">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung bereit:{' '}
            <Link
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </Link>
            . Ich bin weder verpflichtet noch bereit, an einem
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </Typography>
        </section>

        <section aria-labelledby="stand">
          <Typography variant="h3" as="h2" id="stand">
            Stand
          </Typography>
          <Typography as="p">Januar 2025</Typography>
        </section>
      </SectionRecipe>
    </main>
  )
}
