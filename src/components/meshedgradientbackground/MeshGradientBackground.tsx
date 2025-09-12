'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import visualProfile, { VisualProfile } from './visualProfile'
import initMeshEngine from './meshEngine'

type ThemeLike = {
  mode?: 'light' | 'dark'
  gradients?: { meshPalette?: string[] }
  breakpoints?: { sm?: string }
}

export default function MeshGradientBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const theme = (useTheme() || {}) as ThemeLike

  const palette = useMemo<string[]>(() => {
    const p = theme.gradients?.meshPalette
    return Array.isArray(p) && p.length > 0
      ? p
      : ['#A9B1FF', '#E6B1FF', '#FFE3B1', '#B1FFD6']
  }, [theme.gradients?.meshPalette])

  const profile = useMemo<VisualProfile>(
    () => visualProfile(theme.mode),
    [theme.mode]
  )

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    el.style.setProperty('--v-opacity', String(profile.opacity))
    el.style.setProperty('--v-blur', `${profile.blur}px`)
    el.style.setProperty('--v-brightness', String(profile.brightness))
    el.style.setProperty('--v-contrast', String(profile.contrast))
    el.style.setProperty('--v-saturation', String(profile.saturation))
    el.style.setProperty('--v-blur-sm', `${Math.round(profile.blur * 0.66)}px`)
    el.style.setProperty(
      '--v-brightness-sm',
      (profile.brightness * 0.96).toFixed(3)
    )
    el.style.setProperty(
      '--v-contrast-sm',
      (profile.contrast * 0.96).toFixed(3)
    )
    el.style.setProperty(
      '--v-saturation-sm',
      (profile.saturation * 0.96).toFixed(3)
    )
    el.style.setProperty('--v-opacity-sm', (profile.opacity * 0.8).toFixed(3))
  }, [profile])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || !palette.length) return
    const mode = theme.mode === 'dark' ? 'dark' : 'light'
    const stop = initMeshEngine(canvas, mode, palette)
    return () => {
      stop?.()
    }
  }, [palette, palette.length, theme.mode])

  return <Canvas ref={ref} aria-hidden data-mode={theme.mode ?? 'light'} />
}

const Canvas = styled.canvas.attrs({ tabIndex: -1 })`
  position: fixed;
  inset: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: -1;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: var(--v-opacity, 1);
  filter: blur(var(--v-blur, 0)) brightness(var(--v-brightness, 1))
    contrast(var(--v-contrast, 1)) saturate(var(--v-saturation, 1));
  mix-blend-mode: ${({ theme }) =>
    (theme as any)?.mode === 'dark' ? 'screen' : 'overlay'};
  @media (max-width: ${({ theme }) =>
      (theme as any)?.breakpoints?.sm || '600px'}) {
    filter: blur(var(--v-blur-sm, var(--v-blur, 0)))
      brightness(var(--v-brightness-sm, var(--v-brightness, 1)))
      contrast(var(--v-contrast-sm, var(--v-contrast, 1)))
      saturate(var(--v-saturation-sm, var(--v-saturation, 1)));
    opacity: var(--v-opacity-sm, var(--v-opacity, 1));
  }
`
