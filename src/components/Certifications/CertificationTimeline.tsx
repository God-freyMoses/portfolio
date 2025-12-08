'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Certification } from 'contentlayer/generated'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './CertificationTimeline.module.css'

interface CertificationTimelineProps {
  certifications: Certification[]
  className?: string
}

export function CertificationTimeline({
  certifications,
  className = '',
}: CertificationTimelineProps) {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const timelineRef = useRef<HTMLDivElement>(null)

  // Sort certifications by issue date (newest first)
  const sortedCertifications = [...certifications].sort(
    (a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
  )

  const handleItemVisible = (certificationId: string) => {
    setVisibleItems(prev => new Set(prev).add(certificationId))
  }

  const getStatusColor = (cert: Certification) => {
    if (cert.isExpired) return 'expired'
    if (cert.daysUntilExpiry <= 90) return 'expiring-soon'
    return 'active'
  }

  return (
    <div className={`${styles.certificationTimeline} ${className}`}>
      <div className={styles.timelineContainer} ref={timelineRef}>
        {sortedCertifications.map((cert, index) => (
          <CertificationTimelineItem
            key={cert.slug}
            certification={cert}
            index={index}
            isVisible={visibleItems.has(cert._id)}
            onVisible={() => handleItemVisible(cert._id)}
            statusColor={getStatusColor(cert)}
          />
        ))}
      </div>
    </div>
  )
}

interface CertificationTimelineItemProps {
  certification: Certification
  index: number
  isVisible: boolean
  onVisible: () => void
  statusColor: string
}

function CertificationTimelineItem({
  certification,
  index,
  isVisible,
  onVisible,
  statusColor,
}: CertificationTimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersectionObserver(itemRef, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px',
  })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    if (isIntersecting && !isVisible) {
      timer = setTimeout(onVisible, index * 150)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isIntersecting, isVisible, onVisible, index])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    })
  }

  return (
    <div
      ref={itemRef}
      className={`${styles.timelineItem} ${isVisible ? styles.visible : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Timeline line and dot */}
      <div className={styles.timelineMarker}>
        <div className={`${styles.timelineDot} ${styles[statusColor]}`} />
        {index < 9 && <div className={styles.timelineLine} />}
      </div>

      {/* Content */}
      <div className={styles.certificationCard}>
        <div className={styles.certificationHeader}>
          <div className={styles.badgeContainer}>
            <Image
              src={certification.image}
              alt={`${certification.title} badge`}
              width={80}
              height={80}
              className={styles.certificationBadge}
            />
          </div>

          <div className={styles.certificationInfo}>
            <h3 className={styles.certificationTitle}>{certification.title}</h3>
            <p className={styles.certificationIssuer}>{certification.issuer}</p>

            <div className={styles.certificationMeta}>
              <span className={styles.issueDate}>
                Issued {formatDate(certification.issueDate)}
              </span>

              {certification.expiryDate && (
                <span className={`${styles.expiryDate} ${styles[statusColor]}`}>
                  {certification.isExpired
                    ? `Expired ${formatDate(certification.expiryDate)}`
                    : `Expires ${formatDate(certification.expiryDate)}`}
                </span>
              )}

              {certification.credentialId && (
                <span className={styles.credentialId}>
                  ID: {certification.credentialId}
                </span>
              )}
            </div>
          </div>
        </div>

        {certification.skills && certification.skills.length > 0 && (
          <div className={styles.skillsSection}>
            <h4 className={styles.skillsTitle}>Validated Skills</h4>
            <div className={styles.skillsList}>
              {certification.skills.map(skill => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.certificationActions}>
          {certification.credentialUrl && (
            <a
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.verifyButton}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Verify Credential
            </a>
          )}

          <div className={styles.certificationStatus}>
            <span
              className={`${styles.statusIndicator} ${styles[statusColor]}`}
            >
              {certification.isExpired
                ? 'Expired'
                : certification.daysUntilExpiry <= 90
                  ? 'Renew Soon'
                  : 'Active'}
            </span>
          </div>
        </div>

        {/* MDX Content */}
        {certification.body?.code && (
          <div
            className={styles.certificationDescription}
            dangerouslySetInnerHTML={{ __html: certification.body.code }}
          />
        )}
      </div>
    </div>
  )
}
