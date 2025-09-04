import React from 'react'
import styled from 'styled-components'

const ButtonGridWrapper = styled.div`
  display: grid;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1.5)} 0;
  gap: ${({ theme }) => theme.spacing(1.3)};
  justify-content: center;
  grid-template-columns: ${({ theme, buttonCount }) => {
    if (buttonCount === 1) return `minmax(${theme.spacing(20)}, 340px)`
    if (buttonCount === 2) return `repeat(2, minmax(${theme.spacing(14)}, 1fr))`
    if (buttonCount === 3) return `repeat(3, minmax(${theme.spacing(13)}, 1fr))`
    return `repeat(auto-fit, minmax(${theme.spacing(12)}, 1fr))`
  }};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: ${({ theme, buttonCount }) =>
      buttonCount < 3
        ? `1fr`
        : `repeat(auto-fit, minmax(${theme.spacing(12)}, 1fr))`};
    gap: ${({ theme }) => theme.spacing(1.8)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`

export default function ButtonGrid({ children }) {
  const buttonCount = React.Children.count(children)
  return (
    <ButtonGridWrapper buttonCount={buttonCount}>{children}</ButtonGridWrapper>
  )
}
