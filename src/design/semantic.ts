// src/design/semantic.ts
import { PALETTE, Mode } from './tokens'

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
  const c: any = (PALETTE as any)[mode]
  return {
    bg: c.neutral.background,
    fg: c.text.main,
    mutedFg: c.text.subtle,
    card: c.surface.card,
    surface: c.surface[1],
    surfaceAlt: c.surface[2],
    border: c.neutral.border,
    hover: c.surface.hover,
    focusRing: c.accent[2] || c.secondary[2],
    link: c.primary.main,
    linkHover: c.accent.main,
    success: c.secondary.main,
    warning: c.highlight.main,
    danger: c.primary.main,
    overlay: 'rgba(0,0,0,0.5)',
  }
}
