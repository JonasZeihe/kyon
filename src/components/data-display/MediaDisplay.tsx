'use client'

import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import Lightbox from '../lightbox/Lightbox'

type ImageMedia = {
  type: 'image'
  src: string
  alt?: string
  caption?: string
}

type VideoMedia = {
  type: 'video'
  src: string
  alt?: string
  caption?: string
  trackSrc?: string
  trackLang?: string
}

type MediaItem = ImageMedia | VideoMedia
type Variant = 'small' | 'medium' | 'large'

type MediaDisplayProps = {
  media: MediaItem[]
  variant?: Variant
}

const MediaGrid = styled.div<{ $variant: Variant }>`
  display: grid;
  width: 100%;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};

  ${({ $variant }) => {
    switch ($variant) {
      case 'small':
        // 3 Spalten, responsive
        return `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));`
      case 'medium':
        // 2 Spalten, responsive
        return `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));`
      default:
        // 1 Spalte
        return `grid-template-columns: 1fr;`
    }
  }}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing(1.5)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing(1)};
  }
`

const MediaItemBox = styled.div<{ $isClickable: boolean }>`
  position: relative;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100% !important;
  height: auto !important;
  padding-bottom: ${({ theme }) => theme.spacing(2)};

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
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
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
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export default function MediaDisplay({
  media,
  variant = 'large',
}: MediaDisplayProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Stabile Abbildung: Indexe im Original -> Indexe im reinen Bilder-Array
  const images = useMemo(
    () => media.filter((m): m is ImageMedia => m.type === 'image'),
    [media]
  )
  const imageIndices = useMemo(
    () =>
      media.reduce<number[]>((acc, item, idx) => {
        if (item.type === 'image') acc.push(idx)
        return acc
      }, []),
    [media]
  )

  const openLightbox = (originalIndex: number) => {
    const idxInImages = imageIndices.indexOf(originalIndex)
    if (idxInImages >= 0) {
      setCurrentImageIndex(idxInImages)
      setLightboxOpen(true)
    }
  }

  const closeLightbox = () => setLightboxOpen(false)

  if (!media?.length) return null

  return (
    <>
      <MediaGrid $variant={variant}>
        {media.map((item, index) => {
          const isImage = item.type === 'image'
          const aria = isImage
            ? item.alt || `Image ${index + 1}`
            : item.alt || `Video ${index + 1}`
          return (
            <MediaItemBox
              key={`${item.type}-${item.src}-${index}`}
              $isClickable={isImage}
              onClick={() => (isImage ? openLightbox(index) : undefined)}
              aria-label={`${isImage ? 'Open image' : 'Open video'} ${aria}`}
            >
              {isImage ? (
                <img src={item.src} alt={aria} />
              ) : (
                <VideoWrapper>
                  <video controls aria-label={aria}>
                    <source src={item.src} type="video/mp4" />
                    {item.trackSrc && (
                      <track
                        src={item.trackSrc}
                        kind="captions"
                        srcLang={item.trackLang || 'en'}
                        label={`${item.trackLang || 'en'} subtitles`}
                        default
                      />
                    )}
                    Your browser does not support this video format.
                  </video>
                </VideoWrapper>
              )}
              {item.caption && <MediaCaption>{item.caption}</MediaCaption>}
            </MediaItemBox>
          )
        })}
      </MediaGrid>

      {lightboxOpen && images.length > 0 && (
        <Lightbox
          media={images}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  )
}
