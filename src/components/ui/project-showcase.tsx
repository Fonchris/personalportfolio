import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Service = {
  title: string
  description: string
  year: string
  image: string
}

const services: Service[] = [
  {
    title: 'Software engineering',
    description: 'Reliable web experiences and digital products built around real user needs.',
    year: '01',
    image: 'https://cdn.21st.dev/assets/mirror/c1/c1671df27042b5889c9813bf8e89b79fe2954b88fefb6b2e3c4cd78463289b48.jpg',
  },
  {
    title: 'Graphic design',
    description: 'Visual identities, compositions, and design systems with a clear point of view.',
    year: '02',
    image: 'https://cdn.21st.dev/assets/mirror/5d/5d41544231f49d8d650dc2f33ccc7282c099aea086dcca88f6de4d6430d21598.jpg',
  },
  {
    title: 'Video editing',
    description: 'Rhythm, sound, and story shaped into edits that hold attention from first frame to last.',
    year: '03',
    image: 'https://cdn.21st.dev/assets/mirror/67/677dbc17159d32becaf6209a1cc92022800d24cccbce2089e32fe5fe146464e3.jpg',
  },
  {
    title: 'Mobile app development',
    description: 'Focused mobile experiences that feel fast, useful, and natural in the hand.',
    year: '04',
    image: 'https://cdn.21st.dev/assets/mirror/b6/b61643bba150cf989b9fa16762d236dd89cb38121ecb53af6d05343d66153a0e.jpg',
  },
]

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = () => {
      setSmoothPosition((previous) => ({
        x: previous.x + (mousePosition.x - previous.x) * 0.15,
        y: previous.y + (mousePosition.y - previous.y) * 0.15,
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
    }
  }, [mousePosition])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const bounds = containerRef.current.getBoundingClientRect()
    setMousePosition({ x: event.clientX - bounds.left, y: event.clientY - bounds.top })
  }

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="project-showcase">
      <div
        className="project-preview"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
        }}
      >
        <div className="project-preview-image">
          {services.map((service, index) => (
            <img
              key={service.title}
              src={service.image}
              alt={`${service.title} project preview`}
              style={{ opacity: hoveredIndex === index ? 1 : 0, scale: hoveredIndex === index ? 1 : 1.1, filter: hoveredIndex === index ? 'none' : 'blur(10px)' }}
            />
          ))}
          <div className="project-preview-overlay" />
        </div>
      </div>

      <div className="project-list">
        {services.map((service, index) => (
          <div
            key={service.title}
            className={`project-row ${hoveredIndex === index ? 'is-hovered' : ''}`}
            onMouseEnter={() => { setHoveredIndex(index); setIsVisible(true) }}
            onMouseLeave={() => { setHoveredIndex(null); setIsVisible(false) }}
          >
            <div className="project-row-highlight" />
            <div className="project-row-content">
              <div>
                <div className="project-title-line">
                  <h3>{service.title}</h3>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>
                <p>{service.description}</p>
              </div>
              <span className="project-year">{service.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
