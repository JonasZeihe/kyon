// src/components/Wrapper/ContainerWrapper.tsx
'use client'

import styled from 'styled-components'
import LumenWrapper from './LumenWrapper'

type Size = 'narrow' | 'default' | 'wide' | 'full'

type Props = {
  $size?: Size
  $padY?: boolean
}

const maxFor = (size: Size) => {
  switch (size) {
    case 'narrow':
      return '56rem'
    case 'wide':
      return '96rem'
    case 'full':
      return '100%'
    default:
      return '72rem'
  }
}

const s = (t: any, n = 1) =>
  typeof t?.spacing === 'function' ? t.spacing(n) : `${8 * n}px`

const ContainerWrapper = styled(LumenWrapper).attrs({
  variant: 'none' as const,
  padding: '0',
})<Props>`
  width: 100%;
  max-width: ${({ $size = 'default' }) => maxFor($size)};
  margin-inline: auto;
  box-sizing: border-box;
  padding-inline: ${({ theme }) =>
    `clamp(${s(theme, 1)}, 3vw, ${s(theme, 2)})`};
  ${({ $padY, theme }) =>
    $padY ? `padding-top:${s(theme, 2)}; padding-bottom:${s(theme, 2)};` : ''}
`

export default ContainerWrapper
