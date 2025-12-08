'use client'

import { useEffect, useState } from 'react'
import styles from './ContentPreview.module.css'

interface ContentPreviewProps {
  contentType: 'project' | 'blog' | 'certification'
  slug: string
  children: React.ReactNode
}

export function ContentPreview({
  contentType,
  slug,
  children,
}: ContentPreviewProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  useEffect(() => {
    // Check if we're in development mode and have preview query param
    const urlParams = new URLSearchParams(window.location.search)
    const isDev = process.env.NODE_ENV === 'development'
    const hasPreview = urlParams.get('preview') === 'true'

    setIsPreviewMode(isDev && hasPreview)
  }, [])

  if (!isPreviewMode) {
    return <>{children}</>
  }

  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewBanner}>
        <div className={styles.previewInfo}>
          <span className={styles.previewLabel}>Preview Mode</span>
          <span className={styles.previewType}>
            {contentType.charAt(0).toUpperCase() + contentType.slice(1)}: {slug}
          </span>
        </div>
        <button
          onClick={() => (window.location.href = window.location.pathname)}
          className={styles.exitPreviewButton}
        >
          Exit Preview
        </button>
      </div>

      <div className={styles.previewContent}>{children}</div>

      <div className={styles.previewFooter}>
        <p>
          This content is being previewed. Changes will be reflected after
          rebuilding.
        </p>
      </div>
    </div>
  )
}
