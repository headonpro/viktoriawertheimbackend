# Tech Stack & Build System

## Frontend Stack
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with mobile-first breakpoints
- **Animations**: Framer Motion (optimized for mobile performance)
- **Icons**: Lucide React, Tabler Icons, React Icons
- **HTTP Client**: Axios for API requests
- **Deployment**: Vercel (recommended)

## Backend Stack
- **CMS**: Strapi 5+ (Headless CMS)
- **Database**: SQLite (development), PostgreSQL (production)
- **Language**: TypeScript/JavaScript
- **Deployment**: DigitalOcean/Heroku

## Key Dependencies
```json
// Frontend
"next": "^15.3.5"
"react": "^19.1.0"
"framer-motion": "^12.23.3"
"tailwindcss": "^3.4.3"
"typescript": "^5.8.3"

// Backend
"@strapi/strapi": "5.18.0"
"better-sqlite3": "11.3.0"
```

## Common Commands

### Frontend (viktoria-wertheim-frontend/)
```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

### Backend (viktoria-wertheim-backend/)
```bash
# Development with auto-reload
npm run develop

# Build for production
npm run build

# Start production server
npm run start

# Strapi console
npm run console
```

## Configuration Notes
- Next.js configured for Strapi image optimization
- Tailwind includes custom Viktoria club colors and animations
- Framer Motion optimized with package imports
- CORS configured for frontend-backend communication