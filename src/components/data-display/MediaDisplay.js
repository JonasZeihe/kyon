import React, { useState } from 'react'
import styled from 'styled-components'
import Lightbox from '../lightbox/Lightbox'

const MediaGrid = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};

  ${({ variant }) => {
    switch (variant) {
      case 'small':
        return `grid-template-columns: repeat(auto-fit, 33%);`
      case 'medium':
        return `grid-template-columns: repeat(auto-fit, 50%);`
      default:
        return `grid-template-columns: repeat(auto-fit, 100%);`
    }
  }}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(1fr));
    gap: ${({ theme }) => theme.spacing(1.5)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: ${({ theme }) => theme.spacing(1)};
  }
`

const MediaItem = styled.div`
  position: relative;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100% !important;
  height: auto !important;
  padding-bottom: ${({ theme }) =>
    theme.spacing(2)}; /* Abstand unterhalb der Medien */

  img,
  video {
    display: block;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    &:hover {
      transform: none;
      box-shadow: ${({ theme }) => theme.boxShadow.sm};
    }

    img,
    video {
      height: auto !important;
    }
  }
`

const MediaCaption = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) =>
    theme.spacing(3)}; /* Abstand zur nächsten Sektion */
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.neutral.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.caption};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`

const VideoWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  width: 100%;
  height: 0;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export default function MediaDisplay({ media, variant = 'large' }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index) => {
    if (media[index].type === 'image') {
      setCurrentIndex(index)
      setLightboxOpen(true)
    }
  }

  const closeLightbox = () => setLightboxOpen(false)

  return (
    <>
      <MediaGrid variant={variant}>
        {media.map(
          (
            { type, src, alt, caption, trackSrc = '', trackLang = 'en' },
            index
          ) => (
            <MediaItem
              key={src}
              isClickable={type === 'image'}
              onClick={() => openLightbox(index)}
              aria-label={`Open ${type === 'image' ? 'image' : 'video'} ${
                alt || `Media ${index + 1}`
              }`}
            >
              {type === 'image' && (
                <img src={src} alt={alt || `Media ${index + 1}`} />
              )}
              {type === 'video' && (
                <VideoWrapper>
                  <video controls aria-label={alt || `Video ${index + 1}`}>
                    <source src={src} type="video/mp4" />
                    <track
                      src={trackSrc}
                      kind="captions"
                      srcLang={trackLang}
                      label={`${trackLang} subtitles`}
                      default
                    />
                    Your browser does not support this video format.
                  </video>
                </VideoWrapper>
              )}
              {caption && <MediaCaption>{caption}</MediaCaption>}
            </MediaItem>
          )
        )}
      </MediaGrid>

      {lightboxOpen && (
        <Lightbox
          media={media.filter(({ type }) => type === 'image')}
          currentIndex={currentIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  )
}
