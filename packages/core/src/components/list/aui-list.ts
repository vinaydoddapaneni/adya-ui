import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-list.styles';

/**
 * AuiList - A container for list items
 * 
 * @element aui-list
 * 
 * @slot - Default slot for list items
 */
export class AuiList extends AuiElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  protected render() {
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-list" role="list">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('aui-list')) {
  customElements.define('aui-list', AuiList);
}
