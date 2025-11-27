import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiList } from './aui-list';
import { AuiListItem } from './aui-list-item';

// Register the elements if not already registered
if (!customElements.get('aui-list')) {
  customElements.define('aui-list', AuiList);
}
if (!customElements.get('aui-list-item')) {
  customElements.define('aui-list-item', AuiListItem);
}

describe('aui-list', () => {
  let list: AuiList;
  let item: AuiListItem;

  beforeEach(() => {
    list = document.createElement('aui-list') as AuiList;
    item = document.createElement('aui-list-item') as AuiListItem;
    document.body.appendChild(list);
    list.appendChild(item);
  });

  afterEach(() => {
    document.body.removeChild(list);
  });

  it('should render', () => {
    expect(list).toBeDefined();
    expect(item).toBeDefined();
  });

  it('should have correct roles', () => {
    expect(list.shadowRoot?.querySelector('.aui-list')?.getAttribute('role')).toBe('list');
    expect(item.shadowRoot?.querySelector('.aui-list-item')?.getAttribute('role')).toBe('listitem');
  });

  it('should handle disabled state on item', () => {
    item.disabled = true;
    expect(item.hasAttribute('disabled')).toBe(true);
    expect(item.shadowRoot?.querySelector('.aui-list-item')?.getAttribute('tabindex')).toBe('-1');
  });

  it('should handle selected state on item', () => {
    item.selected = true;
    expect(item.hasAttribute('selected')).toBe(true);
  });

  it('should handle href attribute on item', () => {
    item.href = 'https://example.com';
    const link = item.shadowRoot?.querySelector('a');
    expect(link).toBeDefined();
    expect(link?.getAttribute('href')).toBe('https://example.com');
  });
});
