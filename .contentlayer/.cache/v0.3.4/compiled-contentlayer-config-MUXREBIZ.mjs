// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
var Project = defineDocumentType(() => ({
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
      type: 'list',
      of: {
        type: 'object',
        fields: {
          title: {
            type: 'string',
            required: true,
          },
          language: {
            type: 'string',
            required: true,
          },
          code: {
            type: 'string',
            required: true,
          },
          description: {
            type: 'string',
          },
        },
      },
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
var BlogPost = defineDocumentType(() => ({
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
      type: 'object',
      fields: {
        name: {
          type: 'string',
          required: true,
        },
        avatar: {
          type: 'string',
        },
        bio: {
          type: 'string',
        },
      },
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
var Certification = defineDocumentType(() => ({
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
        return new Date(doc.expiryDate) < /* @__PURE__ */ new Date()
      },
    },
    daysUntilExpiry: {
      type: 'number',
      resolve: doc => {
        if (!doc.expiryDate) return -1
        const diffTime =
          new Date(doc.expiryDate).getTime() -
          /* @__PURE__ */ new Date().getTime()
        return Math.ceil(diffTime / (1e3 * 60 * 60 * 24))
      },
    },
  },
}))
var contentlayer_config_default = makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, BlogPost, Certification],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
export {
  BlogPost,
  Certification,
  Project,
  contentlayer_config_default as default,
}
//# sourceMappingURL=compiled-contentlayer-config-MUXREBIZ.mjs.map
