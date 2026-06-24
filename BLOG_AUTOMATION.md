# Munden AI Blog Automation

This project publishes one resource article per day from generated markdown files in `content/resources`. The scheduled workflow is backfill-aware: if one or more dates are missing, it generates missing dates in order instead of skipping ahead.

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

The default model is `gpt-5.4-mini` to keep daily API usage modest. Use `gpt-5.4` if the generated drafts need stronger writing or reasoning. Scheduled runs default to `BLOG_MAX_OUTPUT_TOKENS=2400`, `BLOG_TOPIC_ATTEMPTS=2`, and one missing date per run to reduce token-per-minute pressure. Keep higher values for manual runs only when the OpenAI account has enough available TPM.

Blog images are pulled into `public/images/blog` from Pexels. With `BLOG_IMAGE_MODE=stock-required`, the workflow fails if `PEXELS_API_KEY` is missing or Pexels cannot return an image, which prevents quiet fallback images. Use `BLOG_IMAGE_MODE=local` only when you intentionally want to use the existing real site photos from `content/blog-config.json`.

Do not commit API keys to the repo. For local testing, add the key to `.env.local` or export it in your shell before running the script. The generator loads `.env.local` automatically when it exists.

## Daily Workflow

The workflow in `.github/workflows/daily-blog.yml` runs daily at `12:30 UTC`, which is early morning in Alberta depending on daylight savings time.

Each run:

1. Reads `content/blog-config.json`.
2. Reviews existing posts in `content/resources`.
3. Fetches short summaries from configured competitor and industry URLs.
4. Sends that compact research digest to OpenAI and generates markdown posts for missing dates in order.
5. Gives the model a rotating set of allowed topic angles, rejects topics that overlap recent posts, and retries with a different angle.
6. Adds a relevant internal link automatically if the generated body omits one.
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
- `imageOptions`: add existing local image paths that can be used as featured images.

Competitor URLs are for topic-gap research only. The published posts should not name competitors or copy their language.
