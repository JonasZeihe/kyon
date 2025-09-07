// src/components/layout/Header.tsx
'use client'

import React, { useReducer, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FiChevronDown, FiChevronUp, FiX, FiMenu } from 'react-icons/fi'
import SmoothScroller from '@/components/utilities/SmoothScroller'
import ThemeToggleButton from '@/components/button/ThemeToggleButton'

type NavChild = { id: string; label: string }
type NavSection = { id: string; label: string; children?: NavChild[] }

type HeaderProps = {
  navSections?: NavSection[]
}

type State = { menuOpen: boolean; openSubNav: string | null }
type Action =
  | { type: 'TOGGLE_MENU' }
  | { type: 'TOGGLE_SUBNAV'; payload: string }
  | { type: 'CLOSE_MENU' }

export default function Header({ navSections = [] }: HeaderProps) {
  const headerRef = useRef<HTMLElement | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const initialState: State = { menuOpen: false, openSubNav: null }
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'TOGGLE_MENU':
        return { ...state, menuOpen: !state.menuOpen, openSubNav: null }
      case 'TOGGLE_SUBNAV':
        return {
          ...state,
          openSubNav:
            state.openSubNav === action.payload ? null : action.payload,
        }
      case 'CLOSE_MENU':
        return initialState
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const handleScroll = () => {
      const offsets = navSections.map((section) => ({
        id: section.id,
        offsetTop: document.getElementById(section.id)?.offsetTop || 0,
      }))
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const currentSection = offsets
        .filter(({ offsetTop }) => scrollPosition >= offsetTop)
        .pop()
      if (currentSection?.id !== activeSection)
        setActiveSection(currentSection?.id ?? null)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection, navSections])

  const renderSubNavItems = (children: NavChild[]) =>
    children.map((child) => (
      <SmoothScroller key={child.id} targetId={child.id}>
        <SubNavItem $isActive={activeSection === child.id}>
          {child.label}
        </SubNavItem>
      </SmoothScroller>
    ))

  const renderDesktopNav = () => (
    <DesktopNav>
      {navSections.map((section) => {
        const hasChildren = !!section.children?.length
        return (
          <NavItemWrapper key={section.id}>
            <SmoothScroller targetId={section.id}>
              <NavItem $isActive={activeSection === section.id}>
                {section.label}
              </NavItem>
            </SmoothScroller>
            {hasChildren && (
              <SubNav>{renderSubNavItems(section.children!)}</SubNav>
            )}
          </NavItemWrapper>
        )
      })}
    </DesktopNav>
  )

  const renderMobileNav = () => (
    <MobileMenu>
      {navSections.map((section) => {
        const hasChildren = !!section.children?.length
        return (
          <React.Fragment key={section.id}>
            <MobileNavItem>
              <SmoothScroller targetId={section.id}>
                <NavItem $isActive={activeSection === section.id}>
                  {section.label}
                </NavItem>
              </SmoothScroller>
              {hasChildren && (
                <DropdownToggle
                  onClick={() =>
                    dispatch({ type: 'TOGGLE_SUBNAV', payload: section.id })
                  }
                  aria-label={
                    state.openSubNav === section.id
                      ? 'Subnavigation schließen'
                      : 'Subnavigation öffnen'
                  }
                >
                  {state.openSubNav === section.id ? (
                    <FiChevronUp size={16} />
                  ) : (
                    <FiChevronDown size={16} />
                  )}
                </DropdownToggle>
              )}
            </MobileNavItem>
            {hasChildren && (
              <MobileSubNav $isOpen={state.openSubNav === section.id}>
                {renderSubNavItems(section.children!)}
              </MobileSubNav>
            )}
          </React.Fragment>
        )
      })}
    </MobileMenu>
  )

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch({ type: 'CLOSE_MENU' })
  }

  return (
    <HeaderContainer ref={headerRef as any}>
      <HeaderContent>
        <LeftSide>
          <Logo as="button" type="button" onClick={scrollToTop}>
            Jonas Zeihe
          </Logo>
        </LeftSide>
        <RightSide>
          <DesktopOnly>
            {renderDesktopNav()}
            <ThemeToggleButton />
          </DesktopOnly>
          <MobileOnly>
            <ThemeToggleButton />
            <MobileMenuButton
              onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
              aria-label={state.menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              {state.menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </MobileMenuButton>
          </MobileOnly>
        </RightSide>
      </HeaderContent>
      {state.menuOpen && <MobileOnly>{renderMobileNav()}</MobileOnly>}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: ${({ theme }: any) => theme.colors.surface.cardAlpha};
  backdrop-filter: blur(13px) saturate(1.11);
  box-shadow: ${({ theme }: any) => theme.boxShadow.md};
  border-bottom: 1.5px solid ${({ theme }: any) => theme.colors.surface[4]};
  transition:
    background 0.33s,
    box-shadow 0.23s;
`

const HeaderContent = styled.div`
  max-width: ${({ theme }: any) => theme.breakpoints.xl};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }: any) => theme.spacing(2)};
  height: 4.8rem;
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
  gap: ${({ theme }: any) => theme.spacing(3)};
`

const Logo = styled.span`
  font-size: ${({ theme }: any) => theme.typography.fontSize.h3};
  font-family: ${({ theme }: any) => theme.typography.fontFamily.secondary};
  font-weight: ${({ theme }: any) => theme.typography.fontWeight.bold};
  cursor: pointer;
  color: ${({ theme }: any) => theme.colors.primary.base};
  letter-spacing: ${({ theme }: any) => theme.typography.letterSpacing.tight};
  padding: 0 ${({ theme }: any) => theme.spacing(1.2)};
  background: none;
  border: none;
  transition: color 0.2s;
  &:hover,
  &:focus-visible {
    color: ${({ theme }: any) => theme.colors.accent.base};
    outline: none;
  }
`

const DesktopOnly = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }: any) => theme.spacing(3)};
  @media (max-width: ${({ theme }: any) => theme.breakpoints.md}) {
    display: none;
  }
`

const MobileOnly = styled.div`
  display: none;
  @media (max-width: ${({ theme }: any) => theme.breakpoints.md}) {
    display: block;
  }
`

const DesktopNav = styled.nav`
  display: flex;
  gap: ${({ theme }: any) => theme.spacing(7)};
`

const NavItemWrapper = styled.div`
  position: relative;
  &:hover > div {
    display: block;
  }
`

const NavItem = styled.div<{ $isActive?: boolean }>`
  font-size: ${({ theme }) => (theme as any).typography.fontSize.h4};
  font-weight: ${({ $isActive, theme }) =>
    $isActive
      ? (theme as any).typography.fontWeight.bold
      : (theme as any).typography.fontWeight.regular};
  color: ${({ $isActive, theme }) =>
    $isActive
      ? (theme as any).colors.primary.base
      : (theme as any).colors.text.main};
  cursor: pointer;
  transition: color 0.17s;
  &:hover {
    color: ${({ theme }) => (theme as any).colors.accent.base};
  }
`

const SubNav = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${({ theme }: any) => theme.colors.surface.cardAlpha};
  color: ${({ theme }: any) => theme.colors.text.main};
  min-width: 13rem;
  padding: ${({ theme }: any) => theme.spacing(1)};
  border-radius: ${({ theme }: any) => theme.borderRadius.medium};
  box-shadow: ${({ theme }: any) => theme.boxShadow.md};
  display: none;
  z-index: 2;
`

const SubNavItem = styled.div<{ $isActive?: boolean }>`
  font-size: ${({ theme }) => (theme as any).typography.fontSize.body};
  font-weight: ${({ theme }) => (theme as any).typography.fontWeight.regular};
  color: ${({ $isActive, theme }) =>
    $isActive
      ? (theme as any).colors.primary.base
      : (theme as any).colors.text.main};
  cursor: pointer;
  padding: ${({ theme }) =>
    `${(theme as any).spacing(1)} ${(theme as any).spacing(2)}`};
  border-radius: ${({ theme }) => (theme as any).borderRadius.small};
  background: transparent;
  transition:
    background 0.16s,
    color 0.18s;
  &:hover {
    color: ${({ theme }) => (theme as any).colors.accent.base};
    background: ${({ theme }) => (theme as any).colors.surface.hover};
  }
`

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.7rem;
  cursor: pointer;
  color: ${({ theme }: any) => theme.colors.primary.base};
  display: flex;
  align-items: center;
  transition: color 0.2s;
  &:hover,
  &:focus-visible {
    color: ${({ theme }: any) => theme.colors.accent.base};
    outline: none;
  }
`

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }: any) => theme.colors.surface.cardAlpha};
  padding: ${({ theme }: any) => theme.spacing(3)};
  box-shadow: ${({ theme }: any) => theme.boxShadow.md};
  z-index: 10;
  border-bottom-left-radius: ${({ theme }: any) => theme.borderRadius.medium};
  border-bottom-right-radius: ${({ theme }: any) => theme.borderRadius.medium};
`

const MobileNavItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }: any) => `${theme.spacing(1.5)} 0`};
`

const DropdownToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }: any) => theme.colors.primary.base};
  padding: 0 ${({ theme }: any) => theme.spacing(1)};
  font-size: 1.1rem;
  transition: color 0.19s;
  &:hover,
  &:focus-visible {
    color: ${({ theme }: any) => theme.colors.accent.base};
    outline: none;
  }
`

const MobileSubNav = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  transition:
    max-height 0.33s cubic-bezier(0.4, 0.2, 0.6, 1),
    opacity 0.25s;
  max-height: ${({ $isOpen }) => ($isOpen ? '320px' : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  margin-left: ${({ theme }: any) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }: any) => theme.spacing(1)};
  padding: ${({ $isOpen, theme }: any) => ($isOpen ? theme.spacing(1) : 0)};
  background: ${({ theme }: any) => theme.colors.surface.cardAlpha};
  border-radius: ${({ theme }: any) => theme.borderRadius.medium};
`
