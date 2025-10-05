// src/design/hooks/useAccent.ts
'use client'

import { useTheme } from 'styled-components'
import { AccentKey } from '@/design/theme'

type AccentInfo = {
  color: string
  border: string
  surfaceVariant: 'subtle'
  focusRing: string
}

export default function useAccent(key: AccentKey | 'neutral'): AccentInfo {
  const theme = useTheme() as any
  return theme.accentFor(key)
}
