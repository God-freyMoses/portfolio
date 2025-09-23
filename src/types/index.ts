// Central export for all type definitions

export * from './global'

// Project-related types
export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  image: string
  gallery: string[]
  techStack: TechStack[]
  category: ProjectCategory
  featured: boolean
  status: 'completed' | 'in-progress' | 'archived'
  startDate: Date
  endDate?: Date
  liveUrl?: string
  githubUrl?: string
  caseStudy?: CaseStudy
  createdAt: Date
  updatedAt: Date
}

export interface TechStack {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'cloud'
  color?: string
}

export type ProjectCategory =
  | 'web-app'
  | 'mobile-app'
  | 'desktop-app'
  | 'library'
  | 'tool'
  | 'design'

export interface CaseStudy {
  overview: string
  role: string
  timeline: string
  problem: string
  solution: string
  architecture: string // Mermaid diagram code
  challenges: Challenge[]
  keyFeatures: Feature[]
  codeSnippets: CodeSnippet[]
  metrics: Metric[]
  learnings: string[]
}

export interface Challenge {
  title: string
  description: string
  solution: string
}

export interface Feature {
  title: string
  description: string
  techUsed: string[]
}

export interface CodeSnippet {
  title: string
  language: string
  code: string
  description?: string
}

export interface Metric {
  label: string
  value: string
  description?: string
}

// Blog-related types
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  image?: string
  tags: string[]
  publishedAt: Date
  readingTime: number
  featured: boolean
}

// Certification types
export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  credentialUrl?: string
  badgeImage?: string
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  external?: boolean
}

// Contact form types
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Newsletter types
export interface NewsletterSubscription {
  email: string
  subscribedAt: Date
}
