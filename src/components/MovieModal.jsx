import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Clapperboard, Play, X } from 'lucide-react'
import Poster from './Poster.jsx'
import { officialTrailerSearch } from '../data/movies.js'

export default function MovieModal({ movie, onClose }) {
  useEffect(() => {
    if (!movie) return
    const handleKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = '' }
  }, [movie, onClose])
  return <AnimatePresence>
    {movie && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} role="presentation">
      <motion.section role="dialog" aria-modal="true" aria-labelledby="film-modal-title" className="movie-modal" initial={{scale:.94,opacity:0,y:30}} animate={{scale:1,opacity:1,y:0}} exit={{scale:.96,opacity:0,y:20}} transition={{type:'spring',stiffness:290,damping:28}} onClick={(event) => event.stopPropagation()}>
        <button className="movie-modal__close" onClick={onClose} aria-label="Close movie details"><X size={24}/></button>
        <Poster movie={movie} className="movie-modal__poster" />
        <div className="movie-modal__copy">
          <span className="eyebrow"><Clapperboard size={14}/> FEATURE FILM</span>
          <h2 id="film-modal-title">{movie.title}</h2>
          <p className="movie-modal__genre">{movie.genre} / {movie.language}</p>
          <p>{movie.description}</p>
          <p className="movie-modal__notice">Cinema schedules and ticket availability are not synchronized in this demo. Check the official site for current listings.</p>
          <div className="modal-actions">
            <a className="button button--solid" href={officialTrailerSearch(movie.title)} target="_blank" rel="noreferrer"><Play size={17}/> Find official trailer</a>
          </div>
        </div>
      </motion.section>
    </motion.div>}
  </AnimatePresence>
}
