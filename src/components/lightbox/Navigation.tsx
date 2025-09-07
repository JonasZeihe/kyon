'use client'

import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import getScale from './scale'

type NavigationProps = {
  src: string
  alt?: string
  onClose: () => void
}

const ZoomableMedia = styled.img<{
  $isZoomed: boolean
  $zoomOriginX: number
  $zoomOriginY: number
  $zoomLevel: number
  $panX: number
  $panY: number
}>`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  cursor: ${({ $isZoomed }) => ($isZoomed ? 'grab' : 'zoom-in')};
  transform-origin: ${({ $zoomOriginX, $zoomOriginY }) =>
    `${$zoomOriginX}% ${$zoomOriginY}%`};
  transform: ${({ $zoomLevel, $panX, $panY }) =>
    `translate(${$panX}px, ${$panY}px) scale(${getScale($zoomLevel)})`};
  transition: ${({ $isZoomed }) =>
    $isZoomed ? 'none' : 'transform 0.3s ease'};
`

export default function Navigation({
  src,
  alt = '',
  onClose,
}: NavigationProps) {
  const [zoomLevel, setZoomLevel] = useState(0)
  const [zoomOriginX, setZoomOriginX] = useState(50)
  const [zoomOriginY, setZoomOriginY] = useState(50)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isPanning, setIsPanning] = useState(false)
  const [hasPanned, setHasPanned] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const constrainPan = (value: number, max: number) =>
    Math.max(Math.min(value, max), -max)

  const handleZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    if (hasPanned) {
      setHasPanned(false)
      return
    }
    const rect = imgRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (zoomLevel < 2) {
      setZoomOriginX(x)
      setZoomOriginY(y)
      setZoomLevel((z) => z + 1)
    } else {
      setZoomLevel(0)
      setPanX(0)
      setPanY(0)
    }
  }

  const startPan = (x: number, y: number) => {
    if (!imgRef.current) return
    ;(imgRef.current as any).dataset.startX = x - panX
    ;(imgRef.current as any).dataset.startY = y - panY
  }

  const movePan = (x: number, y: number) => {
    const rect = imgRef.current?.getBoundingClientRect()
    if (!rect) return
    const scale = getScale(zoomLevel)
    const maxX = (rect.width * (scale - 1)) / 2
    const maxY = (rect.height * (scale - 1)) / 2
    const startX = parseFloat((imgRef.current as any)?.dataset.startX || '0')
    const startY = parseFloat((imgRef.current as any)?.dataset.startY || '0')
    setPanX(constrainPan(x - startX, maxX))
    setPanY(constrainPan(y - startY, maxY))
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (zoomLevel > 0) {
      e.preventDefault()
      setIsPanning(true)
      startPan(e.clientX, e.clientY)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (isPanning) {
      setHasPanned(true)
      movePan(e.clientX, e.clientY)
    }
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (zoomLevel > 0) {
      e.preventDefault()
      setIsPanning(true)
      const t = e.touches[0]
      startPan(t.clientX, t.clientY)
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (isPanning) {
      e.preventDefault()
      const t = e.touches[0]
      movePan(t.clientX, t.clientY)
    }
  }

  const stopPanning = () => setIsPanning(false)

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (zoomLevel > 0) e.preventDefault()
    }
    document.addEventListener('touchmove', preventScroll, { passive: false })
    return () => {
      document.removeEventListener('touchmove', preventScroll)
    }
  }, [zoomLevel])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = zoomLevel > 0 ? 'hidden' : prev
    return () => {
      document.body.style.overflow = prev
    }
  }, [zoomLevel])

  return (
    <ZoomableMedia
      ref={imgRef}
      src={src}
      alt={alt}
      $zoomLevel={zoomLevel}
      $zoomOriginX={zoomOriginX}
      $zoomOriginY={zoomOriginY}
      $panX={panX}
      $panY={panY}
      $isZoomed={isPanning}
      onClick={handleZoom}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopPanning}
      onMouseLeave={stopPanning}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={stopPanning}
    />
  )
}
