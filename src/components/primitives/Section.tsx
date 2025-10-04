// src/components/primitives/Section.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import Container from './Container'

type ContainerSize = 'narrow' | 'default' | 'wide' | 'full'

type Props = {
  container?: ContainerSize
  padY?: boolean
  header?: ReactNode
  footer?: ReactNode
  ariaLabel?: string
  titleId?: string
  children?: ReactNode
} & Omit<React.ComponentPropsWithoutRef<'section'>, 'children'>

const Outer = styled.section`
  width: 100%;
  margin-block: ${({ theme }) => theme.rhythm.default.sectionGap};
`

const Inner = styled.div<{ $padY?: boolean }>`
  width: 100%;
  ${({ $padY, theme }) =>
    $padY ? `padding-block: ${theme.rhythm.default.sectionPad};` : ''}
`

export default function Section({
  container = 'default',
  padY = true,
  header,
  footer,
  ariaLabel,
  titleId,
  children,
  ...rest
}: Props) {
  return (
    <Outer
      role="region"
      aria-label={ariaLabel}
      aria-labelledby={titleId}
      {...rest}
    >
      <Inner $padY={padY}>
        <Container max={container}>
          {header ?? null}
          {children}
          {footer ?? null}
        </Container>
      </Inner>
    </Outer>
  )
}
