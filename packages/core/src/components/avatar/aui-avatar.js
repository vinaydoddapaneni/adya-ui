import { AuiElement } from '../../base/aui-element';
import { styles } from './aui-avatar.styles';
export class AuiAvatar extends AuiElement {
    static get observedAttributes() {
        return ['src', 'alt', 'size', 'variant', 'initials'];
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
        const src = this.getAttribute('src');
        const alt = this.getAttribute('alt') || 'Avatar';
        const size = this.getAttribute('size') || 'medium';
        const variant = this.getAttribute('variant') || 'circular';
        const initials = this.getAttribute('initials') || '';
        let content = '';
        if (src) {
            content = `<img src="${src}" alt="${alt}" class="avatar-image" />`;
        }
        else if (initials) {
            content = `<span class="avatar-initials">${initials}</span>`;
        }
        else {
            // Default icon/placeholder
            content = `<span class="avatar-placeholder">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </span>`;
        }
        this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-avatar size-${size} variant-${variant}">
        ${content}
      </div>
    `;
    }
}
customElements.define('aui-avatar', AuiAvatar);
//# sourceMappingURL=aui-avatar.js.map