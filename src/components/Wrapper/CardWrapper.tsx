// src/components/Wrapper/CardWrapper.tsx
'use client'

import styled from 'styled-components'
import LumenWrapper from './LumenWrapper'

const CardWrapper = styled(LumenWrapper).attrs({ variant: 'subtle' as const })`
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  width: 100%;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus-within {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 98vw;
    margin: ${({ theme }) => theme.spacing(1)} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100vw;
    margin: 0;

    &:hover,
    &:focus-within {
      transform: none;
      box-shadow: ${({ theme }) => theme.boxShadow.xs};
    }
  }
`

export default CardWrapper
