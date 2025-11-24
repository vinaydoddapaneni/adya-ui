import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-container.styles';

export type AuiContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * AuiContainer - A component to center content horizontally
 * 
 * @element aui-container
 * 
 * @attr {string} max-width - Max width of the container: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * 
 * @slot - Default slot for content
 */
export class AuiContainer extends AuiElement {
  static get observedAttributes() {
    return ['max-width'];
  }

  get maxWidth(): AuiContainerMaxWidth {
    return (this.getAttribute('max-width') as AuiContainerMaxWidth) || 'lg';
  }

  set maxWidth(value: AuiContainerMaxWidth) {
    this.setAttribute('max-width', value);
  }

  protected render() {
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-container aui-container--${this.maxWidth}">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('aui-container')) {
  customElements.define('aui-container', AuiContainer);
}
