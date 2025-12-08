'use client'

import { useState } from 'react'
import styles from './VideoEmbed.module.css'

interface VideoEmbedProps {
  url: string
  title: string
  thumbnail?: string
  platform?: 'youtube' | 'vimeo' | 'custom'
}

export function VideoEmbed({
  url,
  title,
  thumbnail,
  platform = 'youtube',
}: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const getEmbedUrl = (url: string): string => {
    if (platform === 'youtube') {
      const videoId = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      )?.[1]
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
        : url
    }

    if (platform === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
      return videoId
        ? `https://player.vimeo.com/video/${videoId}?autoplay=1`
        : url
    }

    return url
  }

  const getThumbnailUrl = (url: string): string => {
    if (thumbnail) return thumbnail

    if (platform === 'youtube') {
      const videoId = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      )?.[1]
      return videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : ''
    }

    if (platform === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
      return videoId ? `https://vumbnail.com/${videoId}.jpg` : ''
    }

    return ''
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const embedUrl = getEmbedUrl(url)
  const thumbnailUrl = getThumbnailUrl(url)

  return (
    <div className={styles.videoContainer}>
      {!isPlaying ? (
        <div className={styles.videoPlaceholder} onClick={handlePlay}>
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt={`${title} thumbnail`}
              className={styles.thumbnail}
              loading="lazy"
              decoding="async"
            />
          )}
          <div className={styles.playButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className={styles.overlay}>
            <div className={styles.title}>{title}</div>
            <div className={styles.playText}>Click to play</div>
          </div>
        </div>
      ) : (
        <div className={styles.videoWrapper}>
          <iframe
            src={embedUrl}
            title={title}
            className={styles.videoIframe}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleLoad}
            loading="lazy"
          />
          {!isLoaded && (
            <div className={styles.loadingSpinner}>
              <div className={styles.spinner}></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
