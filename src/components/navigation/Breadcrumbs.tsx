// src/components/navigation/Breadcrumbs.tsx
'use client'

import Link from 'next/link'
import styled from 'styled-components'
import Typography from '@/styles/Typography'

type Crumb = { href?: string; label: string }

type Props = {
  items: Crumb[]
  ariaLabel?: string
  separator?: string
}

export default function Breadcrumbs({
  items,
  ariaLabel = 'Brotkrumen',
  separator = '›',
}: Props) {
  return (
    <Nav role="navigation" aria-label={ariaLabel}>
      <List>
        <Item>
          <CrumbLink href="/">Home</CrumbLink>
        </Item>
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <Item key={`${it.label}-${i}`}>
              <Separator aria-hidden="true">{separator}</Separator>
              {last || !it.href ? (
                <Current aria-current="page" title={it.label}>
                  <Typography as="span" variant="caption">
                    {it.label}
                  </Typography>
                </Current>
              ) : (
                <CrumbLink href={it.href} title={it.label}>
                  {it.label}
                </CrumbLink>
              )}
            </Item>
          )
        })}
      </List>
    </Nav>
  )
}

const Nav = styled.nav`
  width: 100%;
  background: transparent;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

const List = styled.ol`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacingHalf(2)};
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing(0.5)} 0`};
  list-style: none;
`

const Item = styled.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacingHalf(2)};
  min-height: 28px;
`

const Separator = styled.span`
  opacity: 0.7;
  user-select: none;
  padding-inline: ${({ theme }) => theme.spacingHalf(1)};
  line-height: 1;
`

const CrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.subtle};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacingHalf(3)}`};
  line-height: 1.2;
  display: inline-block;
  max-width: 36ch;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition:
    background 0.16s ease,
    color 0.16s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.accent.main};
    background: ${({ theme }) => theme.colors.surface[1]};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.semantic.focusRing};
  }
`

const Current = styled.span`
  color: ${({ theme }) => theme.colors.text.main};
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacingHalf(3)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  line-height: 1.2;
  max-width: 36ch;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
