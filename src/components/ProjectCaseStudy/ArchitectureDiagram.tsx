'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import styles from './ArchitectureDiagram.module.css'

interface ArchitectureDiagramProps {
  diagram: string
}

export function ArchitectureDiagram({ diagram }: ArchitectureDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const diagramId = useRef(`diagram-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return

      try {
        // Initialize mermaid with custom config
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#1f2937',
            primaryBorderColor: '#d1d5db',
            lineColor: '#6b7280',
            secondaryColor: '#f3f4f6',
            tertiaryColor: '#ffffff',
          },
          flowchart: {
            useMaxWidth: true,
            curve: 'basis',
          },
          sequence: {
            useMaxWidth: true,
          },
          gantt: {
            useMaxWidth: true,
          },
        })

        // Clear previous content
        containerRef.current.innerHTML = ''

        // Render the diagram
        const { svg } = await mermaid.render(diagramId.current, diagram)
        containerRef.current.innerHTML = svg

        // Add click handlers for interactive elements
        const svgElement = containerRef.current.querySelector('svg')
        if (svgElement) {
          svgElement.style.maxWidth = '100%'
          svgElement.style.height = 'auto'
        }
      } catch (error) {
        console.error('Failed to render mermaid diagram:', error)
        containerRef.current.innerHTML = `
          <div class="mermaid-error">
            <p>Failed to render diagram. Please check the syntax.</p>
            <pre>${diagram}</pre>
          </div>
        `
      }
    }

    renderDiagram()
  }, [diagram])

  return (
    <div className={styles.diagramContainer}>
      <div
        ref={containerRef}
        className={styles.diagram}
        aria-label="Architecture diagram"
      />
    </div>
  )
}
