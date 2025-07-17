# Project Structure

## Repository Organization

This is a monorepo containing both frontend and backend applications:

```
viktoria-wertheim/
├── viktoria-wertheim-frontend/    # Next.js frontend application
├── viktoria-wertheim-backend/     # Strapi CMS backend
├── src/                          # Shared resources (if any)
├── PRD.md                        # Product Requirements Document
└── Anweisungsdatei.md           # Instructions document
```

## Frontend Structure (viktoria-wertheim-frontend/)
```
viktoria-wertheim-frontend/
├── src/
│   └── app/                     # Next.js App Router pages
├── public/                      # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json                # Dependencies and scripts
```

## Backend Structure (viktoria-wertheim-backend/)
```
viktoria-wertheim-backend/
├── src/                        # Strapi application code
├── config/                     # Strapi configuration
├── database/                   # Database files (SQLite)
├── public/                     # Public uploads
├── types/                      # TypeScript type definitions
└── package.json               # Dependencies and scripts
```

## Key Configuration Files

- **Frontend**: `next.config.js` (image optimization for Strapi), `tailwind.config.js` (custom colors/animations)
- **Backend**: `tsconfig.json` (TypeScript config), Strapi config files in `/config`

## Development Workflow

1. Start backend: `cd viktoria-wertheim-backend && npm run develop`
2. Start frontend: `cd viktoria-wertheim-frontend && npm run dev`
3. Backend runs on port 1337, frontend on port 3000

## Content Models (Strapi)

Key content types include:
- News articles
- Teams/Mannschaften
- Players/Spieler
- Matches/Spiele
- Sponsors