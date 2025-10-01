// src/app/search/page.tsx
import { getAllPostMeta } from '@/lib/blog/indexer'
import type { Metadata } from 'next'
import Typography from '@/styles/Typography'
import SectionWrapper from '@/components/Wrapper/SectionWrapper'
import LumenWrapper from '@/components/Wrapper/LumenWrapper'
import SearchClient from './SearchClient'

export const dynamic = 'force-static'
export const revalidate = false

export const metadata: Metadata = {
  title: 'Suche',
  description: 'Beiträge durchsuchen',
}

export default function Page() {
  const metas = getAllPostMeta()

  return (
    <main>
      <SectionWrapper $spacious>
        <Typography variant="h1" align="center" color="primary.main">
          Suche
        </Typography>
        <Typography align="center" color="text.subtle">
          Beiträge durchsuchen
        </Typography>
        <LumenWrapper as="header" variant="subtle" radius="large">
          <SearchClient metas={metas} />
        </LumenWrapper>
      </SectionWrapper>
    </main>
  )
}
