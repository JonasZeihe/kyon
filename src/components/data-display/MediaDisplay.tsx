// src/components/data-display/MediaDisplay.tsx
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

type MediaDisplayProps = {
  media: MediaItem[]
  variant?: Variant
  base?: string
  mdxInline?: boolean
}

const join = (b: string, r: string) =>
  `${b.replace(/\/+$/, '')}/${String(r).replace(/^\.?\//, '')}`.replace(
    /\/{2,}/g,
    '/'
  )

const resolveSrc = (s: string, base?: string) =>
  !s || /^([a-z]+:)?\/\//i.test(s) || s.startsWith('/')
    ? s
    : base
      ? join(base, s)
      : s

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

const InlineFigure = styled.figure`
  display: grid;
  justify-items: center;
  margin: ${({ theme }) => theme.spacing(2)} 0;
`

const InlineImgButton = styled.button`
  all: unset;
  cursor: zoom-in;
  display: block;
  max-width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  line-height: 0;
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.main};
    outline-offset: 2px;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent[2]}55;
  }
`

const InlineImg = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`

const MediaCaption = styled.figcaption`
  margin-top: ${({ theme }) => theme.spacing(1.25)};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text.subtle};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
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
    background: #000;
  }
`

function MediaDisplay({
  media,
  variant = 'large',
  base,
  mdxInline,
}: MediaDisplayProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const normalized = useMemo<MediaItem[]>(
    () =>
      (media || []).map((m) =>
        m.type === 'image'
          ? { ...m, src: resolveSrc(m.src, base) }
          : {
              ...m,
              src: resolveSrc(m.src, base),
              trackSrc: (m as VideoMedia).trackSrc
                ? resolveSrc((m as VideoMedia).trackSrc as string, base)
                : (m as VideoMedia).trackSrc,
            }
      ),
    [media, base]
  )

  const images = useMemo(
    () => normalized.filter((m): m is ImageMedia => m.type === 'image'),
    [normalized]
  )
  const imageIndices = useMemo(
    () =>
      normalized.reduce<number[]>((acc, item, idx) => {
        if (item.type === 'image') acc.push(idx)
        return acc
      }, []),
    [normalized]
  )

  const openLightbox = (originalIndex: number) => {
    const idxInImages = imageIndices.indexOf(originalIndex)
    if (idxInImages >= 0) {
      setCurrentImageIndex(idxInImages)
      setLightboxOpen(true)
    }
  }

  const closeLightbox = () => setLightboxOpen(false)

  if (!normalized?.length) return null

  const singleInline =
    mdxInline && normalized.length === 1 && normalized[0].type === 'image'

  if (singleInline) {
    const item = normalized[0] as ImageMedia
    const aria = item.alt || 'Bild'
    return (
      <>
        <InlineFigure>
          <InlineImgButton
            type="button"
            onClick={() => openLightbox(0)}
            aria-label={`Bild vergrößern: ${aria}`}
          >
            <InlineImg src={item.src} alt={aria} />
          </InlineImgButton>
          {item.caption ? <MediaCaption>{item.caption}</MediaCaption> : null}
        </InlineFigure>

        {lightboxOpen && images.length > 0 && (
          <Lightbox
            media={images.map(({ src, alt }) => ({ type: 'image', src, alt }))}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
          />
        )}
      </>
    )
  }

  return (
    <>
      <MediaGrid $variant={variant}>
        {normalized.map((item, index) => {
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
                    src={(item as ImageMedia).src}
                    alt={aria}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                    style={{ objectFit: 'cover' }}
                  />
                </ImageWrapper>
              ) : (
                <VideoWrapper>
                  <video controls aria-label={aria}>
                    <source src={(item as VideoMedia).src} type="video/mp4" />
                    <track
                      src={
                        (item as VideoMedia).trackSrc ||
                        'data:text/vtt,WEBVTT%0A%0A00:00.000%20--%3E%2000:10.000%0A'
                      }
                      kind="captions"
                      srcLang={(item as VideoMedia).trackLang || 'en'}
                      label={`${(item as VideoMedia).trackLang || 'en'} subtitles`}
                      default
                    />
                  </video>
                </VideoWrapper>
              )}
              {'caption' in item && (item as any).caption ? (
                <MediaCaption as="div">{(item as any).caption}</MediaCaption>
              ) : null}
            </MediaItemBox>
          )
        })}
      </MediaGrid>

      {lightboxOpen && images.length > 0 && (
        <Lightbox
          media={images.map(({ src, alt }) => ({ type: 'image', src, alt }))}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  )
}

;(MediaDisplay as any).displayName = 'MediaDisplay'

export default MediaDisplay
