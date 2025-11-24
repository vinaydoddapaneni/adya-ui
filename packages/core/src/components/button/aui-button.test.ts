import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiButton } from './aui-button';

// Register the element if not already registered
if (!customElements.get('aui-button')) {
  customElements.define('aui-button', AuiButton);
}

describe('AuiButton', () => {
  let element: AuiButton;

  beforeEach(() => {
    element = document.createElement('aui-button') as AuiButton;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.variant).toBe('primary');
    expect(element.size).toBe('medium');
    expect(element.disabled).toBe(false);
    expect(element.loading).toBe(false);
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('variant', 'secondary');
    expect(element.variant).toBe('secondary');

    element.setAttribute('size', 'large');
    expect(element.size).toBe('large');

    element.setAttribute('disabled', '');
    expect(element.disabled).toBe(true);

    element.setAttribute('loading', '');
    expect(element.loading).toBe(true);
  });

  it('reflects property changes to attributes', () => {
    element.variant = 'outlined';
    expect(element.getAttribute('variant')).toBe('outlined');

    element.size = 'small';
    expect(element.getAttribute('size')).toBe('small');

    element.disabled = true;
    expect(element.hasAttribute('disabled')).toBe(true);

    element.loading = true;
    expect(element.hasAttribute('loading')).toBe(true);
  });

  it('emits aui-click event when clicked', () => {
    const clickSpy = vi.fn();
    element.addEventListener('aui-click', clickSpy);

    const button = element.shadowRoot!.querySelector('button')!;
    button.click();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('does not emit aui-click when disabled', () => {
    const clickSpy = vi.fn();
    element.addEventListener('aui-click', clickSpy);
    element.disabled = true;

    const button = element.shadowRoot!.querySelector('button')!;
    button.click();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('does not emit aui-click when loading', () => {
    const clickSpy = vi.fn();
    element.addEventListener('aui-click', clickSpy);
    element.loading = true;

    const button = element.shadowRoot!.querySelector('button')!;
    button.click();

    expect(clickSpy).not.toHaveBeenCalled();
  });
});
