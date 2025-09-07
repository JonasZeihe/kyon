// src/components/meshedgradientbackground/visualProfile.ts
export type VisualProfile = {
  blur: number
  opacity: number
  saturation: number
  contrast: number
  brightness: number
}

export default function visualProfile(mode?: 'light' | 'dark'): VisualProfile {
  if (mode === 'dark') {
    return {
      blur: 45,
      opacity: 0.9,
      saturation: 1,
      contrast: 1,
      brightness: 1,
    }
  }
  return {
    blur: 45,
    opacity: 0.9,
    saturation: 1,
    contrast: 1,
    brightness: 1,
  }
}
