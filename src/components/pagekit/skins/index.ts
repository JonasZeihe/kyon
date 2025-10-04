// src/components/pagekit/skins/index.ts
import type { AccentKey } from '@/design/theme'

export type RhythmKey = 'compact' | 'default' | 'spacious'
export type MotifKey = 'spotlight' | 'zebra' | 'edgeToEdge'

export type SkinKey =
  | 'home'
  | 'blogIndex'
  | 'blogCategory'
  | 'blogPost'
  | 'about'
  | 'search'
  | 'impressum'

export type PageSkin = {
  accentKey: AccentKey | 'neutral'
  surfaceTone: 'subtle' | 'intense' | 'none'
  rhythm: RhythmKey
  gridProps?: { min?: string; gap?: number; columns?: number | 'auto' }
  motif?: MotifKey | 'none'
}

export const pageSkins: Record<SkinKey, PageSkin> = {
  home: {
    accentKey: 'highlight',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'edgeToEdge',
  },
  blogIndex: {
    accentKey: 'primary',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'zebra',
  },
  blogCategory: {
    accentKey: 'primary',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'zebra',
  },
  blogPost: {
    accentKey: 'primary',
    surfaceTone: 'subtle',
    rhythm: 'spacious',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'none',
  },
  about: {
    accentKey: 'accent',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'spotlight',
  },
  search: {
    accentKey: 'secondary',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'none',
  },
  impressum: {
    accentKey: 'neutral',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'none',
  },
}

export const resolveSkin = (key: SkinKey): PageSkin => pageSkins[key]
