'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost as BlogPostType } from 'contentlayer/generated'
import styles from './BlogPost.module.css'

interface BlogPostProps {
  post: BlogPostType
  preview?: boolean
}

export function BlogPost({ post, preview = false }: BlogPostProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (preview) {
    return (
      <article className={styles.blogPostPreview}>
        <Link href={`/blog/${post.slug}`} className={styles.previewLink}>
          <div className={styles.previewImage}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
              onLoad={handleImageLoad}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {!imageLoaded && (
              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderIcon}>📝</div>
              </div>
            )}
          </div>

          <div className={styles.previewContent}>
            <div className={styles.previewMeta}>
              <time dateTime={post.publishedAt} className={styles.date}>
                {formatDate(post.publishedAt)}
              </time>
              <span className={styles.readingTime}>
                {post.readingTime} min read
              </span>
            </div>

            <h2 className={styles.previewTitle}>{post.title}</h2>
            <p className={styles.previewDescription}>{post.description}</p>

            <div className={styles.previewTags}>
              {post.tags?.slice(0, 3).map(tag => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.previewAuthor}>
              {post.author?.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className={styles.authorAvatar}
                />
              )}
              <span className={styles.authorName}>{post.author?.name}</span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className={styles.blogPost}>
      <header className={styles.header}>
        <div className={styles.heroImage}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className={styles.image}
            sizes="100vw"
          />
        </div>

        <div className={styles.headerContent}>
          <div className={styles.meta}>
            <time dateTime={post.publishedAt} className={styles.date}>
              {formatDate(post.publishedAt)}
            </time>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <time dateTime={post.updatedAt} className={styles.updatedDate}>
                Updated {formatDate(post.updatedAt)}
              </time>
            )}
            <span className={styles.readingTime}>
              {post.readingTime} min read
            </span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>

          <div className={styles.tags}>
            {post.tags?.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.author}>
            {post.author?.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className={styles.authorAvatar}
              />
            )}
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{post.author?.name}</span>
              {post.author?.bio && (
                <p className={styles.authorBio}>{post.author.bio}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.body}>
          {post.body?.code && (
            <div dangerouslySetInnerHTML={{ __html: post.body.code }} />
          )}
        </div>
      </div>
    </article>
  )
}
