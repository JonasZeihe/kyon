'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSwipeable } from 'react-swipeable'
import Navigation from './Navigation'

type MediaItem =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; alt?: string }

type LightboxProps = {
  media: MediaItem[]
  currentIndex?: number
  onClose: () => void
}

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 14000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  animation: ${fadeIn} 0.3s ease-out;
`

const ImageContainer = styled.div`
  max-width: 95vw;
  max-height: 95vh;
  display: inline-block;
`

const StyledVideo = styled.video`
  max-width: 95vw;
  max-height: 95vh;
  display: block;
  object-fit: contain;
`

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 14100;
  background: rgba(255, 255, 255, 0.8);
  transition:
    background 0.3s,
    transform 0.3s;

  &:hover {
    background: #e74c3c;
    transform: scale(1.1);
  }
`

const NavButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: fixed;
  top: 50%;
  ${({ $direction }) =>
    $direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 14100;
  background: rgba(0, 0, 0, 0.6);
  transition:
    background 0.3s,
    transform 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
`

export default function Lightbox({
  media,
  currentIndex = 0,
  onClose,
}: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const isCarousel = media.length > 1
  const mounted = useMemo(() => typeof document !== 'undefined', [])

  const navigate = useCallback(
    (direction: -1 | 1) =>
      setActiveIndex((i) => (i + direction + media.length) % media.length),
    [media.length]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && isCarousel) navigate(-1)
      if (e.key === 'ArrowRight' && isCarousel) navigate(1)
    },
    [onClose, isCarousel, navigate]
  )

  useEffect(() => {
    if (!mounted) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mounted, handleKeyDown])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => isCarousel && navigate(1),
    onSwipedRight: () => isCarousel && navigate(-1),
    trackMouse: true,
  })

  if (!mounted) return null

  const { type, src, alt } = media[activeIndex]

  return ReactDOM.createPortal(
    <Overlay onClick={onClose} {...swipeHandlers}>
      <ImageContainer onClick={(e) => e.stopPropagation()}>
        {type === 'image' ? (
          <Navigation src={src} alt={alt} onClose={onClose} />
        ) : (
          <StyledVideo
            src={src}
            controls
            autoPlay
            aria-label={alt || `Video ${activeIndex + 1}`}
          />
        )}
      </ImageContainer>
      <CloseButton onClick={onClose} aria-label="Close">
        <FaTimes size={20} />
      </CloseButton>
      {isCarousel && (
        <>
          <NavButton
            $direction="left"
            onClick={() => navigate(-1)}
            aria-label="Previous"
          >
            <FaChevronLeft size={20} />
          </NavButton>
          <NavButton
            $direction="right"
            onClick={() => navigate(1)}
            aria-label="Next"
          >
            <FaChevronRight size={20} />
          </NavButton>
        </>
      )}
    </Overlay>,
    document.body
  )
}
