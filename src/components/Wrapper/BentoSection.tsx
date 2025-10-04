// src/components/Wrapper/BentoSection.tsx
'use client'

import { ReactNode, Children } from 'react'
import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Grid from '@/components/primitives/Grid'
import Typography from '@/design/typography'

type Span = {
  col?: number
  row?: number
  align?: 'start' | 'center' | 'end' | 'stretch'
}

type Props = {
  title?: ReactNode
  subtitle?: ReactNode
  cta?: ReactNode
  children: ReactNode
  min?: string
  gap?: number | string
  columns?: number | 'auto'
  padY?: boolean
  wide?: boolean
  layout?: Span[]
  dense?: boolean
}

export default function BentoSection({
  title,
  subtitle,
  cta,
  children,
  min = '18rem',
  gap = 2,
  columns = 'auto',
  padY = true,
  wide = false,
  layout = [],
  dense = false,
}: Props) {
  return (
    <Section container={wide ? 'wide' : 'default'} padY={padY}>
      {(title || subtitle || cta) && (
        <Header>
          <Headings>
            {title ? (
              typeof title === 'string' ? (
                <Typography as="h2" variant="h2">
                  {title}
                </Typography>
              ) : (
                title
              )
            ) : null}
            {subtitle ? (
              typeof subtitle === 'string' ? (
                <Typography as="p" variant="body" color="mutedFg">
                  {subtitle}
                </Typography>
              ) : (
                subtitle
              )
            ) : null}
          </Headings>
          {cta ? <CtaWrap>{cta}</CtaWrap> : null}
        </Header>
      )}

      <Grid
        columns={columns}
        min={min}
        gap={gap}
        dense={dense}
        switchAt="md"
        aria-label="Bento Section"
      >
        {Children.toArray(children).map((child, i) => {
          const span = layout[i] || {}
          const col = span.col && span.col > 0 ? span.col : 1
          const row = span.row && span.row > 0 ? span.row : 1
          const align = span.align || 'stretch'
          return (
            <Item key={i} $col={col} $row={row} $align={align}>
              {child}
            </Item>
          )
        })}
      </Grid>
    </Section>
  )
}

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: ${({ theme }) => theme.spacing(1.5)};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    align-items: start;
    row-gap: ${({ theme }) => theme.spacing(1)};
  }
`

const Headings = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.5)};
`

const CtaWrap = styled.div`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`

const Item = styled.div<{
  $col: number
  $row: number
  $align: NonNullable<Span['align']>
}>`
  grid-column: span ${({ $col }) => $col};
  grid-row: span ${({ $row }) => $row};
  align-self: ${({ $align }) =>
    $align === 'start'
      ? 'start'
      : $align === 'end'
        ? 'end'
        : $align === 'center'
          ? 'center'
          : 'stretch'};
  > * {
    width: 100%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 1;
    grid-row: span 1;
    align-self: stretch;
  }
`
