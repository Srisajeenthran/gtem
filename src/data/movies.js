/**
 * Editorial/demo catalog based on indexed GETAM movie titles and published
 * GETAM Cine World Europe distribution credits, checked October 2026.
 * Status grouping in this sample is NOT a live cinema schedule.
 * Do not display invented session times or buy-ticket links.
 * Replace image URLs with licensed, locally hosted assets for production.
 */
export const movies = [
  {
    id: 'sigma',
    title: 'SIGMA',
    category: 'upcoming',
    genre: 'Action · Thriller',
    language: 'Tamil',
    description: 'Explore the film’s latest promotional artwork, trailers, and release updates. More official details will be added when confirmed.',
    poster: 'https://insightfulreels.com/_astro/featured.tmv9Jfzy_ZcP7iA.webp',
    tone: '#9b6c2f',
    badge: 'Featured',
  },
  {
    id: 'prem-keetanu',
    title: 'PREM KEETANU',
    category: 'upcoming',
    genre: 'Comedy · Romance · Drama',
    language: 'Hindi',
    description: 'A story of friendships, growing up and navigating the surprises of first love.',
    poster: 'https://filmfare.wwmindia.com/content/2026/aug/veerpahariyapremkeetanu21786534767.jpg',
    tone: '#b35669',
  },
  {
    id: 'dttt',
    title: 'DTTT',
    category: 'upcoming',
    genre: 'Film · Coming Soon',
    language: 'To be confirmed',
    description: 'This title appears in GETAM’s upcoming film listing. Verified synopsis, trailer, and artwork will be added when available.',
    poster: null,
    tone: '#5b3156',
  },
  {
    id: 'meesaya-murukku-2',
    title: 'MEESAYA MURUKKU 2',
    category: 'upcoming',
    genre: 'Musical · Comedy · Drama',
    language: 'Tamil',
    description: 'Discover the next chapter of the musical entertainer. Availability may vary by cinema and region.',
    poster: 'https://img.amo.watch/amodb/img/t/p/w1280/o2r3Pbmx4qIgAkNFZL6yjPZjQaq.jpg',
    tone: '#bc5261',
  },
  {
    id: 'haiwaan',
    title: 'HAIWAAN',
    category: 'released',
    genre: 'Action · Thriller',
    language: 'Hindi',
    description: 'A title credited to GETAM Cine World Europe in public film distribution listings.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDI3MDI3NmUtNjAwZS00OWU5LWI4ODEtMzMxMTI2OGRhZjQ5XkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg',
    tone: '#54685d',
  },
  {
    id: 'toxic',
    title: 'TOXIC',
    category: 'released',
    genre: 'Action · Drama · Thriller',
    language: 'Multilingual',
    description: 'A title credited to GETAM Cine World Europe in public film distribution listings.',
    poster: 'https://images.indianexpress.com/2026/02/toxic.jpg',
    tone: '#615454',
  },
  {
    id: 'sardar-2',
    title: 'SARDAR 2',
    category: 'released',
    genre: 'Action · Drama',
    language: 'Tamil',
    description: 'A title credited to GETAM Cine World Europe in public film distribution listings.',
    poster: 'https://assets.gadgets360cdn.com/pricee/assets/product/202609/sardar-21_1788776724.jpg',
    tone: '#876849',
  }
]

export const upcoming = movies.filter((movie) => movie.category === 'upcoming')
export const released = movies.filter((movie) => movie.category === 'released')

export function officialTrailerSearch(title) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} official movie trailer`)}`
}
