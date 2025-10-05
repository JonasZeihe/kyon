// src/components/primitives/Section.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import Container from './Container'

type ContainerSize = 'narrow' | 'default' | 'wide' | 'full'
type RhythmKey = 'compact' | 'default' | 'spacious'

type Props = {
  container?: ContainerSize
  padY?: boolean
  header?: ReactNode
  footer?: ReactNode
  ariaLabel?: string
  titleId?: string
  rhythm?: RhythmKey
  children?: ReactNode
} & Omit<React.ComponentPropsWithoutRef<'section'>, 'children'>

const Outer = styled.section<{ $rhythm: RhythmKey }>`
  width: 100%;
  margin-block: ${({ theme, $rhythm }) => theme.rhythm[$rhythm].sectionGap};
`

const Inner = styled.div<{ $padY?: boolean; $rhythm: RhythmKey }>`
  width: 100%;
  ${({ $padY, theme, $rhythm }) =>
    $padY ? `padding-block: ${theme.rhythm[$rhythm].sectionPad};` : ''}
`

export default function Section({
  container = 'default',
  padY = true,
  header,
  footer,
  ariaLabel,
  titleId,
  rhythm = 'default',
  children,
  ...rest
}: Props) {
  return (
    <Outer
      role="region"
      aria-label={ariaLabel}
      aria-labelledby={titleId}
      $rhythm={rhythm}
      {...rest}
    >
      <Inner $padY={padY} $rhythm={rhythm}>
        <Container max={container}>
          {header ?? null}
          {children}
          {footer ?? null}
        </Container>
      </Inner>
    </Outer>
  )
}
