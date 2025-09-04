import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import getScale from './scale'

const ZoomableMedia = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  cursor: ${({ isZoomed }) => (isZoomed ? 'grab' : 'zoom-in')};
  transform-origin: ${({ zoomOriginX, zoomOriginY }) =>
    `${zoomOriginX}% ${zoomOriginY}%`};
  transform: ${({ zoomLevel, panX, panY }) =>
    `translate(${panX}px, ${panY}px) scale(${getScale(zoomLevel)})`};
  transition: ${({ isPanning }) =>
    isPanning ? 'none' : 'transform 0.3s ease'};
`

function Navigation({ src, alt, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(0)
  const [zoomOriginX, setZoomOriginX] = useState(50)
  const [zoomOriginY, setZoomOriginY] = useState(50)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isPanning, setIsPanning] = useState(false)
  const [hasPanned, setHasPanned] = useState(false)
  const imgRef = useRef()

  const constrainPan = (value, max) => Math.max(Math.min(value, max), -max)

  const handleZoom = (e) => {
    e.preventDefault()
    if (hasPanned) {
      setHasPanned(false)
      return undefined
    }

    const rect = imgRef.current.getBoundingClientRect()
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
    return undefined
  }

  const startPan = (x, y) => {
    imgRef.current.dataset.startX = x - panX
    imgRef.current.dataset.startY = y - panY
  }

  const movePan = (x, y) => {
    const rect = imgRef.current.getBoundingClientRect()
    const scale = getScale(zoomLevel)
    const maxX = (rect.width * (scale - 1)) / 2
    const maxY = (rect.height * (scale - 1)) / 2
    const startX = parseFloat(imgRef.current.dataset.startX || 0)
    const startY = parseFloat(imgRef.current.dataset.startY || 0)
    setPanX(constrainPan(x - startX, maxX))
    setPanY(constrainPan(y - startY, maxY))
  }

  const handleMouseDown = (e) => {
    if (zoomLevel > 0) {
      e.preventDefault()
      setIsPanning(true)
      startPan(e.clientX, e.clientY)
    }
  }

  const handleMouseMove = (e) => {
    if (isPanning) {
      setHasPanned(true)
      movePan(e.clientX, e.clientY)
    }
  }

  const handleTouchStart = (e) => {
    if (zoomLevel > 0) {
      e.preventDefault()
      setIsPanning(true)
      startPan(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e) => {
    if (isPanning) {
      e.preventDefault()
      movePan(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  const stopPanning = () => setIsPanning(false)

  useEffect(() => {
    const preventScroll = (e) => {
      if (zoomLevel > 0) e.preventDefault()
    }
    document.addEventListener('touchmove', preventScroll, { passive: false })
    return () => {
      document.removeEventListener('touchmove', preventScroll)
    }
  }, [zoomLevel])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = zoomLevel > 0 ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [zoomLevel])

  return (
    <ZoomableMedia
      ref={imgRef}
      src={src}
      alt={alt}
      zoomLevel={zoomLevel}
      zoomOriginX={zoomOriginX}
      zoomOriginY={zoomOriginY}
      panX={panX}
      panY={panY}
      isPanning={isPanning}
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

Navigation.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

Navigation.defaultProps = {
  alt: '',
}

export default Navigation
