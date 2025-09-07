// src/components/layout/Header.jsx
import React, { useReducer, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { FiChevronDown, FiChevronUp, FiX, FiMenu } from 'react-icons/fi'
import SmoothScroller from '../utilities/SmoothScroller'
import ThemeToggleButton from '../common/ThemeToggleButton'

export default () => {
  const [activeSection, setActiveSection] = useState(null)
  const initial = { menuOpen: false, openSubNav: null }
  const reducer = (s, a) =>
    a.type === 'TOGGLE_MENU'
      ? { ...s, menuOpen: !s.menuOpen, openSubNav: null }
      : a.type === 'TOGGLE_SUBNAV'
        ? { ...s, openSubNav: s.openSubNav === a.payload ? null : a.payload }
        : initial
  const [state, dispatch] = useReducer(reducer, initial)
  const headerRef = useRef()

  useEffect(() => {
    const onScroll = () => {
      const offsets = navSections.map((sec) => ({
        id: sec.id,
        offset: document.getElementById(sec.id)?.offsetTop || 0,
      }))
      const mid = window.scrollY + window.innerHeight / 2
      const found = offsets.filter((o) => mid >= o.offset).pop()
      if (found?.id !== activeSection) setActiveSection(found?.id)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [activeSection, navSections])

  const scrollTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch({ type: 'CLOSE_MENU' })
  }

  return (
    <HeaderContainer ref={headerRef}>
      <HeaderContent>
        <Left>
          <Logo as="button" type="button" onClick={scrollTop}>
            kyon
          </Logo>
        </Left>
        <Right>
          <DesktopOnly>
            <DesktopNav>
              {navSections.map((section) => {
                const hasChild = section.children?.length > 0
                return (
                  <NavItemWrapper key={section.id}>
                    <SmoothScroller targetId={section.id}>
                      <NavItem $isActive={activeSection === section.id}>
                        {section.label}
                      </NavItem>
                    </SmoothScroller>
                    {hasChild && (
                      <SubNav>
                        {section.children.map((child) => (
                          <SmoothScroller key={child.id} targetId={child.id}>
                            <SubNavItem $isActive={activeSection === child.id}>
                              {child.label}
                            </SubNavItem>
                          </SmoothScroller>
                        ))}
                      </SubNav>
                    )}
                  </NavItemWrapper>
                )
              })}
            </DesktopNav>
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
        </Right>
      </HeaderContent>
      {state.menuOpen && (
        <MobileOnly>
          {renderMobileNav(state, navSections, activeSection, dispatch)}
        </MobileOnly>
      )}
    </HeaderContainer>
  )
}

const renderMobileNav = (state, sections, active, dispatch) => (
  <MobileMenu>
    {sections.map((section) => {
      const hasChild = section.children?.length > 0
      return (
        <React.Fragment key={section.id}>
          <MobileNavItem>
            <SmoothScroller targetId={section.id}>
              <NavItem $isActive={active === section.id}>
                {section.label}
              </NavItem>
            </SmoothScroller>
            {hasChild && (
              <DropdownToggle
                onClick={() =>
                  dispatch({ type: 'TOGGLE_SUBNAV', payload: section.id })
                }
                aria-label={
                  state.openSubNav === section.id
                    ? 'Subnav schließen'
                    : 'Subnav öffnen'
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
          {hasChild && (
            <MobileSubNav $isOpen={state.openSubNav === section.id}>
              {section.children.map((child) => (
                <SmoothScroller key={child.id} targetId={child.id}>
                  <SubNavItem $isActive={active === child.id}>
                    {child.label}
                  </SubNavItem>
                </SmoothScroller>
              ))}
            </MobileSubNav>
          )}
        </React.Fragment>
      )
    })}
  </MobileMenu>
)

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.surface.cardAlpha};
  backdrop-filter: blur(13px) saturate(1.11);
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.surface[4]};
  transition:
    background 0.33s,
    box-shadow 0.23s;
`

const HeaderContent = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  height: 4.8rem;
  width: 100%;
  box-sizing: border-box;
`

const Left = styled.div`
  display: flex;
  align-items: center;
`
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`
const Logo = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.base};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  padding: 0 ${({ theme }) => theme.spacing(1.2)};
  background: none;
  border: none;
  transition: color 0.2s;
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.base};
    outline: none;
  }
`
const DesktopOnly = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
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
  gap: ${({ theme }) => theme.spacing(7)};
`
const NavItemWrapper = styled.div`
  position: relative;
  &:hover > div {
    display: block;
  }
`
const NavItem = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ $isActive, theme }) =>
    $isActive
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.regular};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.base : theme.colors.text.main};
  cursor: pointer;
  transition: color 0.17s;
  &:hover {
    color: ${({ theme }) => theme.colors.accent.base};
  }
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
const SubNavItem = styled.div`
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
  &:hover {
    color: ${({ theme }) => theme.colors.accent.base};
    background: ${({ theme }) => theme.colors.surface.hover};
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
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.base};
    outline: none;
  }
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
const MobileNavItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(1.5)} 0`};
`
const DropdownToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.base};
  padding: 0 ${({ theme }) => theme.spacing(1)};
  font-size: 1.1rem;
  transition: color 0.19s;
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.base};
    outline: none;
  }
`
const MobileSubNav = styled.div`
  overflow: hidden;
  transition:
    max-height 0.33s cubic-bezier(0.4, 0.2, 0.6, 1),
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
