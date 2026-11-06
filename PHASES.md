# GETAM full redesign implementation roadmap

## Phase 1 — Project foundation (included)

- React/Vite/Tailwind project + motion library
- proposed GETAM brand tokens
- animated hero + poster display
- responsive navigation
- movie collections, search, detail modal
- cinematic about + footer sections

## Phase 2 — Inspect and match the original

Capture original GETAM screens at desktop 1440px and mobile 390px, every route, modal, slider, dropdown, and video action. Export actual `font-family`, `font-size`, `line-height`, `color`, `background-color`, shadows and spacing from Design Inspector. Create an original-vs-local screenshot checklist. Once verified, replace the proposed palette and fonts.

## Phase 3 — Assets and data

Obtain authorization and GETAM's images, logos and movie data. Move local assets into `public/assets`. Populate director, cast, verified runtime, release dates, synopsis, embed URLs, and age certificates. Preserve source/license metadata.

## Phase 4 — Functionality

Wire live catalog and showtimes to an authorized API or CMS. Replace 'Find official trailer' search with validated official YouTube embed URLs. Add film-detail routes, city/date filters and real booking-provider handoffs. Add meaningful empty/error/loading states.

## Phase 5 — Production quality

Accessibility testing, mobile responsive polish, motion reduction, SEO, optimized images, build/performance audit, staging signoff and hosting.
