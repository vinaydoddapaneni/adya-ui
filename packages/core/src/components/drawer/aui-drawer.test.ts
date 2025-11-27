import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiDrawer } from './aui-drawer';

if (!customElements.get('aui-drawer')) {
  customElements.define('aui-drawer', AuiDrawer);
}

describe('AuiDrawer', () => {
  let element: AuiDrawer;

  beforeEach(() => {
    element = new AuiDrawer();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.placement).toBe('start');
    expect(element.open).toBe(false);
  });

  it('reflects attribute changes', () => {
    element.placement = 'end';
    expect(element.getAttribute('placement')).toBe('end');

    element.open = true;
    expect(element.hasAttribute('open')).toBe(true);

    element.label = 'My Drawer';
    expect(element.getAttribute('label')).toBe('My Drawer');
  });

  it('emits show/hide events', () => {
    const showSpy = vi.fn();
    const hideSpy = vi.fn();

    element.addEventListener('show', showSpy);
    element.addEventListener('hide', hideSpy);

    element.show();
    expect(showSpy).toHaveBeenCalled();

    element.close();
    expect(hideSpy).toHaveBeenCalled();
  });

  it('closes when overlay is clicked', () => {
    element.open = true;
    const overlay = element.shadowRoot!.querySelector('.aui-drawer__overlay') as HTMLElement;
    
    const closeSpy = vi.fn();
    element.addEventListener('close', closeSpy);

    overlay.click();
    
    expect(element.open).toBe(false);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('closes when close button is clicked', () => {
    element.open = true;
    const closeButton = element.shadowRoot!.querySelector('.aui-drawer__close') as HTMLButtonElement;
    
    const closeSpy = vi.fn();
    element.addEventListener('close', closeSpy);

    closeButton.click();
    
    expect(element.open).toBe(false);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('does not render overlay when no-overlay is set', () => {
    element.noOverlay = true;
    element['render']();
    
    const overlay = element.shadowRoot!.querySelector('.aui-drawer__overlay');
    expect(overlay).toBeNull();
  });
});
