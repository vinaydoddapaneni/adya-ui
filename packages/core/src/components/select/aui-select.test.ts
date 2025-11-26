import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiSelect } from './aui-select';

// Register the element if not already registered
if (!customElements.get('aui-select')) {
  customElements.define('aui-select', AuiSelect);
}

describe('AuiSelect', () => {
  let element: AuiSelect;

  beforeEach(() => {
    element = new AuiSelect();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.value).toBe('');
    expect(element.disabled).toBe(false);
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('label', 'Choose Option');
    expect(element.label).toBe('Choose Option');

    element.setAttribute('value', 'opt1');
    expect(element.value).toBe('opt1');

    element.setAttribute('disabled', '');
    expect(element.disabled).toBe(true);
  });

  it('emits change event when selection changes', async () => {
    const changeSpy = vi.fn();
    element.addEventListener('change', changeSpy);

    // Mock options
    element.innerHTML = `
      <option value="opt1">Option 1</option>
      <option value="opt2">Option 2</option>
    `;

    // Wait for slotchange and syncOptions
    await new Promise((resolve) => setTimeout(resolve, 0));

    const select = element.shadowRoot!.querySelector('select')!;
    select.value = 'opt2';
    select.dispatchEvent(new Event('change'));

    expect(changeSpy).toHaveBeenCalled();
    expect(element.value).toBe('opt2');
  });
});
