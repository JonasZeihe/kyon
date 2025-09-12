// src/components/layout/Header.tsx
'use client'

import React, { useReducer, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiMenu,
  FiSearch,
} from 'react-icons/fi'
import SmoothScroller from '@/components/utilities/SmoothScroller'
import ThemeToggleButton from '@/components/button/ThemeToggleButton'
import { usePathname } from 'next/navigation'

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
  { href: '/tags', label: 'Tags', match: (p: string) => p.startsWith('/tags') },
  {
    href: '/search',
    label: 'Suche',
    match: (p: string) => p.startsWith('/search'),
  },
]

const Header = ({ navSections = [] }: HeaderProps) => {
  const pathname = usePathname() || '/'
  const isArticle = /^\/blog\/[^/]+\/[^/]+\/?$/.test(pathname)
  const headerRef = useRef<HTMLElement | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)

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
    if (!isArticle) {
      setHidden(false)
      return
    }
    let lastY = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const down = y > lastY
        const passed = y > 120
        setHidden(down && passed)
        if (y < 24) setHidden(false)
        lastY = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isArticle])

  const renderSectionChildren = (children: NavChild[]) =>
    children.map((c) => (
      <SmoothScroller key={c.id} targetId={c.id}>
        <SubNavItem $isActive={activeSection === c.id}>{c.label}</SubNavItem>
      </SmoothScroller>
    ))

  const DesktopPrimary = () => (
    <DesktopNav role="navigation" aria-label="Primärnavigation">
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
    </DesktopNav>
  )

  const DesktopSections = () =>
    navSections.length ? (
      <DesktopNav role="navigation" aria-label="Kontextnavigation">
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
      </DesktopNav>
    ) : null

  const MobileMenuContent = () => (
    <MobileMenu
      id="site-mobile-menu"
      role="navigation"
      aria-label="Mobiles Menü"
    >
      <MobileGroup>
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
      </MobileGroup>
      {!!navSections.length && (
        <MobileGroup aria-label="Inhaltsnavigation">
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
        </MobileGroup>
      )}
    </MobileMenu>
  )

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch({ type: 'CLOSE_MENU' })
  }

  return (
    <HeaderContainer ref={headerRef as any} $hidden={hidden}>
      <HeaderContent>
        <LeftSide>
          <Logo
            as="button"
            type="button"
            onClick={goTop}
            aria-label="Zur Startseite scrollen"
          >
            Jonas Zeihe
          </Logo>
        </LeftSide>
        <RightSide>
          <DesktopOnly>
            <DesktopPrimary />
            <DesktopSections />
            <IconRow>
              <IconLink href="/search" aria-label="Suche öffnen">
                <FiSearch size={18} />
              </IconLink>
              <ThemeToggleButton />
            </IconRow>
          </DesktopOnly>
          <MobileOnly>
            <IconRow>
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
            </IconRow>
          </MobileOnly>
        </RightSide>
      </HeaderContent>
      {state.menuOpen && (
        <MobileOnly>
          <MobileMenuContent />
        </MobileOnly>
      )}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header<{ $hidden: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(22,24,32,0.65)' : 'rgba(255,255,255,0.55)'};
  backdrop-filter: blur(8px) saturate(1.02);
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface[4]};
  transition:
    background 0.25s,
    box-shadow 0.2s,
    transform 0.22s ease;
  transform: translateY(${({ $hidden }) => ($hidden ? '-110%' : '0')});
`

const HeaderContent = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  height: 4.6rem;
  width: 100%;
  box-sizing: border-box;
`

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`

const Logo = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.base};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  padding: 0 ${({ theme }) => theme.spacing(1)};
  background: none;
  border: none;
  transition: color 0.2s;
`

const DesktopOnly = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const MobileOnly = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`

const DesktopNav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
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
    $isActive ? theme.colors.primary.base : theme.colors.text.main};
  cursor: pointer;
  transition: color 0.17s;
`

const SubNav = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${({ theme }) => theme.colors.surface.cardAlpha};
  color: ${({ theme }) => theme.colors.text.main};
  min-width: 13rem;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  display: none;
  z-index: 2;
`

const SubNavItem = styled.div<{ $isActive?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.base : theme.colors.text.main};
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: transparent;
  transition:
    background 0.16s,
    color 0.18s;
`

const NavLink = styled(Link)<{ $active?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ $active, theme }) =>
    $active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.regular};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary.base : theme.colors.text.main};
  text-decoration: none;
  transition: color 0.17s;
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.main};
    outline: none;
  }
`

const IconRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.2)};
`

const IconLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacingHalf(2)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  color: ${({ theme }) => theme.colors.primary.base};
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.main};
    outline: none;
  }
`

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.7rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.base};
  display: flex;
  align-items: center;
  transition: color 0.2s;
`

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface.cardAlpha};
  padding: ${({ theme }) => theme.spacing(3)};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  z-index: 10;
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.medium};
`

const MobileGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.2)};
  padding: ${({ theme }) => theme.spacing(1.2)} 0;
`

const MobileLink = styled(Link)<{ $active?: boolean }>`
  display: block;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(1.5)}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary.base : theme.colors.text.main};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.surface[2] : 'transparent'};
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surface.hover};
    outline: none;
  }
`

const MobileNavItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(1.2)} 0`};
`

const DropdownToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.base};
  padding: 0 ${({ theme }) => theme.spacing(1)};
  font-size: 1.1rem;
  transition: color 0.19s;
`

const MobileSubNav = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  transition:
    max-height 0.28s cubic-bezier(0.4, 0.2, 0.6, 1),
    opacity 0.25s;
  max-height: ${({ $isOpen }) => ($isOpen ? '320px' : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  margin-left: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ $isOpen, theme }) => ($isOpen ? theme.spacing(1) : 0)};
  background: ${({ theme }) => theme.colors.surface.cardAlpha};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`

export default Header
