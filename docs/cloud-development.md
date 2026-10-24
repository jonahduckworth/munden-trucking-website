# Cloud development

## Runtime and installation

Use Node 24.19.0 from `.nvmrc` and npm (verified with npm 11.9.0). Both GitHub
workflows read `.nvmrc`. Next.js is 16 and React is 19; `package-lock.json` pins
dependencies. The package retains its original Node >=20.9.0 compatibility floor;
Node 24 is the tested cloud/CI runtime, not a new application API requirement.
Node 20 is end-of-life as of this audit, while Node 24 is LTS, so CI follows the
already installed and verified Node 24 rather than keeping an unsupported major.
See the [official Node release status](https://nodejs.org/en/about/previous-releases).
Select the runtime before installation; `nvm use` works where nvm
is installed. The setup script checks the runtime and does not install Node.

From the repository root:

```bash
npm run setup:cloud
```

This runs `npm ci`, installs the lockfile's Playwright Chromium and FFmpeg, and
generates Next.js types before checking TypeScript. Caches stay under ignored
`.cache/`, avoiding unwritable home directories. It does not start services,
create credentials, or call email/blog providers. Rerun after dependency changes.
Installation needs npm registry and Playwright download access. Builds use Google
Fonts. Missing OS libraries are reported by Playwright; on a supported Linux
machine, an administrator can install them with the pinned local CLI:
`./node_modules/.bin/playwright install-deps chromium`. The setup script does not
change system packages or network policy.

## Start and verify

```bash
npm run dev:safe
# Separate terminal: curl --fail http://127.0.0.1:3000/
```

`dev:safe` binds to loopback and sets `EMAIL_DISABLED=1`; both email endpoints
return HTTP 503 before parsing or sending. No Resend key is needed. Ordinary
production startup keeps its existing delivery behavior unless that flag is set.
Do not submit live forms or run blog generation for local readiness checks.

```bash
npm run typecheck
npm run lint
npm run blog:test
npm run blog:validate
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run test:browser
```

Type checking runs independently and during production builds. Browser tests
require a completed build and own their local server on port 3100; they refuse
to reuse an existing server. They disable email, clear the server's Resend key,
block external browser requests/analytics, and test all three maintenance tabs
plus both disabled email endpoints. Contact validation, mocked contact/subscription
success, disabled subscription error display, article navigation, and equipment
detail/quote navigation use synthetic data only. This marketing site has no
login or role system. Mocked success does not verify provider delivery. Desktop/mobile PNG screenshots and WebM
recordings are in ignored `test-results/`. Playwright closes its server afterward.
Screenshots omit external maps and analytics because those requests are blocked.

## Saved cloud environment versus this checkout

Repository scripts and dependency installs in a running task do **not** update
the published `munden-trucking-website` environment. There is no repository-local
saved-environment configuration exposed here, and no saved-environment update
API is available in this task.

The supported cloud setup flow has **Install script** and **Start skill** fields.
For a future environment edit, select Node from `.nvmrc`, use the install command
below, and use the startup/check instructions above for the Start skill:

```bash
cd /workspace/munden-trucking-website
npm run setup:cloud
```

After these source changes are available to that setup, prepare and verify it
through Settings > Codex Cloud > Environments > Edit, then save and republish.
Finally start a **new task** and rerun checks to verify the published setup.
This document does not claim that those steps have happened. Existing tasks
retain their own working state.

References: [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environments)
and [Playwright browser installation](https://playwright.dev/docs/browsers).
