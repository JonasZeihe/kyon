// src/components/lightbox/Lightbox.tsx
'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Navigation from './Navigation'

type MediaItem =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; alt?: string }

type LightboxProps = {
  media: MediaItem[]
  currentIndex?: number
  onClose: () => void
}

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 15000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  animation: ${fadeIn} 0.3s ease-out;
`

const Frame = styled.div`
  max-width: 95vw;
  max-height: 95vh;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const StyledVideo = styled.video`
  max-width: 95vw;
  max-height: 95vh;
  display: block;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: #000;
`

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 15100;
  background: rgba(255, 255, 255, 0.92);
  transition:
    background 0.2s ease,
    transform 0.2s ease;
  &:hover {
    background: rgba(231, 76, 60, 0.95);
    transform: scale(1.05);
  }
`

const NavButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: fixed;
  top: 50%;
  ${({ $direction }) =>
    $direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 15100;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.05);
  }
`

export default function Lightbox({
  media,
  currentIndex = 0,
  onClose,
}: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [mounted, setMounted] = useState(false)
  const isCarousel = media.length > 1
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const portalTarget = useMemo(() => {
    if (!mounted) return null
    const el =
      document.getElementById('__next') ||
      document.body ||
      document.documentElement
    return el
  }, [mounted])

  const navigate = useCallback(
    (direction: -1 | 1) =>
      setActiveIndex((i) => (i + direction + media.length) % media.length),
    [media.length]
  )

  const trapTabKey = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab') return
    const root = overlayRef.current
    if (!root) return
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement as HTMLElement | null
    if (e.shiftKey) {
      if (active === first || !root.contains(active)) {
        last.focus()
        e.preventDefault()
      }
    } else {
      if (active === last) {
        first.focus()
        e.preventDefault()
      }
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && isCarousel) navigate(-1)
      if (e.key === 'ArrowRight' && isCarousel) navigate(1)
      if (e.key === 'Tab') trapTabKey(e)
    },
    [onClose, isCarousel, navigate, trapTabKey]
  )

  useEffect(() => {
    if (!mounted) return
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    const timer = setTimeout(() => closeRef.current?.focus(), 0)
    const preventTouchScroll = (e: TouchEvent) => e.preventDefault()
    document.addEventListener('touchmove', preventTouchScroll, {
      passive: false,
    })
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchmove', preventTouchScroll)
      restoreFocusRef.current?.focus?.()
    }
  }, [mounted, handleKeyDown])

  if (!mounted || !portalTarget) return null

  const { type, src, alt } = media[activeIndex]

  return ReactDOM.createPortal(
    <Overlay
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      onClick={onClose}
    >
      <Frame onClick={(e) => e.stopPropagation()}>
        {type === 'image' ? (
          <Navigation src={src} alt={alt} onClose={onClose} />
        ) : (
          <StyledVideo
            src={src}
            controls
            autoPlay
            aria-label={alt || `Video ${activeIndex + 1}`}
          />
        )}
      </Frame>

      <CloseButton ref={closeRef} onClick={onClose} aria-label="Close dialog">
        <FaTimes size={20} />
      </CloseButton>

      {isCarousel && (
        <>
          <NavButton
            $direction="left"
            onClick={(e) => {
              e.stopPropagation()
              navigate(-1)
            }}
            aria-label="Previous media"
          >
            <FaChevronLeft size={20} />
          </NavButton>
          <NavButton
            $direction="right"
            onClick={(e) => {
              e.stopPropagation()
              navigate(1)
            }}
            aria-label="Next media"
          >
            <FaChevronRight size={20} />
          </NavButton>
        </>
      )}
    </Overlay>,
    portalTarget
  )
}
