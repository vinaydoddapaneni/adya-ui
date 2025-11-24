import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-card.styles';

export type AuiCardVariant = 'elevated' | 'outlined';
export type AuiCardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * AuiCard - A versatile surface for content
 * 
 * @element aui-card
 * 
 * @attr {string} variant - Card variant: 'elevated' | 'outlined'
 * @attr {string} padding - Content padding: 'none' | 'sm' | 'md' | 'lg'
 * 
 * @slot - Default slot for content
 */
export class AuiCard extends AuiElement {
  static get observedAttributes() {
    return ['variant', 'padding'];
  }

  get variant(): AuiCardVariant {
    return (this.getAttribute('variant') as AuiCardVariant) || 'elevated';
  }

  set variant(value: AuiCardVariant) {
    this.setAttribute('variant', value);
  }

  get padding(): AuiCardPadding {
    return (this.getAttribute('padding') as AuiCardPadding) || 'md';
  }

  set padding(value: AuiCardPadding) {
    this.setAttribute('padding', value);
  }

  protected render() {
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-card aui-card--${this.variant} aui-card--padding-${this.padding}">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('aui-card')) {
  customElements.define('aui-card', AuiCard);
}
