## Content Frontend

Public-facing site for RightsContent built with Next.js App Router. It renders videos and artworks from the `content-server` API and is intended to be deployed to the main marketing domain.

### Features

- **Videos listing and detail pages** driven from the API
- **Artworks listing and detail pages** with tag-based suggestions
- **Home page** with recommended, featured, and recent content sections
- **Responsive layout** styled with Tailwind CSS 4

### Tech stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS 4
- **Carousel / sliders**: `swiper`

### Project structure (high level)

- `src/app` – Next.js App Router routes (home, videos, artworks, etc.)
- `src/components` – reusable UI components (cards, sections, sliders, layout)
- `src/lib/api.ts` – typed API client for the public `content-server` endpoints
- `src/types` – shared domain types (`Video`, `Artwork`, pagination)

### Environment variables

Environment variables are read from `.env` (not committed). Do **not** commit secrets; use placeholders in example files.

Required variables:

- **`NEXT_PUBLIC_API_URL`**: Base URL for the content API.
  - Example in local dev: `http://localhost:4000`
  - Example in production: `https://api.rightscontent.com`
- **`NEXT_PUBLIC_SUPABASE_URL`**: Supabase project URL (public, but keep consistent across apps).
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Supabase anonymous client key (treated as a secret for safety).

Optional / legacy:

- **`NEXT_PUBLIC_CONTENT_API_URL`**: Older alias for the content API base. Prefer `NEXT_PUBLIC_API_URL` and keep this only if other tools still rely on it.

### Getting started (development)

1. **Install dependencies**:

   ```bash
   cd content-frontend
   npm install
   ```

2. **Create a `.env` file** based on the variables above and point `NEXT_PUBLIC_API_URL` at your running `content-server` (default `http://localhost:4000`).

3. **Run the dev server**:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

### Building and running in production

To create an optimized production build:

```bash
cd content-frontend
npm run build
npm start
```

By default, `next start` listens on port `3000`. Set `PORT` to customize:

```bash
PORT=3002 npm start
```

### API usage

The frontend talks to `content-server` using the helper in `src/lib/api.ts`:

- **Base URL**: `NEXT_PUBLIC_API_URL`
- **Public endpoints used**:
  - `GET /api/videos` (with optional `recommended`, `featured`, `sort=recent`, `page`, `pageSize`)
  - `GET /api/videos/:slug`
  - `GET /api/videos/:slug/suggestions`
  - `POST /api/videos/:slug/view` (view count)
  - `GET /api/artworks` (with `featured`, `page`, `pageSize`)
  - `GET /api/artworks/:slug`
  - `GET /api/artworks/:slug/suggestions`

The shared `fetcher` uses `cache: "no-store"` so that new content added in the admin appears immediately on the site.

### Linting

Run ESLint:

```bash
npm run lint
```

### Deployment notes

- Always deploy using a **production build** (`npm run build` + `npm start`), not `npm run dev`.
- Ensure `NEXT_PUBLIC_API_URL` in the environment points to the production `content-server`.
- If you use a platform like Vercel, configure the environment variables there instead of committing `.env` files.

