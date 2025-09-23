'use client'

import { useMemo, useState } from 'react'
import styles from './FeaturedProjects.module.css'
import { ProjectCard } from './ProjectCard'
import { ProjectFilter } from './ProjectFilter'

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
}

interface FilterOptions {
  category: string
  techStack: string[]
  sortBy: 'title' | 'date' | 'complexity'
  sortOrder: 'asc' | 'desc'
}

interface FeaturedProjectsProps {
  className?: string
}

// Mock project data - in a real app, this would come from a CMS or API
const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution built with Next.js, featuring real-time inventory management, secure payments, and an intuitive admin dashboard.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center',
    techStack: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Stripe',
      'Tailwind CSS',
    ],
    liveUrl: 'https://ecommerce-demo.example.com',
    githubUrl: 'https://github.com/username/ecommerce-platform',
    featured: true,
    category: 'Full-Stack',
    complexity: 'advanced',
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'Task Management App',
    description:
      'A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
    liveUrl: 'https://taskmanager-demo.example.com',
    githubUrl: 'https://github.com/username/task-manager',
    featured: true,
    category: 'Web App',
    complexity: 'intermediate',
    date: '2023-11-20',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description:
      'A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
    image:
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=center',
    techStack: ['Vue.js', 'Express.js', 'OpenWeather API', 'Chart.js', 'SCSS'],
    liveUrl: 'https://weather-dashboard.example.com',
    githubUrl: 'https://github.com/username/weather-dashboard',
    featured: true,
    category: 'Frontend',
    complexity: 'intermediate',
    date: '2023-09-10',
  },
  {
    id: '4',
    title: 'Social Media Analytics',
    description:
      'A comprehensive analytics platform for social media management with data visualization and automated reporting.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
    techStack: ['React', 'Python', 'FastAPI', 'Redis', 'D3.js'],
    liveUrl: 'https://analytics-platform.example.com',
    githubUrl: 'https://github.com/username/social-analytics',
    featured: true,
    category: 'Data Analytics',
    complexity: 'advanced',
    date: '2024-02-28',
  },
  {
    id: '5',
    title: 'Mobile Banking App',
    description:
      'A secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.',
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center',
    techStack: ['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'Stripe'],
    liveUrl: 'https://banking-app.example.com',
    githubUrl: 'https://github.com/username/banking-app',
    featured: true,
    category: 'Mobile App',
    complexity: 'advanced',
    date: '2024-03-15',
  },
  {
    id: '6',
    title: 'Portfolio Website',
    description:
      'A modern, responsive portfolio website showcasing advanced CSS techniques, animations, and performance optimization.',
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center',
    techStack: ['Next.js', 'TypeScript', 'CSS Modules', 'Framer Motion'],
    liveUrl: 'https://portfolio.example.com',
    githubUrl: 'https://github.com/username/portfolio',
    featured: false,
    category: 'Frontend',
    complexity: 'beginner',
    date: '2023-08-05',
  },
]

export function FeaturedProjects({ className = '' }: FeaturedProjectsProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    techStack: [],
    sortBy: 'date',
    sortOrder: 'desc',
  })

  // Extract unique categories and tech stack items
  const availableCategories = useMemo(() => {
    const categories = featuredProjects
      .map(project => project.category)
      .filter((category): category is string => Boolean(category))
    return Array.from(new Set(categories))
  }, [])

  const availableTechStack = useMemo(() => {
    const allTech = featuredProjects.flatMap(project => project.techStack)
    return Array.from(new Set(allTech)).sort()
  }, [])

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    const filtered = featuredProjects.filter(project => {
      // Category filter
      if (filters.category !== 'all' && project.category !== filters.category) {
        return false
      }

      // Tech stack filter
      if (filters.techStack.length > 0) {
        const hasMatchingTech = filters.techStack.some(tech =>
          project.techStack.includes(tech)
        )
        if (!hasMatchingTech) return false
      }

      return true
    })

    // Sort projects
    filtered.sort((a, b) => {
      let comparison = 0

      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'date':
          const dateA = new Date(a.date || '2023-01-01').getTime()
          const dateB = new Date(b.date || '2023-01-01').getTime()
          comparison = dateA - dateB
          break
        case 'complexity':
          const complexityOrder = { beginner: 1, intermediate: 2, advanced: 3 }
          const complexityA = complexityOrder[a.complexity || 'intermediate']
          const complexityB = complexityOrder[b.complexity || 'intermediate']
          comparison = complexityA - complexityB
          break
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison
    })

    return filtered
  }, [filters])

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  return (
    <div className={`${styles.featuredProjects} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured Projects</h2>
        <p className={styles.description}>
          A showcase of my recent work, demonstrating expertise in full-stack
          development, modern web technologies, and user-centered design
          principles.
        </p>
      </div>

      <ProjectFilter
        onFilterChange={handleFilterChange}
        availableCategories={availableCategories}
        availableTechStack={availableTechStack}
      />

      <div className={styles.projectsGrid}>
        {filteredAndSortedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} delay={index * 100} />
        ))}
      </div>

      {filteredAndSortedProjects.length === 0 && (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>🔍</div>
          <h3 className={styles.noResultsTitle}>No projects found</h3>
          <p className={styles.noResultsText}>
            Try adjusting your filters to see more projects.
          </p>
        </div>
      )}

      <div className={styles.viewAllContainer}>
        <button className={styles.viewAllButton}>
          <span>View All Projects ({featuredProjects.length})</span>
          <svg
            className={styles.arrow}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
