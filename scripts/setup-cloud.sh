#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

expected_node="$(cat .nvmrc)"
if [[ "$(node --version)" != "v${expected_node}" ]]; then
  echo "Select Node ${expected_node} (see .nvmrc) before running setup." >&2
  exit 1
fi

# Keep caches in the checkout; cloud tasks may not have a writable home.
export npm_config_cache="$PWD/.cache/npm"
npm ci --no-audit --no-fund
npm run browser:install
npm run typecheck
