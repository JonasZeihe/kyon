// src/components/pagekit/skins/index.ts
import type { AccentKey } from '@/design/theme'

export type RhythmKey = 'compact' | 'default' | 'spacious'

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
}

export const pageSkins: Record<SkinKey, PageSkin> = {
  home: {
    accentKey: 'highlight',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
  },
  blogIndex: {
    accentKey: 'primary',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
  },
  blogCategory: {
    accentKey: 'primary',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
  },
  blogPost: {
    accentKey: 'primary',
    surfaceTone: 'subtle',
    rhythm: 'spacious',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
  },
  about: {
    accentKey: 'accent',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
  },
  search: {
    accentKey: 'secondary',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
  },
  impressum: {
    accentKey: 'neutral',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
  },
}

export const resolveSkin = (key: SkinKey): PageSkin => pageSkins[key]
