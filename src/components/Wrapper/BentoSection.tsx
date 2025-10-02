// src/components/Wrapper/BentoSection.tsx
'use client'

import { ReactNode, Children } from 'react'
import styled, { css } from 'styled-components'
import ContainerWrapper from './ContainerWrapper'
import LumenWrapper from './LumenWrapper'

type Span = {
  col?: number
  row?: number
  tone?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'highlight'
  align?: 'start' | 'center' | 'end' | 'stretch'
  interactive?: boolean
}

type Props = {
  title?: ReactNode
  subtitle?: ReactNode
  cta?: ReactNode
  children: ReactNode
  min?: string
  gap?: number
  columns?: number | 'auto'
  padY?: boolean
  wide?: boolean
  layout?: Span[]
  surface?: 'subtle' | 'intense' | 'none'
  dense?: boolean
  tiles?: {
    tone?: Span['tone']
    align?: Span['align']
    interactive?: boolean
    padding?: string
    radius?: 'small' | 'medium' | 'large'
  }
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
  surface = 'none',
  dense = false,
  tiles,
}: Props) {
  const defaultTile: Required<Omit<Span, 'col' | 'row'>> = {
    tone: tiles?.tone ?? 'neutral',
    align: tiles?.align ?? 'stretch',
    interactive: tiles?.interactive ?? true,
  }

  const radius = tiles?.radius ?? 'large'
  const padding = tiles?.padding

  return (
    <Outer>
      <ContainerWrapper $size={wide ? 'wide' : 'default'} $padY={padY}>
        {(title || subtitle || cta) && (
          <Header>
            <Headings>
              {title ? <Title>{title}</Title> : null}
              {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
            </Headings>
            {cta ? <CtaWrap>{cta}</CtaWrap> : null}
          </Header>
        )}

        {surface === 'none' ? (
          <Grid
            $min={min}
            $gap={gap}
            $columns={columns}
            $dense={dense}
            aria-label="Bento Section"
          >
            {Children.toArray(children).map((child, i) => {
              const span = layout[i] || {}
              const col = span.col && span.col > 0 ? span.col : 1
              const row = span.row && span.row > 0 ? span.row : 1
              const tone = span.tone ?? defaultTile.tone
              const align = span.align ?? defaultTile.align
              const interactive =
                span.interactive != null
                  ? span.interactive
                  : defaultTile.interactive

              return (
                <Item key={i} $col={col} $row={row}>
                  <Tile
                    as={LumenWrapper}
                    $tone={tone}
                    $align={align}
                    $interactive={interactive}
                    radius={radius}
                    padding={padding}
                    variant="subtle"
                  >
                    {child}
                  </Tile>
                </Item>
              )
            })}
          </Grid>
        ) : (
          <Surface
            as="section"
            aria-label="Bento Section"
            variant={surface}
            radius="large"
          >
            <Grid $min={min} $gap={gap} $columns={columns} $dense={dense}>
              {Children.toArray(children).map((child, i) => {
                const span = layout[i] || {}
                const col = span.col && span.col > 0 ? span.col : 1
                const row = span.row && span.row > 0 ? span.row : 1
                const tone = span.tone ?? defaultTile.tone
                const align = span.align ?? defaultTile.align
                const interactive =
                  span.interactive != null
                    ? span.interactive
                    : defaultTile.interactive

                return (
                  <Item key={i} $col={col} $row={row}>
                    <Tile
                      as={LumenWrapper}
                      $tone={tone}
                      $align={align}
                      $interactive={interactive}
                      radius={radius}
                      padding={padding}
                      variant="subtle"
                    >
                      {child}
                    </Tile>
                  </Item>
                )
              })}
            </Grid>
          </Surface>
        )}
      </ContainerWrapper>
    </Outer>
  )
}

const Outer = styled.div`
  width: 100%;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: ${({ theme }) => theme.spacing(1.5)};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`

const Headings = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.5)};
`

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text.main};
`

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.subtle};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`

const CtaWrap = styled.div`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`

const Surface = styled(LumenWrapper)`
  padding: ${({ theme }) => theme.spacing(2)};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing(1.25)};
  }
`

const Grid = styled.div<{
  $min: string
  $gap: number
  $columns: number | 'auto'
  $dense: boolean
}>`
  display: grid;
  ${({ theme, $gap }) => css`
    gap: ${theme.spacing($gap)};
  `}
  grid-auto-flow: ${({ $dense }) => ($dense ? 'row dense' : 'row')};
  ${({ $columns, $min }) =>
    $columns === 'auto'
      ? css`
          grid-template-columns: repeat(auto-fit, minmax(${$min}, 1fr));
        `
      : css`
          grid-template-columns: repeat(${$columns}, minmax(0, 1fr));
        `}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const Item = styled.div<{ $col: number; $row: number }>`
  grid-column: span ${({ $col }) => $col};
  grid-row: span ${({ $row }) => $row};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 1;
    grid-row: span 1;
  }
`

const Tile = styled.div<{
  $tone: NonNullable<Span['tone']>
  $align: NonNullable<Span['align']>
  $interactive: boolean
}>`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: ${({ $align }) =>
    $align === 'center'
      ? 'center'
      : $align === 'end'
        ? 'flex-end'
        : 'flex-start'};
  align-items: ${({ $align }) =>
    $align === 'start' || $align === 'end' ? 'stretch' : 'center'};
  background: ${({ theme }) => theme.colors.surface.card};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  position: relative;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    background 0.2s ease,
    border-color 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    border-top: 2px solid
      ${({ theme, $tone }) =>
        $tone === 'neutral'
          ? theme.colors.neutral.border
          : (theme.colors as any)[$tone]?.[3] || theme.colors.neutral.border};
    opacity: 0.75;
  }

  ${({ $interactive, theme }) =>
    $interactive
      ? css`
          &:hover,
          &:focus-within {
            transform: translateY(-1px);
            box-shadow: ${theme.boxShadow.md};
          }
        `
      : ''}

  > * {
    width: 100%;
  }
`
