import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiIcon } from './aui-icon';

if (!customElements.get('aui-icon')) {
  customElements.define('aui-icon', AuiIcon);
}

describe('AuiIcon', () => {
  let element: AuiIcon;

  beforeEach(() => {
    element = new AuiIcon();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders with default attributes', () => {
    expect(element.size).toBe('medium');
  });

  it('reflects attribute changes', () => {
    element.size = 'large';
    expect(element.getAttribute('size')).toBe('large');

    element.label = 'Test Icon';
    expect(element.getAttribute('label')).toBe('Test Icon');
  });

  it('sets aria attributes correctly', () => {
    element.label = 'Settings';
    // Re-render to update attributes
    element['render'](); 
    
    expect(element.getAttribute('aria-label')).toBe('Settings');
    expect(element.getAttribute('role')).toBe('img');
  });

  it('hides from accessibility tree when no label is provided', () => {
    element.removeAttribute('label');
    element['render']();
    
    expect(element.getAttribute('aria-hidden')).toBe('true');
  });
});
