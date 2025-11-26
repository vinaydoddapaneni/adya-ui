import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiTypography } from './aui-typography';

// Register the element if not already registered
if (!customElements.get('aui-typography')) {
  customElements.define('aui-typography', AuiTypography);
}

describe('AuiTypography', () => {
  let element: AuiTypography;

  beforeEach(() => {
    element = new AuiTypography();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.variant).toBe('body1');
    expect(element.color).toBe('text-primary');
    expect(element.align).toBe('left');
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('variant', 'h1');
    expect(element.variant).toBe('h1');

    element.setAttribute('color', 'primary');
    expect(element.color).toBe('primary');

    element.setAttribute('align', 'center');
    expect(element.align).toBe('center');
  });

  it('reflects property changes to attributes', () => {
    element.variant = 'h2';
    expect(element.getAttribute('variant')).toBe('h2');

    element.color = 'secondary';
    expect(element.getAttribute('color')).toBe('secondary');

    element.align = 'right';
    expect(element.getAttribute('align')).toBe('right');
  });

  it('renders correct HTML tag based on variant', () => {
    element.variant = 'h1';
    // Force re-render if necessary, or check shadow DOM
    // Since render is called in connectedCallback and attributeChangedCallback, it should update
    const h1 = element.shadowRoot!.querySelector('h1');
    expect(h1).toBeTruthy();

    element.variant = 'body1';
    const p = element.shadowRoot!.querySelector('p');
    expect(p).toBeTruthy();
  });
});
