import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Layout } from '../components/Layout'
import { PageTransition } from '../components/Layout/PageTransition'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tshegofatso Moses | Full-Stack Developer & UI/UX Designer',
  description:
    'Portfolio of Tshegofatso Godfrey Moses - Full-Stack Software Developer and UI/UX Designer showcasing modern web applications and design solutions.',
  keywords: [
    'Full-Stack Developer',
    'UI/UX Designer',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'Tshegofatso Godfrey Moses' }],
  creator: 'Tshegofatso Godfrey Moses',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Tshegofatso Moses | Full-Stack Developer & UI/UX Designer',
    description:
      'Portfolio showcasing modern web applications and design solutions.',
    siteName: 'Tshegofatso Moses Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tshegofatso Moses | Full-Stack Developer & UI/UX Designer',
    description:
      'Portfolio showcasing modern web applications and design solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Layout>
          <PageTransition>{children}</PageTransition>
        </Layout>
      </body>
    </html>
  )
}
