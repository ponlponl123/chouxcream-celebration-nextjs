#!/usr/bin/env node

// Fix for Node.js v25+ experimental localStorage that's incomplete
// We need to continuously override it because Next.js recreates the global context
Object.defineProperty(globalThis, 'localStorage', {
  get() {
    return undefined;
  },
  set() {
    // Prevent anything from setting localStorage
  },
  configurable: true,
});

// Run Next.js dev server
const args = process.argv.slice(2);
process.argv = ['node', require.resolve('next/dist/bin/next'), 'dev', ...args];
require('next/dist/bin/next');