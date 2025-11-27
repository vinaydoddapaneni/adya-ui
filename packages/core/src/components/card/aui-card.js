import { AuiElement } from '../../base/aui-element';
import { styles } from './aui-card.styles';
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
    get variant() {
        return this.getAttribute('variant') || 'elevated';
    }
    set variant(value) {
        this.setAttribute('variant', value);
    }
    get padding() {
        return this.getAttribute('padding') || 'md';
    }
    set padding(value) {
        this.setAttribute('padding', value);
    }
    render() {
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
//# sourceMappingURL=aui-card.js.map