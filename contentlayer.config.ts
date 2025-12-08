import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    id: {
      type: 'string',
      required: true,
    },
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: true,
    },
    techStack: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    liveUrl: {
      type: 'string',
    },
    githubUrl: {
      type: 'string',
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    category: {
      type: 'string',
    },
    complexity: {
      type: 'enum',
      options: ['beginner', 'intermediate', 'advanced'],
    },
    date: {
      type: 'date',
    },
    // Case study specific fields
    problemStatement: {
      type: 'string',
    },
    role: {
      type: 'string',
    },
    timeline: {
      type: 'string',
    },
    approach: {
      type: 'string',
    },
    challenges: {
      type: 'list',
      of: { type: 'string' },
    },
    solutions: {
      type: 'list',
      of: { type: 'string' },
    },
    outcomes: {
      type: 'list',
      of: { type: 'string' },
    },
    architectureDiagram: {
      type: 'string',
    },
    codeSnippets: {
      type: 'json',
    },
    gallery: {
      type: 'list',
      of: { type: 'string' },
    },
    videoUrl: {
      type: 'string',
    },
    videoPlatform: {
      type: 'enum',
      options: ['youtube', 'vimeo', 'custom'],
      default: 'youtube',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.replace('projects/', ''),
    },
    readingTime: {
      type: 'number',
      resolve: doc => {
        const wordsPerMinute = 200
        const words = doc.body.raw.split(/\s+/).length
        return Math.ceil(words / wordsPerMinute)
      },
    },
  },
}))

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'date',
      required: true,
    },
    updatedAt: {
      type: 'date',
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    draft: {
      type: 'boolean',
      default: false,
    },
    author: {
      type: 'json',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.replace('blog/', ''),
    },
    readingTime: {
      type: 'number',
      resolve: doc => {
        const wordsPerMinute = 200
        const words = doc.body.raw.split(/\s+/).length
        return Math.ceil(words / wordsPerMinute)
      },
    },
    excerpt: {
      type: 'string',
      resolve: doc => {
        const words = doc.body.raw.split(/\s+/)
        return words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '')
      },
    },
  },
}))

export const Certification = defineDocumentType(() => ({
  name: 'Certification',
  filePathPattern: 'certifications/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    issuer: {
      type: 'string',
      required: true,
    },
    issueDate: {
      type: 'date',
      required: true,
    },
    expiryDate: {
      type: 'date',
    },
    credentialId: {
      type: 'string',
    },
    credentialUrl: {
      type: 'string',
    },
    image: {
      type: 'string',
      required: true,
    },
    skills: {
      type: 'list',
      of: { type: 'string' },
    },
    featured: {
      type: 'boolean',
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.replace('certifications/', ''),
    },
    isExpired: {
      type: 'boolean',
      resolve: doc => {
        if (!doc.expiryDate) return false
        return new Date(doc.expiryDate) < new Date()
      },
    },
    daysUntilExpiry: {
      type: 'number',
      resolve: doc => {
        if (!doc.expiryDate) return -1
        const diffTime =
          new Date(doc.expiryDate).getTime() - new Date().getTime()
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, BlogPost, Certification],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  disableImportAliasWarning: true,
})
