import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiCheckbox } from './aui-checkbox';

// Register the element if not already registered
if (!customElements.get('aui-checkbox')) {
  customElements.define('aui-checkbox', AuiCheckbox);
}

describe('AuiCheckbox', () => {
  let element: AuiCheckbox;

  beforeEach(() => {
    element = document.createElement('aui-checkbox') as AuiCheckbox;
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

    element.setAttribute('label', 'Accept Terms');
    expect(element.label).toBe('Accept Terms');
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
