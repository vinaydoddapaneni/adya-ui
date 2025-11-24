import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiRadio } from './aui-radio';

// Register the element if not already registered
if (!customElements.get('aui-radio')) {
  customElements.define('aui-radio', AuiRadio);
}

describe('AuiRadio', () => {
  let element: AuiRadio;

  beforeEach(() => {
    element = document.createElement('aui-radio') as AuiRadio;
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

    element.setAttribute('label', 'Option 1');
    expect(element.label).toBe('Option 1');
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
