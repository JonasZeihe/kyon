'use client'

import React, { ReactNode } from 'react'

type SmoothScrollerProps = {
  targetId: string
  children: ReactNode
}

export default function SmoothScroller({
  targetId,
  children,
}: SmoothScrollerProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (!target) return

    try {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    } catch {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'inline-block',
      }}
      aria-label={`Scroll to ${targetId}`}
    >
      {children}
    </button>
  )
}
