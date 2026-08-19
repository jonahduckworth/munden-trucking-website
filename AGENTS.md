# Munden Trucking

Codex guidance for the Munden Truck & Equipment website.

## Context

- Repository: `jonahduckworth/munden-trucking-website`.
- Canonical path: `/Users/jonah/dev/jd-builds/clients/munden-trucking`.
- Stack: Node 20+, Next.js 16, React 19, TypeScript, Tailwind CSS,
  shadcn/ui, and Framer Motion.
- Site focus: truck repair, CVIP inspections, emergency repairs, preventive maintenance, and EcoLog forestry equipment.

## Work Rules

- Use npm; CI installs with npm.
- Preserve SEO metadata, structured data, sitemap behavior, and local-business content.
- For generated blog work, use the existing `blog:*` scripts.
- The daily blog workflow may generate content and open a pull request. Treat
  publishing, external AI calls, and stock-image selection as explicit actions;
  never invent local-business facts.
- For UI changes, verify responsive layout visually when practical.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run blog:test
npm run blog:validate
npm run blog:ensure-images
```

## Verification

- Production-facing UI/content changes: run `npm run lint` and `npm run build`.
- Blog-generation changes: run `npm run blog:test` and
  `npm run blog:validate`.
- Visual changes: capture desktop and mobile screenshots when practical.
