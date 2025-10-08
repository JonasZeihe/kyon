// src/app/search/SearchClient.tsx
'use client'

import { useEffect, useMemo, useState, useCallback, useId } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import styled from 'styled-components'
import Link from 'next/link'
import type { PostMeta } from '@/lib/blog/types'
import Typography from '@/design/typography'
import Pager from '@/components/pagination/Pager'

type Props = { metas: PostMeta[] }

const PER_PAGE = 12
const DEBOUNCE_MS = 300

const Wrap = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`

const Header = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const SearchRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.spacing(1)};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const SearchBox = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing(1.1)} ${theme.spacing(1.5)}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  background: ${({ theme }) => theme.semantic.card};
  color: ${({ theme }) => theme.semantic.fg};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.semantic.focusRing};
  }
`

const ClearBtn = styled.button`
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(1.2)}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.semantic.surface};
  color: ${({ theme }) => theme.semantic.fg};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.semantic.hover};
    outline: none;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: ${({ theme }) => theme.spacing(2)};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1.5)};
  background: ${({ theme }) => theme.semantic.card};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.2s ease;
  &:hover,
  &:focus-within {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
  h2 a {
    text-decoration: none;
  }
`

const Meta = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.semantic.mutedFg};
  flex-wrap: wrap;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacingHalf(2)};
`

const Tag = styled.button`
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.semantic.surface};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.semantic.mutedFg};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  &:hover,
  &:focus-visible {
    outline: none;
    background: ${({ theme }) => theme.semantic.hover};
  }
`

const EmptyState = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.4)};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  background: ${({ theme }) => theme.semantic.card};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
`

const EmptySectionTitle = styled.h3`
  margin: 0.3rem 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.semantic.fg};
`

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacingHalf(2)};
`

const Chip = styled.button`
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1.1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  background: ${({ theme }) => theme.semantic.surface};
  color: ${({ theme }) => theme.semantic.fg};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  &:hover,
  &:focus-visible {
    outline: none;
    background: ${({ theme }) => theme.semantic.hover};
  }
`

const EmptyLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.2)};
  a {
    text-decoration: underline;
  }
`

function SearchInput({
  value,
  setValue,
  total,
}: {
  value: string
  setValue: (v: string) => void
  total: number
}) {
  const labelId = useId()
  return (
    <Header role="search" aria-labelledby={labelId}>
      <SearchRow>
        <SearchBox
          id="searchbox"
          type="search"
          placeholder="Suche nach Titel, Tags, Kategorie…"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          aria-label="Suchbegriff"
        />
        {value ? (
          <ClearBtn
            type="button"
            onClick={() => setValue('')}
            aria-label="Suche zurücksetzen"
          >
            Zurücksetzen
          </ClearBtn>
        ) : null}
      </SearchRow>
      <Typography as="p" variant="caption" color="mutedFg" id={labelId}>
        {value.trim()
          ? `${total} Ergebnis(se) für „${value.trim()}“`
          : `${total} Beiträge`}
      </Typography>
    </Header>
  )
}

function SearchResults({
  items,
  onChip,
}: {
  items: PostMeta[]
  onChip: (value: string) => void
}) {
  return (
    <Grid role="list">
      {items.map((m) => (
        <Card key={m.id} role="listitem">
          <Typography as="h2" variant="h3" gutter={false}>
            <Link href={`/blog/${m.category}/${m.slug}`}>{m.title}</Link>
          </Typography>
          <Meta>
            <span>
              {new Date(m.updated || m.date).toLocaleDateString('de-DE')}
            </span>
            {m.readingTime ? <span>· ⏱️ {m.readingTime} min</span> : null}
            <span>· {m.category}</span>
          </Meta>
          {m.excerpt ? (
            <Typography as="p" variant="body">
              {m.excerpt}
            </Typography>
          ) : null}
          {m.tags?.length ? (
            <Tags aria-label="Tags">
              {m.tags.slice(0, 6).map((t) => (
                <Tag
                  key={t}
                  onClick={() => onChip(t)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onChip(t)
                    }
                  }}
                  aria-label={`Nach Tag ${t} filtern`}
                >
                  #{t}
                </Tag>
              ))}
            </Tags>
          ) : null}
        </Card>
      ))}
    </Grid>
  )
}

function EmptyResults({
  topTags,
  categories,
  onChip,
}: {
  topTags: string[]
  categories: string[]
  onChip: (value: string) => void
}) {
  return (
    <EmptyState role="status" aria-live="polite">
      <Typography as="h2" variant="h3">
        Keine Ergebnisse
      </Typography>
      <Typography as="p" color="mutedFg">
        Versuch’s mit kürzeren Begriffen oder wähle unten eine Abkürzung.
      </Typography>

      {!!topTags.length && (
        <>
          <EmptySectionTitle>Beliebte Tags</EmptySectionTitle>
          <ChipRow>
            {topTags.map((t) => (
              <Chip
                key={t}
                onClick={() => onChip(t)}
                aria-label={`Nach Tag ${t} suchen`}
              >
                #{t}
              </Chip>
            ))}
          </ChipRow>
        </>
      )}

      {!!categories.length && (
        <>
          <EmptySectionTitle>Kategorien</EmptySectionTitle>
          <ChipRow>
            {categories.map((c) => (
              <Chip
                key={c}
                onClick={() => onChip(c)}
                aria-label={`Nach Kategorie ${c} suchen`}
              >
                {c}
              </Chip>
            ))}
          </ChipRow>
        </>
      )}

      <EmptyLinks>
        <Link href="/blog">Alle Beiträge ansehen</Link>
      </EmptyLinks>
    </EmptyState>
  )
}

export default function SearchClient({ metas }: Props) {
  const sp = useSearchParams()
  const router = useRouter()
  const pathname = usePathname() || '/search'

  const qParam = (sp.get('q') || '').trim()
  const [input, setInput] = useState(qParam)
  const page = Math.max(1, parseInt(sp.get('page') || '1', 10) || 1)

  useEffect(() => {
    setInput(qParam)
  }, [qParam])

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(sp.toString())
      const q = input.trim()
      if (q) next.set('q', q)
      else next.delete('q')
      next.delete('page')
      router.replace(`${pathname}?${next.toString()}`)
    }, DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [input, router, sp, pathname])

  const filtered = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (!q) return metas
    return metas.filter((m) => {
      const hay = [
        m.title,
        m.excerpt || '',
        (m.tags || []).join(' '),
        m.category,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [input, metas])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const start = (page - 1) * PER_PAGE
  const items = filtered.slice(start, start + PER_PAGE)

  useEffect(() => {
    if (page > pageCount) {
      const next = new URLSearchParams(sp.toString())
      next.set('page', String(pageCount))
      router.replace(`${pathname}?${next.toString()}`)
    }
  }, [page, pageCount, router, sp, pathname])

  const topTags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const m of metas)
      for (const t of m.tags || []) counts.set(t, (counts.get(t) || 0) + 1)
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([t]) => t)
  }, [metas])

  const categories = useMemo(
    () => Array.from(new Set(metas.map((m) => m.category))).slice(0, 8),
    [metas]
  )

  const onChip = useCallback((value: string) => setInput(value), [])

  const onPageChange = useCallback(
    (nextPage: number) => {
      const next = new URLSearchParams(sp.toString())
      next.set('page', String(nextPage))
      router.replace(`${pathname}?${next.toString()}`)
    },
    [router, sp, pathname]
  )

  return (
    <Wrap>
      <SearchInput value={input} setValue={setInput} total={filtered.length} />
      {!filtered.length ? (
        <EmptyResults
          topTags={topTags}
          categories={categories}
          onChip={onChip}
        />
      ) : (
        <>
          <SearchResults items={items} onChip={onChip} />
          {pageCount > 1 ? (
            <Pager
              current={page}
              pageCount={pageCount}
              ariaLabel="Seitennavigation"
              size="md"
              onPageChange={onPageChange}
            />
          ) : null}
        </>
      )}
    </Wrap>
  )
}
