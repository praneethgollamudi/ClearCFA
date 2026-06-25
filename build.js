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
  'src/app.jsx',              // Everything else (utils, components, CFAMock)
];

const src = SOURCE_FILES.map(f => {
  const content = fs.readFileSync(f, 'utf8');
  return `\n// ═══ ${f} ═══\n${content}`;
}).join('\n');

try {
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
  fs.writeFileSync('app.js', result.code);
  const files = SOURCE_FILES.map(f => f.split('/').pop()).join(' + ');
  console.log(`Built app.js (${(result.code.length / 1024).toFixed(1)} KB) from [${files}]`);
} catch (e) {
  console.error('Build failed:', e.message);
  process.exit(1);
}
