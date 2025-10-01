// src/components/pagination/Pager.tsx
'use client'

import Link from 'next/link'
import styled from 'styled-components'
import Typography from '@/styles/Typography'

type PagerSize = 'sm' | 'md'

type Props = {
  current: number
  pageCount: number
  prevHref?: string | null
  nextHref?: string | null
  ariaLabel?: string
  size?: PagerSize
}

export default function Pager({
  current,
  pageCount,
  prevHref = null,
  nextHref = null,
  ariaLabel = 'Seitennavigation',
  size = 'md',
}: Props) {
  return (
    <Nav role="navigation" aria-label={ariaLabel}>
      {prevHref ? (
        <PagerLink href={prevHref} prefetch={false} rel="prev" $size={size}>
          ← Zurück
        </PagerLink>
      ) : (
        <PagerGhost aria-disabled="true" $size={size}>
          ← Zurück
        </PagerGhost>
      )}

      <Typography
        as="span"
        variant="caption"
        color="text.subtle"
        gutter={false}
      >
        Seite {current} / {pageCount}
      </Typography>

      {nextHref ? (
        <PagerLink href={nextHref} prefetch={false} rel="next" $size={size}>
          Weiter →
        </PagerLink>
      ) : (
        <PagerGhost aria-disabled="true" $size={size}>
          Weiter →
        </PagerGhost>
      )}
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
  justify-content: center;
  align-items: center;
`

const padFor = (s: PagerSize, theme: any) =>
  s === 'sm'
    ? `${theme.spacingHalf(2.5)} ${theme.spacing(1)}`
    : `${theme.spacingHalf(3)} ${theme.spacing(1.25)}`

const PagerLink = styled(Link)<{ $size: PagerSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme, $size }) => padFor($size, theme)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  background: ${({ theme }) => theme.colors.surface.card};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  text-decoration: none;
  transition:
    transform 0.12s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    filter: brightness(1.03);
  }
  &:active {
    transform: translateY(1px);
  }
`

const PagerGhost = styled.span<{ $size: PagerSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme, $size }) => padFor($size, theme)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px dashed ${({ theme }) => theme.colors.surface[4]};
  background: ${({ theme }) => theme.colors.surface[1]};
  color: ${({ theme }) => theme.colors.text.subtle};
  opacity: 0.6;
  pointer-events: none;
`
