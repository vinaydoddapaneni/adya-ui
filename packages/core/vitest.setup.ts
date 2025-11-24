// Setup file for Vitest to handle Web Components and DOM testing
import { expect, afterEach } from 'vitest';
import { cleanup as cleanupDOM } from '@testing-library/react';

// Run cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanupDOM();
  document.body.innerHTML = '';
});

// Add custom matchers for testing web components
import '@testing-library/jest-dom/vitest';
