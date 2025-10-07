// src/design/semantic.ts
import { PALETTE, Mode, type PaletteMode } from './tokens'

export type Semantic = {
  bg: string
  fg: string
  mutedFg: string
  card: string
  surface: string
  surfaceAlt: string
  border: string
  hover: string
  focusRing: string
  link: string
  linkHover: string
  success: string
  warning: string
  danger: string
  overlay: string
}

export const buildSemantic = (mode: Mode): Semantic => {
  const p: PaletteMode = PALETTE[mode]
  return {
    bg: p.neutral.background,
    fg: p.text.main,
    mutedFg: p.text.subtle,
    card: p.surface.card,
    surface: p.surface[1],
    surfaceAlt: p.surface[2],
    border: p.neutral.border,
    hover: p.surface.hover,
    focusRing: p.secondary[2],
    link: p.primary.main,
    linkHover: p.accent.main,
    success: p.secondary.main,
    warning: p.highlight.main,
    danger: p.danger.main,
    overlay: 'rgba(0,0,0,0.5)',
  }
}
