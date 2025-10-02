// src/components/pagekit/skins/index.ts
import type { AccentKey, RhythmKey, MotifKey } from '@/styles/theme'

export type SkinKey =
  | 'home'
  | 'blogIndex'
  | 'blogCategory'
  | 'blogPost'
  | 'about'
  | 'search'
  | 'impressum'

export type PageSkin = {
  accent: AccentKey | 'neutral'
  surface: 'subtle' | 'intense' | 'none'
  rhythm: RhythmKey
  grid?: { min?: string; gap?: number; columns?: number | 'auto' }
  motif?: MotifKey | 'none'
}

export const pageSkins: Record<SkinKey, PageSkin> = {
  home: {
    accent: 'highlight',
    surface: 'subtle',
    rhythm: 'default',
    grid: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'edgeToEdge',
  },
  blogIndex: {
    accent: 'primary',
    surface: 'subtle',
    rhythm: 'default',
    grid: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'zebra',
  },
  blogCategory: {
    accent: 'primary',
    surface: 'subtle',
    rhythm: 'default',
    grid: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'zebra',
  },
  blogPost: {
    accent: 'primary',
    surface: 'subtle',
    rhythm: 'spacious',
    grid: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'none',
  },
  about: {
    accent: 'accent',
    surface: 'subtle',
    rhythm: 'default',
    grid: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'spotlight',
  },
  search: {
    accent: 'secondary',
    surface: 'subtle',
    rhythm: 'default',
    grid: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'none',
  },
  impressum: {
    accent: 'neutral',
    surface: 'subtle',
    rhythm: 'default',
    grid: { min: '18rem', gap: 2, columns: 'auto' },
    motif: 'none',
  },
}

export const resolveSkin = (key: SkinKey): PageSkin => pageSkins[key]
