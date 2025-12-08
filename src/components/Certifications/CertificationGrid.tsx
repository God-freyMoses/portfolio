'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Certification } from 'contentlayer/generated'
import styles from './CertificationGrid.module.css'

interface CertificationGridProps {
  certifications: Certification[]
  className?: string
}

export function CertificationGrid({
  certifications,
  className = '',
}: CertificationGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Group certifications by issuer/category
  const categories = Array.from(
    new Set(certifications.map(cert => cert.issuer))
  )

  const filteredCertifications =
    selectedCategory === 'all'
      ? certifications
      : certifications.filter(cert => cert.issuer === selectedCategory)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  const getStatusColor = (cert: Certification) => {
    if (cert.isExpired) return 'expired'
    if (cert.daysUntilExpiry <= 90) return 'expiring-soon'
    return 'active'
  }

  return (
    <div className={`${styles.certificationGrid} ${className}`}>
      {/* Category Filter */}
      <div className={styles.filterSection}>
        <div className={styles.categoryFilters}>
          <button
            className={`${styles.categoryButton} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Certifications ({certifications.length})
          </button>
          {categories.map(category => {
            const count = certifications.filter(
              cert => cert.issuer === category
            ).length
            return (
              <button
                key={category}
                className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Certifications Grid */}
      <div className={styles.grid}>
        {filteredCertifications.map(cert => (
          <div key={cert.slug} className={styles.certificationCard}>
            <div className={styles.cardHeader}>
              <div className={styles.badgeSection}>
                <Image
                  src={cert.image}
                  alt={`${cert.title} badge`}
                  width={60}
                  height={60}
                  className={styles.certificationBadge}
                />
                <div
                  className={`${styles.statusBadge} ${styles[getStatusColor(cert)]}`}
                >
                  {cert.isExpired
                    ? 'Expired'
                    : cert.daysUntilExpiry <= 90
                      ? 'Renew Soon'
                      : 'Active'}
                </div>
              </div>

              <div className={styles.certificationInfo}>
                <h3 className={styles.certificationTitle}>{cert.title}</h3>
                <p className={styles.certificationIssuer}>{cert.issuer}</p>
              </div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.certificationDates}>
                <div className={styles.dateItem}>
                  <span className={styles.dateLabel}>Issued:</span>
                  <span className={styles.dateValue}>
                    {formatDate(cert.issueDate)}
                  </span>
                </div>

                {cert.expiryDate && (
                  <div className={styles.dateItem}>
                    <span className={styles.dateLabel}>
                      {cert.isExpired ? 'Expired:' : 'Expires:'}
                    </span>
                    <span
                      className={`${styles.dateValue} ${styles[getStatusColor(cert)]}`}
                    >
                      {formatDate(cert.expiryDate)}
                    </span>
                  </div>
                )}
              </div>

              {cert.skills && cert.skills.length > 0 && (
                <div className={styles.skillsPreview}>
                  <div className={styles.skillsList}>
                    {cert.skills.slice(0, 4).map(skill => (
                      <span key={skill} className={styles.skillChip}>
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 4 && (
                      <span className={styles.moreSkills}>
                        +{cert.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {cert.credentialId && (
                <div className={styles.credentialInfo}>
                  <span className={styles.credentialLabel}>Credential ID:</span>
                  <span className={styles.credentialId}>
                    {cert.credentialId}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.cardActions}>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.verifyLink}
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
                  Verify
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCertifications.length === 0 && (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>🏆</div>
          <h3 className={styles.noResultsTitle}>No certifications found</h3>
          <p className={styles.noResultsText}>
            Try selecting a different category.
          </p>
        </div>
      )}
    </div>
  )
}
