#!/bin/bash
# deploy.sh — Full ClearCFA release pipeline
#
# Usage:
#   bash deploy.sh                          # build + commit + push (no What's New update)
#   ANTHROPIC_API_KEY=sk-ant-... bash deploy.sh   # also generate What's New slides
#
# Steps:
#   1. Generate What's New slides (if ANTHROPIC_API_KEY is set)
#   2. Build app.js via Babel
#   3. Commit all changed files
#   4. Push to main + claude/index-html-github-pages-cfa8fd

set -e

echo "═══════════════════════════════════════"
echo "  ClearCFA Deploy Pipeline"
echo "═══════════════════════════════════════"

# ── 1. What's New generation ──────────────────────────────────────────────────
if [ -n "$ANTHROPIC_API_KEY" ]; then
  echo ""
  echo "▶ Generating What's New slides..."
  node gen-whats-new.js --write
else
  echo ""
  echo "ℹ  ANTHROPIC_API_KEY not set — skipping What's New generation."
  echo "   To generate slides: ANTHROPIC_API_KEY=sk-ant-... bash deploy.sh"
fi

# ── 2. Build ──────────────────────────────────────────────────────────────────
echo ""
echo "▶ Building app.js..."
node build.js

# ── 3. Commit ─────────────────────────────────────────────────────────────────
echo ""
echo "▶ Committing..."
DEPLOY_DATE=$(date +%Y-%m-%d)

# Stage everything that changed (src, app.js, index.html)
git add src/app.jsx app.js index.html 2>/dev/null || true
# Also stage any other tracked-but-modified files
git add -u

# Only commit if there's something to commit
if git diff --cached --quiet; then
  echo "  Nothing to commit — working tree is clean."
else
  git commit -m "Deploy: ${DEPLOY_DATE}"
fi

# ── 4. Push ───────────────────────────────────────────────────────────────────
echo ""
echo "▶ Pushing to GitHub..."

push_with_retry() {
  local branch="$1"
  local attempt=0
  local delays=(2 4 8 16)
  while true; do
    if git push -u origin "$branch"; then
      return 0
    fi
    attempt=$((attempt+1))
    if [ $attempt -gt 4 ]; then
      echo "✗ Push to $branch failed after 4 attempts"
      return 1
    fi
    echo "  Retrying in ${delays[$((attempt-1))]}s..."
    sleep "${delays[$((attempt-1))]}"
  done
}

push_with_retry "main"
push_with_retry "main:claude/index-html-github-pages-cfa8fd"

echo ""
echo "═══════════════════════════════════════"
echo "  ✅ Deploy complete!"
echo "  Live: https://praneethgollamudi.github.io/ClearCFA/"
echo "═══════════════════════════════════════"
