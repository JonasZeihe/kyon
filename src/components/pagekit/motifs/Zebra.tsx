// src/components/pagekit/motifs/Zebra.tsx
'use client'

type ZebraSurfacePlan = {
  tone: 'neutral' | 'elevated' | 'accent'
  bordered: boolean
}

export function zebraSurfaceAt(index: number): ZebraSurfacePlan {
  const isOdd = index % 2 === 1
  return {
    tone: isOdd ? 'elevated' : 'neutral',
    bordered: true,
  }
}

export function zebraIndexMap<T>(items: T[]): ZebraSurfacePlan[] {
  return items.map((_, i) => zebraSurfaceAt(i))
}

export default zebraSurfaceAt
