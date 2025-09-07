// src/app/layout.tsx
import type { Metadata } from 'next'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'kyon',
  description: 'Prozess statt Pose. Natürlichkeit vor Methode.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
