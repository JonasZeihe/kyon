// src/components/navigation/Breadcrumbs.tsx
'use client'

import Link from 'next/link'
import styled from 'styled-components'

type Crumb = { href?: string; label: string }
type Props = { items: Crumb[] }

const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding-top: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
`

const Segment = styled.span`
  opacity: 0.9;
`

const Anchor = styled.span`
  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover,
  a:focus-visible {
    text-decoration: underline;
    outline: none;
  }
`

const Sep = styled.span`
  opacity: 0.45;
`

const Breadcrumbs = ({ items }: Props) => (
  <Nav aria-label="Brotkrumen">
    <Anchor>
      <Link href="/">Home</Link>
    </Anchor>
    {items.map((it, i) => (
      <Segment key={`${it.label}-${i}`}>
        <Sep> / </Sep>
        {it.href ? (
          <Anchor>
            <Link href={it.href}>{it.label}</Link>
          </Anchor>
        ) : (
          <Segment aria-current="page">{it.label}</Segment>
        )}
      </Segment>
    ))}
  </Nav>
)

export default Breadcrumbs
