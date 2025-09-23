import { About } from '../components/About'
import { CallToAction } from '../components/CallToAction'
import { FeaturedProjects } from '../components/FeaturedProjects'
import { Hero } from '../components/Hero'
import { PageWrapper, Section } from '../components/Layout'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero
        title="Tshegofatso Godfrey Moses"
        subtitle="Full-Stack Developer & UI/UX Designer"
        description="Crafting exceptional digital experiences with modern web technologies, innovative design solutions, and a passion for clean, performant code."
        ctaText="View My Work"
        ctaHref="#projects"
        secondaryCtaText="Get In Touch"
        secondaryCtaHref="#contact"
        showParticles={true}
      />

      {/* About Section */}
      <Section id="about" variant="feature" background="default" fullHeight>
        <About />
      </Section>

      {/* Projects Section */}
      <Section
        id="projects"
        variant="feature"
        background="alternate"
        fullHeight
      >
        <FeaturedProjects />
      </Section>

      {/* Call to Action - Primary */}
      <Section
        id="cta-primary"
        variant="feature"
        background="default"
        fullHeight
      >
        <CallToAction variant="primary" />
      </Section>

      {/* Experience Section */}
      <Section
        id="experience"
        variant="feature"
        background="alternate"
        fullHeight
      >
        <PageWrapper variant="narrow" animate>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              Experience
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              My professional journey and the experiences that have shaped my
              career as a developer and designer.
            </p>
          </div>
        </PageWrapper>
      </Section>

      {/* Call to Action - Secondary */}
      <Section id="contact" variant="feature" background="default" fullHeight>
        <CallToAction variant="secondary" />
      </Section>
    </main>
  )
}
