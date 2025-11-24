/**
 * Test utilities for web components
 */

export function createTestElement<T extends HTMLElement>(tagName: string): T {
  return document.createElement(tagName) as T;
}

export function setupTest<T extends HTMLElement>(tagName: string): T {
  const element = createTestElement<T>(tagName);
  document.body.appendChild(element);
  return element;
}

export function teardownTest(element: HTMLElement) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
  document.body.innerHTML = '';
}

export function waitForComponentUpdate(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}
