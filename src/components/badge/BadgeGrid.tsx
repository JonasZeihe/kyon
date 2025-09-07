// src/components/badge/BadgeGrid.tsx
'use client'

import React from 'react'
import styled from 'styled-components'
import Badge, { BadgeProps } from './Badge'

type BadgeItem = string | (Omit<BadgeProps, 'children'> & { key?: string })

export type BadgeGridProps = {
  badges: BadgeItem[]
  align?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
  gapSize?: number
  marginSize?: number
}

const StyledBadgeGrid = styled.div<{
  $align: string
  $gap: number
  $margin: number
}>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ $align }) => $align};
  gap: ${({ theme, $gap }) => theme.spacing($gap)};
  margin: ${({ theme, $margin }) => theme.spacing($margin)} 0;
`

export default function BadgeGrid({
  badges,
  align = 'center',
  gapSize = 2,
  marginSize = 1,
}: BadgeGridProps) {
  if (!badges?.length) return null

  return (
    <StyledBadgeGrid $align={align} $gap={gapSize} $margin={marginSize}>
      {badges.map((b, i) => {
        if (typeof b === 'string') {
          return <Badge key={`${b}-${i}`} label={b} />
        }
        const { key, ...rest } = b
        return <Badge key={key ?? `badge-${i}`} {...rest} />
      })}
    </StyledBadgeGrid>
  )
}
