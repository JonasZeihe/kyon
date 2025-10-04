// src/components/data-display/ListComponent.tsx
'use client'

import React, { ReactNode, useMemo } from 'react'
import styled, { css } from 'styled-components'

type ListItem = {
  id?: string | number
  icon?: ReactNode
  text?: ReactNode
}

type Mode = 'list' | 'cards' | 'card'
type Align = 'left' | 'center' | 'right'

type ListComponentProps = {
  items: ListItem[]
  mode?: Mode
  align?: Align
  title?: ReactNode
}

const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.2)};
`

const Header = styled.div`
  display: grid;
`

const List = styled.ul<{ $mode: Exclude<Mode, 'card'>; $align: Align }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  margin: ${({ theme }) => theme.spacing(2)} 0 0;
  padding: 0;
  list-style: none;
  ${({ $mode }) =>
    $mode === 'cards' &&
    css`
      grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    `}
  ${({ $align }) =>
    $align !== 'left' &&
    css`
      justify-items: ${$align};
      text-align: ${$align};
    `}
`

const Item = styled.li<{ $mode: Exclude<Mode, 'card'> }>`
  ${({ theme, $mode }) =>
    $mode === 'cards'
      ? css`
          display: grid;
          grid-template-rows: auto 1fr;
          gap: ${theme.spacing(1)};
          align-items: start;
          justify-items: center;
          padding: ${theme.spacing(1.25)};
          border-radius: ${theme.borderRadius.large};
          background: ${theme.semantic.card};
          border: 1px solid ${theme.semantic.border};
          box-shadow: ${theme.boxShadow.xs};
        `
      : css`
          display: grid;
          grid-template-columns: auto 1fr;
          gap: ${theme.spacing(1.2)};
          align-items: flex-start;
          padding: ${theme.spacing(1.25)};
          border-radius: ${theme.borderRadius.medium};
          background: ${theme.semantic.card};
          border: 1px solid ${theme.semantic.border};
          box-shadow: ${theme.boxShadow.xs};
          transition:
            background 0.2s ease,
            box-shadow 0.2s ease;
          &:hover {
            background: ${theme.semantic.hover};
            box-shadow: ${theme.boxShadow.md};
          }
        `}
`

const Icon = styled.span<{ $mode: Exclude<Mode, 'card'> }>`
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.accentFor('primary').color};
  ${({ $mode }) =>
    $mode === 'cards'
      ? css`
          font-size: 1.55rem;
        `
      : css`
          font-size: 1.25rem;
        `}
`

const Body = styled.div<{ $mode: Exclude<Mode, 'card'> }>`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.semantic.fg};
  word-break: break-word;
  ${({ $mode }) =>
    $mode === 'cards' &&
    css`
      max-width: 42ch;
    `}
  & strong {
    color: ${({ theme }) => theme.accentFor('primary').color};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`

const normalize = (it: ListItem) => {
  const icon = it.icon ?? ''
  const text = it.text ?? ''
  if (
    typeof icon === 'string' &&
    (!text || (typeof text === 'string' && text.trim() === ''))
  ) {
    const m =
      icon.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*(.*)$/u) || null
    if (m) return { id: it.id, icon: m[1], text: (m[2] || '').trim() }
  }
  return { id: it.id, icon, text }
}

export default function ListComponent({
  items,
  mode = 'list',
  align = 'left',
  title,
}: ListComponentProps) {
  const resolvedMode: Exclude<Mode, 'card'> = mode === 'card' ? 'cards' : mode
  const data = useMemo(
    () =>
      (items || []).map((raw, i) => {
        const n = normalize(raw)
        return { ...n, id: n.id ?? `item-${i}` }
      }),
    [items]
  )
  if (!data.length) return null
  return (
    <Wrapper>
      {title ? <Header>{title}</Header> : null}
      <List $mode={resolvedMode} $align={align}>
        {data.map(({ id, icon, text }) => (
          <Item key={id as string | number} $mode={resolvedMode}>
            <Icon $mode={resolvedMode} aria-hidden="true">
              {icon}
            </Icon>
            <Body $mode={resolvedMode}>{text}</Body>
          </Item>
        ))}
      </List>
    </Wrapper>
  )
}
