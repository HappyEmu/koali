# Koali

A Payload CMS 3 + Next.js 15 application for managing and uploading koala images.

## Stack

- **Next.js** 15.4.11
- **Payload CMS** 3.77.0
- **React** 19.1.0
- **Database**: Vercel Postgres (`@payloadcms/db-vercel-postgres`)
- **Storage**: Google Cloud Storage (`@payloadcms/storage-gcs`)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Package manager**: pnpm

## Development

```bash
pnpm dev          # Start dev server with Turbopack
pnpm devsafe      # Clear .next cache then start dev
pnpm build        # Production build
pnpm start        # Start production server
```

## Payload CLI

```bash
pnpm payload generate:types     # Regenerate payload-types.ts
pnpm payload generate:importmap # Regenerate import map
pnpm payload migrate            # Run database migrations
```

## Environment Variables

Copy `.env.example` and fill in the values:

```
PAYLOAD_SECRET=
POSTGRES_URL=
GCS_BUCKET_NAME=
GCS_PROJECT_ID=
GCS_SERVICE_ACCOUNT_CLIENT_ID=
GCS_SERVICE_ACCOUNT_CLIENT_EMAIL=
GCS_SERVICE_ACCOUNT_PRIVATE_KEY=
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/       # Public-facing pages
│   └── (payload)/        # Payload admin + API routes
├── collections/          # Payload collections (Users, Media, Koala)
├── components/           # React components + shadcn/ui
├── actions/              # Next.js server actions
├── migrations/           # Database migrations
└── payload.config.ts     # Payload configuration
```

## Version Compatibility Notes

- Payload CMS 3.77.0 supports Next.js `>=15.4.11 <15.5.0`. Do not upgrade Next.js beyond 15.4.x until a newer Payload version with 15.5.x support is released.
- `sharp` is pinned and built via `pnpm onlyBuiltDependencies`.
