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
} from './tokens'
import { buildSemantic } from './semantic'

const GRADIENTS = {
  rainbow: 'linear-gradient(90deg, #c41f2a, #0ea5ff, #ca21b6, #ffd200)',
  primary: 'linear-gradient(135deg, #ea6a78, #c41f2a)',
  secondary: 'linear-gradient(135deg, #59bfff, #0ea5ff)',
  accent: 'linear-gradient(135deg, #db7ad1, #ca21b6)',
  highlight: 'linear-gradient(135deg, #ffe37a, #ffd200)',
}

const createTheme = (mode: Mode) => {
  const semantic = buildSemantic(mode)
  const boxShadow = (SHADOWS as any)[mode]
  const palette: any = (PALETTE as any)[mode]

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
        focusRing: palette.accent[2] || palette.secondary[2],
      }
    }
    const group = palette[k]
    return {
      color: group.main,
      border: group.border ?? palette.neutral.border,
      surfaceVariant: 'subtle' as const,
      focusRing: palette.accent[2] || palette.secondary[2],
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
    gradients: GRADIENTS,
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
