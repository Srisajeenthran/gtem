import { ArrowUpRight, Play } from 'lucide-react'
import { motion } from 'motion/react'
import Poster from './Poster.jsx'

export default function MovieCard({ movie, onDetails, onTrailer, index = 0 }) {
  return <motion.article className="movie-card" initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.1}} transition={{duration:.52, delay:Math.min(index*.07,.4)}}>
    <div className="movie-card__art">
      <Poster movie={movie}/>
      <span className="movie-card__badge">{movie.category === 'upcoming' ? 'COMING SOON' : 'RELEASED TITLE'}</span>
      <div className="movie-card__overlay">
        <button className="icon-circle" title={`Search trailer for ${movie.title}`} onClick={() => onTrailer(movie)} aria-label={`Search trailer for ${movie.title}`}><Play fill="currentColor" size={17}/></button>
        <button className="icon-circle" title={`Details for ${movie.title}`} onClick={() => onDetails(movie)} aria-label={`Details for ${movie.title}`}><ArrowUpRight size={20}/></button>
      </div>
    </div>
    <div className="movie-card__info"><div><h3>{movie.title}</h3><p>{movie.genre}</p></div><button onClick={() => onDetails(movie)} className="movie-card__details" aria-label={`View details for ${movie.title}`}><ArrowUpRight size={20}/></button></div>
  </motion.article>
}
