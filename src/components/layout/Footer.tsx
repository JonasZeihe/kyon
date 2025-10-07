// src/components/layout/Footer.tsx
'use client'

import React from 'react'
import styled from 'styled-components'
import { FaLinkedin, FaArrowUp, FaEnvelope, FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import Container from '@/components/primitives/Container'

export default function Footer() {
  const scrollToTop = () =>
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <FooterWrapper role="contentinfo">
      <Container max="default">
        <Content>
          <Grid>
            <Col>
              <Title>Kontakt</Title>
              <List aria-label="Kontaktmöglichkeiten">
                <Item>
                  <IconWrap aria-hidden="true">
                    <FaEnvelope />
                  </IconWrap>
                  <Anchor href="mailto:jonaszeihe@gmail.com">
                    jonaszeihe@gmail.com
                  </Anchor>
                </Item>
                <Item>
                  <IconWrap aria-hidden="true">
                    <FaGithub />
                  </IconWrap>
                  <Anchor
                    href="https://github.com/jonaszeihe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/jonaszeihe
                  </Anchor>
                </Item>
              </List>
            </Col>

            <Col>
              <Title>Social</Title>
              <Icons aria-label="Soziale Profile">
                <IconLink
                  href="https://de.linkedin.com/in/jonas-zeihe"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </IconLink>
                <IconLink
                  href="https://github.com/jonaszeihe"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </IconLink>
              </Icons>
            </Col>

            <Col>
              <Title>Rechtliches</Title>
              <PlainList>
                <li>
                  <FooterNavLink href="/impressum">Impressum</FooterNavLink>
                </li>
              </PlainList>
            </Col>
          </Grid>
        </Content>

        <BottomBar>
          <Copy>
            © {new Date().getFullYear()} Jonas Zeihe. Alle Rechte vorbehalten.
          </Copy>
          <ToTop
            type="button"
            onClick={scrollToTop}
            aria-label="Nach oben scrollen"
            title="Nach oben"
          >
            <FaArrowUp />
          </ToTop>
        </BottomBar>
      </Container>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.semantic.surface};
  color: ${({ theme }) => theme.semantic.fg};
  border-top: 1px solid ${({ theme }) => theme.semantic.border};
  padding-block: ${({ theme }) => theme.spacing(3)};
  width: 100%;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`

const Grid = styled.div`
  width: 100%;
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.25)};
`

const Title = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const Item = styled.li`
  display: grid;
  grid-template-columns: 1.2rem auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.6)};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
`

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.semantic.mutedFg};
  svg {
    font-size: 1rem;
  }
`

const Anchor = styled.a`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const Icons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.25)};
`

const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  background: ${({ theme }) => theme.semantic.card};
  color: ${({ theme }) => theme.semantic.fg};
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.semantic.surface};
    color: ${({ theme }) => theme.semantic.linkHover};
    outline: none;
  }
`

const PlainList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.75)};
`

const FooterNavLink = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacingHalf(3)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition:
    background 0.15s ease,
    color 0.15s ease;
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.semantic.surface};
    outline: none;
  }
`

const BottomBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding-top: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid ${({ theme }) => theme.semantic.border};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`

const Copy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.semantic.mutedFg};
`

const ToTop = styled.button`
  background: ${({ theme }) => theme.semantic.card};
  color: ${({ theme }) => theme.semantic.link};
  border: 1px solid ${({ theme }) => theme.semantic.border};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.semantic.surface};
    color: ${({ theme }) => theme.semantic.linkHover};
    outline: none;
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
  }
`
