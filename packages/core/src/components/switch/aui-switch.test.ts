import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiSwitch } from './aui-switch';

// Register the element if not already registered
if (!customElements.get('aui-switch')) {
  customElements.define('aui-switch', AuiSwitch);
}

describe('AuiSwitch', () => {
  let element: AuiSwitch;

  beforeEach(() => {
    element = document.createElement('aui-switch') as AuiSwitch;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.checked).toBe(false);
    expect(element.disabled).toBe(false);
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('checked', '');
    expect(element.checked).toBe(true);

    element.setAttribute('disabled', '');
    expect(element.disabled).toBe(true);

    element.setAttribute('label', 'Dark Mode');
    expect(element.label).toBe('Dark Mode');
  });

  it('emits change event when clicked', () => {
    const changeSpy = vi.fn();
    element.addEventListener('change', changeSpy);

    const input = element.shadowRoot!.querySelector('input')!;
    input.click();

    expect(changeSpy).toHaveBeenCalled();
    expect(element.checked).toBe(true);
  });
});
