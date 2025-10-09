// src/components/meshedgradientbackground/visualProfile.ts
export type VisualProfile = {
  blur: number
  opacity: number
  saturation: number
  contrast: number
  brightness: number
}
const visualProfile = (mode?: 'light' | 'dark'): VisualProfile =>
  mode === 'dark'
    ? {
        blur: 32,
        opacity: 0.66,
        saturation: 0.95,
        contrast: 0.98,
        brightness: 0.98,
      }
    : {
        blur: 28,
        opacity: 0.58,
        saturation: 0.92,
        contrast: 0.97,
        brightness: 1.02,
      }
export default visualProfile
