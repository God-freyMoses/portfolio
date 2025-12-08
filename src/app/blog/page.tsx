import { allBlogPosts } from 'contentlayer/generated'
import { BlogPost } from '@/components/Blog'
import styles from './page.module.css'

export const metadata = {
  title: 'Blog | Tshegofatso Moses Portfolio',
  description:
    'Thoughts, insights, and tutorials on web development, React, Next.js, and modern JavaScript.',
}

export default function BlogPage() {
  const publishedPosts = allBlogPosts
    .filter(post => !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

  return (
    <div className={styles.blogPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.description}>
            Thoughts, insights, and tutorials on web development, React,
            Next.js, and modern JavaScript.
          </p>
        </header>

        <div className={styles.postsGrid}>
          {publishedPosts.map(post => (
            <BlogPost key={post.slug} post={post} preview />
          ))}
        </div>

        {publishedPosts.length === 0 && (
          <div className={styles.noPosts}>
            <div className={styles.noPostsIcon}>📝</div>
            <h2 className={styles.noPostsTitle}>No posts yet</h2>
            <p className={styles.noPostsText}>
              Check back soon for new articles and tutorials!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
