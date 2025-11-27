import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-tabs.styles';

export type AuiTabsVariant = 'standard' | 'contained';
export type AuiTabsOrientation = 'horizontal' | 'vertical';

/**
 * AuiTabs - A component for switching between different views
 * 
 * @element aui-tabs
 * 
 * @attr {string} value - The value of the currently selected tab
 * @attr {string} variant - Tabs variant: 'standard' | 'contained'
 * @attr {string} orientation - Tabs orientation: 'horizontal' | 'vertical'
 * 
 * @slot - Default slot for tabs and panels
 * 
 * @fires change - Emitted when the selected tab changes
 */
export class AuiTabs extends AuiElement {
  static get observedAttributes() {
    return ['value', 'variant', 'orientation'];
  }

  private indicator: HTMLElement | null = null;
  private nav: HTMLElement | null = null;
  private mutationObserver: MutationObserver | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupMutationObserver();
    // Wait for children to be ready
    requestAnimationFrame(() => {
      this.updateSelection();
      this.updateIndicator();
    });
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    window.removeEventListener('resize', this.handleResize);
  }

  get value(): string {
    return this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
  }

  get variant(): AuiTabsVariant {
    return (this.getAttribute('variant') as AuiTabsVariant) || 'standard';
  }

  set variant(val: AuiTabsVariant) {
    this.setAttribute('variant', val);
  }

  get orientation(): AuiTabsOrientation {
    return (this.getAttribute('orientation') as AuiTabsOrientation) || 'horizontal';
  }

  set orientation(val: AuiTabsOrientation) {
    this.setAttribute('orientation', val);
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'value' && oldVal !== newVal) {
      this.updateSelection();
      this.updateIndicator();
      this.emit('change', { value: newVal });
    }
  }

  private setupMutationObserver() {
    this.mutationObserver = new MutationObserver(() => {
      this.updateSelection();
      this.updateIndicator();
    });
    this.mutationObserver.observe(this, { childList: true, subtree: true });
  }

  private handleResize = () => {
    this.updateIndicator();
  };

  private getAllTabs() {
    return Array.from(this.querySelectorAll('aui-tab'));
  }

  private getAllPanels() {
    return Array.from(this.querySelectorAll('aui-tab-panel'));
  }

  private updateSelection() {
    const tabs = this.getAllTabs();
    const panels = this.getAllPanels();

    tabs.forEach(tab => {
      const tabValue = tab.getAttribute('value');
      const selected = tabValue === this.value;
      
      if (selected) {
        tab.setAttribute('selected', '');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
      } else {
        tab.removeAttribute('selected');
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('tabindex', '-1');
      }
    });

    panels.forEach(panel => {
      const panelValue = panel.getAttribute('value');
      if (panelValue === this.value) {
        (panel as HTMLElement).hidden = false;
      } else {
        (panel as HTMLElement).hidden = true;
      }
    });
  }

  private updateIndicator() {
    if (!this.indicator || !this.nav) return;

    const tabs = this.getAllTabs();
    const selectedTab = tabs.find(tab => tab.getAttribute('value') === this.value) as HTMLElement;

    if (selectedTab) {
      // We need to calculate position relative to the nav container
      // Since tabs are slotted, we might need to get their offset relative to the host
      // But wait, the tabs are in the light DOM, slotted into the nav?
      // No, usually tabs structure is:
      // <aui-tabs>
      //   <aui-tab>...</aui-tab>
      //   <aui-tab-panel>...</aui-tab-panel>
      // </aui-tabs>
      // So we need to project them into the right places.
      
      // Actually, for the indicator to work, we need to know the geometry of the selected tab.
      // Since the tabs are children of the custom element, we can measure them directly.
      
      // However, if we use shadow DOM slots, the visual layout happens inside shadow DOM.
      // Let's look at the render method.
      
      // If we put all tabs in one slot and panels in another, we can control layout.
      // But we can't easily separate them if they are mixed in light DOM.
      // We'll assume the user groups them or we filter them.
      
      // For simplicity in this implementation, let's assume the indicator is part of the shadow DOM
      // and tries to match the position of the assigned node in the slot.
      
      // Since `aui-tab` is a custom element, we can ask it for its dimensions.
      
      const tabRect = selectedTab.getBoundingClientRect();
      const navRect = this.nav.getBoundingClientRect();
      
      if (this.orientation === 'vertical') {
        const top = tabRect.top - navRect.top;
        const height = tabRect.height;
        this.indicator.style.transform = `translateY(${top}px)`;
        this.indicator.style.height = `${height}px`;
      } else {
        const left = tabRect.left - navRect.left;
        const width = tabRect.width;
        this.indicator.style.transform = `translateX(${left}px)`;
        this.indicator.style.width = `${width}px`;
      }
    }
  }

  private handleTabClick(e: Event) {
    const target = e.target as HTMLElement;
    const tab = target.closest('aui-tab');
    if (tab) {
      const value = tab.getAttribute('value');
      if (value && !tab.hasAttribute('disabled')) {
        this.value = value;
      }
    }
  }

  protected render() {
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-tabs">
        <div class="aui-tabs__nav" role="tablist">
          <slot name="tab"></slot>
          <div class="aui-tabs__indicator"></div>
        </div>
        <div class="aui-tabs__panels">
          <slot name="panel"></slot>
        </div>
      </div>
    `;

    this.nav = this._shadowRoot.querySelector('.aui-tabs__nav');
    this.indicator = this._shadowRoot.querySelector('.aui-tabs__indicator');

    // We need to listen to clicks on the slot
    const tabSlot = this._shadowRoot.querySelector('slot[name="tab"]');
    if (tabSlot) {
      tabSlot.addEventListener('click', (e) => this.handleTabClick(e));
      // Also listen for slot changes to update indicator
      tabSlot.addEventListener('slotchange', () => {
        this.updateSelection();
        this.updateIndicator();
      });
    }
  }
}

if (!customElements.get('aui-tabs')) {
  customElements.define('aui-tabs', AuiTabs);
}
