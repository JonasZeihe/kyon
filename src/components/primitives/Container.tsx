// src/components/primitives/Container.tsx
'use client'

import styled from 'styled-components'

type Max = 'narrow' | 'default' | 'wide' | 'full'

const widths: Record<Exclude<Max, 'full'>, string> = {
  narrow: '48rem',
  default: '72rem',
  wide: '96rem',
}

const Container = styled.div<{ max?: Max }>`
  width: 100%;
  max-width: ${({ max = 'default' }) =>
    max === 'full' ? 'none' : widths[max]};
  margin-inline: auto;
  padding-inline: clamp(0.5rem, 2vw, 1rem);
`

export default Container
