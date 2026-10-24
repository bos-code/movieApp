# MovieApp

Expo (React Native) movie browser powered by [TMDB](https://www.themoviedb.org/).

## Features
- Home: trending this week and upcoming movies
- Discover: genre filter with infinite scroll
- Search: debounced movie search
- Details: trailer, cast, streaming providers, recommendations
- Bookmarks: saved on device

## Setup
1. `pnpm install`
2. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_TMDB_TOKEN` to your TMDB v4 read access token.
   (`EXPO_PUBLIC_*` values are bundled into the app, so use a read-only token.)
3. `pnpm start`

## Checks
`pnpm lint` and `npx tsc --noEmit`
