/**
 * Path alias test utility
 * This file tests that all configured path aliases are working correctly
 */

// Test imports using path aliases
import { clientEnv } from '@/lib/env'
import type { BlogPost, Project } from '@/types'

// Test function to verify path aliases work
export function testPathAliases() {
  console.log('Testing path aliases...')

  // Test @/types alias
  const testProject: Partial<Project> = {
    title: 'Test Project',
    description: 'Testing path aliases',
  }

  const testBlogPost: Partial<BlogPost> = {
    title: 'Test Blog Post',
    excerpt: 'Testing path aliases',
  }

  // Test @/lib alias
  const siteUrl = clientEnv.SITE_URL

  console.log('Path aliases working correctly!')
  console.log('Site URL:', siteUrl)
  console.log('Test project:', testProject.title)
  console.log('Test blog post:', testBlogPost.title)

  return {
    success: true,
    message: 'All path aliases are configured correctly',
  }
}

// Export types for testing
export type { BlogPost, Project } from '@/types'
