'use client'

import React, { ReactNode } from 'react'
import styled from 'styled-components'

type HighlightTextProps = {
  children: ReactNode
  color?: string
}

const StyledHighlightText = styled.span<{ $color?: string }>`
  color: ${({ theme, $color }) => $color ?? theme.colors.accent.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

export default function HighlightText({ children, color }: HighlightTextProps) {
  return <StyledHighlightText $color={color}>{children}</StyledHighlightText>
}
