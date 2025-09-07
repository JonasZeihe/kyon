'use client'

import styled, { DefaultTheme } from 'styled-components'
import CardWrapper from '@/components/Wrapper/CardWrapper'
import Typography from '@/styles/Typography'
import Button from '@/components/button/Button'
import ButtonGrid from '@/components/button/ButtonGrid'

type ProjectButton = {
  text: string
  link: string
  variant?: string
}

type Project = {
  image: string
  name: string
  description: string
  buttons?: ProjectButton[]
}

type ProjectCardProps = {
  project: Project
  onOpen: () => void
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <CardWrapper onClick={onOpen} style={{ cursor: 'pointer' }}>
      <ImageContainer>
        <Image src={project.image} alt={project.name} />
      </ImageContainer>
      <Content>
        <Typography variant="h2" color="primary.main" align="center">
          {project.name}
        </Typography>
        <Typography variant="body" align="center">
          {project.description}
        </Typography>
        <ButtonGrid>
          <Button
            variant="primary"
            customBackground={undefined}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              onOpen()
            }}
          >
            Projekt ansehen
          </Button>
          {project.buttons?.map(({ text, link, variant }) => (
            <Button
              key={text}
              variant={variant as any}
              customBackground={undefined}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                window.open(link, '_blank', 'noopener,noreferrer')
              }}
            >
              {text}
            </Button>
          ))}
        </ButtonGrid>
      </Content>
    </CardWrapper>
  )
}

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  overflow: hidden;

  ${CardWrapper}:hover & img {
    transform: scale(1.04);
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.32s cubic-bezier(0.37, 0.47, 0.61, 0.97);
  display: block;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing(2)};
  gap: ${({ theme }: { theme: DefaultTheme }) => theme.spacing(2)};

  @media (max-width: ${({ theme }: { theme: DefaultTheme }) =>
      theme.breakpoints.sm}) {
    padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing(1.1)};
    gap: ${({ theme }: { theme: DefaultTheme }) => theme.spacing(1)};
  }
`
