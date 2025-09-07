// src/components/meshedgradientbackground/MeshGradientBackground.tsx
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

  const palette = useMemo<string[]>(
    () =>
      Array.isArray(theme.gradients?.meshPalette) &&
      (theme.gradients!.meshPalette!.length ?? 0) > 0
        ? (theme.gradients!.meshPalette as string[])
        : ['#A9B1FF', '#E6B1FF', '#FFE3B1', '#B1FFD6'],
    [theme.gradients?.meshPalette]
  )

  useEffect(() => {
    if (ref.current && palette.length) {
      const stop = initMeshEngine(
        ref.current,
        theme.mode === 'dark' ? 'dark' : 'light',
        palette
      )
      return () => {
        stop?.()
      }
    }
    return
  }, [palette, theme.mode])

  return <Canvas ref={ref} $profile={visualProfile(theme.mode)} aria-hidden />
}

const Canvas = styled.canvas.attrs({ tabIndex: -1 })<{
  $profile: VisualProfile
}>`
  position: fixed;
  inset: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: -1;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${({ $profile }) => $profile.opacity};
  filter: blur(${({ $profile }) => $profile.blur}px)
    brightness(${({ $profile }) => $profile.brightness})
    contrast(${({ $profile }) => $profile.contrast})
    saturate(${({ $profile }) => $profile.saturation});
  mix-blend-mode: ${({ theme }) =>
    (theme as any)?.mode === 'dark' ? 'screen' : 'overlay'};

  @media (max-width: ${({ theme }) =>
      (theme as any)?.breakpoints?.sm || '600px'}) {
    filter: blur(${({ $profile }) => Math.round($profile.blur * 0.66)}px)
      brightness(${({ $profile }) => ($profile.brightness * 0.96).toFixed(3)})
      contrast(${({ $profile }) => ($profile.contrast * 0.96).toFixed(3)})
      saturate(${({ $profile }) => ($profile.saturation * 0.96).toFixed(3)});
    opacity: ${({ $profile }) => ($profile.opacity * 0.8).toFixed(3)};
  }
`
