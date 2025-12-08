'use client'

import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import styles from './ZoomableImage.module.css'

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
}

export function ZoomableImage({
  src,
  alt,
  className = '',
}: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleDoubleClick = useCallback(() => {
    if (isZoomed) {
      setIsZoomed(false)
      setZoomLevel(1)
      setPanPosition({ x: 0, y: 0 })
    } else {
      setIsZoomed(true)
      setZoomLevel(2)
    }
  }, [isZoomed])

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      if (!isZoomed) return

      const delta = e.deltaY > 0 ? -0.1 : 0.1
      const newZoom = Math.max(1, Math.min(5, zoomLevel + delta))
      setZoomLevel(newZoom)

      if (newZoom === 1) {
        setIsZoomed(false)
        setPanPosition({ x: 0, y: 0 })
      }
    },
    [isZoomed, zoomLevel]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isZoomed || zoomLevel <= 1) return

      setIsDragging(true)
      setDragStart({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y,
      })
    },
    [isZoomed, zoomLevel, panPosition]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !isZoomed) return

      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y

      // Constrain panning within bounds
      const maxPanX = (zoomLevel - 1) * 100
      const maxPanY = (zoomLevel - 1) * 100

      setPanPosition({
        x: Math.max(-maxPanX, Math.min(maxPanX, newX)),
        y: Math.max(-maxPanY, Math.min(maxPanY, newY)),
      })
    },
    [isDragging, isZoomed, dragStart, zoomLevel]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const resetZoom = useCallback(() => {
    setIsZoomed(false)
    setZoomLevel(1)
    setPanPosition({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={imageRef}
      className={`${styles.zoomableImage} ${className}`}
      onDoubleClick={handleDoubleClick}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        cursor:
          isZoomed && zoomLevel > 1
            ? isDragging
              ? 'grabbing'
              : 'grab'
            : 'zoom-in',
      }}
    >
      <div
        className={styles.imageWrapper}
        style={{
          transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
          transformOrigin: 'center center',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={styles.image}
          quality={90}
          priority={false}
        />
      </div>

      {isZoomed && (
        <div className={styles.zoomControls}>
          <button
            onClick={resetZoom}
            className={styles.resetButton}
            aria-label="Reset zoom"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4V9H4.582M4.582 9C5.205 7.784 6.247 6.84 7.5 6.36M4.582 9H9M20 20V15H19.418M19.418 15C18.795 16.216 17.753 17.16 16.5 17.64M19.418 15H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className={styles.zoomLevel}>{Math.round(zoomLevel * 100)}%</div>
        </div>
      )}

      {!isZoomed && (
        <div className={styles.zoomHint}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <line x1="13" y1="9" x2="9" y2="13" />
            <line x1="9" y1="9" x2="13" y2="13" />
          </svg>
          Double-click to zoom
        </div>
      )}
    </div>
  )
}
