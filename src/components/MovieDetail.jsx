import { ArrowLeft, ArrowUpRight, CalendarDays, Clapperboard, Clock3, MapPin, Play, Users } from 'lucide-react'
import { movies, officialTrailerSearch } from '../data/movies.js'
import MovieCard from './MovieCard.jsx'
import Poster from './Poster.jsx'

function DetailHeading({ accent, children }) {
  return <h2 className="detail-section__heading"><em>{accent}</em><span>{children}</span></h2>
}

export default function MovieDetail({ movie, onBack, onOpenMovie }) {
  const related = movies.filter((item) => item.id !== movie.id && item.category === movie.category)
  const status = movie.category === 'upcoming' ? 'COMING SOON' : 'RELEASED TITLE'
  const metadata = [
    { label: 'LANGUAGE', value: movie.language },
    { label: 'GENRE', value: movie.genre },
    { label: 'RELEASE DATE', value: movie.releaseDate || 'To be announced' },
    ...(movie.runtime ? [{ label: 'RUNTIME', value: movie.runtime }] : []),
  ]

  return <main className="movie-detail">
    <section className="detail-hero">
      <div className="detail-hero__backdrop" aria-hidden="true" style={movie.poster ? { backgroundImage: `url("${movie.poster}")` } : undefined} />
      <div className="container detail-hero__inner">
        <button className="detail-back" onClick={onBack}><ArrowLeft size={16}/> Back to movies</button>
        <div className="detail-hero__layout">
          <div className="detail-poster"><Poster movie={movie}/></div>
          <div className="detail-hero__copy">
            <span className="detail-kicker"><span/> {status}</span>
            <h1>{movie.title}</h1>
            <div className="detail-meta-grid">
              {metadata.map((item) => <div className="detail-meta" key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}
            </div>
            <div className="detail-hero__facts">
              {movie.runtime && <span><Clock3 size={15}/> {movie.runtime}</span>}
              <span><CalendarDays size={15}/> {movie.releaseDate || 'Release date to be announced'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="container detail-content">
      <section className="detail-section detail-schedule">
        <DetailHeading accent="Dates">&amp; cinemas</DetailHeading>
        {Array.isArray(movie.cinemas) && movie.cinemas.length > 0 ? (
          <div className="detail-cinema-grid">{movie.cinemas.map((cinema) => <article className="detail-cinema" key={`${cinema.city}-${cinema.name}`}>
            <div><MapPin size={16}/><div><strong>{cinema.city}</strong><span>{cinema.name}</span></div></div>
            {cinema.times?.length ? <div className="detail-times">{cinema.times.map((time) => <span key={time}>{time}</span>)}</div> : <p>Showtimes coming soon</p>}
          </article>)}</div>
        ) : <div className="detail-empty"><CalendarDays size={19}/><p>Showtimes and cinema listings will appear here when confirmed.</p></div>}
      </section>

      <section className="detail-section detail-credits">
        <DetailHeading accent="with">cast &amp; credits</DetailHeading>
        {Array.isArray(movie.cast) && movie.cast.length > 0 ? <div className="detail-cast-grid">{movie.cast.map((person) => <div className="detail-person" key={person.name}>
          <div className="detail-person__avatar">{person.image ? <img src={person.image} alt="" loading="lazy"/> : <Users size={27}/>}</div>
          <strong>{person.name}</strong>{person.role && <span>{person.role}</span>}
        </div>)}</div> : <div className="detail-empty"><Users size={19}/><p>Cast and production credits will be added when verified details are available.</p></div>}
      </section>

      <section className="detail-section detail-story">
        <div className="detail-story__copy"><DetailHeading accent="The">story</DetailHeading><p>{movie.description}</p></div>
        <div className="detail-story__facts"><span><Clapperboard size={17}/> GETAM CINE WORLD</span><span>{movie.genre}</span><span>{movie.language}</span></div>
      </section>

      <section className="detail-section detail-trailer">
        <DetailHeading accent="Watch">trailer</DetailHeading>
        <a className="detail-trailer__card" href={officialTrailerSearch(movie.title)} target="_blank" rel="noreferrer" aria-label={`Search YouTube for the ${movie.title} trailer`}>
          <Poster movie={movie}/><span className="detail-trailer__play"><Play fill="currentColor" size={24}/></span><span className="detail-trailer__caption">Search for the official trailer <ArrowUpRight size={16}/></span>
        </a>
      </section>

      {related.length > 0 && <section className="detail-section detail-related">
        <DetailHeading accent={movie.category === 'upcoming' ? 'Coming' : 'More'}>{movie.category === 'upcoming' ? 'soon' : 'films'}</DetailHeading>
        <div className="detail-related__rail">{related.map((item, index) => <MovieCard movie={item} key={item.id} index={index} onDetails={onOpenMovie} onTrailer={(titleMovie) => window.open(officialTrailerSearch(titleMovie.title), '_blank', 'noopener,noreferrer')}/>)}</div>
      </section>}
    </div>
  </main>
}
