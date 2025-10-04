// src/design/typography.tsx
'use client'

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { AccentKey } from '@/design/theme'

type Variant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption'
type Align = 'left' | 'right' | 'center' | 'justify'
type SemanticColor =
  | 'fg'
  | 'mutedFg'
  | 'link'
  | 'linkHover'
  | 'success'
  | 'warning'
  | 'danger'

type TypographyProps = {
  variant?: Variant
  align?: Align
  color?: SemanticColor
  accent?: AccentKey | 'neutral'
  gutter?: boolean
  as?: ElementType
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<'span'>, 'as' | 'color'>

const TAG_MAP: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subtitle: 'h4',
  body: 'p',
  caption: 'span',
}

const variantCSS = (v: Variant, t: DefaultTheme, gutter: boolean) => {
  const {
    typography: { fontSize, fontWeight, lineHeight, letterSpacing },
    spacing,
    semantic,
  } = t
  switch (v) {
    case 'h1':
      return css`
        font-size: ${fontSize.h1};
        font-weight: ${fontWeight.bold};
        line-height: ${lineHeight.tight};
        letter-spacing: ${letterSpacing.tight};
        color: ${semantic.fg};
        margin-bottom: ${gutter ? spacing(5) : 0};
      `
    case 'h2':
      return css`
        font-size: ${fontSize.h2};
        font-weight: ${fontWeight.bold};
        line-height: ${lineHeight.tight};
        letter-spacing: ${letterSpacing.tight};
        color: ${semantic.fg};
        margin-bottom: ${gutter ? spacing(4) : 0};
      `
    case 'h3':
      return css`
        font-size: ${fontSize.h3};
        font-weight: ${fontWeight.medium};
        line-height: ${lineHeight.normal};
        letter-spacing: ${letterSpacing.normal};
        color: ${semantic.fg};
        margin-bottom: ${gutter ? spacing(3) : 0};
      `
    case 'subtitle':
      return css`
        font-size: ${fontSize.body};
        font-weight: ${fontWeight.medium};
        line-height: ${lineHeight.normal};
        color: ${semantic.fg};
        margin-bottom: ${gutter ? spacing(2) : 0};
      `
    case 'caption':
      return css`
        font-size: ${fontSize.small};
        font-weight: ${fontWeight.light};
        line-height: ${lineHeight.tight};
        color: ${semantic.mutedFg};
        margin-bottom: ${gutter ? spacing(1) : 0};
      `
    default:
      return css`
        font-size: ${fontSize.body};
        font-weight: ${fontWeight.regular};
        line-height: ${lineHeight.normal};
        color: ${semantic.fg};
        margin-bottom: ${gutter ? spacing(2) : 0};
      `
  }
}

type StyledProps = {
  $variant: Variant
  $align: Align
  $gutter: boolean
  $semanticColor?: SemanticColor
  $accent?: AccentKey | 'neutral'
}

const StyledTypography = styled.span<StyledProps>`
  margin: 0;
  padding: 0;
  text-align: ${({ $align }) => $align};
  ${({ $variant, theme, $gutter }) => variantCSS($variant, theme, $gutter)}
  ${({ $semanticColor, $accent, theme }) => {
    if ($semanticColor) {
      return css`
        color: ${theme.semantic[$semanticColor]};
      `
    }
    if ($accent) {
      const a = theme.accentFor($accent)
      return css`
        color: ${a.color};
      `
    }
    return ''
  }}
`

export default function Typography({
  variant = 'body',
  align = 'left',
  color,
  accent,
  gutter = true,
  as,
  children,
  ...rest
}: TypographyProps) {
  const ComponentTag = as ?? TAG_MAP[variant] ?? 'p'
  return (
    <StyledTypography
      as={ComponentTag}
      $variant={variant}
      $align={align}
      $gutter={gutter}
      $semanticColor={color}
      $accent={accent}
      {...rest}
    >
      {children}
    </StyledTypography>
  )
}
