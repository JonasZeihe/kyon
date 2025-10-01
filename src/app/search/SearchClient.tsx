// src/app/search/SearchClient.tsx
'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import styled from 'styled-components'
import Link from 'next/link'
import type { PostMeta } from '@/lib/blog/types'
import Typography from '@/styles/Typography'

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
`

const SearchBox = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing(1.1)} ${theme.spacing(1.5)}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.surface[4]};
  background: ${({ theme }) => theme.colors.surface.card};
  color: ${({ theme }) => theme.colors.text.main};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
`

const ClearBtn = styled.button`
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(1.2)}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.surface[1]};
  color: ${({ theme }) => theme.colors.text.main};
  border: 1px solid ${({ theme }) => theme.colors.surface[4]};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surface.hover};
    outline: none;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing(2)};
`

const Card = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1.5)};
  background: ${({ theme }) => theme.colors.surface.card};
  border: 1px solid ${({ theme }) => theme.colors.surface[4]};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
`

const Meta = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacingHalf(2)};
`

const Tag = styled.button`
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.colors.surface[1]};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  border: 1px solid ${({ theme }) => theme.colors.surface[4]};
  &:hover,
  &:focus-visible {
    outline: none;
    background: ${({ theme }) => theme.colors.surface.hover};
  }
`

const Pager = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacingHalf(2)};
  justify-content: center;
`

const PageBtn = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1.1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary[3] : theme.colors.surface[4]};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary[1] : theme.colors.surface.card};
  color: ${({ theme }) => theme.colors.text.main};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  &:hover,
  &:focus-visible {
    outline: none;
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary[1] : theme.colors.surface.hover};
  }
`

const EmptyState = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.4)};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.surface[4]};
  background: ${({ theme }) => theme.colors.surface.card};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
`

const EmptySectionTitle = styled.h3`
  margin: 0.3rem 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text.main};
`

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacingHalf(2)};
`

const Chip = styled.button`
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1.1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border: 1px solid ${({ theme }) => theme.colors.surface[4]};
  background: ${({ theme }) => theme.colors.surface[1]};
  color: ${({ theme }) => theme.colors.text.main};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  &:hover,
  &:focus-visible {
    outline: none;
    background: ${({ theme }) => theme.colors.surface.hover};
  }
`

const EmptyLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.2)};
  a {
    text-decoration: underline;
  }
`

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
  const chipKeyHandler = useCallback(
    (value: string) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onChip(value)
      }
    },
    [onChip]
  )

  const clear = useCallback(() => setInput(''), [])

  return (
    <Wrap>
      <Header role="search">
        <SearchRow>
          <SearchBox
            type="search"
            placeholder="Suche nach Titel, Tags, Kategorie…"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            aria-label="Suchbegriff"
          />
          {input ? (
            <ClearBtn
              type="button"
              onClick={clear}
              aria-label="Suche zurücksetzen"
            >
              Zurücksetzen
            </ClearBtn>
          ) : null}
        </SearchRow>
        <Typography as="p" variant="caption" color="text.subtle">
          {input.trim()
            ? `${filtered.length} Ergebnis(se) für „${input.trim()}“`
            : `${filtered.length} Beiträge`}
        </Typography>
      </Header>

      {!filtered.length ? (
        <EmptyState role="status" aria-live="polite">
          <Typography as="h2" variant="h3">
            Keine Ergebnisse
          </Typography>
          <Typography as="p" color="text.subtle">
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
                    onKeyDown={chipKeyHandler(t)}
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
                    onKeyDown={chipKeyHandler(c)}
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
      ) : (
        <>
          <Grid>
            {items.map((m) => (
              <Card key={m.id}>
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
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLButtonElement>
                        ) => {
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

          {pageCount > 1 && (
            <Pager aria-label="Seitennavigation">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => {
                const next = new URLSearchParams(sp.toString())
                next.set('page', String(p))
                return (
                  <PageBtn
                    key={p}
                    $active={p === page}
                    onClick={() =>
                      router.replace(`${pathname}?${next.toString()}`)
                    }
                    aria-current={p === page ? 'page' : undefined}
                    aria-label={`Seite ${p}`}
                    title={`Seite ${p}`}
                  >
                    {p}
                  </PageBtn>
                )
              })}
            </Pager>
          )}
        </>
      )}
    </Wrap>
  )
}
