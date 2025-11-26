import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiTextField } from './aui-textfield';

// Register the element if not already registered
if (!customElements.get('aui-textfield')) {
  customElements.define('aui-textfield', AuiTextField);
}

describe('AuiTextField', () => {
  let element: AuiTextField;

  beforeEach(() => {
    element = new AuiTextField();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.type).toBe('text');
    expect(element.value).toBe('');
    expect(element.disabled).toBe(false);
    expect(element.variant).toBe('outlined');
    expect(element.size).toBe('medium');
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

  describe('Variants', () => {
    it('applies outlined variant by default', () => {
      const container = element.shadowRoot!.querySelector('.aui-textfield');
      expect(container?.classList.contains('aui-textfield--outlined')).toBe(true);
    });

    it('applies filled variant', () => {
      element.variant = 'filled';
      const container = element.shadowRoot!.querySelector('.aui-textfield');
      expect(container?.classList.contains('aui-textfield--filled')).toBe(true);
    });

    it('applies standard variant', () => {
      element.variant = 'standard';
      const container = element.shadowRoot!.querySelector('.aui-textfield');
      expect(container?.classList.contains('aui-textfield--standard')).toBe(true);
    });
  });

  describe('Sizes', () => {
    it('applies medium size by default', () => {
      const container = element.shadowRoot!.querySelector('.aui-textfield');
      expect(container?.classList.contains('aui-textfield--medium')).toBe(true);
    });

    it('applies small size', () => {
      element.size = 'small';
      const container = element.shadowRoot!.querySelector('.aui-textfield');
      expect(container?.classList.contains('aui-textfield--small')).toBe(true);
    });

    it('applies large size', () => {
      element.size = 'large';
      const container = element.shadowRoot!.querySelector('.aui-textfield');
      expect(container?.classList.contains('aui-textfield--large')).toBe(true);
    });
  });

  describe('Required Field', () => {
    it('shows required indicator when required', () => {
      element.label = 'Email';
      element.required = true;
      
      const requiredIndicator = element.shadowRoot!.querySelector('.aui-textfield__required');
      expect(requiredIndicator).toBeTruthy();
      expect(requiredIndicator?.textContent).toBe('*');
    });

    it('does not show required indicator when not required', () => {
      element.label = 'Email';
      element.required = false;
      
      const requiredIndicator = element.shadowRoot!.querySelector('.aui-textfield__required');
      expect(requiredIndicator).toBeNull();
    });

    it('sets required attribute on input', () => {
      element.required = true;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.hasAttribute('required')).toBe(true);
    });
  });

  describe('Readonly State', () => {
    it('applies readonly attribute', () => {
      element.readonly = true;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.hasAttribute('readonly')).toBe(true);
    });

    it('removes readonly attribute', () => {
      element.readonly = true;
      element.readonly = false;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.hasAttribute('readonly')).toBe(false);
    });
  });

  describe('Length Validation', () => {
    it('sets maxlength attribute', () => {
      element.maxlength = 10;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.getAttribute('maxlength')).toBe('10');
    });

    it('sets minlength attribute', () => {
      element.minlength = 3;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.getAttribute('minlength')).toBe('3');
    });

    it('removes maxlength when set to null', () => {
      element.maxlength = 10;
      element.maxlength = null;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.hasAttribute('maxlength')).toBe(false);
    });
  });

  describe('Prefix and Suffix Slots', () => {
    it('renders prefix slot', () => {
      const prefixSlot = element.shadowRoot!.querySelector('slot[name="prefix"]');
      expect(prefixSlot).toBeTruthy();
    });

    it('renders suffix slot', () => {
      const suffixSlot = element.shadowRoot!.querySelector('slot[name="suffix"]');
      expect(suffixSlot).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('sets aria-invalid when error is true', () => {
      element.error = true;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('sets aria-required when required is true', () => {
      element.required = true;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.getAttribute('aria-required')).toBe('true');
    });

    it('sets aria-readonly when readonly is true', () => {
      element.readonly = true;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.getAttribute('aria-readonly')).toBe('true');
    });

    it('sets aria-describedby when helper text is present', () => {
      element.helperText = 'Please enter your email';
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.getAttribute('aria-describedby')).toBe('helper-text');
    });

    it('does not set aria-describedby when helper text is absent', () => {
      element.helperText = '';
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.hasAttribute('aria-describedby')).toBe(false);
    });
  });
});

