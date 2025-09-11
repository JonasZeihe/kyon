// src/components/navigation/Breadcrumbs.tsx
'use client'
import Link from 'next/link'
import styled from 'styled-components'
type Crumb = { href?: string; label: string }
type Props = { items: Crumb[] }
const W = styled.nav`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
`
const S = styled.span`
  opacity: 0.8;
`
const A = styled.span`
  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover,
  a:focus-visible {
    text-decoration: underline;
  }
`
const Sep = styled.span`
  opacity: 0.4;
`
const Breadcrumbs = ({ items }: Props) => (
  <W aria-label="Breadcrumb">
    <A>
      <Link href="/">Home</Link>
    </A>
    {items.map((it, i) => (
      <S key={`${it.label}-${i}`}>
        <Sep> / </Sep>
        {it.href ? (
          <A>
            <Link href={it.href}>{it.label}</Link>
          </A>
        ) : (
          <S aria-current="page">{it.label}</S>
        )}
      </S>
    ))}
  </W>
)
export default Breadcrumbs
