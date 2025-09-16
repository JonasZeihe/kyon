// --- src/components/data-display/MediaDisplay.tsx ---
'use client'

import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Lightbox from '../lightbox/Lightbox'

type ImageMedia = { type: 'image'; src: string; alt?: string; caption?: string }
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

type MediaDisplayProps = { media: MediaItem[]; variant?: Variant }

const MediaGrid = styled.div<{ $variant: Variant }>`
  display: grid;
  width: 100%;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
  ${({ $variant }) => {
    switch ($variant) {
      case 'small':
        return `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));`
      case 'medium':
        return `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));`
      default:
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
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.main};
    outline-offset: 2px;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent[2]}55;
  }
  @media (hover: hover) {
    &:hover {
      transform: ${({ $isClickable }) =>
        $isClickable ? 'translateY(-1px)' : 'none'};
      box-shadow: ${({ theme }) => theme.boxShadow.sm};
    }
  }
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
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
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
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
          const key = `${item.type}-${item.src}-${index}`
          const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
            if (!isImage) return
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              openLightbox(index)
            }
          }
          return (
            <MediaItemBox
              key={key}
              $isClickable={isImage}
              onClick={() => (isImage ? openLightbox(index) : undefined)}
              onKeyDown={onKeyDown}
              role={isImage ? 'button' : undefined}
              tabIndex={isImage ? 0 : -1}
              aria-label={isImage ? `Open image ${aria}` : aria}
              aria-haspopup={isImage ? 'dialog' : undefined}
            >
              {isImage ? (
                <ImageWrapper>
                  <Image
                    src={item.src}
                    alt={aria}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                  />
                </ImageWrapper>
              ) : (
                <VideoWrapper>
                  <video controls aria-label={aria}>
                    <source src={item.src} type="video/mp4" />
                    <track
                      src={
                        item.trackSrc ||
                        'data:text/vtt,WEBVTT%0A%0A00:00.000%20--%3E%2000:10.000%0A'
                      }
                      kind="captions"
                      srcLang={item.trackLang || 'en'}
                      label={`${item.trackLang || 'en'} subtitles`}
                      default
                    />
                  </video>
                </VideoWrapper>
              )}
              {'caption' in item && item.caption ? (
                <MediaCaption>{item.caption}</MediaCaption>
              ) : null}
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
