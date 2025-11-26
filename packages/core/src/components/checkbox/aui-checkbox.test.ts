import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiCheckbox } from './aui-checkbox';

// Register the element if not already registered
if (!customElements.get('aui-checkbox')) {
  customElements.define('aui-checkbox', AuiCheckbox);
}

describe('AuiCheckbox', () => {
  let element: AuiCheckbox;

  beforeEach(() => {
    element = new AuiCheckbox();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.checked).toBe(false);
    expect(element.disabled).toBe(false);
    expect(element.indeterminate).toBe(false);
    expect(element.size).toBe('medium');
    expect(element.color).toBe('primary');
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

  describe('Indeterminate State', () => {
    it('sets indeterminate state', () => {
      element.indeterminate = true;
      expect(element.hasAttribute('indeterminate')).toBe(true);
      expect(element.checked).toBe(false);
    });

    it('clears indeterminate state when checked', () => {
      element.indeterminate = true;
      element.checked = true;
      expect(element.indeterminate).toBe(false);
      expect(element.checked).toBe(true);
    });

    it('clears checked state when indeterminate', () => {
      element.checked = true;
      element.indeterminate = true;
      expect(element.checked).toBe(false);
      expect(element.indeterminate).toBe(true);
    });

    it('becomes checked when clicked while indeterminate', () => {
      element.indeterminate = true;
      const input = element.shadowRoot!.querySelector('input')!;
      
      // Simulate click/change
      input.click();
      
      expect(element.indeterminate).toBe(false);
      expect(element.checked).toBe(true);
    });
  });

  describe('Sizes', () => {
    it('applies medium size by default', () => {
      const label = element.shadowRoot!.querySelector('.aui-checkbox');
      expect(label?.classList.contains('aui-checkbox--medium')).toBe(true);
    });

    it('applies small size', () => {
      element.size = 'small';
      const label = element.shadowRoot!.querySelector('.aui-checkbox');
      expect(label?.classList.contains('aui-checkbox--small')).toBe(true);
    });

    it('applies large size', () => {
      element.size = 'large';
      const label = element.shadowRoot!.querySelector('.aui-checkbox');
      expect(label?.classList.contains('aui-checkbox--large')).toBe(true);
    });
  });

  describe('Colors', () => {
    it('applies primary color by default', () => {
      const label = element.shadowRoot!.querySelector('.aui-checkbox');
      expect(label?.classList.contains('aui-checkbox--primary')).toBe(true);
    });

    it('applies secondary color', () => {
      element.color = 'secondary';
      const label = element.shadowRoot!.querySelector('.aui-checkbox');
      expect(label?.classList.contains('aui-checkbox--secondary')).toBe(true);
    });

    it('applies success color', () => {
      element.color = 'success';
      const label = element.shadowRoot!.querySelector('.aui-checkbox');
      expect(label?.classList.contains('aui-checkbox--success')).toBe(true);
    });

    it('applies error color', () => {
      element.color = 'error';
      const label = element.shadowRoot!.querySelector('.aui-checkbox');
      expect(label?.classList.contains('aui-checkbox--error')).toBe(true);
    });
  });

  describe('Required Attribute', () => {
    it('sets required attribute on input', () => {
      element.required = true;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.hasAttribute('required')).toBe(true);
    });
  });

  describe('Keyboard Navigation', () => {
    it('toggles checked state on Space key', () => {
      const input = element.shadowRoot!.querySelector('input')!;
      const clickSpy = vi.spyOn(input, 'click');
      
      element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      
      expect(clickSpy).toHaveBeenCalled();
    });

    it('does not toggle when disabled', () => {
      element.disabled = true;
      const input = element.shadowRoot!.querySelector('input')!;
      const clickSpy = vi.spyOn(input, 'click');
      
      element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('sets aria-checked to mixed when indeterminate', () => {
      element.indeterminate = true;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.getAttribute('aria-checked')).toBe('mixed');
    });

    it('sets aria-checked to true when checked', () => {
      element.checked = true;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.getAttribute('aria-checked')).toBe('true');
    });

    it('sets aria-required when required', () => {
      element.required = true;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.getAttribute('aria-required')).toBe('true');
    });

    it('sets aria-disabled when disabled', () => {
      element.disabled = true;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.getAttribute('aria-disabled')).toBe('true');
    });
  });
});
