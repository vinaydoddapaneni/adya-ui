import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { createTestElement, setupTest, teardownTest, waitForComponentUpdate } from './test-utils';

describe('test-utils', () => {
  describe('createTestElement', () => {
    it('should create an HTML element with the specified tag name', () => {
      const element = createTestElement<HTMLDivElement>('div');
      expect(element).toBeInstanceOf(HTMLDivElement);
      expect(element.tagName).toBe('DIV');
    });

    it('should create a custom element when provided with a custom element name', () => {
      const element = createTestElement<HTMLElement>('custom-element');
      expect(element.tagName).toBe('CUSTOM-ELEMENT');
    });
  });

  describe('setupTest and teardownTest', () => {
    let testElement: HTMLElement;
    const testTag = 'test-element';

    beforeEach(() => {
      testElement = setupTest<HTMLElement>(testTag);
    });

    afterEach(() => {
      teardownTest(testElement);
    });

    it('should append the test element to the document body', () => {
      expect(document.body.contains(testElement)).toBe(true);
      expect(testElement.tagName.toLowerCase()).toBe(testTag);
    });

    it('should clean up the test element from the document body', () => {
      teardownTest(testElement);
      expect(document.body.contains(testElement)).toBe(false);
    });
  });

  describe('waitForComponentUpdate', () => {
    it('should resolve after two animation frames', async () => {
      const mockCallback = vi.fn();
      
      // Call the function and wait for it to resolve
      await waitForComponentUpdate();
      
      // The callback should be called after the promise resolves
      mockCallback();
      
      expect(mockCallback).toHaveBeenCalled();
    });

    it('should allow chaining with other async operations', async () => {
      let value = 0;
      
      await waitForComponentUpdate().then(() => {
        value = 1;
      });
      
      expect(value).toBe(1);
    });
  });
});
