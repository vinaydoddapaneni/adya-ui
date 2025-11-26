import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiContainer } from './aui-container';

// Register the element if not already registered
if (!customElements.get('aui-container')) {
  customElements.define('aui-container', AuiContainer);
}

describe('AuiContainer', () => {
  let element: AuiContainer;

  beforeEach(() => {
    element = new AuiContainer();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.maxWidth).toBe('lg');
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('max-width', 'sm');
    expect(element.maxWidth).toBe('sm');
  });

  it('reflects property changes to attributes', () => {
    element.maxWidth = 'xl';
    expect(element.getAttribute('max-width')).toBe('xl');
  });

  it('applies correct class based on max-width', () => {
    element.maxWidth = 'md';
    const div = element.shadowRoot!.querySelector('.aui-container');
    expect(div?.classList.contains('aui-container--md')).toBe(true);
  });
});
