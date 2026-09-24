import { motion } from 'framer-motion'

export default function HeroBackground() {
  return (
    <div className="hero17-background" aria-hidden="true">
      <motion.div
        className="hero17-grid"
        animate={{ backgroundPosition: ['0px 0px', '44px 44px'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="hero17-orb hero17-orb-left"
        animate={{ x: [0, 110, 30, 0], y: [0, 55, 120, 0], scale: [1, 1.18, .92, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero17-orb hero17-orb-right"
        animate={{ x: [0, -90, -30, 0], y: [0, -70, -120, 0], scale: [1, .88, 1.16, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="hero17-sheen"
        animate={{ x: ['-120%', '120%'] }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
      />
    </div>
  )
}
