import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiCard } from './aui-card';

// Register the element if not already registered
if (!customElements.get('aui-card')) {
  customElements.define('aui-card', AuiCard);
}

describe('AuiCard', () => {
  let element: AuiCard;

  beforeEach(() => {
    element = document.createElement('aui-card') as AuiCard;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.variant).toBe('elevated');
    expect(element.padding).toBe('md');
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('variant', 'outlined');
    expect(element.variant).toBe('outlined');

    element.setAttribute('padding', 'lg');
    expect(element.padding).toBe('lg');
  });

  it('reflects property changes to attributes', () => {
    element.variant = 'elevated';
    expect(element.getAttribute('variant')).toBe('elevated');

    element.padding = 'none';
    expect(element.getAttribute('padding')).toBe('none');
  });

  it('applies correct classes', () => {
    element.variant = 'outlined';
    element.padding = 'sm';
    
    const div = element.shadowRoot!.querySelector('.aui-card');
    expect(div?.classList.contains('aui-card--outlined')).toBe(true);
    expect(div?.classList.contains('aui-card--padding-sm')).toBe(true);
  });
});
