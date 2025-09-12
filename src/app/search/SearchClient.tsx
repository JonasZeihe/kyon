// src/app/search/SearchClient.tsx
'use client'

import { useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import styled from 'styled-components'
import Link from 'next/link'
import type { PostMeta } from '@/lib/blog/types'

type Props = { metas: PostMeta[] }
const PER_PAGE = 12

export default function SearchClient({ metas }: Props) {
  const sp = useSearchParams()
  const router = useRouter()

  const q = (sp.get('q') || '').trim().toLowerCase()
  const page = Math.max(1, parseInt(sp.get('page') || '1', 10) || 1)

  const filtered = useMemo(() => {
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
  }, [q, metas])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const start = (page - 1) * PER_PAGE
  const items = filtered.slice(start, start + PER_PAGE)

  const onChange = (value: string) => {
    const next = new URLSearchParams(sp.toString())
    if (value.trim()) next.set('q', value)
    else next.delete('q')
    next.delete('page')
    router.replace(`/search?${next.toString()}`)
  }

  return (
    <Wrap>
      <Header>
        <H1>Suche</H1>
        <SearchBox
          type="search"
          placeholder="Suche nach Titel, Tags, Kategorie…"
          defaultValue={q}
          onChange={(e) => onChange(e.currentTarget.value)}
          aria-label="Suchbegriff"
        />
        <Hint>
          {q
            ? `${filtered.length} Ergebnis(se) für „${q}“`
            : `${filtered.length} Beiträge`}
        </Hint>
      </Header>

      <Grid>
        {items.map((m) => (
          <Card key={m.id}>
            <Title>
              <Link href={`/blog/${m.category}/${m.slug}`}>{m.title}</Link>
            </Title>
            <Meta>
              <span>
                {new Date(m.updated || m.date).toLocaleDateString('de-DE')}
              </span>
              {m.readingTime ? <span>· {m.readingTime} min</span> : null}
              <span>· {m.category}</span>
            </Meta>
            {m.excerpt ? <Excerpt>{m.excerpt}</Excerpt> : null}
            {m.tags?.length ? (
              <Tags>
                {m.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </Tags>
            ) : null}
          </Card>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Pager>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => {
            const next = new URLSearchParams(sp.toString())
            next.set('page', String(p))
            return (
              <PageBtn
                key={p}
                $active={p === page}
                onClick={() => router.replace(`/search?${next.toString()}`)}
              >
                {p}
              </PageBtn>
            )
          })}
        </Pager>
      )}
    </Wrap>
  )
}

const Wrap = styled.main`
  max-width: 72rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(2)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`

const Header = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const H1 = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
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

const Hint = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
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
  background: ${({ theme }) => theme.colors.surface.cardAlpha};
  border: 1px solid ${({ theme }) => theme.colors.surface[4]};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
`

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  a {
    color: ${({ theme }) => theme.colors.text.main};
    text-decoration: none;
  }
  a:hover,
  a:focus-visible {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: underline;
  }
`

const Meta = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
`

const Excerpt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.main};
  opacity: 0.92;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacingHalf(2)};
`

const Tag = styled.span`
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.colors.surface[1]};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
`

const Pager = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacingHalf(2)};
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
`
