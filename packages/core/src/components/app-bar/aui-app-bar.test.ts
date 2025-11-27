import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiAppBar } from './aui-app-bar';

if (!customElements.get('aui-app-bar')) {
  customElements.define('aui-app-bar', AuiAppBar);
}

describe('AuiAppBar', () => {
  let element: AuiAppBar;

  beforeEach(() => {
    element = new AuiAppBar();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.position).toBe('static');
    expect(element.color).toBe('primary');
    expect(element.dense).toBe(false);
    expect(element.flat).toBe(false);
  });

  it('reflects attribute changes', () => {
    element.position = 'fixed';
    expect(element.getAttribute('position')).toBe('fixed');

    element.color = 'secondary';
    expect(element.getAttribute('color')).toBe('secondary');

    element.dense = true;
    expect(element.hasAttribute('dense')).toBe(true);

    element.flat = true;
    expect(element.hasAttribute('flat')).toBe(true);
  });

  it('applies correct classes', () => {
    element.color = 'default';
    element.dense = true;
    element.flat = true;
    element.outlined = true;
    
    const header = element.shadowRoot!.querySelector('header');
    expect(header?.classList.contains('aui-app-bar--default')).toBe(true);
    expect(header?.classList.contains('aui-app-bar--dense')).toBe(true);
    expect(header?.classList.contains('aui-app-bar--flat')).toBe(true);
    expect(header?.classList.contains('aui-app-bar--outlined')).toBe(true);
  });

  it('renders slots correctly', () => {
    const startSlot = element.shadowRoot!.querySelector('slot[name="start"]');
    const defaultSlot = element.shadowRoot!.querySelector('slot:not([name])');
    const endSlot = element.shadowRoot!.querySelector('slot[name="end"]');

    expect(startSlot).toBeTruthy();
    expect(defaultSlot).toBeTruthy();
    expect(endSlot).toBeTruthy();
  });
});
