import { AuiElement } from '../../base/aui-element';
import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: block;
  }

  .aui-menu-item {
    display: flex;
    align-items: center;
    padding: var(--aui-spacing-sm) var(--aui-spacing-md);
    cursor: pointer;
    font-size: var(--aui-font-size-md);
    color: var(--aui-text-primary);
    transition: background-color var(--aui-transition-fast);
    text-decoration: none;
    user-select: none;
  }

  .aui-menu-item:hover,
  .aui-menu-item:focus {
    background-color: var(--aui-action-hover);
    outline: none;
  }

  :host([disabled]) .aui-menu-item {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([selected]) .aui-menu-item {
    background-color: var(--aui-action-selected);
    color: var(--aui-primary-main);
  }

  .aui-menu-item__icon {
    margin-right: var(--aui-spacing-sm);
    display: flex;
    align-items: center;
  }
`;

/**
 * AuiMenuItem - A single item in a menu
 * 
 * @element aui-menu-item
 * 
 * @attr {string} value - The value of the item
 * @attr {boolean} disabled - Whether the item is disabled
 * @attr {boolean} selected - Whether the item is selected
 * 
 * @slot - Default slot for item label
 * @slot icon - Slot for item icon
 */
export class AuiMenuItem extends AuiElement {
  static get observedAttributes() {
    return ['value', 'disabled', 'selected'];
  }

  constructor() {
    super();
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
      <div class="aui-menu-item" role="menuitem" tabindex="-1">
        <div class="aui-menu-item__icon">
          <slot name="icon"></slot>
        </div>
        <slot></slot>
      </div>
    `;
    
    this.setAttribute('role', 'none');
  }
}

if (!customElements.get('aui-menu-item')) {
  customElements.define('aui-menu-item', AuiMenuItem);
}
