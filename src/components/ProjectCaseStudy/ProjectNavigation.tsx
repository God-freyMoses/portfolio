'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './ProjectNavigation.module.css'

interface Project {
  id: string
  title: string
  image: string
}

interface ProjectNavigationProps {
  previousProject?: Project | undefined
  nextProject?: Project | undefined
  allProjects: Project[]
}

export function ProjectNavigation({
  previousProject,
  nextProject,
}: ProjectNavigationProps) {
  return (
    <nav className={styles.projectNavigation} aria-label="Project navigation">
      <div className={styles.container}>
        {previousProject && (
          <Link
            href={`/projects/${previousProject.id}`}
            className={styles.navItem}
            aria-label={`Previous project: ${previousProject.title}`}
          >
            <div className={styles.navContent}>
              <div className={styles.navImage}>
                <Image
                  src={previousProject.image}
                  alt={previousProject.title}
                  fill
                  className={styles.image}
                />
                <div className={styles.overlay} />
              </div>
              <div className={styles.navText}>
                <div className={styles.navLabel}>Previous Project</div>
                <div className={styles.navTitle}>{previousProject.title}</div>
              </div>
            </div>
            <div className={styles.navArrow}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        )}

        <div className={styles.viewAll}>
          <Link href="#projects" className={styles.viewAllLink}>
            <div className={styles.viewAllIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>View All Projects</span>
          </Link>
        </div>

        {nextProject && (
          <Link
            href={`/projects/${nextProject.id}`}
            className={styles.navItem}
            aria-label={`Next project: ${nextProject.title}`}
          >
            <div className={styles.navArrow}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={styles.navContent}>
              <div className={styles.navImage}>
                <Image
                  src={nextProject.image}
                  alt={nextProject.title}
                  fill
                  className={styles.image}
                />
                <div className={styles.overlay} />
              </div>
              <div className={styles.navText}>
                <div className={styles.navLabel}>Next Project</div>
                <div className={styles.navTitle}>{nextProject.title}</div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </nav>
  )
}
