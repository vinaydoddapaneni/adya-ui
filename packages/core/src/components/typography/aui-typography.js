import { AuiElement } from '../../base/aui-element';
import { styles } from './aui-typography.styles';
/**
 * AuiTypography - A component for consistent text styling
 *
 * @element aui-typography
 *
 * @attr {string} variant - Text variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline'
 * @attr {string} color - Text color: 'primary' | 'secondary' | 'text-primary' | 'text-secondary' | 'success' | 'error' | 'warning'
 * @attr {string} align - Text alignment: 'left' | 'center' | 'right'
 *
 * @slot - Default slot for text content
 */
export class AuiTypography extends AuiElement {
    static get observedAttributes() {
        return ['variant', 'color', 'align'];
    }
    get variant() {
        return this.getAttribute('variant') || 'body1';
    }
    set variant(value) {
        this.setAttribute('variant', value);
    }
    get color() {
        return this.getAttribute('color') || 'text-primary';
    }
    set color(value) {
        this.setAttribute('color', value);
    }
    get align() {
        return this.getAttribute('align') || 'left';
    }
    set align(value) {
        this.setAttribute('align', value);
    }
    render() {
        const tag = this.getTagName();
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <${tag}
        class="
          aui-typography 
          aui-typography--${this.variant} 
          aui-typography--${this.color}
          aui-typography--align-${this.align}
        "
      >
        <slot></slot>
      </${tag}>
    `;
    }
    getTagName() {
        const variant = this.variant;
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant)) {
            return variant;
        }
        return 'p';
    }
}
if (!customElements.get('aui-typography')) {
    customElements.define('aui-typography', AuiTypography);
}
//# sourceMappingURL=aui-typography.js.map