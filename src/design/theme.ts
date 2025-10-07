// src/design/theme.ts
import {
  BREAKPOINTS,
  PALETTE,
  RADIUS,
  SHADOWS,
  SPACING,
  SPACING_HALF,
  TYPOGRAPHY,
  Mode,
  AccentKey,
  type PaletteMode,
} from './tokens'
import { buildSemantic } from './semantic'

const createTheme = (mode: Mode) => {
  const semantic = buildSemantic(mode)
  const boxShadow = SHADOWS[mode]
  const palette: PaletteMode = PALETTE[mode]

  const gradients = {
    rainbow: `linear-gradient(90deg, ${palette.primary.main}, ${palette.secondary.main}, ${palette.accent.main}, ${palette.highlight.main})`,
    primary: `linear-gradient(135deg, ${palette.primary[3]}, ${palette.primary.main})`,
    secondary: `linear-gradient(135deg, ${palette.secondary[3]}, ${palette.secondary.main})`,
    accent: `linear-gradient(135deg, ${palette.accent[3]}, ${palette.accent.main})`,
    highlight: `linear-gradient(135deg, ${palette.highlight[3]}, ${palette.highlight.main})`,
  } as const

  const rhythm = {
    compact: { sectionGap: SPACING(1.5), sectionPad: SPACING(1.5) },
    default: { sectionGap: SPACING(2), sectionPad: SPACING(2) },
    spacious: { sectionGap: SPACING(3), sectionPad: SPACING(3.5) },
  }

  const grid = {
    defaults: { min: '18rem', gap: 2, columns: 'auto' as const },
  }

  const motifs = {
    spotlight: { insetScale: 0.94, washAlpha: 0.08 },
    zebra: { altSurface: palette.surface[2] },
    edgeToEdge: { container: 'wide' as const },
  }

  const accentFor = (k: AccentKey | 'neutral') => {
    if (k === 'neutral') {
      return {
        color: palette.text.main,
        border: palette.neutral.border,
        surfaceVariant: 'subtle' as const,
        focusRing: palette.secondary[2],
      }
    }
    const group = palette[k]
    return {
      color: group.main,
      border: group.border ?? palette.neutral.border,
      surfaceVariant: 'subtle' as const,
      focusRing: palette.secondary[2],
    }
  }

  return {
    mode,
    tokens: {
      palette: PALETTE,
      typography: TYPOGRAPHY,
      spacing: SPACING,
      spacingHalf: SPACING_HALF,
      radius: RADIUS,
      breakpoints: BREAKPOINTS,
      shadows: SHADOWS,
    },
    semantic,
    gradients,
    boxShadow,
    typography: TYPOGRAPHY,
    spacing: SPACING,
    spacingHalf: SPACING_HALF,
    borderRadius: RADIUS,
    breakpoints: BREAKPOINTS,
    motionSafe: true,
    rhythm,
    grid,
    motifs,
    accentFor,
  }
}

export const lightTheme = createTheme('light')
export const darkTheme = createTheme('dark')
export default lightTheme
export type { AccentKey } from './tokens'
export type AppTheme = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
