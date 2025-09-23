/**
 * Environment variables configuration and validation
 * Provides type-safe access to environment variables
 */

// Client-side environment variables (prefixed with NEXT_PUBLIC_)
export const clientEnv = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio',
  SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '',
  GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  DEV_MODE: process.env.NEXT_PUBLIC_DEV_MODE === 'true',
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',

  // Feature flags
  ENABLE_BLOG: process.env.NEXT_PUBLIC_ENABLE_BLOG === 'true',
  ENABLE_NEWSLETTER: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER === 'true',
  ENABLE_CONTACT_FORM: process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM === 'true',
} as const

// Server-side environment variables
export const serverEnv = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,

  // SMTP Configuration
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT
    ? parseInt(process.env.SMTP_PORT, 10)
    : undefined,
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,

  // Email Configuration
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,

  // Authentication
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,

  // Rate limiting
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX
    ? parseInt(process.env.RATE_LIMIT_MAX, 10)
    : 100,
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW
    ? parseInt(process.env.RATE_LIMIT_WINDOW, 10)
    : 900000,

  // Third-party APIs
  NEWSLETTER_API_KEY: process.env.NEWSLETTER_API_KEY,
  NEWSLETTER_LIST_ID: process.env.NEWSLETTER_LIST_ID,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GITHUB_REPO: process.env.GITHUB_REPO,
} as const

/**
 * Validates required environment variables
 * Call this function at application startup
 */
export function validateEnv() {
  const errors: string[] = []

  // Validate required client-side variables
  if (!clientEnv.SITE_URL) {
    errors.push('NEXT_PUBLIC_SITE_URL is required')
  }

  // Validate URL format
  try {
    new URL(clientEnv.SITE_URL)
  } catch {
    errors.push('NEXT_PUBLIC_SITE_URL must be a valid URL')
  }

  // In production, validate additional required variables
  if (serverEnv.NODE_ENV === 'production') {
    if (clientEnv.ENABLE_CONTACT_FORM && !serverEnv.SMTP_HOST) {
      errors.push(
        'SMTP_HOST is required when contact form is enabled in production'
      )
    }

    if (clientEnv.ENABLE_NEWSLETTER && !serverEnv.NEWSLETTER_API_KEY) {
      errors.push(
        'NEWSLETTER_API_KEY is required when newsletter is enabled in production'
      )
    }
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`)
  }
}

/**
 * Get environment-specific configuration
 */
export function getConfig() {
  return {
    isDevelopment: serverEnv.NODE_ENV === 'development',
    isProduction: serverEnv.NODE_ENV === 'production',
    isTest: serverEnv.NODE_ENV === 'test',

    // URLs
    siteUrl: clientEnv.SITE_URL,
    baseUrl: clientEnv.SITE_URL.replace(/\/$/, ''),

    // Features
    features: {
      blog: clientEnv.ENABLE_BLOG,
      newsletter: clientEnv.ENABLE_NEWSLETTER,
      contactForm: clientEnv.ENABLE_CONTACT_FORM,
      analytics: !!clientEnv.GA_ID,
    },

    // Debug
    debug: clientEnv.DEBUG_MODE,
  }
}
