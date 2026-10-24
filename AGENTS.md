# Munden Trucking

Codex guidance for the Munden Truck & Equipment website.

## Context

- Repository: `jonahduckworth/munden-trucking-website`.
- Canonical path: `/Users/jonah/dev/jd-builds/clients/munden-trucking`.
- Stack: Node 24.19.0 (see `.nvmrc`), Next.js 16, React 19, TypeScript, Tailwind CSS,
  shadcn/ui, and Framer Motion.
- Site focus: truck repair, CVIP inspections, emergency repairs, preventive maintenance, and EcoLog forestry equipment.

## Work Rules

- Use npm; CI installs with npm.
- Preserve SEO metadata, structured data, sitemap behavior, and local-business content.
- For generated blog work, use the existing `blog:*` scripts.
- The scheduled daily blog workflow generates content and pushes its commit
  directly to `main`; it does not open a pull request. Treat manual dispatch,
  publishing, external AI calls, and stock-image selection as explicit actions,
  and never invent local-business facts.
- For UI changes, verify responsive layout visually when practical.

## Commands

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm run blog:test
npm run blog:validate
npm run blog:ensure-images
```

## Verification

- Production-facing UI/content changes: run `npm run typecheck`, `npm run lint`, and `npm run build`.
- Blog-generation changes: run `npm run blog:test` and
  `npm run blog:validate`.
- Visual changes: capture desktop and mobile screenshots when practical.

## Cloud development

- See `docs/cloud-development.md` for repeatable setup and saved-environment limitations.
- Use `npm run dev:safe` for local work; email delivery is disabled.
- After building, `npm run test:browser` captures desktop/mobile screenshots and video, checks maintenance tabs, and verifies email remains disabled.
