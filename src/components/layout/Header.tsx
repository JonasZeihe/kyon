// src/components/layout/Header.tsx
'use client'

import React, { useEffect, useReducer, useRef, useState } from 'react'
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
import Typography from '@/design/typography'

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
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const initial: State = { menuOpen: false, openSubNav: null }
  const reducer = (s: State, a: Action): State =>
    a.type === 'TOGGLE_MENU'
      ? { ...s, menuOpen: !s.menuOpen, openSubNav: null }
      : a.type === 'TOGGLE_SUBNAV'
        ? { ...s, openSubNav: s.openSubNav === a.payload ? null : a.payload }
        : initial
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    const onScroll = () => {
      const offsets = navSections.map((v) => ({
        id: v.id,
        offsetTop: document.getElementById(v.id)?.offsetTop || 0,
      }))
      const y = window.scrollY + window.innerHeight / 2
      const current = offsets.filter((v) => y >= v.offsetTop).pop()
      if (current?.id !== activeSection) setActiveSection(current?.id ?? null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [activeSection, navSections])

  useEffect(() => {
    if (!headerRef.current) return
    const el = headerRef.current as HTMLElement
    const applyVars = () => {
      const h = el.offsetHeight || 74
      const scrollMargin = h + 12
      document.documentElement.style.setProperty('--header-height', `${h}px`)
      document.documentElement.style.setProperty('--header-offset', `${h}px`)
      document.documentElement.style.setProperty(
        '--article-scroll-margin',
        `${scrollMargin}px`
      )
    }
    applyVars()
    const obs = new ResizeObserver(applyVars)
    obs.observe(el)
    window.addEventListener('resize', applyVars)
    return () => {
      obs.disconnect()
      window.removeEventListener('resize', applyVars)
    }
  }, [])

  const renderSectionChildren = (children: NavChild[]) =>
    children.map((c) => (
      <SmoothScroller key={c.id} targetId={c.id}>
        <SubNavItem $isActive={activeSection === c.id}>{c.label}</SubNavItem>
      </SmoothScroller>
    ))

  const DesktopPrimary = () => (
    <nav aria-label="Primärnavigation">
      <Inline justify="start" align="center" gap={2}>
        {PRIMARY_LINKS.map((l) => {
          const active = l.match(pathname)
          return (
            <NavLink
              key={l.href}
              href={l.href}
              $active={active}
              aria-current={active ? 'page' : undefined}
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
        <Inline justify="start" align="center" gap={2}>
          {navSections.map((s) => (
            <NavItemWrapper key={s.id}>
              <SmoothScroller targetId={s.id}>
                <SectionItem $isActive={activeSection === s.id}>
                  {s.label}
                </SectionItem>
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
    >
      <Stack gap={1.2}>
        <Stack gap={0.8}>
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
          <Stack gap={0.8} aria-label="Inhaltsnavigation">
            {navSections.map((s) => (
              <React.Fragment key={s.id}>
                <MobileNavItem>
                  <SmoothScroller targetId={s.id}>
                    <SectionItem $isActive={activeSection === s.id}>
                      {s.label}
                    </SectionItem>
                  </SmoothScroller>
                  {!!s.children?.length && (
                    <DropdownToggle
                      onClick={() =>
                        dispatch({ type: 'TOGGLE_SUBNAV', payload: s.id })
                      }
                      aria-label={
                        state.openSubNav === s.id
                          ? 'Subnavigation schließen'
                          : 'Subnavigation öffnen'
                      }
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

  const onLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push('/')
    }
    dispatch({ type: 'CLOSE_MENU' })
  }

  return (
    <HeaderShell ref={headerRef as any}>
      <Section container="default" padY>
        <Inline justify="between" align="center" gap={2}>
          <Inline align="center" gap={1.5}>
            <LogoButton
              type="button"
              onClick={onLogoClick}
              aria-label="Zur Startseite"
            >
              <LogoText>Kyon</LogoText>
            </LogoButton>
          </Inline>

          <DesktopOnly>
            <Inline align="center" gap={2}>
              <DesktopPrimary />
              <DesktopSections />
              <Inline align="center" gap={1.2}>
                <IconLink href="/search" aria-label="Suche öffnen">
                  <FiSearch size={18} />
                </IconLink>
                <ThemeToggleButton />
              </Inline>
            </Inline>
          </DesktopOnly>

          <MobileOnly>
            <Inline align="center" gap={1}>
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
                {state.menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </MobileMenuButton>
            </Inline>
          </MobileOnly>
        </Inline>
        {state.menuOpen && (
          <MobileOnly>
            <MobileMenuContent />
          </MobileOnly>
        )}
      </Section>
    </HeaderShell>
  )
}

const HeaderShell = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  background: ${({ theme }) => theme.semantic.surface};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  border-bottom: 1px solid ${({ theme }) => theme.semantic.border};
  transition:
    box-shadow 0.2s ease,
    background 0.2s ease;
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

const SectionItem = styled.div<{ $isActive?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ $isActive, theme }) =>
    $isActive
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.regular};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.accentFor('primary').color : theme.semantic.fg};
  cursor: pointer;
  transition: color 0.16s ease;
`

const SubNav = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 13rem;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  background: ${({ theme }) => theme.semantic.surface};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  display: none;
  z-index: 2;
`

const SubNavItem = styled.div<{ $isActive?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.accentFor('primary').color : theme.semantic.fg};
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(1.5)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition:
    background 0.14s ease,
    color 0.16s ease;
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.semantic.surface};
    outline: none;
  }
`

const NavLink = styled(Link)<{ $active?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ $active, theme }) =>
    $active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.regular};
  color: ${({ $active, theme }) =>
    $active ? theme.accentFor('primary').color : theme.semantic.fg};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition:
    color 0.16s ease,
    background 0.16s ease;
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
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: ${({ theme }) => theme.gradients.rainbow};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  padding: 0 ${({ theme }) => theme.spacing(1)};
  display: inline-block;
  line-height: 1;
`

const IconLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacingHalf(2)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  color: ${({ theme }) => theme.accentFor('primary').color};
  transition:
    background 0.14s ease,
    color 0.14s ease;
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
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1)}`};
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.accentFor('primary').color};
  display: inline-flex;
  align-items: center;
  transition:
    background 0.14s ease,
    color 0.14s ease,
    border-color 0.14s ease;
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
  padding: ${({ theme }) => theme.spacing(2)};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  z-index: 10;
`

const MobileLink = styled(Link)<{ $active?: boolean }>`
  display: block;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(1.2)}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  color: ${({ $active, theme }) =>
    $active ? theme.accentFor('primary').color : theme.semantic.fg};
  background: transparent;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.semantic.border : 'transparent')};
  transition:
    background 0.14s ease,
    color 0.16s ease,
    border-color 0.16s ease;
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
  padding: ${({ theme }) => `${theme.spacing(1)} 0`};
`

const DropdownToggle = styled.button`
  border: 1px solid ${({ theme }) => theme.semantic.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  color: ${({ theme }) => theme.accentFor('primary').color};
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacingHalf(3)}`};
  font-size: 1rem;
  transition:
    background 0.14s ease,
    color 0.14s ease,
    border-color 0.14s ease;
  background: transparent;
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.semantic.surface};
    outline: none;
  }
`

const MobileSubNav = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  transition:
    max-height 0.28s cubic-bezier(0.4, 0.2, 0.6, 1),
    opacity 0.25s ease,
    padding 0.2s ease;
  max-height: ${({ $isOpen }) => ($isOpen ? '320px' : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  margin-left: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.75)};
  padding: ${({ $isOpen, theme }) => ($isOpen ? theme.spacing(1) : 0)};
  background: ${({ theme }) => theme.semantic.surface};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`
