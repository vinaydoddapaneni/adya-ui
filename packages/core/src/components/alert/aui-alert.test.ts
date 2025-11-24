import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiAlert } from './aui-alert';

// Register the element if not already registered
if (!customElements.get('aui-alert')) {
  customElements.define('aui-alert', AuiAlert);
}

describe('AuiAlert', () => {
  let element: AuiAlert;

  beforeEach(() => {
    element = document.createElement('aui-alert') as AuiAlert;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.severity).toBe('success');
    expect(element.variant).toBe('standard');
  });

  it('reflects attribute changes to properties', () => {
    element.setAttribute('severity', 'error');
    expect(element.severity).toBe('error');

    element.setAttribute('variant', 'filled');
    expect(element.variant).toBe('filled');
  });

  it('applies correct classes', () => {
    element.severity = 'warning';
    element.variant = 'outlined';
    
    const div = element.shadowRoot!.querySelector('.aui-alert');
    expect(div?.classList.contains('aui-alert--warning')).toBe(true);
    expect(div?.classList.contains('aui-alert--outlined')).toBe(true);
  });
});
