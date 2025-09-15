// src/components/navigation/Breadcrumbs.tsx
'use client'

import Link from 'next/link'
import styled from 'styled-components'

type Crumb = { href?: string; label: string }
type Props = { items: Crumb[] }

const Nav = styled.nav`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing(1)} 0`};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
`

const List = styled.ol`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacingHalf(2)};
  margin: 0;
  padding: 0;
  list-style: none;
`

const Item = styled.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacingHalf(2)};
`

const Slash = styled.span`
  opacity: 0.55;
  user-select: none;
`

const CrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.subtle};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 2px 4px;
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: underline;
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[1]};
  }
`

const Current = styled.span`
  color: ${({ theme }) => theme.colors.text.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

export default function Breadcrumbs({ items }: Props) {
  return (
    <Nav aria-label="Brotkrumen">
      <List>
        <Item>
          <CrumbLink href="/">Home</CrumbLink>
        </Item>
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <Item key={`${it.label}-${i}`}>
              <Slash aria-hidden="true">/</Slash>
              {last || !it.href ? (
                <Current aria-current="page">{it.label}</Current>
              ) : (
                <CrumbLink href={it.href}>{it.label}</CrumbLink>
              )}
            </Item>
          )
        })}
      </List>
    </Nav>
  )
}
