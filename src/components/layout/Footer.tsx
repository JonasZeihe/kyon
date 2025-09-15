// --- src/components/layout/Footer.tsx ---
'use client'

import React from 'react'
import styled from 'styled-components'
import { FaLinkedin, FaArrowUp, FaEnvelope, FaGithub } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  const scrollToTop = () =>
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterGrid>
          <FooterColumn>
            <FooterTitle>Kontakt</FooterTitle>
            <ContactList>
              <ContactItem>
                <FaEnvelope />
                <ContactAnchor href="mailto:jonaszeihe@gmail.com">
                  jonaszeihe@gmail.com
                </ContactAnchor>
              </ContactItem>
              <ContactItem>
                <FaGithub />
                <ContactAnchor
                  href="https://github.com/jonaszeihe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/jonaszeihe
                </ContactAnchor>
              </ContactItem>
            </ContactList>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Social</FooterTitle>
            <SocialIcons>
              <IconAnchor
                href="https://de.linkedin.com/in/jonas-zeihe"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </IconAnchor>
              <IconAnchor
                href="https://github.com/jonaszeihe"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </IconAnchor>
            </SocialIcons>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Rechtliches</FooterTitle>
            <LinksList>
              <li>
                <FooterLink href="/impressum">Impressum</FooterLink>
              </li>
              {/* Falls Datenschutzseite existiert */}
              {/* <li>
                <FooterLink href="/datenschutz">Datenschutz</FooterLink>
              </li> */}
            </LinksList>
          </FooterColumn>
        </FooterGrid>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          © {new Date().getFullYear()} Jonas Zeihe. Alle Rechte vorbehalten.
        </Copyright>

        <ScrollToTopButton
          onClick={scrollToTop}
          aria-label="Nach oben scrollen"
          title="Nach oben"
        >
          <FaArrowUp />
        </ScrollToTopButton>
      </FooterBottom>
    </FooterWrapper>
  )
}

const textColor = ({ theme }: { theme: any }) => theme.colors.text.main

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.neutral.surface};
  color: ${textColor};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
  padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(2)};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
`

const FooterContent = styled.div`
  width: 100%;
  max-width: 72rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`

const FooterGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
`

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

const FooterTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
`

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.3)};
`

const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  svg {
    font-size: 1.15em;
  }
`

const ContactAnchor = styled.a`
  color: ${textColor};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color 0.2s ease;
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.main};
    outline: none;
  }
`

const SocialIcons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`

const IconAnchor = styled.a`
  color: ${textColor};
  font-size: 1.5rem;
  transition:
    color 0.2s ease,
    transform 0.15s ease;
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.main};
    transform: scale(1.13);
    outline: none;
  }
`

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const FooterLink = styled(Link)`
  color: ${textColor};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  transition:
    color 0.2s ease,
    background 0.15s ease;
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacingHalf(3)}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.main};
    background: ${({ theme }) => theme.colors.surface[1]};
    outline: none;
  }
`

const FooterBottom = styled.div`
  width: 100%;
  max-width: 72rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.small};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

const Copyright = styled.p`
  margin: 0;
  text-align: center;
`

const ScrollToTopButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.main};
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.18rem;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition:
    background 0.18s ease,
    transform 0.15s ease;
  &:hover,
  &:focus-visible {
    background: ${({ theme }) =>
      theme.colors.accent[4] || theme.colors.accent.main};
    color: ${({ theme }) => theme.colors.text.inverse};

    transform: scale(1.08);
    outline: none;
  }
`
