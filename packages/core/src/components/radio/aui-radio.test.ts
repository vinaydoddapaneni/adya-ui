import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiRadio } from './aui-radio';

// Register the element if not already registered
if (!customElements.get('aui-radio')) {
  customElements.define('aui-radio', AuiRadio);
}

describe('AuiRadio', () => {
  let element: AuiRadio;

  beforeEach(() => {
    element = new AuiRadio();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.checked).toBe(false);
    expect(element.disabled).toBe(false);
    expect(element.name).toBe('');
    expect(element.value).toBe('');
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('checked', '');
    expect(element.checked).toBe(true);

    element.setAttribute('disabled', '');
    expect(element.disabled).toBe(true);

    element.setAttribute('name', 'gender');
    expect(element.name).toBe('gender');

    element.setAttribute('value', 'male');
    expect(element.value).toBe('male');
  });

  it('emits change event when clicked', () => {
    const changeSpy = vi.fn();
    element.addEventListener('change', changeSpy);

    element.click();

    expect(element.checked).toBe(true);
    expect(changeSpy).toHaveBeenCalled();
  });

  it('does not emit change event when clicked if disabled', () => {
    element.disabled = true;
    const changeSpy = vi.fn();
    element.addEventListener('change', changeSpy);

    element.click();

    expect(element.checked).toBe(false);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('does not emit change event if already checked', () => {
    element.checked = true;
    const changeSpy = vi.fn();
    element.addEventListener('change', changeSpy);

    element.click();

    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('unchecks other radios with same name', () => {
    const radio2 = new AuiRadio();
    radio2.name = 'group1';
    radio2.value = '2';
    radio2.checked = true;
    document.body.appendChild(radio2);

    element.name = 'group1';
    element.value = '1';
    
    element.click();

    expect(element.checked).toBe(true);
    expect(radio2.checked).toBe(false);

    document.body.removeChild(radio2);
  });
});
