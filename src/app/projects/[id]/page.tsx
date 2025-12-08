import { notFound } from 'next/navigation'
import { ProjectCaseStudy } from '../../../components/ProjectCaseStudy'
import { featuredProjects } from '@/data/projects'

// Mock project data - in a real app, this would come from a CMS or API
const allProjects = featuredProjects

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return allProjects.map(project => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = allProjects.find(p => p.id === params.id)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Tshegofatso Moses Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Tshegofatso Moses Portfolio`,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Tshegofatso Moses Portfolio`,
      description: project.description,
      images: [project.image],
    },
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = allProjects.find(p => p.id === params.id)

  if (!project) {
    notFound()
  }

  // Find previous and next projects
  const currentIndex = allProjects.findIndex(p => p.id === params.id)
  const previousProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : undefined
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : undefined

  // Add navigation data to project
  const projectWithNavigation = {
    ...project,
    ...(previousProject && {
      previousProject: {
        id: previousProject.id,
        title: previousProject.title,
        image: previousProject.image,
      },
    }),
    ...(nextProject && {
      nextProject: {
        id: nextProject.id,
        title: nextProject.title,
        image: nextProject.image,
      },
    }),
  }

  return (
    <ProjectCaseStudy
      project={projectWithNavigation}
      allProjects={allProjects}
    />
  )
}
