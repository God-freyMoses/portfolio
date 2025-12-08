import { notFound } from 'next/navigation'
import { allBlogPosts } from 'contentlayer/generated'
import { BlogPost } from '@/components/Blog'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allBlogPosts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = allBlogPosts.find(post => post.slug === params.slug)

  if (!post || post.draft) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Tshegofatso Moses Portfolio`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Tshegofatso Moses Portfolio`,
      description: post.description,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Tshegofatso Moses Portfolio`,
      description: post.description,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = allBlogPosts.find(post => post.slug === params.slug)

  if (!post || post.draft) {
    notFound()
  }

  return <BlogPost post={post} />
}
