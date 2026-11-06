import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Clapperboard, Film, Globe2, Play, Search, Sparkles } from 'lucide-react'
import { movies, upcoming, officialTrailerSearch } from './data/movies.js'
import Header from './components/Header.jsx'
import Brand from './components/Brand.jsx'
import Poster from './components/Poster.jsx'
import MovieCard from './components/MovieCard.jsx'
import MovieDetail from './components/MovieDetail.jsx'

function movieFromHash() {
  const match = window.location.hash.match(/^#movie\/([^/?#]+)/)
  return match ? movies.find((movie) => movie.id === match[1]) ?? null : null
}

function SectionTitle({ kicker, title, action }) {
  return <div className="section-heading"><div><span className="eyebrow"><span className="eyebrow-dot"/>{kicker}</span><h2>{title}</h2></div>{action}</div>
}

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [category, setCategory] = useState('upcoming')
  const [query, setQuery] = useState('')
  const [activeMovie, setActiveMovie] = useState(movieFromHash)
  const scrollRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const featured = upcoming.filter((movie) => movie.poster)
  const activeFeatured = featured[activeSlide % featured.length]

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => setActiveSlide((slide) => (slide + 1) % featured.length), 6500)
    return () => window.clearInterval(id)
  }, [featured.length, reducedMotion])

  useEffect(() => {
    const syncMovieRoute = () => setActiveMovie(movieFromHash())
    window.addEventListener('hashchange', syncMovieRoute)
    return () => window.removeEventListener('hashchange', syncMovieRoute)
  }, [])

  const filtered = useMemo(() => movies.filter((movie) => movie.category === category && movie.title.toLowerCase().includes(query.toLowerCase().trim())), [category, query])
  function scrollMovies(direction) {
    scrollRef.current?.scrollBy({ left: direction * 320, behavior: reducedMotion ? 'instant' : 'smooth' })
  }
  function findTrailer(movie) {
    window.open(officialTrailerSearch(movie.title), '_blank', 'noopener,noreferrer')
  }
  function openMovie(movie) {
    window.location.hash = `movie/${movie.id}`
  }

  return <>
    <Header />
    {activeMovie ? <MovieDetail movie={activeMovie} onBack={() => { window.location.hash = 'movies' }} onOpenMovie={openMovie} /> : <main>
      <section id="home" className="hero" aria-label="Featured cinema releases">
        <div className="hero__noise" aria-hidden="true"/>
        <div className="hero__glow" aria-hidden="true"/>
        <div className="container hero__content">
          <motion.div className="hero__text" initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.75}}>
            <div className="hero__pretitle"><span className="line"/> AN EXPERIENCE BEYOND THE SCREEN <span className="line"/></div>
            <h1>CINEMA<br/>WITHOUT<br/><em>BORDERS.</em></h1>
            <p>Extraordinary stories deserve the big screen. Explore cinema releases presented by GETAM Cine World Europe.</p>
            <div className="hero__actions"><a className="button button--solid" href="#movies">Explore movies <ArrowUpRight size={19}/></a><a className="text-link" href="#about">Discover GETAM <ArrowRight size={17}/></a></div>
            <div className="hero__scroll"><ArrowDown size={15}/> SCROLL TO EXPLORE</div>
          </motion.div>
          <div className="hero__visual" aria-label={`Featured film: ${activeFeatured.title}`}>
            <div className="hero__visual-aura" aria-hidden="true"/>
            <AnimatePresence mode="wait">
              <motion.div key={activeFeatured.id} className="hero__poster" initial={{opacity:0,scale:1.04,x:30}} animate={{opacity:1,scale:1,x:0}} exit={{opacity:0,scale:.98,x:-25}} transition={{duration:.65}}>
                <Poster movie={activeFeatured}/>
              </motion.div>
            </AnimatePresence>
            <div className="hero__visual-bottom"><span>FEATURED RELEASE</span><strong>{activeFeatured.title}</strong><button aria-label={`View ${activeFeatured.title} details`} onClick={() => openMovie(activeFeatured)}><ArrowUpRight size={22}/></button></div>
            <div className="hero__side-label" aria-hidden="true">GETAM CINE WORLD / EUROPE</div>
          </div>
        </div>
        <div className="container hero__bottom"><div><span className="hero__bottom-line"/> YOUR WORLD. YOUR CINEMA.</div><div className="hero__pagination"><button type="button" onClick={() => setActiveSlide((i) => (i - 1 + featured.length) % featured.length)} aria-label="Previous featured film"><ArrowLeft size={18}/></button><span>0{activeSlide + 1} <i>/</i> 0{featured.length}</span><button type="button" onClick={() => setActiveSlide((i) => (i + 1) % featured.length)} aria-label="Next featured film"><ArrowRight size={18}/></button></div></div>
      </section>

      <div className="marquee-strip" aria-hidden="true"><div className="marquee-strip__track">{Array.from({length:4}).map((_,i) => <span key={i}>STORIES THAT STAY WITH YOU <span>✦</span> CINEMA THAT MOVES YOU <span>✦</span></span>)}</div></div>

      <section id="movies" className="movies-section section-pad">
        <div className="container">
          <SectionTitle kicker="THE COLLECTION" title={<>EXPLORE OUR <em>MOVIES</em></>} action={<div className="section-controls"><button aria-label="Scroll movie cards left" onClick={() => scrollMovies(-1)}><ArrowLeft size={19}/></button><button aria-label="Scroll movie cards right" onClick={() => scrollMovies(1)}><ArrowRight size={19}/></button></div>}/>
          <div className="movies-toolbar"><div className="segment-tabs" role="tablist" aria-label="Movie category"><button role="tab" aria-selected={category === 'upcoming'} className={category === 'upcoming' ? 'active' : ''} onClick={() => setCategory('upcoming')}>Upcoming Movies <span>0{movies.filter((m) => m.category === 'upcoming').length}</span></button><button role="tab" aria-selected={category === 'released'} className={category === 'released' ? 'active' : ''} onClick={() => setCategory('released')}>Released Movies <span>0{movies.filter((m) => m.category === 'released').length}</span></button></div><label className="search-input"><Search size={17}/><input type="search" aria-label="Search movies" placeholder="Search titles..." value={query} onChange={(event) => setQuery(event.target.value)}/></label></div>
          {filtered.length > 0 ? <div className="movie-rail" ref={scrollRef} key={category}>{filtered.map((movie,i) => <MovieCard movie={movie} key={movie.id} index={i} onDetails={openMovie} onTrailer={findTrailer}/>)}</div> : <div className="empty-state"><Search size={24}/><h3>No films found</h3><p>Try another title or switch movie categories.</p><button className="button button--ghost" onClick={() => setQuery('')}>Clear search</button></div>}
          <p className="content-note">The catalog is an illustrative redesign preview; classifications and booking availability must be confirmed with GETAM before publication.</p>
        </div>
      </section>

      <section className="feature-band" aria-label="Our vision"><div className="container feature-band__inner"><div className="feature-band__symbol"><Clapperboard size={46} strokeWidth={1.1}/></div><div><span className="eyebrow">THE MAGIC OF CINEMA</span><h2>GREAT FILMS.<br/><em>UNFORGETTABLE MOMENTS.</em></h2></div><a href="#about" className="feature-band__link" aria-label="Learn about GETAM"><ArrowUpRight size={30}/></a></div></section>

      <section id="about" className="about-section section-pad"><div className="container about-grid"><div className="about-art"><div className="about-art__frame"><img src="/assets/glogo.png" alt="GETAM Cine World" /></div><div className="about-art__badge"> MADE FOR THE BIG SCREEN</div></div><motion.div className="about-copy" initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}><span className="eyebrow"><span className="eyebrow-dot"/> BEHIND THE SCREEN</span><h2>PASSION FOR FILM.<br/><em>LOVE FOR CINEMA.</em></h2><p>GETAM Cine World Europe is associated with the European theatrical distribution of Indian films. This refreshed digital experience brings film artwork, trailers, and release information into one cinematic destination.</p><p>The goal of this redesign is simple: let the movies take center stage and help visitors discover what’s next.</p></motion.div></div></section>

      <section id="contact" className="contact-section"><div className="container contact-section__inner"><span className="eyebrow">STAY IN THE LOOP</span><h2>READY FOR THE<br/><em>NEXT BIG STORY?</em></h2><p>Discover upcoming releases, new trailers, and more stories from GETAM Cine World Europe.</p><div className="contact-section__decoration" aria-hidden="true">G</div></div></section>
    </main>}
    <footer className="footer"><div className="container"><div className="footer__top"><div><Brand/><p>A world of stories. One unforgettable cinema experience.</p></div><nav aria-label="Footer navigation"><a href="#home">Home</a><a href="#movies">Movies</a><a href="#about">About us</a><a href="#contact">Contact</a></nav></div><div className="footer__bottom"><span>© {new Date().getFullYear()} GETAM Cine World Europe.</span><span>Unofficial front-end preview</span><a href="#home">BACK TO TOP ↑</a></div></div></footer>
  </>
}
