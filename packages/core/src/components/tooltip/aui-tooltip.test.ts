import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiTooltip } from './aui-tooltip';

// Register the element if not already registered
if (!customElements.get('aui-tooltip')) {
  customElements.define('aui-tooltip', AuiTooltip);
}

describe('AuiTooltip', () => {
  let element: AuiTooltip;
  let button: HTMLButtonElement;

  beforeEach(() => {
    element = new AuiTooltip();
    button = document.createElement('button');
    button.textContent = 'Hover me';
    element.appendChild(button);
    element.content = 'Tooltip text';
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.placement).toBe('top');
    expect(element.open).toBe(false);
  });

  it('shows tooltip on hover', () => {
    const trigger = element.shadowRoot!.querySelector('.aui-tooltip__trigger') as HTMLElement;
    const tooltip = element.shadowRoot!.querySelector('.aui-tooltip');
    
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    expect(tooltip?.classList.contains('aui-tooltip--open')).toBe(true);
    
    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    expect(tooltip?.classList.contains('aui-tooltip--open')).toBe(false);
  });

  it('shows tooltip on focus', () => {
    const trigger = element.shadowRoot!.querySelector('.aui-tooltip__trigger') as HTMLElement;
    const tooltip = element.shadowRoot!.querySelector('.aui-tooltip');
    
    trigger.dispatchEvent(new FocusEvent('focusin'));
    expect(tooltip?.classList.contains('aui-tooltip--open')).toBe(true);
    
    trigger.dispatchEvent(new FocusEvent('focusout'));
    expect(tooltip?.classList.contains('aui-tooltip--open')).toBe(false);
  });

  it('respects open attribute', () => {
    element.open = true;
    let tooltip = element.shadowRoot!.querySelector('.aui-tooltip');
    expect(tooltip?.classList.contains('aui-tooltip--open')).toBe(true);
    
    element.open = false;
    // Get fresh reference after re-render
    tooltip = element.shadowRoot!.querySelector('.aui-tooltip');
    expect(tooltip?.classList.contains('aui-tooltip--open')).toBe(false);
  });

  it('does not show when disabled', () => {
    element.disabled = true;
    const trigger = element.shadowRoot!.querySelector('.aui-tooltip__trigger') as HTMLElement;
    const tooltip = element.shadowRoot!.querySelector('.aui-tooltip');
    
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    expect(tooltip?.classList.contains('aui-tooltip--open')).toBe(false);
  });
});
