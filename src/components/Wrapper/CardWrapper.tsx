// src/components/Wrapper/CardWrapper.tsx
'use client'

import styled from 'styled-components'

const CardWrapper = styled.div`
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
    &:hover,
    &:focus-within {
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.boxShadow.sm};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    &:hover,
    &:focus-within {
      transform: none;
      box-shadow: ${({ theme }) => theme.boxShadow.xs};
    }
  }
`

export default CardWrapper
