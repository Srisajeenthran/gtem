import { useState } from 'react'

export default function Poster({ movie, className = '' }) {
  const [failed, setFailed] = useState(false)
  return <div className={`poster ${className}`} style={{ '--poster-color': movie.tone }}>
    {movie.poster && !failed ? (
      <img src={movie.poster} alt={`${movie.title} promotional poster`} loading="lazy" onError={() => setFailed(true)} />
    ) : <div className="poster-fallback"><span>GETAM PRESENTS</span><strong>{movie.title}</strong><small>CINE WORLD EUROPE</small></div>}
    <div className="poster-grain" aria-hidden="true" />
  </div>
}
