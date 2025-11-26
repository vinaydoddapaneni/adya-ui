// Setup file for Vitest to handle Web Components and DOM testing
import { afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Vitest already provides jsdom environment, we just need to configure it
// No need to create a separate JSDOM instance

// Add custom elements registry if not available
if (typeof customElements === 'undefined') {
  // @ts-expect-error - customElements may not be available in test environment
  global.customElements = {
    define: () => {},
    get: () => undefined,
  };
}

// Mock requestAnimationFrame if not available
if (typeof requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = (callback: FrameRequestCallback) => {
    return setTimeout(callback, 0) as unknown as number;
  };
}

if (typeof cancelAnimationFrame === 'undefined') {
  global.cancelAnimationFrame = (id: number) => {
    clearTimeout(id);
  };
}

// Mock ElementInternals if not available
if (typeof ElementInternals === 'undefined') {
  class MockElementInternals {
    shadowRoot: ShadowRoot | null = null;
    form: HTMLFormElement | null = null;
    setFormValue(_value: any, _state?: any) {}
    setValidity(_flags: any, _message?: string, _anchor?: HTMLElement) {}
    checkValidity() {
      return true;
    }
    reportValidity() {
      return true;
    }
    get validationMessage() {
      return '';
    }
    get willValidate() {
      return true;
    }
    get validity() {
      return {} as ValidityState;
    }
    get labels() {
      return [] as unknown as NodeListOf<HTMLLabelElement>;
    }
  }
  // @ts-expect-error - ElementInternals may not be available in test environment
  global.ElementInternals = MockElementInternals;
}

// Clean up after each test
afterEach(() => {
  document.body.innerHTML = '';
  vi.clearAllMocks();
});

