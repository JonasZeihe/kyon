// src/components/Wrapper/SectionWrapper.tsx
'use client'

import styled, { css } from 'styled-components'

type SectionProps = {
  $spacious?: boolean
}

const getVerticalSpacing = (theme: any, spacious?: boolean) =>
  spacious
    ? css`
        padding-top: ${theme.spacing(6)};
        padding-bottom: ${theme.spacing(6)};
        margin-top: ${theme.spacing(6)};
        margin-bottom: ${theme.spacing(6)};
      `
    : css`
        padding-top: ${theme.spacing(3)};
        padding-bottom: ${theme.spacing(3)};
        margin-top: ${theme.spacing(3)};
        margin-bottom: ${theme.spacing(3)};
      `

const SectionWrapper = styled.section<SectionProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: ${({ theme }) => theme.spacing(2)};
  ${({ theme, $spacious }) => getVerticalSpacing(theme, $spacious)}
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing(1.2)};
    ${({ theme, $spacious }) =>
      $spacious
        ? css`
            padding-top: ${theme.spacing(3.5)};
            padding-bottom: ${theme.spacing(3.5)};
            margin-top: ${theme.spacing(4)};
            margin-bottom: ${theme.spacing(4)};
          `
        : css`
            padding-top: ${theme.spacing(1.5)};
            padding-bottom: ${theme.spacing(1.5)};
            margin-top: ${theme.spacing(2)};
            margin-bottom: ${theme.spacing(2)};
          `}
  }
`

export default SectionWrapper
