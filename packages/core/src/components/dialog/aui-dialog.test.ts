import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiDialog } from './aui-dialog';

// Register the element if not already registered
if (!customElements.get('aui-dialog')) {
  customElements.define('aui-dialog', AuiDialog);
}

describe('AuiDialog', () => {
  let element: AuiDialog;

  beforeEach(() => {
    element = document.createElement('aui-dialog') as AuiDialog;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.open).toBe(false);
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('open', '');
    expect(element.open).toBe(true);

    element.setAttribute('headline', 'Confirm Action');
    expect(element.headline).toBe('Confirm Action');
  });

  it('emits close event when close method is called', () => {
    const closeSpy = vi.fn();
    element.addEventListener('close', closeSpy);

    element.open = true;
    element.close();

    expect(closeSpy).toHaveBeenCalled();
    expect(element.open).toBe(false);
  });
});
