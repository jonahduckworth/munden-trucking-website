# Munden Trucking

Codex guidance for the Munden Truck & Equipment website.

## Context

- Repository: `jonahduckworth/munden-trucking-website`.
- Canonical path: `/Users/jonah/dev/jd-builds/clients/munden-trucking`.
- Stack: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion.
- Site focus: truck repair, CVIP inspections, emergency repairs, preventive maintenance, and EcoLog forestry equipment.

## Work Rules

- Use npm; CI installs with npm.
- Preserve SEO metadata, structured data, sitemap behavior, and local-business content.
- For generated blog work, use the existing `blog:*` scripts.
- For UI changes, verify responsive layout visually when practical.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run blog:validate
npm run blog:ensure-images
```

## Verification

- Production-facing UI/content changes: run `npm run lint` and `npm run build`.
- Blog-generation changes: run `npm run blog:validate`.
- Visual changes: capture desktop and mobile screenshots when practical.
