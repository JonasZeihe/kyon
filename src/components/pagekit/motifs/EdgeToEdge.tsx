// src/components/pagekit/motifs/EdgeToEdge.tsx
export type MotifKey = 'spotlight' | 'edgeToEdge' | 'none'

const EdgeToEdge = {
  hero: { motif: 'edgeToEdge' as MotifKey, container: 'wide' as const },
  section: { motif: 'edgeToEdge' as MotifKey },
}

export default EdgeToEdge
