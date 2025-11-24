import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AuiBadge } from './aui-badge';
import { setupTest, teardownTest } from '../../test-utils';

// Register the element if not already registered
if (!customElements.get('aui-badge')) {
  customElements.define('aui-badge', AuiBadge);
}

describe('AuiBadge', () => {
  let element: AuiBadge;

  beforeEach(() => {
    element = setupTest<AuiBadge>('aui-badge');
  });

  afterEach(() => {
    teardownTest(element);
  });

  it('renders with default values', () => {
    expect(element.textContent).toBe('');
    expect(element.getAttribute('variant')).toBe('standard');
    expect(element.getAttribute('size')).toBe('medium');
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
    element.value = 100;
    element.max = 99;
    expect(element.textContent).toBe('99+');

    element.max = 1000;
    element.value = 1000;
    expect(element.textContent).toBe('1000');
  });
});
