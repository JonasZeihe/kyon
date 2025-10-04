// src/components/pagekit/skins/applySkin.ts
import { resolveSkin, type SkinKey, type PageSkin } from './index'

type SectionProps = {
  container: 'narrow' | 'default' | 'wide' | 'full'
  padY: boolean
}

type GridProps = {
  min?: string
  gap?: number | string
  columns?: number | 'auto'
  dense?: boolean
  switchAt?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | string
}

type SurfaceProps = {
  tone: 'neutral' | 'elevated' | 'accent'
  accent?: 'primary' | 'secondary' | 'accent' | 'highlight' | 'neutral'
  radius?: 'none' | 'small' | 'medium' | 'large' | 'pill'
  bordered?: boolean
}

type TypographyPreset = {
  titleColor?: 'fg' | 'mutedFg' | 'link' | 'success' | 'warning' | 'danger'
  subtitleColor?: 'fg' | 'mutedFg' | 'link'
}

export type AppliedSkin = {
  skin: PageSkin
  section: SectionProps
  grid: GridProps
  surface: SurfaceProps
  typography: TypographyPreset
  motif?: PageSkin['motif']
}

const mapSurfaceTone = (
  surfaceTone: PageSkin['surfaceTone']
): SurfaceProps['tone'] => {
  if (surfaceTone === 'intense') return 'accent'
  if (surfaceTone === 'none') return 'neutral'
  return 'neutral'
}

export default function applySkin(key: SkinKey): AppliedSkin {
  const skin = resolveSkin(key)
  const tone = mapSurfaceTone(skin.surfaceTone)
  const section: SectionProps =
    skin.motif === 'edgeToEdge'
      ? { container: 'wide', padY: true }
      : { container: 'default', padY: true }
  const grid: GridProps = {
    min: skin.gridProps?.min ?? '18rem',
    gap: skin.gridProps?.gap ?? 2,
    columns: skin.gridProps?.columns ?? 'auto',
    dense: false,
    switchAt: 'md',
  }
  const surface: SurfaceProps = {
    tone,
    accent: skin.accentKey,
    radius: 'large',
    bordered: tone !== 'accent',
  }
  const typography: TypographyPreset = {
    titleColor: 'fg',
    subtitleColor: 'mutedFg',
  }
  return {
    skin,
    section,
    grid,
    surface,
    typography,
    motif: skin.motif,
  }
}
