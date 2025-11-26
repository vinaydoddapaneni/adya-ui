import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiAlert } from './aui-alert';

// Register the element if not already registered
if (!customElements.get('aui-alert')) {
  customElements.define('aui-alert', AuiAlert);
}

describe('AuiAlert', () => {
  let element: AuiAlert;

  beforeEach(() => {
    element = new AuiAlert();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
    vi.useRealTimers();
  });

  it('renders with default attributes', () => {
    expect(element.severity).toBe('success');
    expect(element.variant).toBe('standard');
    expect(element.open).toBe(true);
    expect(element.dismissible).toBe(false);
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('severity', 'error');
    expect(element.severity).toBe('error');

    element.setAttribute('variant', 'filled');
    expect(element.variant).toBe('filled');

    element.setAttribute('title', 'Error Occurred');
    expect(element.title).toBe('Error Occurred');

    element.setAttribute('open', '');
    expect(element.open).toBe(true);
  });

  it('applies correct classes', () => {
    element.severity = 'warning';
    element.variant = 'outlined';
    
    const div = element.shadowRoot!.querySelector('.aui-alert');
    expect(div?.classList.contains('aui-alert--warning')).toBe(true);
    expect(div?.classList.contains('aui-alert--outlined')).toBe(true);
  });

  describe('Dismissible', () => {
    it('shows close button when dismissible', () => {
      element.dismissible = true;
      const closeButton = element.shadowRoot!.querySelector('.aui-alert__close-button');
      expect(closeButton).toBeTruthy();
    });

    it('does not show close button when not dismissible', () => {
      element.dismissible = false;
      const closeButton = element.shadowRoot!.querySelector('.aui-alert__close-button');
      expect(closeButton).toBeNull();
    });

    it('closes alert when close button is clicked', () => {
      element.dismissible = true;
      const closeButton = element.shadowRoot!.querySelector('.aui-alert__close-button') as HTMLButtonElement;
      
      const closeSpy = vi.fn();
      element.addEventListener('close', closeSpy);
      
      closeButton.click();
      
      expect(element.open).toBe(false);
      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('Auto Dismiss', () => {
    it('automatically closes after duration', () => {
      vi.useFakeTimers();
      element.duration = 3000;
      element.open = true; // Trigger auto-dismiss logic
      
      expect(element.open).toBe(true);
      
      vi.advanceTimersByTime(3000);
      
      expect(element.open).toBe(false);
    });

    it('does not auto dismiss if duration is 0', () => {
      vi.useFakeTimers();
      element.duration = 0;
      element.open = true;
      
      vi.advanceTimersByTime(5000);
      
      expect(element.open).toBe(true);
    });
  });

  describe('Slots', () => {
    it('renders title slot', () => {
      const titleSlot = element.shadowRoot!.querySelector('slot[name="title"]');
      expect(titleSlot).toBeTruthy();
    });

    it('renders action slot', () => {
      const actionSlot = element.shadowRoot!.querySelector('slot[name="action"]');
      expect(actionSlot).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('sets role="alert"', () => {
      const div = element.shadowRoot!.querySelector('.aui-alert');
      expect(div?.getAttribute('role')).toBe('alert');
    });

    it('sets aria-hidden when closed', () => {
      element.open = false;
      const div = element.shadowRoot!.querySelector('.aui-alert');
      expect(div?.getAttribute('aria-hidden')).toBe('true');
    });

    it('sets aria-hidden="false" when open', () => {
      element.open = true;
      const div = element.shadowRoot!.querySelector('.aui-alert');
      expect(div?.getAttribute('aria-hidden')).toBe('false');
    });
  });
});
