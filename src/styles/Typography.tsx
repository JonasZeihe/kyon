// --- src/styles/Typography.tsx ---
'use client'
import React, { ComponentPropsWithoutRef, ReactNode, ElementType } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'

type Variant = 'h1' | 'h2' | 'h3' | 'subhead' | 'body' | 'caption'
type Align = 'left' | 'right' | 'center' | 'justify'

type TypographyProps = {
  variant?: Variant
  align?: Align
  color?: string
  gutter?: boolean
  fontSize?: string
  as?: ElementType
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<'span'>, 'as' | 'color'>

const TAG_MAP: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subhead: 'h4',
  body: 'p',
  caption: 'span',
}

const variantCSS = (v: Variant, t: DefaultTheme, gutter: boolean) => {
  const {
    typography: { fontSize, fontWeight, lineHeight, letterSpacing },
    spacing,
    colors: {
      text: { main, subtle },
    },
  } = t

  switch (v) {
    case 'h1':
      return css`
        font-size: ${fontSize.h1};
        font-weight: ${fontWeight.bold};
        line-height: ${lineHeight.tight};
        letter-spacing: ${letterSpacing.tight};
        color: ${main};
        margin-bottom: ${gutter ? spacing(5) : 0};
      `
    case 'h2':
      return css`
        font-size: ${fontSize.h2};
        font-weight: ${fontWeight.bold};
        line-height: ${lineHeight.tight};
        letter-spacing: ${letterSpacing.tight};
        color: ${main};
        margin-bottom: ${gutter ? spacing(4) : 0};
      `
    case 'h3':
      return css`
        font-size: ${fontSize.h3};
        font-weight: ${fontWeight.medium};
        line-height: ${lineHeight.normal};
        letter-spacing: ${letterSpacing.normal};
        color: ${main};
        margin-bottom: ${gutter ? spacing(3) : 0};
      `
    case 'subhead':
      return css`
        font-size: ${fontSize.body};
        font-weight: ${fontWeight.medium};
        line-height: ${lineHeight.normal};
        color: ${main};
        margin-bottom: ${gutter ? spacing(2) : 0};
      `
    case 'caption':
      return css`
        font-size: ${fontSize.small};
        font-weight: ${fontWeight.light};
        line-height: ${lineHeight.tight};
        color: ${subtle};
        margin-bottom: ${gutter ? spacing(1) : 0};
      `
    default:
      return css`
        font-size: ${fontSize.body};
        font-weight: ${fontWeight.regular};
        line-height: ${lineHeight.normal};
        color: ${main};
        margin-bottom: ${gutter ? spacing(2) : 0};
      `
  }
}

const getThemeColor = (token: string | undefined, theme: DefaultTheme) => {
  if (!token) return null
  const [group, tone = 'main'] = token.split('.')
  const groupAny = (theme.colors as Record<string, any>)[group]
  if (groupAny && tone in groupAny) return groupAny[tone]
  const textAny = (theme.colors.text as Record<string, any>)[tone]
  return textAny ?? null
}

type StyledProps = {
  $variant: Variant
  $align: Align
  $gutter: boolean
  $colorToken?: string
  $fontSize?: string
}

const StyledTypography = styled.span<StyledProps>`
  margin: 0;
  padding: 0;
  text-align: ${({ $align }) => $align};
  ${({ $variant, theme, $gutter }) => variantCSS($variant, theme, $gutter)}
  ${({ $colorToken, theme }) => {
    const themeColor = getThemeColor($colorToken, theme)
    return themeColor
      ? css`
          color: ${themeColor};
        `
      : ''
  }}
  ${({ $fontSize }) =>
    $fontSize
      ? css`
          font-size: ${$fontSize};
        `
      : ''}
`

export default function Typography({
  variant = 'body',
  align = 'left',
  color,
  gutter = true,
  fontSize,
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
      $colorToken={color}
      $fontSize={fontSize}
      {...rest}
    >
      {children}
    </StyledTypography>
  )
}
