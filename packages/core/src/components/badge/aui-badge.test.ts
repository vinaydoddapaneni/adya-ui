import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiBadge } from './aui-badge';

// Register the element if not already registered
if (!customElements.get('aui-badge')) {
  customElements.define('aui-badge', AuiBadge);
}

describe('AuiBadge', () => {
  let element: AuiBadge;

  beforeEach(() => {
    element = new AuiBadge();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default values', () => {
    expect(element.value).toBe('');
    expect(element.variant).toBe('standard');
    expect(element.size).toBe('medium');
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('variant', 'dot');
    expect(element.variant).toBe('dot');

    element.setAttribute('size', 'small');
    expect(element.size).toBe('small');

    element.setAttribute('max', '99');
    expect(element.max).toBe(99);
  });

  it('reflects property changes to attributes', () => {
    element.variant = 'dot';
    expect(element.getAttribute('variant')).toBe('dot');

    element.size = 'large';
    expect(element.getAttribute('size')).toBe('large');

    element.max = 50;
    expect(element.getAttribute('max')).toBe('50');
  });

  it('formats the badge content correctly', () => {
    element.setAttribute('variant', 'number');
    element.value = 100;
    element.max = 99;
    let badgeSpan = element.shadowRoot?.querySelector('.badge');
    expect(badgeSpan?.textContent).toBe('99+');

    element.max = 1000;
    element.value = 1000;
    // Get fresh reference after re-render
    badgeSpan = element.shadowRoot?.querySelector('.badge');
    expect(badgeSpan?.textContent).toBe('1000');
  });
});
