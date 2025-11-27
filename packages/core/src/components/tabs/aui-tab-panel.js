import { AuiElement } from '../../base/aui-element';
import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
  }
  
  :host([hidden]) {
    display: none;
  }
`;
/**
 * AuiTabPanel - A panel for tab content
 *
 * @element aui-tab-panel
 *
 * @attr {string} value - The value corresponding to the tab
 *
 * @slot - Default slot for panel content
 */
export class AuiTabPanel extends AuiElement {
    static get observedAttributes() {
        return ['value'];
    }
    constructor() {
        super();
        // Ensure it has the correct slot
        this.setAttribute('slot', 'panel');
    }
    get value() {
        return this.getAttribute('value') || '';
    }
    set value(val) {
        this.setAttribute('value', val);
    }
    render() {
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <slot></slot>
    `;
        this.setAttribute('role', 'tabpanel');
    }
}
if (!customElements.get('aui-tab-panel')) {
    customElements.define('aui-tab-panel', AuiTabPanel);
}
//# sourceMappingURL=aui-tab-panel.js.map