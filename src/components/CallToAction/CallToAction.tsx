'use client'

import React, { useRef, useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './CallToAction.module.css'
import { SocialLinks } from './SocialLinks'

interface CallToActionProps {
  variant?: 'primary' | 'secondary'
  className?: string
}

export function CallToAction({
  variant = 'primary',
  className = '',
}: CallToActionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const isIntersecting = useIntersectionObserver(ref, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  })

  React.useEffect(() => {
    if (isIntersecting && !isVisible) {
      setIsVisible(true)
    }
  }, [isIntersecting, isVisible])

  if (variant === 'secondary') {
    return (
      <div
        ref={ref}
        className={`${styles.callToAction} ${styles.secondary} ${isVisible ? styles.visible : ''} ${className}`}
      >
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h2 className={styles.title}>
              Let&apos;s Build Something Amazing Together
            </h2>
            <p className={styles.description}>
              I&apos;m always excited to work on new projects and collaborate
              with talented individuals. Whether you have a specific project in
              mind or just want to explore possibilities, I&apos;d love to hear
              from you.
            </p>
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryButton}>
              <span className={styles.buttonText}>Start a Project</span>
              <div className={styles.buttonIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            <button className={styles.secondaryButton}>
              <span className={styles.buttonText}>Download Resume</span>
              <div className={styles.buttonIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 1V15M10 15L15 10M10 15L5 10M3 19H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>

          <SocialLinks />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`${styles.callToAction} ${styles.primary} ${isVisible ? styles.visible : ''} ${className}`}
    >
      <div className={styles.backgroundPattern}></div>
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeText}>Available for Work</span>
          <div className={styles.statusIndicator}></div>
        </div>

        <h2 className={styles.title}>Ready to Bring Your Ideas to Life?</h2>
        <p className={styles.description}>
          Let&apos;s discuss your next project and create something
          extraordinary together. I&apos;m passionate about turning innovative
          ideas into reality through clean code and exceptional user
          experiences.
        </p>

        <div className={styles.actions}>
          <button className={styles.primaryButton}>
            <span className={styles.buttonText}>Get In Touch</span>
            <div className={styles.buttonIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M18 8C18 12.4183 14.4183 16 10 16C8.61929 16 7.32951 15.6072 6.24072 14.9281L2 16L3.07186 11.7593C2.39284 10.6705 2 9.38071 2 8C2 3.58172 5.58172 0 10 0C14.4183 0 18 3.58172 18 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          <button className={styles.secondaryButton}>
            <span className={styles.buttonText}>View Portfolio</span>
            <div className={styles.buttonIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M1 5C1 3.89543 1.89543 3 3 3H7L9 1H15C16.1046 1 17 1.89543 17 3V5M1 5V15C1 16.1046 1.89543 17 3 17H15C16.1046 17 17 16.1046 17 15V5M1 5H17M13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>

        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Email</span>
            <a
              href="mailto:hello@tshegofatso.dev"
              className={styles.contactLink}
            >
              hello@tshegofatso.dev
            </a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Response Time</span>
            <span className={styles.contactValue}>Within 24 hours</span>
          </div>
        </div>
      </div>
    </div>
  )
}
