// This file runs before any code in your application
// See https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

export async function register() {
  // Fix for Node.js v25+ experimental localStorage that's incomplete
  // Override the broken localStorage object with undefined
  if (typeof globalThis.localStorage !== 'undefined') {
    Object.defineProperty(globalThis, 'localStorage', {
      get() {
        return undefined;
      },
      set() {
        // Prevent anything from setting localStorage
      },
      configurable: true,
    });
  }
}
