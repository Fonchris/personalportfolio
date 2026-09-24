import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDownRight, ChevronDown, Mail, Menu, Phone, X } from 'lucide-react'
import heroImage from '@/assets/heroimage.jpeg'
import Hero17 from '@/components/ui/hero-17'

type BlurTextProps = {
  text: string
  delay?: number
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  className?: string
}

function BlurText({ text, delay = 50, animateBy = 'words', direction = 'top', className = '' }: BlurTextProps) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)
  const segments = useMemo(() => (animateBy === 'words' ? text.split(' ') : text.split('')), [text, animateBy])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <p ref={ref} className={`blur-text ${className}`}>
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          style={{
            filter: inView ? 'blur(0)' : 'blur(12px)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : `translateY(${direction === 'top' ? '-24px' : '24px'})`,
            transitionDelay: `${index * delay}ms`,
          }}
        >
          {segment}{animateBy === 'words' && index < segments.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </p>
  )
}

const menuItems = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT', href: '#contact' },
]

export default function PortfolioHero() {
  const [isDark, setIsDark] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    return () => document.documentElement.classList.remove('dark')
  }, [isDark])

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (isMenuOpen && menuRef.current && buttonRef.current && !menuRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [isMenuOpen])

  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <nav className="site-nav" aria-label="Primary navigation">
          <div className="menu-wrap">
            <button ref={buttonRef} className="icon-button" type="button" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            {isMenuOpen && (
              <div ref={menuRef} className="menu-panel">
                {menuItems.map((item, index) => (
                  <a key={item.label} className={index === 0 ? 'active' : ''} href={item.href} onClick={() => setIsMenuOpen(false)}>{item.label}</a>
                ))}
              </div>
            )}
          </div>
          <button className="theme-toggle" type="button" aria-label="Toggle theme" onClick={() => setIsDark(!isDark)}>
            <span className="theme-knob" />
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-name" aria-label="Fon Chris Bright Pemmeenyi">
            <BlurText text="FON" animateBy="letters" delay={100} className="hero-word" />
            <BlurText text="CHRIS" animateBy="letters" delay={100} className="hero-word" />
            <div className="portrait-frame">
              <img src={heroImage} alt="Portrait of Fon Chris Bright Pemmeenyi" />
            </div>
          </div>
          <div className="hero-bottomline">
            <BlurText text="Building digital experiences with code, color and motion." delay={90} className="tagline" />
            <a href="#about" className="scroll-cue" aria-label="Scroll to about section"><ChevronDown size={24} /></a>
          </div>
        </section>

        <Hero17 />

        <section id="about" className="content-section about-section">
          <p className="eyebrow">01 / ABOUT</p>
          <div className="about-grid">
            <h2>One mind.<br /><em>Many mediums.</em></h2>
            <div className="about-copy">
              <p>I&apos;m Fon Chris Bright Pemmeenyi, a software engineer and creative technologist based in Yaounde, Cameroon.</p>
              <p>From mobile apps to visual identities and edited stories, I bring a systems mindset to every frame, screen and interaction.</p>
              <div className="credentials"><span>BSc Software Engineering</span><span>ICT University</span></div>
            </div>
          </div>
        </section>

        <section id="work" className="content-section work-section">
          <div className="section-heading"><p className="eyebrow">02 / WHAT I DO</p><span>Selected disciplines</span></div>
          <div className="discipline-list">
            {['Software engineering', 'Graphic design', 'Video editing', 'Mobile applications'].map((item, index) => (
              <div className="discipline" key={item}><span>0{index + 1}</span><h3>{item}</h3><ArrowDownRight size={28} /></div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <p className="eyebrow">03 / LET&apos;S WORK TOGETHER</p>
          <h2>Have an idea?<br /><em>Make it real.</em></h2>
          <div className="contact-links"><a href="mailto:pemmenyif@gmail.com"><Mail size={18} />pemmenyif@gmail.com</a><a href="tel:+237677684842"><Phone size={18} />+237 677 684 842</a></div>
        </section>
      </main>
      <footer><span>FON CHRIS BRIGHT PEMMEENYI</span><span>YAOUNDE, CAMEROON · 2026</span></footer>
    </div>
  )
}
