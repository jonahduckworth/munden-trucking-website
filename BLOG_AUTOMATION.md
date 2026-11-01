# Munden AI Blog Automation

This project publishes one resource article per week from generated markdown files in `content/resources`. The scheduled workflow generates one post for the current weekly run date. Historical gaps are filled only through an explicit manual backfill.

## Required Secrets

Set the OpenAI key as a GitHub Actions secret named `OPENAI_API_KEY`. If you want the blogger to use a separate key with its own quota, set `BLOG_OPENAI_API_KEY`; the workflow will prefer it and fall back to `OPENAI_API_KEY`.

Set a Pexels API key as a GitHub Actions secret named `PEXELS_API_KEY` when `BLOG_IMAGE_MODE=stock-required`. Pexels gives the workflow access to real stock photography. Without it, stock-required runs fail instead of quietly reusing an existing image.

Optional repository variable:

```text
OPENAI_MODEL=gpt-5.4-mini
BLOG_MAX_OUTPUT_TOKENS=2800
BLOG_OPENAI_RETRIES=2
BLOG_TOPIC_ATTEMPTS=4
BLOG_IMAGE_MODE=stock-required
```

The default model is `gpt-5.4-mini` to keep weekly API usage modest. Use `gpt-5.4` if the generated drafts need stronger writing or reasoning. Scheduled runs default to `BLOG_MAX_OUTPUT_TOKENS=2400`, `BLOG_TOPIC_ATTEMPTS=4`, and one current-date post per run. Keep higher values for manual runs only when the OpenAI account has enough available TPM.

The OpenAI project behind `BLOG_OPENAI_API_KEY` or `OPENAI_API_KEY` must have an available credit balance. An exhausted balance returns `429 insufficient_quota`; the generator treats that as a permanent billing failure and stops immediately instead of waiting and retrying it as a temporary rate limit.

Blog images are pulled into `public/images/blog` from Pexels. With `BLOG_IMAGE_MODE=stock-required`, the workflow fails if `PEXELS_API_KEY` is missing or Pexels cannot return an image, which prevents quiet fallback images. Use `BLOG_IMAGE_MODE=local` only when you intentionally want to use the existing real site photos from `content/blog-config.json`.

Do not commit API keys to the repo. For local testing, add the key to `.env.local` or export it in your shell before running the script. The generator loads `.env.local` automatically when it exists.

## Weekly Workflow

The workflow in `.github/workflows/daily-blog.yml` runs every Monday at `12:30 UTC`, which is early morning in Alberta depending on daylight savings time. Its filename is retained to preserve the existing workflow path and history.

Each run:

1. Reads `content/blog-config.json`.
2. Reviews existing posts in `content/resources`.
3. Fetches short summaries from configured competitor and industry URLs.
4. Sends that compact research digest to OpenAI and generates one markdown post for the current weekly run date. Historical gaps are generated only through an explicit manual backfill dispatch.
5. Gives the model a rotating set of allowed topic angles, rejects topics that overlap recent posts, and retries with a different angle.
6. Routes Service Department, Mobile Service, and Parts Department topics to the most relevant dedicated page and adds that exact internal link if the generated body omits it.
7. Fetches a relevant stock photo into `public/images/blog`, or uses an existing real site photo when `BLOG_IMAGE_MODE=local`.
8. Validates the post for safety, duplicate topics, required sources, internal links, and markdown-only content.
9. Builds the site.
10. Commits the new markdown file and generated image back to the repository.

## Local Commands

```bash
npm run blog:validate
npm run blog:generate -- --dry-run
npm run blog:generate -- --date=2026-05-18 --dry-run
npm run blog:generate -- --date=2026-05-18
npm run blog:backfill -- --from=2026-06-08 --to=2026-06-17
npm run blog:backfill -- --from=2026-06-20 --to=2026-06-23 --limit=1
npm run blog:ensure-images -- --since=2026-05-01
```

Use `--dry-run` to preview metadata without writing a file. Use `--date=YYYY-MM-DD` to generate for a specific date.
Use `blog:backfill` to fill missing publish dates in order. If `--from` is omitted, the script starts with the day after the latest existing post. If `--to` is omitted, it uses today's date in `America/Edmonton`. Use `--limit=N` to cap how many missing dates are generated in one run. If OpenAI returns a long rate-limit reset after one or more posts have been generated, the script stops cleanly so the workflow can validate, build, and commit the partial progress.
Use `blog:ensure-images` to create unique local/generated images for existing posts from a chosen date onward.

## Blog Config

Edit `content/blog-config.json` to tune the system:

- `competitors`: add competitor company names and URLs to monitor.
- `industrySources`: add trusted sources the model should consider.
- `targetKeywords`: add local SEO phrases to prioritize.
- `bannedClaims`: add phrases or claim types the model must avoid.
- `requiredInternalLinks`: add site pages the model can link to from posts.
- `topicLinkTargets`: map Service Department, Mobile Service, and Parts Department search terms to their most relevant dedicated pages. Each entry needs a `label`, `url`, `department`, and a focused list of `matchTerms`. Explicit topic angles can also point directly to one of these URLs.
- `imageOptions`: add existing local image paths that can be used as featured images.

Competitor URLs are for topic-gap research only. The published posts should not name competitors or copy their language.

Service Department, Mobile Service, and Parts Department topic angles are scored against `topicLinkTargets` before generation. The selected dedicated page becomes the post's primary internal-link destination, while the department hub and contact page remain supporting options. EcoLog topic angles intentionally remain on their existing destinations.
