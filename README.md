# GETAM Cine World Europe — React/Vite Redesign Starter

This is **Phase 1 of a frontend redesign prototype**, not a pixel-perfect clone or a connected GETAM production website. It was independently designed using confirmed movie titles and public film-distribution references. It is not affiliated with GETAM.

## Quick start (Windows / VS Code)

1. Install Node.js 22.12+ and VS Code.
2. Extract the ZIP and open the `getam-cine-world-redesign` folder.
3. In the VS Code terminal run:

```bash
npm install
npm run dev
```

4. Open the URL printed by Vite (usually http://localhost:5173).
5. Test production compilation with `npm run build`.

## Stack

- React 19
- Vite 8 + `@vitejs/plugin-react` v6
- Tailwind CSS 4 with official `@tailwindcss/vite` integration
- Motion for React (`motion/react`) for hero, card, modal, and mobile-menu animation
- Lucide React for icons

## Implemented interactions

- Animated hero with auto-advance, forward/back controls, and prefers-reduced-motion support.
- Movie tabs: upcoming and released reference titles.
- Functional title search and horizontal movie scroller.
- Hover effects and animation as cards scroll into view.
- Film details dialog with close button and Escape key.
- 'Find official trailer' opens a YouTube search for the title (not an unverified official video).
- Responsive header, anchored sections, mobile menu, and footer navigation.
- Images fall back to a stylized poster if the remote file cannot load.

## Important limitations

**Brand colors and fonts are design proposals, not verified site values.** The publicly accessible GETAM domain renders a JavaScript-only shell to crawlers. The available search index verifies titles, but not exact computed design styles. The example palette is inspired by the GETAM logo, whose public representation uses maroon and white. The UI uses **Barlow Condensed** (display) and **DM Sans** (body) as proposed redesign typography.

**Poster assets are externally hosted references** and may fail to load or change. Images have not been embedded in this ZIP. For actual deployment, use only licensed/local image assets, update `src/data/movies.js`, and replace the `Brand` wordmark with GETAM's supplied official logo.

**Movie data is not live.** The current app does not sell tickets, fetch showtimes, synchronize catalog status, send contact messages, or supply verified film trailers. Its genre/status groupings and summaries are sample editorial data for the redesign. Verify content before publishing.

## File guide

```
src/
  App.jsx                  Page sections, tabs, hero, handlers
  index.css                All CSS, Tailwind v4 and design tokens
  data/movies.js           Sample movie objects and external images
  components/Header.jsx   Responsive nav and scroll effect
  components/Brand.jsx    Logo / wordmark placeholder
  components/Poster.jsx   Movie image + graceful fallback
  components/MovieCard.jsx
  components/MovieModal.jsx
```

## Color values proposed for this redesign

| Token | Value |
|---|---|
| Background | `#120B10` |
| Primary burgundy | `#8C1238` |
| Accent burgundy | `#C8325C` |
| Surface | `#24131D` |
| Main text | `#F7F1F3` |
| Secondary text | `#BFAEB7` |
| Gold accent | `#D5A35D` |

Edit colors under `@theme` in `src/index.css`. Confirm brand colors before publication.

## Upcoming phases

1. Capture GETAM homepage and every route at desktop/mobile widths. Supply full-page screenshots, design-inspector markdown and animation recording.
2. Match exact typography, header/logo, spacing, palette, poster crop, page structure and original content.
3. Convert placeholders to licensed/local assets, add verified trailer embeds and distribution detail pages.
4. Integrate APIs/CMS if authorized, and connect a verified showtimes or booking provider.
5. Add accessibility checks, performance optimization, SEO, cross-browser test, production deployment.

## Reference sources

- Film distribution listing: https://www.filmstarts.de/verleih/firma-1000133614/geschaft-8030/
- GETAM mark shown by a ticketing site: https://www.srentertain.de/
- Poster image sources are included inside `src/data/movies.js` and are **third-party external URLs**.

Do not represent this unofficial demonstration as the live GETAM website.
