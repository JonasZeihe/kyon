// src/components/Wrapper/PageWrapper.tsx
'use client'
import styled from 'styled-components'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  min-width: 0;
  position: relative;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.neutral.background};
`

export default PageWrapper
