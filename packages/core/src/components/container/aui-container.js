import { AuiElement } from '../../base/aui-element';
import { styles } from './aui-container.styles';
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
    get maxWidth() {
        return this.getAttribute('max-width') || 'lg';
    }
    set maxWidth(value) {
        this.setAttribute('max-width', value);
    }
    render() {
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
//# sourceMappingURL=aui-container.js.map