import { AuiElement } from '../../base/aui-element';
import { styles } from './aui-divider.styles';
export class AuiDivider extends AuiElement {
    static get observedAttributes() {
        return ['orientation', 'variant', 'text-align'];
    }
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
        this.render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        this.render();
    }
    render() {
        const orientation = this.getAttribute('orientation') || 'horizontal';
        const hasContent = this.textContent?.trim();
        this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-divider">
        ${orientation === 'horizontal' && hasContent ? `
          <span class="divider-line"></span>
          <span class="divider-content">
            <slot></slot>
          </span>
          <span class="divider-line"></span>
        ` : `
          <span class="divider-line"></span>
        `}
      </div>
    `;
    }
}
customElements.define('aui-divider', AuiDivider);
//# sourceMappingURL=aui-divider.js.map