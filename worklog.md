---
Task ID: 1
Agent: Main Agent (Full-Stack Criticize & Improve)
Task: Comprehensive audit and improvement of Sera Property website

Work Log:
- Read all 12 core source files (layout, page, 8 components, 2 API routes, config, CSS, seed-data)
- Ran TypeScript check — found stray `examples/` and `skills/` directories causing build errors
- Removed stray non-project directories (examples/websocket, skills/*)
- Clean production build: 0 TS errors, 5 routes (/, /_not-found, /api/blogs, /api/properties, /sitemap.xml)

Improvements implemented:

1. SEO (layout.tsx):
   - Extended meta title with "Dhaka's Trusted Letting Agency"
   - Added metadataBase, canonical URL, OG locale (en_BD), site_name, OG image with dimensions
   - Added Twitter Card (summary_large_image)
   - Added granular robots/googleBot directives
   - Added JSON-LD structured data (RealEstateAgent schema)
   - Expanded keywords (12 total, location-specific)
   - Added sitemap link in <head>

2. Performance (all image components):
   - Replaced raw <img> with Next.js <Image> in HeroSection (priority), PropertyCarousel, BlogSection, SeraViewSection, Navbar, Footer
   - Added loading="lazy" to all below-fold images
   - Added proper sizes hints per breakpoint
   - Added bg-gray-100 placeholder backgrounds for image containers

3. Accessibility:
   - Added "Skip to main content" link (sr-only, focus-visible)
   - Added aria-label to search input with htmlFor/id association
   - Added aria-label to all 3 filter <select> elements
   - Added aria-label to all content <section> elements
   - Added aria-hidden="true" to decorative icons and skeleton loaders
   - Added role="alert" to error banner
   - Improved alt text descriptions (specific, descriptive)

4. API & Security:
   - Added Cache-Control headers (s-maxage + stale-while-revalidate) to both API routes
   - Added X-Data-Source header for fallback responses
   - Added revalidate directives for ISR
   - Added security headers via next.config.ts: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy

5. UX:
   - Added loading skeletons (PropertySkeleton, BlogSkeleton) shown during data fetch
   - Fixed ExploreSection id to match nav "Add a Property" link
   - Semantic sections wrapped around property/blog content

6. Infrastructure:
   - Created /src/app/sitemap.ts (dynamic sitemap generation)
   - Removed stray examples/ and skills/ directories
   - Verified 5 WhatsApp link occurrences across 3 files (consistent)

Stage Summary:
- Production build: CLEAN (0 errors, 8s compile, 5 routes)
- All 19 images verified present (logo, hero-bg, seraview, 15 property, 3 blog)
- WhatsApp: 5 occurrences in 3 files (Navbar x2, Footer x2, WhatsAppButton x1)
- SEO: Full OG, Twitter Card, JSON-LD, sitemap, robots, canonical
- A11y: Skip link, ARIA labels, semantic sections, form labels
- Security: 5 response headers, cache control, referrer policy
- Performance: Next.js Image with lazy loading, priority hero, sizes hints