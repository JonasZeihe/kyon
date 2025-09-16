// --- src/components/utilities/SmoothScroller.tsx ---
'use client'

import React from 'react'

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
  const handle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return
    e.preventDefault()
    const el = document.getElementById(targetId)
    if (!el) return
    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      })
    }
    history.replaceState(null, '', `#${targetId}`)
  }

  return (
    <a
      href={href ?? `#${targetId}`}
      onClick={handle}
      aria-label={`Scroll to ${targetId}`}
      {...rest}
    >
      {children}
    </a>
  )
}
