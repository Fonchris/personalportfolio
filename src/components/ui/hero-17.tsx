import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import HeroBackground from '@/components/ui/hero-17-utils/HeroBackground'

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

export default function Hero17() {
  const heroRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return
    const { left, top } = heroRef.current.getBoundingClientRect()
    mouseX.set(event.clientX - left)
    mouseY.set(event.clientY - top)
  }

  const mouseGlow = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      rgba(45, 212, 191, 0.15),
      transparent 80%
    )
  `

  return (
    <section ref={heroRef} onMouseMove={handleMouseMove} className="hero17-section">
      <HeroBackground />
      <motion.div
        className="hero17-mouse-glow"
        style={{
          background: mouseGlow,
        }}
      />
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0} className="hero17-content">
        <span className="hero17-kicker">Fon Chris Bright Pemmeenyi · Capabilities</span>
        <h2>One creative toolkit for <span>digital experiences</span></h2>
        <p>From software engineering and mobile apps to graphic design and video editing, I build thoughtful work where technology meets visual storytelling.</p>
        <div className="hero17-tags">
          <span>Software engineering</span><span>Mobile development</span><span>Visual design</span><span>Video editing</span>
        </div>
      </motion.div>
    </section>
  )
}
