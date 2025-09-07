import styled from 'styled-components'
import {
  CardWrapper,
  Typography,
  Button,
  ButtonGrid,
} from '../../utils/sharedComponents'

export default function ProjectCard({ project, onOpen }) {
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
            onClick={(e) => {
              e.stopPropagation()
              onOpen()
            }}
          >
            Projekt ansehen
          </Button>
          {project.buttons?.map(({ text, link, variant }) => (
            <Button
              key={text}
              variant={variant}
              onClick={(e) => {
                e.stopPropagation()
                window.open(link, '_blank')
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
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(2)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing(1.1)};
    gap: ${({ theme }) => theme.spacing(1)};
  }
`
