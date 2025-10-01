// src/app/(site)/layout.tsx
import type { ReactNode } from 'react'
import Shell from '@/layouts/Shell'
import PageLayout from '@/layouts/PageLayout'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <Shell>
      <PageLayout variant="none" size="wide">
        {children}
      </PageLayout>
    </Shell>
  )
}
