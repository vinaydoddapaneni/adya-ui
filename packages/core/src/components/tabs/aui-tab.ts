import { AuiElement } from '../../base/aui-element';
import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--aui-spacing-sm) var(--aui-spacing-lg);
    cursor: pointer;
    font-family: var(--aui-font-family);
    font-size: var(--aui-font-size-md);
    font-weight: var(--aui-font-weight-medium);
    color: var(--aui-text-secondary);
    transition: color var(--aui-transition-fast), background-color var(--aui-transition-fast);
    white-space: nowrap;
    user-select: none;
    outline: none;
  }

  :host(:hover) {
    color: var(--aui-text-primary);
    background-color: var(--aui-action-hover);
  }

  :host([selected]) {
    color: var(--aui-primary-main);
  }

  :host([disabled]) {
    color: var(--aui-text-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }

  :host(:focus-visible) {
    background-color: var(--aui-action-focus);
  }
`;

/**
 * AuiTab - A single tab component
 * 
 * @element aui-tab
 * 
 * @attr {string} value - The value of the tab
 * @attr {boolean} disabled - Whether the tab is disabled
 * @attr {boolean} selected - Whether the tab is selected
 * 
 * @slot - Default slot for tab label
 */
export class AuiTab extends AuiElement {
  static get observedAttributes() {
    return ['value', 'disabled', 'selected'];
  }

  constructor() {
    super();
    // Ensure it has the correct slot
    this.setAttribute('slot', 'tab');
  }

  get value(): string {
    return this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(val: boolean) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get selected(): boolean {
    return this.hasAttribute('selected');
  }

  set selected(val: boolean) {
    if (val) {
      this.setAttribute('selected', '');
    } else {
      this.removeAttribute('selected');
    }
  }

  protected render() {
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <slot></slot>
    `;
    
    this.setAttribute('role', 'tab');
  }
}

if (!customElements.get('aui-tab')) {
  customElements.define('aui-tab', AuiTab);
}
