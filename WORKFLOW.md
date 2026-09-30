---
stack: nextjs
branch_target: main
package_manager: npm
test_command: npm run typecheck && npm run blog:test
build_command: npm run build
deploy: auto (Vercel on merge to main)
---

# Munden Trucking Website — Agent Workflow

## Before You Start
1. `git checkout main && git pull`
2. Create a feature branch: `git checkout -b fix/<short-description>`
3. `npm ci`

## Stack
- Next.js 16, Tailwind CSS, Framer Motion, shadcn/ui
- Deployed on Vercel (auto-deploys on merge to main)
- Contact form: Resend → kamloops.shop@mundengroup.ca

## Rules
- Use Node 24.19.0 (`.nvmrc`); see `docs/cloud-development.md` for cloud setup
- Run `npm run typecheck`, `npm run lint`, and `npm run build` before committing
- Use `npm run dev:safe` for local development without email delivery
- PR target: `main` branch
- This is a client site — changes should be pixel-perfect
- Equipment data is in the components — verify specs with client emails

## After Your Change
1. `git add -A && git commit -m "<type>: <description>"`
2. `git push -u origin <branch>`
3. `gh pr create --repo jonahduckworth/munden-trucking-website --base main --fill`
4. Lisa QA will review your PR automatically

## Client
- Nolan Munden (kamloops.shop@mundengroup.ca)
- Equipment specs must be accurate — verify before changing
