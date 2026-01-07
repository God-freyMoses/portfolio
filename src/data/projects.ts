export interface ProjectData {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  category?: string
  complexity?: 'beginner' | 'intermediate' | 'advanced'
  date?: string
}

export const featuredProjects: ProjectData[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution built with Next.js, featuring real-time inventory management, secure payments, and an intuitive admin dashboard.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center',
    techStack: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Stripe',
      'Tailwind CSS',
    ],
    liveUrl: 'https://ecommerce-demo.example.com',
    githubUrl: 'https://github.com/God-freyMoses',
    featured: true,
    category: 'Full-Stack',
    complexity: 'advanced',
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'Task Management App',
    description:
      'A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
    liveUrl: 'https://taskmanager-demo.example.com',
    githubUrl: 'https://github.com/God-freyMoses',
    featured: true,
    category: 'Web App',
    complexity: 'intermediate',
    date: '2023-11-20',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description:
      'A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
    image:
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=center',
    techStack: ['Vue.js', 'Express.js', 'OpenWeather API', 'Chart.js', 'SCSS'],
    liveUrl: 'https://weather-dashboard.example.com',
    githubUrl: 'https://github.com/God-freyMoses',
    featured: true,
    category: 'Frontend',
    complexity: 'intermediate',
    date: '2023-09-10',
  },
  {
    id: '4',
    title: 'Social Media Analytics',
    description:
      'A comprehensive analytics platform for social media management with data visualization and automated reporting.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
    techStack: ['React', 'Python', 'FastAPI', 'Redis', 'D3.js'],
    liveUrl: 'https://analytics-platform.example.com',
    githubUrl: 'https://github.com/God-freyMoses',
    featured: true,
    category: 'Data Analytics',
    complexity: 'advanced',
    date: '2024-02-28',
  },
  {
    id: '5',
    title: 'Mobile Banking App',
    description:
      'A secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.',
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center',
    techStack: ['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'Stripe'],
    liveUrl: 'https://banking-app.example.com',
    githubUrl: 'https://github.com/God-freyMoses',
    featured: true,
    category: 'Mobile App',
    complexity: 'advanced',
    date: '2024-03-15',
  },
  {
    id: '6',
    title: 'Portfolio Website',
    description:
      'A modern, responsive portfolio website showcasing advanced CSS techniques, animations, and performance optimization.',
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center',
    techStack: ['Next.js', 'TypeScript', 'CSS Modules', 'Framer Motion'],
    liveUrl: 'https://portfolio.example.com',
    githubUrl: 'https://github.com/God-freyMoses',
    featured: false,
    category: 'Frontend',
    complexity: 'beginner',
    date: '2023-08-05',
  },
]
