// src/components/utilities/SmoothScroller.tsx
'use client'

import React, { useCallback } from 'react'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  targetId: string
}

export default function SmoothScroller({
  targetId,
  children,
  onClick,
  href,
  ...rest
}: Props) {
  const handle = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(e)
      if (e.defaultPrevented) return
      e.preventDefault()

      const el = document.getElementById(targetId)
      if (!el) return

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth'

      try {
        el.scrollIntoView({ behavior, block: 'start' })
      } catch {
        const top =
          el.getBoundingClientRect().top +
          (window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0)
        window.scrollTo({ top, behavior })
      }

      try {
        history.replaceState(null, '', `#${targetId}`)
      } catch {}
    },
    [onClick, targetId]
  )

  return (
    <a
      href={href ?? `#${targetId}`}
      onClick={handle}
      aria-label={rest['aria-label'] ?? `Zu Abschnitt ${targetId} springen`}
      {...rest}
    >
      {children}
    </a>
  )
}
