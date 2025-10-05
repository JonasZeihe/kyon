// src/components/pagination/Pager.tsx
'use client'

import Link from 'next/link'
import styled from 'styled-components'
import Typography from '@/design/typography'

type PagerSize = 'sm' | 'md'

type Props = {
  current: number
  pageCount: number
  prevHref?: string | null
  nextHref?: string | null
  ariaLabel?: string
  size?: PagerSize
  onPageChange?: (page: number) => void
}

export default function Pager({
  current,
  pageCount,
  prevHref = null,
  nextHref = null,
  ariaLabel = 'Seitennavigation',
  size = 'md',
  onPageChange,
}: Props) {
  const canPrev = current > 1
  const canNext = current < pageCount

  return (
    <Nav role="navigation" aria-label={ariaLabel}>
      {onPageChange ? (
        <>
          <PagerButton
            type="button"
            onClick={() => canPrev && onPageChange(current - 1)}
            disabled={!canPrev}
            $size={size}
            aria-label="Zurück"
          >
            ← Zurück
          </PagerButton>

          <Typography
            as="span"
            variant="caption"
            color="mutedFg"
            gutter={false}
          >
            Seite {current} / {pageCount}
          </Typography>

          <PagerButton
            type="button"
            onClick={() => canNext && onPageChange(current + 1)}
            disabled={!canNext}
            $size={size}
            aria-label="Weiter"
          >
            Weiter →
          </PagerButton>
        </>
      ) : (
        <>
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
            color="mutedFg"
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
        </>
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

const sharedButton = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition:
    transform 0.12s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
`

const focusRing = (theme: any) => `
  outline: 2px solid transparent;
  box-shadow: 0 0 0 3px ${theme.semantic.focusRing};
`

const PagerLink = styled(Link)<{ $size: PagerSize }>`
  ${sharedButton}
  padding: ${({ theme, $size }) => padFor($size, theme)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  background: ${({ theme }) => theme.semantic.card};
  color: ${({ theme }) => theme.semantic.fg};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    filter: brightness(1.03);
  }
  &:active {
    transform: translateY(1px);
  }
  &:focus-visible {
    ${({ theme }) => focusRing(theme)}
  }
`

const PagerButton = styled.button<{ $size: PagerSize }>`
  ${sharedButton}
  padding: ${({ theme, $size }) => padFor($size, theme)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  background: ${({ theme }) => theme.semantic.card};
  color: ${({ theme }) => theme.semantic.fg};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    filter: brightness(1.03);
  }
  &:active {
    transform: translateY(1px);
  }
  &:focus-visible {
    ${({ theme }) => focusRing(theme)}
  }

  &:disabled {
    border: 1px dashed ${({ theme }) => theme.semantic.border};
    background: ${({ theme }) => theme.semantic.surface};
    color: ${({ theme }) => theme.semantic.mutedFg};
    opacity: 0.6;
    pointer-events: none;
    box-shadow: none;
  }
`

const PagerGhost = styled.span<{ $size: PagerSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme, $size }) => padFor($size, theme)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px dashed ${({ theme }) => theme.semantic.border};
  background: ${({ theme }) => theme.semantic.surface};
  color: ${({ theme }) => theme.semantic.mutedFg};
  opacity: 0.6;
  pointer-events: none;
`
