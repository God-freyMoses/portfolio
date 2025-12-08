'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './ProjectCaseStudy.module.css'
import { ProjectNavigation } from './ProjectNavigation'
import { CodeSnippet } from './CodeSnippet'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { ImageGallery } from './ImageGallery'
import { VideoEmbed } from './VideoEmbed'

interface Project {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  category?: string
  complexity?: 'beginner' | 'intermediate' | 'advanced'
  date?: string
  // Case study specific fields
  problemStatement?: string
  role?: string
  timeline?: string
  approach?: string
  challenges?: string[]
  solutions?: string[]
  outcomes?: string[]
  architectureDiagram?: string
  codeSnippets?: Array<{
    title: string
    language: string
    code: string
    description?: string
  }>
  gallery?: string[]
  videoUrl?: string
  videoPlatform?: 'youtube' | 'vimeo' | 'custom'
  nextProject?: {
    id: string
    title: string
    image: string
  }
  previousProject?: {
    id: string
    title: string
    image: string
  }
}

interface ProjectCaseStudyProps {
  project: Project
  allProjects: Project[]
}

export function ProjectCaseStudy({
  project,
  allProjects,
}: ProjectCaseStudyProps) {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleBackToProjects = () => {
    router.push('#projects')
  }

  const getTechCategory = (tech: string): string => {
    const techLower = tech.toLowerCase()

    if (
      [
        'react',
        'vue.js',
        'angular',
        'next.js',
        'nuxt.js',
        'svelte',
        'typescript',
        'javascript',
        'html',
        'css',
        'tailwind css',
        'sass',
        'scss',
        'material-ui',
        'chakra ui',
        'styled-components',
      ].includes(techLower)
    ) {
      return 'frontend'
    }

    if (
      [
        'node.js',
        'express.js',
        'fastapi',
        'django',
        'flask',
        'spring boot',
        'laravel',
        'ruby on rails',
        'asp.net',
        'php',
        'python',
        'java',
        'c#',
        'go',
        'rust',
      ].includes(techLower)
    ) {
      return 'backend'
    }

    if (
      [
        'postgresql',
        'mysql',
        'mongodb',
        'redis',
        'sqlite',
        'firebase',
        'supabase',
        'prisma',
        'typeorm',
        'sequelize',
      ].includes(techLower)
    ) {
      return 'database'
    }

    if (
      [
        'aws',
        'azure',
        'gcp',
        'vercel',
        'netlify',
        'heroku',
        'docker',
        'kubernetes',
        'terraform',
      ].includes(techLower)
    ) {
      return 'cloud'
    }

    if (
      [
        'webpack',
        'vite',
        'rollup',
        'babel',
        'eslint',
        'prettier',
        'jest',
        'cypress',
        'playwright',
        'storybook',
        'figma',
        'adobe xd',
      ].includes(techLower)
    ) {
      return 'tool'
    }

    return 'default'
  }

  return (
    <div className={`${styles.caseStudy} ${isVisible ? styles.visible : ''}`}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <button
            onClick={handleBackToProjects}
            className={styles.backButton}
            aria-label="Back to projects"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Projects
          </button>

          <div className={styles.heroText}>
            <div className={styles.category}>
              <span className={styles.categoryText}>{project.category}</span>
            </div>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.description}>{project.description}</p>

            <div className={styles.meta}>
              {project.role && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Role:</span>
                  <span className={styles.metaValue}>{project.role}</span>
                </div>
              )}
              {project.timeline && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Timeline:</span>
                  <span className={styles.metaValue}>{project.timeline}</span>
                </div>
              )}
              {project.complexity && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Complexity:</span>
                  <span className={styles.metaValue}>{project.complexity}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.heroImage}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className={styles.image}
          />
        </div>
      </section>

      {/* Tech Stack */}
      <section className={styles.techStackSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Technology Stack</h2>
          <div className={styles.techStack}>
            {project.techStack.map(tech => (
              <span
                key={tech}
                className={styles.techBadge}
                data-category={getTechCategory(tech)}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      {project.problemStatement && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Problem Statement</h2>
            <p className={styles.sectionText}>{project.problemStatement}</p>
          </div>
        </section>
      )}

      {/* Approach */}
      {project.approach && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Technical Approach</h2>
            <p className={styles.sectionText}>{project.approach}</p>
          </div>
        </section>
      )}

      {/* Architecture Diagram */}
      {project.architectureDiagram && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Architecture Overview</h2>
            <ArchitectureDiagram diagram={project.architectureDiagram} />
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      {(project.challenges?.length || project.solutions?.length) && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Challenges & Solutions</h2>
            <div className={styles.challengesSolutions}>
              {project.challenges?.map((challenge, index) => (
                <div
                  key={`challenge-${index}`}
                  className={styles.challengeItem}
                >
                  <div className={styles.challenge}>
                    <h3>Challenge {index + 1}</h3>
                    <p>{challenge}</p>
                  </div>
                  {project.solutions?.[index] && (
                    <div className={styles.solution}>
                      <h3>Solution</h3>
                      <p>{project.solutions[index]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Code Snippets */}
      {project.codeSnippets?.length && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Code Examples</h2>
            <div className={styles.codeSnippets}>
              {project.codeSnippets.map((snippet, index) => (
                <CodeSnippet
                  key={index}
                  title={snippet.title}
                  language={snippet.language}
                  code={snippet.code}
                  description={snippet.description || ''}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery?.length && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Project Gallery</h2>
            <ImageGallery
              images={project.gallery}
              projectTitle={project.title}
            />
          </div>
        </section>
      )}

      {/* Video Demo */}
      {project.videoUrl && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Video Demo</h2>
            <VideoEmbed
              url={project.videoUrl}
              title={`${project.title} demo video`}
              platform={project.videoPlatform || 'youtube'}
            />
          </div>
        </section>
      )}

      {/* Outcomes */}
      {project.outcomes?.length && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Key Outcomes</h2>
            <ul className={styles.outcomes}>
              {project.outcomes.map((outcome, index) => (
                <li key={index} className={styles.outcome}>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Links */}
      {(project.liveUrl || project.githubUrl) && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Links</h2>
            <div className={styles.links}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5C12.7614 5 15 7.23858 15 10C15 12.7614 12.7614 15 10 15Z"
                      fill="currentColor"
                    />
                    <path
                      d="M13.5355 6.46447C13.9261 6.85499 13.9261 7.48816 13.5355 7.87868L7.87868 13.5355C7.48816 13.9261 6.85499 13.9261 6.46447 13.5355C6.07394 13.1450 6.07394 12.5118 6.46447 12.1213L12.1213 6.46447C12.5118 6.07394 13.1450 6.07394 13.5355 6.46447Z"
                      fill="currentColor"
                    />
                  </svg>
                  View Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      fill="currentColor"
                    />
                  </svg>
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Project Navigation */}
      <ProjectNavigation
        previousProject={project.previousProject}
        nextProject={project.nextProject}
        allProjects={allProjects}
      />
    </div>
  )
}
