import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiTextField } from './aui-textfield';

// Register the element if not already registered
if (!customElements.get('aui-textfield')) {
  customElements.define('aui-textfield', AuiTextField);
}

describe('AuiTextField', () => {
  let element: AuiTextField;

  beforeEach(() => {
    element = document.createElement('aui-textfield') as AuiTextField;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.type).toBe('text');
    expect(element.value).toBe('');
    expect(element.disabled).toBe(false);
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('label', 'Username');
    expect(element.label).toBe('Username');

    element.setAttribute('value', 'test');
    expect(element.value).toBe('test');

    element.setAttribute('disabled', '');
    expect(element.disabled).toBe(true);
  });

  it('emits input event when typing', () => {
    const inputSpy = vi.fn();
    element.addEventListener('input', inputSpy);

    const input = element.shadowRoot!.querySelector('input')!;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));

    expect(inputSpy).toHaveBeenCalled();
    expect(element.value).toBe('hello');
  });

  it('updates focused state', () => {
    const input = element.shadowRoot!.querySelector('input')!;
    
    input.dispatchEvent(new Event('focus'));
    expect(element.hasAttribute('focused')).toBe(true);

    input.dispatchEvent(new Event('blur'));
    expect(element.hasAttribute('focused')).toBe(false);
  });
});
