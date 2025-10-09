# Projekt-Überblick

- Framework: Next.js (App Router), **static export** (`output: 'export'`), `styled-components` v6
- Alias: `@` → `src/*` (siehe `tsconfig.json`)
- Theme: `src/styles/theme.ts` (+ `Gradient.ts`), via `ThemeContextProvider`
- Global CSS baseline: `src/styles/GlobalStyles.ts` (in Provider integriert)
- Design Tokens: Typo, Spacing, Radii, Breakpoints, BoxShadows, Color-Paletten + Gradients

# Designsystem (Tokens & Patterns)

**Ort:** `src/styles/theme.ts`

- `typography`
  - `fontFamily`: `primary | secondary | button`
  - `fontSize`: `h1 | h2 | h3 | h4 | body | small` (fluid über `clamp`)
  - `fontWeight`: `light | regular | medium | bold`
  - `lineHeight`: `tight | normal | relaxed`
  - `letterSpacing`: `tight | normal | wide`

- `spacing(n: number)` → `${8*n}px` (z. B. `theme.spacing(1.5)`)
- `borderRadius`: `none | small | medium | large | pill`
- `breakpoints`: `xs|sm|md|lg|xl|xxl` (px)
- `boxShadow`: über `theme.boxShadow` (mode-abhängig) mit `xs|sm|md|lg|glow`
- `colors`: Paletten `primary|secondary|accent|highlight|neutral|surface|depth|text`
  - Zugriff: `color="primary.main"` oder via styled `theme.colors.primary[2]`

- `gradients`: generiert in `src/styles/Gradient.ts` (z. B. `theme.gradients.backgroundDepth`)
  - inkl. `meshPalette` für `MeshGradientBackground`

- `motionSafe`: Systempräferenz `prefers-reduced-motion`

**Benutzung in styled-components**

```tsx
const Box = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text.main};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`
```

# Theming & Provider

**Ort:** `src/components/context/ThemeContext.tsx`

- Exportiert `ThemeContextProvider` und Hook `useThemeContext()`
- Managed `mode: 'light' | 'dark'`, liefert `theme` (fail-loud Proxy in Dev)
- Next App-Provider: `src/app/providers.tsx` wrappt alles
- **Import**

```tsx
// app/providers.tsx ist schon gesetzt – sonst:
import { ThemeContextProvider } from '@/components/context/ThemeContext'
```

**Theme Toggle**

- `src/components/button/ThemeToggleButton.tsx`
- Nutzt `useThemeContext().toggleTheme()`

```tsx
import ThemeToggleButton from '@/components/button/ThemeToggleButton'
;<ThemeToggleButton />
```

# Typography

**Ort:** `src/styles/Typography.tsx`

- Polymorphe Komponente für Headings/Body
- **Props**
  - `variant`: `'h1' | 'h2' | 'h3' | 'subhead' | 'body' | 'caption'` (Default `body`)
  - `color`: String in Notation `group.tone` (z. B. `accent.main`)
  - `align`: `'left' | 'center' | 'right'`
  - `gutter`: boolean (Default `true`)
  - `as`: optional HTML-Tag

- **Usage**

```tsx
import Typography from '@/styles/Typography'
;<Typography variant="h2" color="accent.main" align="center">
  Überschrift
</Typography>
```

# Buttons

**Ort:** `src/components/button/Button.tsx`

- **Props**
  - `variant`: `'primary' | 'github' | 'casestudy' | 'prototype' | 'success'` (Default `primary`)
  - `customBackground?`: string (überschreibt Variant-BG)
  - `disabled?`, `onClick?`, `children`

- Tokens: nutzt `typography.button`, `boxShadow`, `borderRadius`
- **Usage**

```tsx
import Button from '@/components/button/Button';
<Button variant="primary" onClick={()=>{}}>Los geht’s</Button>
<Button customBackground="#6C5CE7">Individuell</Button>
```

## ButtonGrid

**Ort:** `src/components/button/ButtonGrid.tsx`

- Responsive Grid, spaltenabhängig von `children`-Anzahl
- **Usage**

```tsx
import ButtonGrid from '@/components/button/ButtonGrid'
;<ButtonGrid>
  <Button>Ein</Button>
  <Button>Zwei</Button>
</ButtonGrid>
```

# Badges

## Badge

**Ort:** `src/components/badge/Badge.tsx`

- **Dynamisch**, keine Library. Du gibst `label`, optional `icon` (key aus `react-icons/fa`) und `colorLight`/`colorDark` (Hex/RGB) je nach Theme.
- **Props**
  - `label: string` (Pflicht)
  - `icon?: string` (z. B. `'FaReact'`, `'FaPython'`)
  - `colorLight?: string`, `colorDark?: string`

- **Usage**

```tsx
import Badge from '@/components/badge/Badge'
;<Badge label="React" icon="FaReact" colorLight="#61DAFB" colorDark="#1a9ecb" />
```

## BadgeGrid

**Ort:** `src/components/badge/BadgeGrid.tsx`

- Array aus Badge-Items
- **Props**
  - `badges: {label:string; icon?:string; colorLight?:string; colorDark?:string;}[]`
  - `align?: 'left'|'center'|'right'` (Default `center`)
  - `gapSize?: number` (Default `2`)
  - `marginSize?: number` (Default `1`)

- **Usage**

```tsx
import BadgeGrid from '@/components/badge/BadgeGrid'
;<BadgeGrid
  badges={[
    { label: 'React', icon: 'FaReact', colorLight: '#61dafb' },
    { label: 'TS', icon: 'FaCode', colorLight: '#3178c6' },
  ]}
/>
```

# Wrapper-Komponenten

## LumenWrapper (Basis)

**Ort:** `src/components/Wrapper/LumenWrapper.tsx`

- Visueller Container mit Alphafläche/Glass, Schatten, Radii
- **Props**
  - `as?: Element`
  - `radius?: 'small'|'medium'|'large'` (Default `large`)
  - `padding?: string`
  - `backgroundColor?: string`
  - `variant?: 'intense'|'subtle'|'none'` (Default `intense`)

- **Usage**

```tsx
import LumenWrapper from '@/components/Wrapper/LumenWrapper'
;<LumenWrapper variant="subtle" radius="medium">
  Inhalt
</LumenWrapper>
```

## CardWrapper

**Ort:** `src/components/Wrapper/CardWrapper.tsx`

- `LumenWrapper` + Hover-Lift, ideal für Karten
- **Usage**

```tsx
import CardWrapper from '@/components/Wrapper/CardWrapper'
;<CardWrapper>…</CardWrapper>
```

## HeroWrapper

**Ort:** `src/components/Wrapper/HeroWrapper.tsx`

- Zentrierter, großzügiger Bereich (Gradient-Hintergrund via Lumen)
- **Props**
  - `variant?: 'intense'|'subtle'|'none'` (Default `intense`)
  - `$spacious?: boolean`

- **Usage**

```tsx
import HeroWrapper from '@/components/Wrapper/HeroWrapper'
;<HeroWrapper $spacious>
  <Typography variant="h1">Hello</Typography>
</HeroWrapper>
```

## SectionWrapper

**Ort:** `src/components/Wrapper/SectionWrapper.tsx`

- Max-Breite, vertikale Abstände, `variant='subtle'`
- **Props**
  - `$spacious?: boolean`

- **Usage**

```tsx
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
;<SectionWrapper $spacious>…</SectionWrapper>
```

## PageWrapper

**Ort:** `src/components/Wrapper/PageWrapper.tsx`

- Grundlayout Content-Spalte (Padding, min-height)
- **Usage**

```tsx
import PageWrapper from '@/components/Wrapper/PageWrapper'
;<PageWrapper>…</PageWrapper>
```

# Cards

## CardGrid

**Ort:** `src/components/card/CardGrid.tsx`

- Responsive Grid für mehrere Cards

```tsx
import CardGrid from '@/components/card/CardGrid'
;<CardGrid>
  <CardWrapper>…</CardWrapper>
  <CardWrapper>…</CardWrapper>
</CardGrid>
```

## FeatureCard

**Ort:** `src/components/card/FeatureCard.tsx`

- Hero-ähnliche Karte mit Titel/Beschreibung/Badges/Call-to-Action
- **Props**
  - `title?: string`, `description?: string`
  - `badges?: BadgeItem[]`
  - `targetId?: string` (Smooth Scroll Ziel)
  - `gradient?: string` (weitergereicht an CardWrapper)
  - `buttonText?: string`
  - `customBackground?: string` (Button)

- **Usage**

```tsx
import FeatureCard from '@/components/card/FeatureCard'
;<FeatureCard
  title="Services"
  description="UX, Frontend, Prototyping"
  badges={[{ label: 'React', icon: 'FaReact' }]}
  targetId="services"
/>
```

## ProjectCard

**Ort:** `src/components/card/ProjectCard.tsx`

- Bild, Titel, Beschreibung, Buttons (+ Click öffnet Lightbox/Modal)
- **Props**
  - `project: { image:string; name:string; description:string; buttons?: {text:string; link:string; variant?:string;}[] }`
  - `onOpen: () => void`

- **Usage**

```tsx
import ProjectCard from '@/components/card/ProjectCard'
;<ProjectCard
  project={{
    image: '/assets/p1.jpg',
    name: 'Projekt 1',
    description: 'Kurztext',
    buttons: [{ text: 'Repo', link: 'https://…', variant: 'github' }],
  }}
  onOpen={() => {}}
/>
```

# Daten-/Content-Anzeige

## ListComponent

**Ort:** `src/components/data-display/ListComponent.tsx`

- Vertikale Liste schöner ListItems
- **Props**
  - `items: { id?: string; content: React.ReactNode }[]`

- **Usage**

```tsx
import ListComponent from '@/components/data-display/ListComponent'
;<ListComponent
  items={[
    { id: 'a', content: <>✅ Robust</> },
    { id: 'b', content: <>⚡ Schnell</> },
  ]}
/>
```

## MediaDisplay

**Ort:** `src/components/data-display/MediaDisplay.tsx`

- Grid für Bilder/Videos + optionaler Lightbox (Bilder)
- **Props**
  - `variant?: 'small'|'medium'|'large'`
  - `media: (ImageMedia|VideoMedia)[]`
    - `ImageMedia`: `{ type:'image'; src; alt; caption? }`
    - `VideoMedia`: `{ type:'video'; src; alt; caption?; trackSrc?; trackLang? }`

- **Usage**

```tsx
import MediaDisplay from '@/components/data-display/MediaDisplay'
;<MediaDisplay
  variant="medium"
  media={[
    { type: 'image', src: '/img1.jpg', alt: 'A', caption: 'Bild' },
    { type: 'video', src: '/clip.mp4', alt: 'Demo', caption: 'Video' },
  ]}
/>
```

# Lightbox

**Dateien**

- `src/components/lightbox/Lightbox.tsx` (Portal-Overlay, Navigation, Keyboard/Swipe)
- `src/components/lightbox/Navigation.tsx` (Zoom+Pan für Bilder)
- `src/components/lightbox/ModalOverlay.tsx` (generisches Modal, Focus-Trap)
- `src/components/lightbox/scale.ts` (Zoom-Stufen)

**Lightbox Props**

- `media: {type:'image'|'video'; src; alt?}[]`
- `currentIndex?: number`
- `onClose: () => void`

**Usage (direkt)**
Meist öffnest du sie aus einer Card/Preview heraus:

```tsx
import Lightbox from '@/components/lightbox/Lightbox'
const [open, setOpen] = useState(false)
const media = [
  { type: 'image', src: '/a.jpg', alt: 'A' },
  { type: 'image', src: '/b.jpg', alt: 'B' },
  { type: 'video', src: '/c.mp4', alt: 'C' },
]
{
  open && (
    <Lightbox media={media} currentIndex={0} onClose={() => setOpen(false)} />
  )
}
```

**Zoom/Interaktion**

- Click/Touch: zoomt in 2 Stufen (scale.ts definiert Werte)
- Panning bei Zoom via Maus/Touch
- ESC schließt, Pfeile navigieren, Swipe (react-swipeable) aktiv

# Utilities

## HighlightText

**Ort:** `src/components/utilities/HighlightText.tsx`

- Fett + Akzentfarbe (overridebar)
- **Props**
  - `color?: string`

- **Usage**

```tsx
import HighlightText from '@/components/utilities/HighlightText'
;<Typography>
  Das ist <HighlightText>wichtig</HighlightText>.
</Typography>
```

## SmoothScroller

**Ort:** `src/components/utilities/SmoothScroller.tsx`

- Button-Wrapper, der zu `targetId` smooth scrollt
- **Props**
  - `targetId: string`

- **Usage**

```tsx
import SmoothScroller from '@/components/utilities/SmoothScroller'
;<SmoothScroller targetId="top">Nach oben</SmoothScroller>
```

# Layout

## Header

**Ort:** `src/components/layout/Header.tsx`

- Fixed Topbar mit Desktop & Mobile Nav, Subnav + Theme Toggle
- **Props**
  - `navSections: { id:string; label:string; children?: {id:string; label:string}[] }[]`

- **Active Section**: wird via Scroll berechnet, Styling per `primary.base`
- **Usage**

```tsx
import Header from '@/components/layout/Header'
;<Header
  navSections={[
    { id: 'intro', label: 'Einführung' },
    {
      id: 'uxui',
      label: 'UX/UI',
      children: [{ id: 'design', label: 'Design' }],
    },
  ]}
/>
```

## Footer

**Ort:** `src/components/layout/Footer.tsx`

- Kontakt, Socials, ScrollToTop
- Nutzt Gradients/Surface, Tokens, Icons

```tsx
import Footer from '@/components/layout/Footer'
;<Footer />
```

## MeshGradientBackground

**Ort:**

- `src/components/meshedgradientbackground/MeshGradientBackground.tsx`

- `meshEngine.ts`, `visualProfile.ts`

- Fixed Canvas mit animierten radialen Gradients ( nutz `theme.gradients.meshPalette` + `theme.mode`)

- **Usage**

```tsx
import MeshGradientBackground from '@/components/layout/MeshGradientBackground'
;<MeshGradientBackground />
```

# Global Styles

**Ort:** `src/styles/GlobalStyles.ts`

- Resets, Farbzuweisung über Theme, Focus-Outlines, Form-Elemente, Links usw.
- Wird im `ThemeContextProvider` bereitgestellt (über StyledThemeProvider → global styles sind in deinem Setup bereits verankert)

# App-Shell

**Ort:**

- `src/app/layout.tsx` (Meta, `<Providers />`)
- `src/app/providers.tsx` (ThemeContextProvider)
- `src/app/page.tsx` (Showcase-Seite)

**Pattern für Seiten**

```tsx
'use client'
import styled from 'styled-components'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MeshGradientBackground from '@/components/layout/MeshGradientBackground'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'

export default function Page() {
  const nav = [{ id: 'intro', label: 'Intro' }]
  return (
    <>
      <MeshGradientBackground />
      <Header navSections={nav} />
      <Main>
        <SectionWrapper id="intro">…</SectionWrapper>
      </Main>
      <Footer />
    </>
  )
}
const Main = styled.main`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(8)} ${theme.spacing(3)}`};
`
```

# Farb-/Typo-Kopplung

- **Typo**: Alle textbasierten Komponenten (Typography, Buttons, Header/Footer) nehmen Werte direkt aus `theme.typography`.
- **Farben**:
  - Standard: `theme.colors.text.main`/`inverse`
  - Interaktive: `primary|secondary|accent|highlight` (`.base|hover|active|disabled|border|surface|contrast` + abgestufte Indizes `0..6`)
  - Bei Komponenten, die `color="group.tone"` akzeptieren (z. B. Typography), wird dynamisch über `getThemeColor()` aufgelöst.

- **Shadows/Radii/Abstände**: zentral über Tokens (siehe Card, Button, Wrapper)

# Zugriff/Importe (Alias)

- Immer mit `@` alias:
  - `@/styles/...`
  - `@/components/...`
  - `@/components/button/Button`
  - `@/components/badge/BadgeGrid`
  - etc.

# Do & Don’t

- ✅ `theme.spacing(x)` statt hartkodierter Pixel
- ✅ `Typography` für Text statt eigener `<h*>`-Styles
- ✅ `CardWrapper`/`SectionWrapper`/`HeroWrapper` für Layout-Abschnitte
- ✅ `BadgeGrid` mit dynamischen Badge-Items
- ✅ `MeshGradientBackground` einmalig pro Seite einbinden
- ✅ Lightbox nur clientseitig (sie nutzt Portals, Events)
- ❌ Keine `next/image` (bei `output: 'export'` + `images.unoptimized: true` halten wir’s aktuell simpel)
- ❌ Keine Hardcoded-Colors in Komponenten (außer `customBackground`, bewusst)

# Schnelle Referenz (Minimal Snippets)

**Heading**

```tsx
<Typography variant="h1" color="primary.main">
  Titel
</Typography>
```

**CTA Buttons**

```tsx
<ButtonGrid>
  <Button>Jetzt starten</Button>
  <Button variant="github">GitHub</Button>
</ButtonGrid>
```

**Card + Badges**

```tsx
<CardWrapper>
  <Typography variant="h3">Feature</Typography>
  <BadgeGrid badges={[{ label: 'React', icon: 'FaReact' }]} />
</CardWrapper>
```

**Media + Lightbox**

```tsx
const media=[{type:'image',src:'/a.jpg',alt:'A'}]
<MediaDisplay media={media} variant="medium" />
```

**Smooth Scroll**

```tsx
<SmoothScroller targetId="kontakt">Kontakt</SmoothScroller>
```

**Highlight**

```tsx
<Typography>
  Das ist <HighlightText>spannend</HighlightText>!
</Typography>
```
