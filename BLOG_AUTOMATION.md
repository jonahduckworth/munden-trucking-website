# Munden AI Blog Automation

This project publishes one resource article per day from generated markdown files in `content/resources`.

## Required Secrets

Set the OpenAI key as a GitHub Actions secret named `OPENAI_API_KEY`.

Optional repository variable:

```text
OPENAI_MODEL=gpt-5.4-mini
BLOG_MAX_OUTPUT_TOKENS=3500
BLOG_OPENAI_RETRIES=2
BLOG_TOPIC_ATTEMPTS=3
BLOG_IMAGE_MODE=generate
BLOG_IMAGE_MODEL=gpt-image-2
```

The default model is `gpt-5.4-mini` to keep daily API usage modest. Use `gpt-5.4` if the generated drafts need stronger writing or reasoning. Keep `BLOG_MAX_OUTPUT_TOKENS` near `3500` on new/low-limit API accounts so each daily request stays under common tokens-per-minute limits.

Blog images are generated into `public/images/blog`. With `BLOG_IMAGE_MODE=generate`, the script tries OpenAI image generation first and falls back to a unique local bitmap if image generation is unavailable. Use `BLOG_IMAGE_MODE=local` to skip paid image generation while still creating a unique image file for each post.

Do not commit API keys to the repo. For local testing, add the key to `.env.local` or export it in your shell before running the script. The generator loads `.env.local` automatically when it exists.

## Daily Workflow

The workflow in `.github/workflows/daily-blog.yml` runs daily at `12:30 UTC`, which is early morning in Alberta depending on daylight savings time.

Each run:

1. Reads `content/blog-config.json`.
2. Reviews existing posts in `content/resources`.
3. Fetches short summaries from configured competitor and industry URLs.
4. Sends that compact research digest to OpenAI and generates one markdown post.
5. Rejects topics that overlap the last 10 posts and retries with a different angle.
6. Generates a unique blog image in `public/images/blog`.
7. Validates the post for safety, duplicate topics, required sources, internal links, and markdown-only content.
8. Builds the site.
9. Commits the new markdown file and generated image back to the repository.

## Local Commands

```bash
npm run blog:validate
npm run blog:generate -- --dry-run
npm run blog:generate -- --date=2026-05-18 --dry-run
npm run blog:generate -- --date=2026-05-18
npm run blog:ensure-images -- --since=2026-05-01
```

Use `--dry-run` to preview metadata without writing a file. Use `--date=YYYY-MM-DD` to generate for a specific date.
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
