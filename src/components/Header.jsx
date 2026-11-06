import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Brand from './Brand.jsx'

const navItems = [
  { label: 'Home', target: 'home' },
  { label: 'Movies', target: 'movies' },
  { label: 'About us', target: 'about' },
  { label: 'Contact', target: 'contact' },
]

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const closeMenu = () => setMenuOpen(false)
  return <>
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => <a key={item.target} href={`#${item.target}`}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href="#movies">Explore movies <ArrowUpRight size={17} /></a>
        <button type="button" className="mobile-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen}>
          {isMenuOpen ? <X size={26}/> : <Menu size={26}/>}
        </button>
      </div>
    </header>
    <AnimatePresence>
      {isMenuOpen && <motion.div className="mobile-menu" initial={{opacity:0, y:-15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}} transition={{duration:.2}}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item, i) => <a onClick={closeMenu} key={item.target} href={`#${item.target}`}><span>0{i+1}</span>{item.label}<ArrowUpRight size={20}/></a>)}
        </nav>
        <p>GETAM Cine World Europe · Movie distribution &amp; cinema.</p>
      </motion.div>}
    </AnimatePresence>
  </>
}
