'use client'
import styled from 'styled-components'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  min-width: 0;
  position: relative;
  box-sizing: border-box;
  padding-top: ${({ theme }) => theme.spacing(0.5)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: ${({ theme }) => theme.spacing(1.5)};
    padding-left: ${({ theme }) => theme.spacing(1)};
    padding-right: ${({ theme }) => theme.spacing(1)};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: ${({ theme }) => theme.spacing(0.5)};
    padding-left: ${({ theme }) => theme.spacing(0.5)};
    padding-right: ${({ theme }) => theme.spacing(0.5)};
  }
  transition: background 0.26s cubic-bezier(0.55, 0.22, 0.33, 1.08);
`

export default PageWrapper
