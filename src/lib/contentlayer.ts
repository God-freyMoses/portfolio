import {
  allProjects,
  allBlogPosts,
  allCertifications,
} from 'contentlayer/generated'

export { allProjects, allBlogPosts, allCertifications }

// Content validation utilities
export function validateProject(project: any): boolean {
  const requiredFields = ['id', 'title', 'description', 'image', 'techStack']
  return requiredFields.every(field => project[field])
}

export function validateBlogPost(post: any): boolean {
  const requiredFields = ['title', 'description', 'image', 'publishedAt']
  return requiredFields.every(field => post[field])
}

export function validateCertification(cert: any): boolean {
  const requiredFields = ['title', 'issuer', 'issueDate', 'image']
  return requiredFields.every(field => cert[field])
}

// Error handling wrapper
export async function getContentWithErrorHandling<T>(
  contentGetter: () => Promise<T> | T,
  contentType: string
): Promise<{ data: T | null; error: string | null }> {
  try {
    const data = await contentGetter()
    return { data, error: null }
  } catch (error) {
    console.error(`Error loading ${contentType}:`, error)
    return {
      data: null,
      error: `Failed to load ${contentType}. Please try again later.`,
    }
  }
}

// Content filtering utilities
export function getFeaturedProjects() {
  return allProjects.filter(project => project.featured)
}

export function getPublishedBlogPosts() {
  return allBlogPosts.filter(post => !post.draft)
}

export function getValidCertifications() {
  return allCertifications.filter(cert => validateCertification(cert))
}

// Search utilities
export function searchProjects(query: string) {
  const lowercaseQuery = query.toLowerCase()
  return allProjects.filter(
    project =>
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.techStack.some(tech =>
        tech.toLowerCase().includes(lowercaseQuery)
      )
  )
}

export function searchBlogPosts(query: string) {
  const lowercaseQuery = query.toLowerCase()
  return allBlogPosts.filter(
    post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.description.toLowerCase().includes(lowercaseQuery) ||
      post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
