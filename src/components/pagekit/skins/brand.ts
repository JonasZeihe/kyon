// src/components/pagekit/skins/brand.ts
import { pageSkins } from '@/components/pagekit/skins'

export type SkinMotif = 'spotlight' | 'zebra' | 'edgeToEdge' | 'none'
export type SkinSurface = 'subtle' | 'intense' | 'none'
export type SkinRhythm = 'compact' | 'default' | 'spacious'

export type SkinGrid = {
  min?: string
  gap?: number
  columns?: number | 'auto'
}

export type Skin = {
  accent?: string
  surface?: SkinSurface
  rhythm?: SkinRhythm
  grid?: SkinGrid
  motif?: SkinMotif
  logoUrl?: string
}

export const brandSkins: Record<string, Partial<Skin>> = {
  default: {},
  demo: {
    accent: 'secondary',
    surface: 'subtle',
    rhythm: 'default',
  },
  acme: {
    accent: 'accent',
    surface: 'subtle',
    rhythm: 'spacious',
    motif: 'spotlight',
    logoUrl: '/acme-logo.svg',
  },
}

const shallowMerge = (
  base: Partial<Skin>,
  over: Partial<Skin>
): Partial<Skin> => {
  return {
    ...base,
    ...over,
    grid: { ...(base.grid || {}), ...(over.grid || {}) },
  }
}

export const resolveBrandSkin = (brandKey?: string): Partial<Skin> => {
  if (!brandKey) return {}
  return brandSkins[brandKey] || {}
}

export const resolveSkin = (routeKey: string, brandKey?: string): Skin => {
  const base = (pageSkins as Record<string, Partial<Skin>>)[routeKey] || {}
  const brand = resolveBrandSkin(brandKey)
  const merged = shallowMerge(base, brand)
  return {
    accent: merged.accent || base.accent || 'primary',
    surface: merged.surface || base.surface || 'subtle',
    rhythm: merged.rhythm || base.rhythm || 'default',
    grid: merged.grid || base.grid || { min: '18rem', gap: 2, columns: 'auto' },
    motif: merged.motif || base.motif || 'none',
    logoUrl: merged.logoUrl,
  }
}
