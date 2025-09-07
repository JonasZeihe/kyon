// src/components/layout/Footer.tsx
'use client'

import React from 'react'
import styled from 'styled-components'
import {
  FaLinkedin,
  FaXing,
  FaArrowUp,
  FaEnvelope,
  FaGithub,
} from 'react-icons/fa'

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
                <ContactLink href="mailto:jonaszeihe@gmail.com">
                  jonaszeihe@gmail.com
                </ContactLink>
              </ContactItem>
              <ContactItem>
                <FaGithub />
                <ContactLink
                  href="https://github.com/jonaszeihe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/jonaszeihe
                </ContactLink>
              </ContactItem>
            </ContactList>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Social Media</FooterTitle>
            <SocialIcons>
              <IconLink
                href="https://de.linkedin.com/in/jonas-zeihe"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </IconLink>
              <IconLink
                href="https://www.xing.com/profile/Jonas_Zeihe3"
                aria-label="Xing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXing />
              </IconLink>
            </SocialIcons>
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

const textColor = ({ theme }: { theme: any }) =>
  theme.mode === 'light' ? theme.colors.text.inverse : theme.colors.text.main

const FooterWrapper = styled.footer`
  background: ${({ theme }) =>
    theme.gradients?.backgroundDepth || theme.colors.surface.main};
  color: ${textColor};
  padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(2)};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
`

const FooterContent = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
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

const ContactLink = styled.a`
  color: ${textColor};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color 0.23s;

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

const IconLink = styled.a`
  color: ${textColor};
  font-size: 1.5rem;
  transition:
    color 0.23s,
    transform 0.15s;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.main};
    transform: scale(1.13);
    outline: none;
  }
`

const FooterBottom = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${textColor};
  gap: ${({ theme }) => theme.spacing(2)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`

const Copyright = styled.p`
  margin: 0;
`

const ScrollToTopButton = styled.button`
  background: ${({ theme }) => theme.colors.accent.main};
  color: ${textColor};
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
    background 0.2s,
    transform 0.15s;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) =>
      theme.colors.accent[4] || theme.colors.accent.main};
    transform: scale(1.1);
    outline: none;
  }
`
