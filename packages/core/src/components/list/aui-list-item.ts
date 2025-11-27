import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-list-item.styles';

/**
 * AuiListItem - A single item in a list
 * 
 * @element aui-list-item
 * 
 * @attr {boolean} disabled - Whether the item is disabled
 * @attr {boolean} selected - Whether the item is selected
 * @attr {string} href - URL to navigate to (optional)
 * 
 * @slot - Default slot for item content
 * @slot icon - Slot for item icon (start)
 * @slot secondary - Slot for secondary text
 */
export class AuiListItem extends AuiElement {
  static get observedAttributes() {
    return ['disabled', 'selected', 'href'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
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
    // Only call render if element is connected
    if (this.isConnected) {
      this.render();
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
    // Only call render if element is connected
    if (this.isConnected) {
      this.render();
    }
  }

  get href(): string {
    return this.getAttribute('href') || '';
  }

  set href(val: string) {
    this.setAttribute('href', val);
    // Only call render if element is connected
    if (this.isConnected) {
      this.render();
    }
  }

  private handleClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (this.href) {
      // Allow default link behavior or handle navigation
    }
  };

  protected render() {
    const tag = this.href ? 'a' : 'div';
    const hrefAttr = this.href ? `href="${this.href}"` : '';
    
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <${tag} class="aui-list-item" ${hrefAttr} role="listitem" tabindex="${this.disabled ? -1 : 0}">
        <div class="aui-list-item__icon">
          <slot name="icon"></slot>
        </div>
        <div class="aui-list-item__content">
          <slot></slot>
          <div class="aui-list-item__secondary">
            <slot name="secondary"></slot>
          </div>
        </div>
      </${tag}>
    `;
  }
}

if (!customElements.get('aui-list-item')) {
  customElements.define('aui-list-item', AuiListItem);
}
