#!/usr/bin/env node
let babel;
try {
  babel = require('@babel/core');
} catch {
  // Fallback for environments where babel is installed globally in /tmp
  babel = require('/tmp/node_modules/@babel/core');
}

const fs = require('fs');

const src = fs.readFileSync('src/app.jsx', 'utf8');
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
  console.log(`Built app.js (${(result.code.length / 1024).toFixed(1)} KB) from src/app.jsx`);
} catch (e) {
  console.error('Build failed:', e.message);
  process.exit(1);
}
