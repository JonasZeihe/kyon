// src/components/utilities/HighlightText.tsx
'use client'

import React, { ReactNode } from 'react'
import styled from 'styled-components'
import useAccent from '@/design/hooks/useAccent'
import type { AccentKey } from '@/design/theme'

type HighlightTextProps = {
  children: ReactNode
  color?: string
  accent?: AccentKey | 'neutral'
}

const StyledHighlightText = styled.span<{ $color?: string }>`
  color: ${({ $color }) => $color ?? 'inherit'};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export default function HighlightText({
  children,
  color,
  accent = 'accent',
}: HighlightTextProps) {
  const a = useAccent(accent)
  const resolved = color ?? (accent !== 'neutral' ? a.color : undefined)

  return <StyledHighlightText $color={resolved}>{children}</StyledHighlightText>
}
