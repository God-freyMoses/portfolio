'use client'

import styles from './About.module.css'
import { SkillBadge } from './SkillBadge'
import { StatCard } from './StatCard'

interface AboutProps {
  className?: string
}

const skills = [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Language' },
  { name: 'Next.js', level: 88, category: 'Framework' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'PostgreSQL', level: 82, category: 'Database' },
  { name: 'AWS', level: 78, category: 'Cloud' },
  { name: 'Docker', level: 80, category: 'DevOps' },
  { name: 'Figma', level: 85, category: 'Design' },
]

const stats = [
  { label: 'Projects Completed', value: '50+', icon: '🚀' },
  { label: 'Years Experience', value: '5+', icon: '⏱️' },
  { label: 'Technologies Mastered', value: '20+', icon: '💻' },
  { label: 'Client Satisfaction', value: '100%', icon: '⭐' },
]

export function About({ className = '' }: AboutProps) {
  return (
    <div className={`${styles.about} ${className}`}>
      <div className={styles.content}>
        {/* About Text */}
        <div className={styles.textSection}>
          <h2 className={styles.title}>About Me</h2>
          <div className={styles.description}>
            <p>
              I&apos;m a passionate full-stack developer with expertise in
              modern web technologies. I specialize in creating beautiful,
              functional, and accessible user experiences that solve real-world
              problems.
            </p>
            <p>
              With a strong background in both frontend and backend development,
              I bring a holistic approach to building web applications. I&apos;m
              constantly learning and staying up-to-date with the latest
              technologies and best practices.
            </p>
            <p>
              When I&apos;m not coding, you can find me exploring new design
              trends, contributing to open-source projects, or sharing knowledge
              with the developer community.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className={styles.statsSection}>
          <h3 className={styles.sectionTitle}>By the Numbers</h3>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} delay={index * 100} />
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className={styles.skillsSection}>
          <h3 className={styles.sectionTitle}>Technical Skills</h3>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <SkillBadge key={skill.name} {...skill} delay={index * 50} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
