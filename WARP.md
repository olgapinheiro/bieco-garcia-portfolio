# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## About This Project

This is a Next.js 15 photography portfolio for Bieco Garcia, an international photographer specializing in luxury hospitality. The site prioritizes clean minimalist design, responsiveness, and performance.

## Development Commands

### Setup
```bash
pnpm install  # Project uses pnpm as package manager
```

### Development
```bash
pnpm dev      # Start dev server with Turbopack at http://localhost:3000
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

### Key Technologies
- **Next.js 15** with App Router
- **React 19** with modern hooks (uses `use()` for async data)
- **TypeScript 5** with strict configuration
- **Tailwind CSS v4** (inline theme configuration in globals.css)
- **Vercel Blob Storage** for image hosting
- **Vercel Analytics & Speed Insights** for monitoring

## Architecture Overview

### App Router Structure
```
src/app/
├── layout.tsx              # Root layout with Header, Analytics
├── page.tsx                # Homepage with hero image
├── about/
│   ├── layout.tsx
│   └── page.tsx
└── portfolio/
    ├── layout.tsx          # Portfolio layout with Footer
    ├── page.tsx            # Portfolio grid with category previews
    ├── outsides/page.tsx   # Gallery for exterior photography
    ├── insides/page.tsx    # Gallery for interior photography
    ├── foods-and-drinks/page.tsx
    ├── lifestyle/page.tsx
    └── landscape-and-wildlife/page.tsx
```

### Component Architecture
- **Server Components**: Default, used for layouts and static content
- **Client Components**: Gallery.tsx, ImageTrigger.tsx, ImageModal.tsx for interactive features
- **Server Actions**: `getImagesAction.ts` fetches images from Vercel Blob Storage

### Key Components
- `Gallery`: Renders masonry-style image grid using React's `use()` hook for async data
- `ImageTrigger`/`ImageModal`: Handles image lightbox functionality
- `Header`: Contains navigation (desktop/mobile variants)
- `Footer`: Social media links and contact info

### Data Flow
1. **Images stored in Vercel Blob Storage** with directory prefixes (e.g., 'outsides/', 'insides/')
2. **Server action** `getImagesAction(directoryName)` fetches image metadata
3. **Gallery component** consumes Promise via React's `use()` hook
4. **Next.js Image component** optimized for performance with remote patterns configured

### Styling System
- **Tailwind CSS v4** with inline theme in `globals.css`
- **Custom breakpoints**: `xs: 30rem`, `3xl: 120rem`
- **Responsive design**: Mobile-first with progressive enhancement
- **Font optimization**: Geist Sans/Mono via `next/font`

## Project-Specific Patterns

### Image Handling
- Images hosted on Vercel Blob Storage (`kdza1dlzdaaocp7i.public.blob.vercel-storage.com`)
- **IMPORTANT**: After updating images in storage, must push new commit to `main` to redeploy
- Use `getImagesAction(directoryName)` server action to fetch from blob storage
- All images are WebP format for performance

### TypeScript Configuration
- Path alias `@/*` maps to `./src/*`
- Target ES2017 with strict mode enabled
- Next.js plugin for optimal bundling

### Portfolio Categories
Each portfolio category follows the same pattern:
1. Server action fetches images by directory prefix
2. Gallery component renders masonry layout
3. ImageTrigger handles modal interactions
4. Suspense boundaries for loading states

### Responsive Design Patterns
- Masonry layout: `xs:columns-2 sm:columns-3`
- Grid layout: `grid-cols-1 xs:grid-cols-2 sm:grid-cols-3`
- Padding responsive: `p-8 xs:p-16`

## Development Notes

### Adding New Portfolio Categories
1. Create new route: `src/app/portfolio/[category]/page.tsx`
2. Add category to IMAGES array in `src/app/portfolio/page.tsx`
3. Upload images to Vercel Blob Storage with category prefix
4. Deploy to update remote image access

### Image Organization
- **Public folder**: Contains category preview images referenced directly
- **Vercel Blob**: Contains full galleries organized by directory prefix
- **Next.js config**: Remote patterns configured for blob storage domain

### Performance Optimizations
- Turbopack enabled for fast dev builds
- Next.js Image component with responsive sizing
- Vercel Analytics and Speed Insights integrated
- WebP images for optimal loading

### Dependencies Note
- Uses React 19 RC features (may need updates when stable)
- Tailwind v4 alpha (inline configuration pattern)
- ESLint config uses flat config format (ESLint 9)
