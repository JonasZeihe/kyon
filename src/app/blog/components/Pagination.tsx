// src/app/blog/components/Pagination.tsx
'use client'

import Link from 'next/link'
import styled from 'styled-components'

type Props = {
  page: number
  pageCount: number
  basePath?: string
  makeHref?: (p: number) => string
}

const Wrap = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  margin: ${({ theme }) => theme.spacing(2)} 0;
`

const Btn = styled(Link)<{ $active?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing(0.9)} ${theme.spacing(1.5)}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary.base : theme.colors.surface[2]};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.inverse : theme.colors.text.main};
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  pointer-events: ${({ $active }) => ($active ? 'none' : 'auto')};
  opacity: ${({ $active }) => ($active ? 0.95 : 1)};
  transition: transform 0.12s ease;
  &:hover {
    transform: translateY(-1px);
  }
`

const Ellipsis = styled.span`
  padding: ${({ theme }) => `${theme.spacing(0.9)} ${theme.spacing(1.2)}`};
  color: ${({ theme }) => theme.colors.text.subtle};
`

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

const buildPages = (page: number, pageCount: number) => {
  const pages: (number | '...')[] = []
  const window = 1
  const first = 1
  const last = pageCount
  const start = Math.max(first, page - window)
  const end = Math.min(last, page + window)
  if (start > first) {
    pages.push(first)
    if (start > first + 1) pages.push('...')
  }
  pages.push(...range(start, end))
  if (end < last) {
    if (end < last - 1) pages.push('...')
    pages.push(last)
  }
  return pages
}

const joinPage = (base: string, p: number) =>
  base.includes('?') ? `${base}&page=${p}` : `${base}?page=${p}`

export default function Pagination({
  page,
  pageCount,
  basePath = '',
  makeHref,
}: Props) {
  if (pageCount <= 1) return null
  const items = buildPages(page, pageCount)
  const href = (p: number) => (makeHref ? makeHref(p) : joinPage(basePath, p))

  return (
    <Wrap aria-label="Pagination">
      {page > 1 && (
        <Btn href={href(page - 1)} aria-label="Vorherige Seite">
          ‹
        </Btn>
      )}
      {items.map((it, i) =>
        it === '...' ? (
          <Ellipsis key={`e-${i}`}>…</Ellipsis>
        ) : (
          <Btn
            key={it}
            href={href(it)}
            aria-current={it === page ? 'page' : undefined}
            $active={it === page}
          >
            {it}
          </Btn>
        )
      )}
      {page < pageCount && (
        <Btn href={href(page + 1)} aria-label="Nächste Seite">
          ›
        </Btn>
      )}
    </Wrap>
  )
}
