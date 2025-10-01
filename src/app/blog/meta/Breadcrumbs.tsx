// src/app/blog/meta/Breadcrumbs.tsx
'use client'

import Link from 'next/link'
import styled from 'styled-components'
import ContainerWrapper from '@/components/Wrapper/ContainerWrapper'

type Crumb = { href?: string; label: string }

type Props = {
  items: Crumb[]
  homeLabel?: string
  showHome?: boolean
  separator?: string
  ariaLabel?: string
  className?: string
}

export default function Breadcrumbs({
  items,
  homeLabel = 'Home',
  showHome = true,
  separator = '/',
  ariaLabel = 'Brotkrumen',
  className,
}: Props) {
  return (
    <Outer
      as="nav"
      role="navigation"
      aria-label={ariaLabel}
      className={className}
    >
      <ContainerWrapper $size="default" $padY={false}>
        <List>
          {showHome && (
            <Item>
              <CrumbLink href="/">{homeLabel}</CrumbLink>
            </Item>
          )}
          {items.map((it, i) => {
            const last = i === items.length - 1
            return (
              <Item key={`${it.label}-${i}`}>
                <Separator aria-hidden="true">{separator}</Separator>
                {last || !it.href ? (
                  <Current aria-current="page" title={it.label}>
                    {it.label}
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
      </ContainerWrapper>
    </Outer>
  )
}

const Outer = styled.nav`
  width: 100%;
  background: transparent;
`

const List = styled.ol`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacingHalf(2)};
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing(1)} 0`};
  list-style: none;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
`

const Item = styled.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacingHalf(2)};
  min-height: 32px;
`

const Separator = styled.span`
  opacity: 0.55;
  user-select: none;
  padding-inline: ${({ theme }) => theme.spacingHalf(1)};
  line-height: 1;
`

const focusRing = (p: any) =>
  `0 0 0 3px ${p.theme.colors.accent?.[2] || p.theme.colors.primary[1]}`

const CrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.subtle};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacingHalf(3)}`};
  line-height: 1.2;
  display: inline-block;
  max-width: 32ch;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition:
    background 0.16s ease,
    color 0.16s ease,
    text-decoration-color 0.16s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent.main};
    background: ${({ theme }) => theme.colors.surface[1]};
    text-decoration: underline;
    text-underline-offset: 0.16em;
    text-decoration-thickness: 0.06em;
  }

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: ${focusRing};
    color: ${({ theme }) => theme.colors.accent.main};
    background: ${({ theme }) => theme.colors.surface[1]};
    text-decoration: underline;
  }
`

const Current = styled.span`
  color: ${({ theme }) => theme.colors.text.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacingHalf(3)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: transparent;
  max-width: 32ch;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.2;
`
