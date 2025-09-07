'use client'

import React, { ReactNode } from 'react'
import styled from 'styled-components'

type ListItem = {
  id?: string | number
  icon: ReactNode
  text: ReactNode
}

type ListComponentProps = {
  items: ListItem[]
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin: ${({ theme }) => theme.spacing(3)} 0;
  padding: 0;
  list-style: none;
`

const ListItemWrapper = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing(1.2)};
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.surface.card};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface.hover};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing(1)};
    gap: ${({ theme }) => theme.spacing(0.8)};
  }
`

const IconWrapper = styled.span`
  font-size: 1.3rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`

const Content = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.main};
  word-break: break-word;

  & strong {
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.small};
  }
`

export default function ListComponent({ items }: ListComponentProps) {
  if (!Array.isArray(items) || items.length === 0) return null

  return (
    <List>
      {items.map(({ id, icon, text }, index) => (
        <ListItemWrapper key={id ?? `item-${index}`}>
          <IconWrapper aria-hidden="true">{icon}</IconWrapper>
          <Content>{text}</Content>
        </ListItemWrapper>
      ))}
    </List>
  )
}
