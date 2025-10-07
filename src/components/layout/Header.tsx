// src/components/layout/Header.tsx
'use client'

import React, { useEffect, useReducer, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiMenu,
  FiSearch,
} from 'react-icons/fi'
import { usePathname, useRouter } from 'next/navigation'
import SmoothScroller from '@/components/utilities/SmoothScroller'
import ThemeToggleButton from '@/components/button/ThemeToggleButton'
import Section from '@/components/primitives/Section'
import Inline from '@/components/primitives/Inline'
import Stack from '@/components/primitives/Stack'

type NavChild = { id: string; label: string }
type NavSection = { id: string; label: string; children?: NavChild[] }
type HeaderProps = { navSections?: NavSection[] }

type State = { menuOpen: boolean; openSubNav: string | null }
type Action =
  | { type: 'TOGGLE_MENU' }
  | { type: 'TOGGLE_SUBNAV'; payload: string }
  | { type: 'CLOSE_MENU' }

const PRIMARY_LINKS = [
  { href: '/', label: 'Home', match: (p: string) => p === '/' },
  { href: '/blog', label: 'Blog', match: (p: string) => p.startsWith('/blog') },
  {
    href: '/about',
    label: 'About',
    match: (p: string) => p.startsWith('/about'),
  },
]

export default function Header({ navSections = [] }: HeaderProps) {
  const pathname = usePathname() || '/'
  const router = useRouter()

  const headerRef = useRef<HTMLElement | null>(null)
  const menuContainerRef = useRef<HTMLDivElement | null>(null)

  const initial: State = { menuOpen: false, openSubNav: null }
  const reducer = (s: State, a: Action): State =>
    a.type === 'TOGGLE_MENU'
      ? { ...s, menuOpen: !s.menuOpen, openSubNav: null }
      : a.type === 'TOGGLE_SUBNAV'
        ? { ...s, openSubNav: s.openSubNav === a.payload ? null : a.payload }
        : initial
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    if (!headerRef.current) return
    const el = headerRef.current as HTMLElement
    const applyVars = () => {
      const h = el.offsetHeight || 64
      const gap = 12
      const progress = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--progress-height')
          .trim() || '3'
      )
      const scrollMargin = h + gap
      const stickyOffset = h + gap + progress
      document.documentElement.style.setProperty('--header-height', `${h}px`)
      document.documentElement.style.setProperty('--header-offset', `${h}px`)
      document.documentElement.style.setProperty(
        '--article-scroll-margin',
        `${scrollMargin}px`
      )
      document.documentElement.style.setProperty(
        '--sticky-offset',
        `${stickyOffset}px`
      )
    }
    applyVars()
    const obs = new ResizeObserver(applyVars)
    obs.observe(el)
    window.addEventListener('resize', applyVars)
    window.addEventListener('load', applyVars)
    return () => {
      obs.disconnect()
      window.removeEventListener('resize', applyVars)
      window.removeEventListener('load', applyVars)
    }
  }, [])

  useEffect(() => {
    const doc = document.documentElement
    if (state.menuOpen) {
      const prev = doc.style.overflow
      doc.style.overflow = 'hidden'
      const first = menuContainerRef.current?.querySelector<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      )
      first?.focus()
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          dispatch({ type: 'CLOSE_MENU' })
        }
        if (e.key === 'Tab' && menuContainerRef.current) {
          const focusables = Array.from(
            menuContainerRef.current.querySelectorAll<HTMLElement>(
              'a,button,select,textarea,input,[tabindex]:not([tabindex="-1"])'
            )
          ).filter(
            (el) =>
              !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
          )
          if (focusables.length) {
            const firstEl = focusables[0]
            const lastEl = focusables[focusables.length - 1]
            if (e.shiftKey && document.activeElement === firstEl) {
              lastEl.focus()
              e.preventDefault()
            } else if (!e.shiftKey && document.activeElement === lastEl) {
              firstEl.focus()
              e.preventDefault()
            }
          }
        }
      }
      window.addEventListener('keydown', onKey)
      return () => {
        doc.style.overflow = prev
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [state.menuOpen])

  const onLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push('/')
    }
    dispatch({ type: 'CLOSE_MENU' })
  }

  const renderSectionChildren = (children: NavChild[]) =>
    children.map((c) => (
      <SmoothScroller key={c.id} targetId={c.id}>
        <SubNavItem>{c.label}</SubNavItem>
      </SmoothScroller>
    ))

  const DesktopPrimary = () => (
    <nav aria-label="Primärnavigation">
      <Inline justify="start" align="center" gap={1}>
        {PRIMARY_LINKS.map((l) => {
          const active = l.match(pathname)
          return (
            <NavLink
              key={l.href}
              href={l.href}
              aria-current={active ? 'page' : undefined}
              $active={active}
            >
              {l.label}
            </NavLink>
          )
        })}
      </Inline>
    </nav>
  )

  const DesktopSections = () =>
    navSections.length ? (
      <nav aria-label="Kontextnavigation">
        <Inline justify="start" align="center" gap={0.75}>
          {navSections.map((s) => (
            <NavItemWrapper key={s.id}>
              <SmoothScroller targetId={s.id}>
                <SectionItem>{s.label}</SectionItem>
              </SmoothScroller>
              {!!s.children?.length && (
                <SubNav>{renderSectionChildren(s.children)}</SubNav>
              )}
            </NavItemWrapper>
          ))}
        </Inline>
      </nav>
    ) : null

  const MobileMenuContent = () => (
    <MobileMenu
      id="site-mobile-menu"
      role="navigation"
      aria-label="Mobiles Menü"
      ref={menuContainerRef}
    >
      <Stack gap={1}>
        <Stack gap={0.6}>
          {PRIMARY_LINKS.map((l) => {
            const active = l.match(pathname)
            return (
              <MobileLink
                key={l.href}
                href={l.href}
                $active={active}
                onClick={() => dispatch({ type: 'CLOSE_MENU' })}
              >
                {l.label}
              </MobileLink>
            )
          })}
        </Stack>
        {!!navSections.length && (
          <Stack gap={0.6} aria-label="Inhaltsnavigation">
            {navSections.map((s) => (
              <React.Fragment key={s.id}>
                <MobileNavItem>
                  <SmoothScroller targetId={s.id}>
                    <SectionItem>{s.label}</SectionItem>
                  </SmoothScroller>
                  {!!s.children?.length && (
                    <DropdownToggle
                      onClick={() =>
                        dispatch({ type: 'TOGGLE_SUBNAV', payload: s.id })
                      }
                      aria-label="Subnavigation umschalten"
                      aria-expanded={state.openSubNav === s.id}
                      aria-controls={`subnav-${s.id}`}
                    >
                      {state.openSubNav === s.id ? (
                        <FiChevronUp size={16} />
                      ) : (
                        <FiChevronDown size={16} />
                      )}
                    </DropdownToggle>
                  )}
                </MobileNavItem>
                {!!s.children?.length && (
                  <MobileSubNav
                    id={`subnav-${s.id}`}
                    $isOpen={state.openSubNav === s.id}
                  >
                    {renderSectionChildren(s.children)}
                  </MobileSubNav>
                )}
              </React.Fragment>
            ))}
          </Stack>
        )}
      </Stack>
    </MobileMenu>
  )

  return (
    <HeaderShell ref={headerRef as any} role="banner" aria-label="Seitenkopf">
      <Section container="default" padY={false}>
        <HeaderInner>
          <Inline justify="between" align="center" gap={1.25}>
            <Inline align="center" gap={0.75}>
              <LogoButton
                type="button"
                onClick={onLogoClick}
                aria-label="Zur Startseite"
              >
                <LogoText>Kyon</LogoText>
              </LogoButton>
            </Inline>

            <DesktopOnly>
              <Inline align="center" gap={1}>
                <DesktopPrimary />
                <DesktopSections />
                <Inline align="center" gap={0.6}>
                  <IconLink href="/search" aria-label="Suche öffnen">
                    <FiSearch size={18} />
                  </IconLink>
                  <ThemeToggleButton />
                </Inline>
              </Inline>
            </DesktopOnly>

            <MobileOnly>
              <Inline align="center" gap={0.4}>
                <IconLink href="/search" aria-label="Suche öffnen">
                  <FiSearch size={20} />
                </IconLink>
                <ThemeToggleButton />
                <MobileMenuButton
                  onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
                  aria-label={state.menuOpen ? 'Menü schließen' : 'Menü öffnen'}
                  aria-expanded={state.menuOpen}
                  aria-controls="site-mobile-menu"
                >
                  {state.menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </MobileMenuButton>
              </Inline>
            </MobileOnly>
          </Inline>

          {state.menuOpen && (
            <MobileOnly>
              <MobileMenuContent />
            </MobileOnly>
          )}
        </HeaderInner>
      </Section>
    </HeaderShell>
  )
}

const HeaderShell = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  background: ${({ theme }) => theme.semantic.surface};
  border-bottom: 1px solid ${({ theme }) => theme.semantic.border};
`

const HeaderInner = styled.div`
  padding: ${({ theme }) => `${theme.spacing(0.8)} 0`};
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing(1)} 0`};
  }
`

const DesktopOnly = styled.div`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`

const MobileOnly = styled.div`
  display: block;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const NavItemWrapper = styled.div`
  position: relative;
  &:hover > div {
    display: block;
  }
`

const SectionItem = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.semantic.fg};
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacingHalf(3)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.semantic.surface};
    outline: none;
  }
`

const SubNav = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 13rem;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.semantic.surface};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  display: none;
  z-index: 2;
`

const SubNavItem = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.semantic.fg};
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(1.25)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.semantic.surface};
    outline: none;
  }
`

const NavLink = styled(Link)<{ $active?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ $active, theme }) =>
    $active
      ? theme.typography.fontWeight.medium
      : theme.typography.fontWeight.regular};
  color: ${({ $active, theme }) =>
    $active ? theme.accentFor('primary').color : theme.semantic.fg};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.semantic.linkHover};
    background: ${({ theme }) => theme.semantic.surface};
    outline: none;
  }
`

const LogoButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
`

const LogoText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: ${({ theme }) => theme.gradients.rainbow};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  padding: 0 ${({ theme }) => theme.spacingHalf(2)};
  display: inline-block;
  line-height: 1;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.h3};
  }
`

const IconLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacingHalf(2)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  color: ${({ theme }) => theme.accentFor('primary').color};
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.semantic.linkHover};
    background: ${({ theme }) => theme.semantic.surface};
    outline: none;
  }
`

const MobileMenuButton = styled.button`
  border: 1px solid ${({ theme }) => theme.semantic.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) =>
    `${theme.spacingHalf(1.2)} ${theme.spacingHalf(2)}`};
  font-size: 1rem;
  cursor: pointer;
  color: ${({ theme }) => theme.accentFor('primary').color};
  display: inline-flex;
  align-items: center;
  background: transparent;
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.semantic.surface};
    outline: none;
  }
`

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.semantic.surface};
  border-bottom: 1px solid ${({ theme }) => theme.semantic.border};
  padding: ${({ theme }) => theme.spacing(1)};
  z-index: 10;
`

const MobileLink = styled(Link)<{ $active?: boolean }>`
  display: block;
  padding: ${({ theme }) => `${theme.spacing(0.8)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ $active, theme }) =>
    $active ? theme.accentFor('primary').color : theme.semantic.fg};
  background: transparent;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.semantic.border : 'transparent')};
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.semantic.surface};
    outline: none;
  }
`

const MobileNavItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(0.6)} 0`};
`

const DropdownToggle = styled.button`
  border: 1px solid ${({ theme }) => theme.semantic.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  color: ${({ theme }) => theme.accentFor('primary').color};
  padding: ${({ theme }) =>
    `${theme.spacingHalf(1.2)} ${theme.spacingHalf(2)}`};
  font-size: 1rem;
  background: transparent;
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.semantic.surface};
    outline: none;
  }
`

const MobileSubNav = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? '320px' : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  margin-left: ${({ theme }) => theme.spacing(0.6)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
  padding: ${({ $isOpen, theme }) => ($isOpen ? theme.spacing(0.7) : 0)};
  background: ${({ theme }) => theme.semantic.surface};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`
