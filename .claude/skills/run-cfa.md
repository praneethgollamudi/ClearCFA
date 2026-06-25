# Skill: run-cfa
description: Build ClearCFA and take screenshots of key screens using Playwright

## Build

```bash
cd /home/user/ClearCFA
node build.js
```

If `@babel/core` is not found:
```bash
cd /tmp && npm install --prefix . @babel/core @babel/preset-react 2>/dev/null | tail -1
cd /home/user/ClearCFA && node build.js
```

## Serve locally

```bash
cd /home/user/ClearCFA
npx --yes serve . -l 5555 &
sleep 2
```

The app will be at `http://localhost:5555/ClearCFA/` (note the subdirectory — matches GitHub Pages path `/ClearCFA/`).

If `serve` is unavailable, use Python:
```bash
cd /home/user/ClearCFA && python3 -m http.server 5555 &
```
Then the URL is `http://localhost:5555/` (no subdirectory with Python).

## Playwright setup

Chromium is pre-installed. Do NOT run `playwright install`.

```javascript
// screenshot.js
const { chromium } = require('/opt/pw-browsers/chromium');
// OR if using @playwright/test:
const { chromium } = require('@playwright/test');
```

If `@playwright/test` is not in the project:
```bash
cd /tmp && npm install --prefix . playwright 2>/dev/null | tail -1
```

Use `executablePath: '/opt/pw-browsers/chromium'` if Playwright can't find the browser.

## Screenshot script template

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14 Pro

  await page.goto('http://localhost:5555/ClearCFA/');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/screen-home.png', fullPage: false });

  // Take additional screens as needed
  await browser.close();
})();
```

## Key screens to verify

| Screen | How to reach | What to check |
|--------|-------------|---------------|
| Home | Direct load | Office Mode card visible without scrolling |
| Setup | Tap any topic | Mode picker, topic/module selectors |
| Quiz | Start a session | Question text, A/B/C buttons, timer |
| Results | Answer all questions | Score ring, action buttons above fold |
| Readiness/Progress | Bottom nav | Module cards before heatmap, nav bar visible |
| More grid | Scroll home, tap "More" | 13 items, no emoji collisions |

## Sending screenshots to user

```javascript
// After taking screenshots, use SendUserFile in your main turn (not inside this script)
// Just save them to /tmp/screen-*.png and reference them
```

## Common issues

- **App shows blank**: React bundle not loaded — check `app.js?v=` cache bust in index.html
- **Nav bar missing**: wrap() should auto-include navPortal — check recent edits
- **Port in use**: `kill $(lsof -ti:5555)` then retry
- **Chromium crash**: Add `--disable-dev-shm-usage` to launch args
