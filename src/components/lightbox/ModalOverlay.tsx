'use client'

import React, { useEffect, useRef, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { FaTimes } from 'react-icons/fa'

type ModalOverlayProps = {
  onClose: () => void
  children: ReactNode
}

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`
const popIn = keyframes`from{opacity:0;transform:translateY(28px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 12000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3vw 2vw;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(20,22,34,0.85)' : 'rgba(230,238,255,0.55)'};
  backdrop-filter: blur(1.5px) saturate(1.02);
  animation: ${fadeIn} 0.22s cubic-bezier(0.55, 0.13, 0.45, 1.05);
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
`

const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  min-width: 0;
  max-height: 92vh;
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.surface.cardAlpha};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  overflow-y: auto;
  overflow-x: hidden;
  outline: none;
  animation: ${popIn} 0.25s cubic-bezier(0.61, 0.13, 0.38, 1.15);
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    `${theme.colors.primary[2]} ${theme.colors.surface[1]}`};
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface[1]};
    border-radius: ${({ theme }) => theme.borderRadius.large};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary[2]};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    border: 2px solid ${({ theme }) => theme.colors.surface[1]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 95vw;
    max-height: 90vh;
    padding: ${({ theme }) => theme.spacing(2.5)};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 90vw;
    max-height: 85vh;
    padding: ${({ theme }) => theme.spacing(1.5)};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }
`

const Close = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing(1.5)};
  right: ${({ theme }) => theme.spacing(1.5)};
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface[2]};
  color: ${({ theme }) => theme.colors.text.subtle};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.33rem;
  cursor: pointer;
  z-index: 10;
  transition:
    background 0.15s,
    color 0.15s;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.surface[1]};
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: ${({ theme }) => theme.spacing(0.7)};
    right: ${({ theme }) => theme.spacing(0.7)};
    width: 34px;
    height: 34px;
    font-size: 1rem;
  }
`

let modalOpen = 0

export default function ModalOverlay({ onClose, children }: ModalOverlayProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const mounted = typeof document !== 'undefined'

  useEffect(() => {
    if (!mounted) return
    modalOpen += 1
    if (modalOpen === 1) {
      document.body.style.overflow = 'hidden'
      ;(document.body.style as any).touchAction = 'none'
    }
    return () => {
      modalOpen -= 1
      if (modalOpen === 0) {
        document.body.style.overflow = ''
        ;(document.body.style as any).touchAction = ''
      }
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const prev = document.activeElement as HTMLElement | null
    const t = setTimeout(() => modalRef.current?.focus(), 6)
    return () => {
      clearTimeout(t)
      prev?.focus?.()
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const trap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab') return
      const node = modalRef.current
      if (!node) return
      const focusables = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    }
    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [mounted, onClose])

  if (!mounted) return null

  return ReactDOM.createPortal(
    <Overlay onClick={onClose} role="dialog" aria-modal="true">
      <Content
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <Close onClick={onClose} aria-label="Modal schließen">
          <FaTimes size={22} />
        </Close>
        {children}
      </Content>
    </Overlay>,
    document.body
  )
}
