// --- src/components/Wrapper/ContainerWrapper.tsx ---
'use client'

import styled from 'styled-components'

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
      return '80rem'
    case 'full':
      return '100%'
    default:
      return '72rem'
  }
}

const s = (t: any, n = 1) =>
  typeof t?.spacing === 'function' ? t.spacing(n) : `${8 * n}px`

const bp = (t: any, key: string, fallback: string) =>
  (t?.breakpoints && t.breakpoints[key]) || fallback

const horizontalPad = ({ theme }: any) => `
  padding-left: ${s(theme, 2)};
  padding-right: ${s(theme, 2)};
  @media (max-width: ${bp(theme, 'md', '900px')}) {
    padding-left: ${s(theme, 1.25)};
    padding-right: ${s(theme, 1.25)};
  }
  @media (max-width: ${bp(theme, 'sm', '600px')}) {
    padding-left: ${s(theme, 0.75)};
    padding-right: ${s(theme, 0.75)};
  }
`

const verticalPad = ({ theme }: any) => `
  padding-top: ${s(theme, 2)};
  padding-bottom: ${s(theme, 2)};
  @media (max-width: ${bp(theme, 'md', '900px')}) {
    padding-top: ${s(theme, 1.5)};
    padding-bottom: ${s(theme, 1.5)};
  }
`

const ContainerWrapper = styled.div<Props>`
  width: 100%;
  max-width: ${({ $size = 'default' }) => maxFor($size)};
  margin-left: auto;
  margin-right: auto;
  ${horizontalPad}
  ${({ $padY }) => ($padY ? verticalPad : '')}
  box-sizing: border-box;
`

export default ContainerWrapper
