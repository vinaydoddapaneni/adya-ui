import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiMenu } from './aui-menu';
import { AuiMenuItem } from './aui-menu-item';

// Register elements
if (!customElements.get('aui-menu')) customElements.define('aui-menu', AuiMenu);
if (!customElements.get('aui-menu-item')) customElements.define('aui-menu-item', AuiMenuItem);

describe('AuiMenu', () => {
  let menu: AuiMenu;
  let trigger: HTMLButtonElement;
  let item1: AuiMenuItem;
  let item2: AuiMenuItem;

  beforeEach(() => {
    menu = new AuiMenu();
    trigger = document.createElement('button');
    trigger.textContent = 'Open Menu';
    trigger.slot = 'trigger';
    
    item1 = new AuiMenuItem();
    item1.textContent = 'Item 1';
    item1.value = '1';
    
    item2 = new AuiMenuItem();
    item2.textContent = 'Item 2';
    item2.value = '2';

    menu.appendChild(trigger);
    menu.appendChild(item1);
    menu.appendChild(item2);

    document.body.appendChild(menu);
  });

  afterEach(() => {
    document.body.removeChild(menu);
  });

  it('renders with default attributes', () => {
    expect(menu.open).toBe(false);
    expect(menu.placement).toBe('bottom-start');
  });

  it('opens when trigger is clicked', () => {
    trigger.click();
    expect(menu.open).toBe(true);
  });

  it('closes when clicking outside', () => {
    menu.open = true;
    document.body.click();
    expect(menu.open).toBe(false);
  });

  it('closes when clicking an item', () => {
    menu.open = true;
    item1.click();
    expect(menu.open).toBe(false);
  });

  it('closes on Escape key', () => {
    menu.open = true;
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(menu.open).toBe(false);
  });

  it('emits open/close events', () => {
    const openSpy = vi.fn();
    const closeSpy = vi.fn();

    menu.addEventListener('open', openSpy);
    menu.addEventListener('close', closeSpy);

    menu.open = true;
    expect(openSpy).toHaveBeenCalled();

    menu.open = false;
    expect(closeSpy).toHaveBeenCalled();
  });
});
