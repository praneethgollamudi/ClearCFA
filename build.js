#!/usr/bin/env node
let babel;
try {
  babel = require('@babel/core');
} catch {
  babel = require('/tmp/node_modules/@babel/core');
}

const fs = require('fs');

// Source files concatenated in dependency order
const SOURCE_FILES = [
  'src/data/los.js',          // LOS curriculum data (L1/L2/L3) — no deps
  'src/data/ethics.js',       // Ethics case studies — no deps
  'src/data/q-templates.js',  // Question templates — no deps
  'src/utils.js',             // Pure utility functions (SM-2, prompts, analytics) — no JSX
  'src/calculator.jsx',       // CFACalculator component — no module-level C.* refs
  'src/app.jsx',              // Constants, C definition, components, CFAMock, screens
];

const src = SOURCE_FILES.map(f => {
  const content = fs.readFileSync(f, 'utf8');
  return `\n// ═══ ${f} ═══\n${content}`;
}).join('\n');

async function main() {
  let presetPath;
  try {
    presetPath = require.resolve('@babel/preset-react');
  } catch {
    presetPath = '/tmp/node_modules/@babel/preset-react';
  }

  const result = babel.transformSync(src, {
    presets: [[presetPath, { runtime: 'classic' }]],
    filename: 'app.jsx'
  });

  let finalCode = result.code;
  const rawKB = (result.code.length / 1024).toFixed(1);

  try {
    const Terser = require('terser');
    const minified = await Terser.minify(finalCode, {
      compress: { passes: 2, drop_console: false },
      mangle: { toplevel: false, reserved: ['React', 'ReactDOM'] },
      output: { ascii_only: true },
    });
    if (minified.code) {
      finalCode = minified.code;
      const minKB = (finalCode.length / 1024).toFixed(1);
      const files = SOURCE_FILES.map(f => f.split('/').pop()).join(' + ');
      console.log(`Built app.js (${rawKB} KB → ${minKB} KB minified) from [${files}]`);
    }
  } catch {
    const files = SOURCE_FILES.map(f => f.split('/').pop()).join(' + ');
    console.log(`Built app.js (${rawKB} KB) from [${files}] (Terser unavailable)`);
  }

  fs.writeFileSync('app.js', finalCode);
}

main().catch(e => {
  console.error('Build failed:', e.message);
  process.exit(1);
});
