#!/usr/bin/env node
const babel = require('/tmp/node_modules/@babel/core');
const fs = require('fs');

const src = fs.readFileSync('src/app.jsx', 'utf8');
try {
  const result = babel.transformSync(src, {
    presets: [['/tmp/node_modules/@babel/preset-react', { runtime: 'classic' }]],
    filename: 'app.jsx'
  });
  fs.writeFileSync('app.js', result.code);
  console.log(`Built app.js (${(result.code.length / 1024).toFixed(1)} KB) from src/app.jsx`);
} catch (e) {
  console.error('Build failed:', e.message);
  process.exit(1);
}
