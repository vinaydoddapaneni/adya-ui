import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiTab } from './aui-tab';
import { AuiTabPanel } from './aui-tab-panel';
import { AuiTabs } from './aui-tabs';

// Register elements
if (!customElements.get('aui-tabs')) customElements.define('aui-tabs', AuiTabs);
if (!customElements.get('aui-tab')) customElements.define('aui-tab', AuiTab);
if (!customElements.get('aui-tab-panel')) customElements.define('aui-tab-panel', AuiTabPanel);

describe('AuiTabs', () => {
  let tabs: AuiTabs;
  let tab1: AuiTab;
  let tab2: AuiTab;
  let panel1: AuiTabPanel;
  let panel2: AuiTabPanel;

  beforeEach(async () => {
    tabs = new AuiTabs();
    tab1 = new AuiTab();
    tab2 = new AuiTab();
    panel1 = new AuiTabPanel();
    panel2 = new AuiTabPanel();

    tab1.value = 'tab1';
    tab1.textContent = 'Tab 1';
    tab2.value = 'tab2';
    tab2.textContent = 'Tab 2';

    panel1.value = 'tab1';
    panel1.textContent = 'Panel 1';
    panel2.value = 'tab2';
    panel2.textContent = 'Panel 2';

    tabs.appendChild(tab1);
    tabs.appendChild(tab2);
    tabs.appendChild(panel1);
    tabs.appendChild(panel2);

    document.body.appendChild(tabs);
    
    // Wait for initial render and updates
    await new Promise(resolve => requestAnimationFrame(resolve));
  });

  afterEach(() => {
    document.body.removeChild(tabs);
  });

  it('renders with default attributes', () => {
    expect(tabs.variant).toBe('standard');
    expect(tabs.orientation).toBe('horizontal');
  });

  it('selects tab based on value', async () => {
    tabs.value = 'tab1';
    
    // Wait for mutation observer/updates
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(tab1.hasAttribute('selected')).toBe(true);
    expect(tab2.hasAttribute('selected')).toBe(false);
    expect(panel1.hidden).toBe(false);
    expect(panel2.hidden).toBe(true);
  });

  it('switches tab on click', async () => {
    tabs.value = 'tab1';
    await new Promise(resolve => setTimeout(resolve, 0));

    const changeSpy = vi.fn();
    tabs.addEventListener('change', changeSpy);

    tab2.click();
    
    expect(tabs.value).toBe('tab2');
    expect(changeSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: { value: 'tab2' }
    }));
  });

  it('does not switch to disabled tab', async () => {
    tabs.value = 'tab1';
    tab2.disabled = true;
    await new Promise(resolve => setTimeout(resolve, 0));

    tab2.click();
    
    expect(tabs.value).toBe('tab1');
  });

  it('updates aria attributes', async () => {
    tabs.value = 'tab1';
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(tab1.getAttribute('aria-selected')).toBe('true');
    expect(tab2.getAttribute('aria-selected')).toBe('false');
  });
});
