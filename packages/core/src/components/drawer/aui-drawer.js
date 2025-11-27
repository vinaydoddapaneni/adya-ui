import { AuiElement } from '../../base/aui-element';
import { styles } from './aui-drawer.styles';
/**
 * AuiDrawer - A navigation component that slides in from the side
 *
 * @element aui-drawer
 *
 * @attr {boolean} open - Whether the drawer is open
 * @attr {string} placement - Drawer placement: 'start' | 'end' | 'top' | 'bottom'
 * @attr {string} label - The accessible label for the drawer
 * @attr {boolean} no-overlay - Whether to hide the overlay
 *
 * @slot - Default slot for content (body)
 * @slot header - Slot for header content
 * @slot footer - Slot for footer content
 * @slot label - Slot for title/label
 *
 * @fires close - Emitted when the drawer is closed
 * @fires show - Emitted when the drawer is shown
 * @fires hide - Emitted when the drawer is hidden
 */
export class AuiDrawer extends AuiElement {
    static get observedAttributes() {
        return ['open', 'placement', 'label', 'no-overlay'];
    }
    constructor() {
        super();
    }
    get open() {
        return this.hasAttribute('open');
    }
    set open(value) {
        if (value) {
            this.setAttribute('open', '');
        }
        else {
            this.removeAttribute('open');
        }
    }
    get placement() {
        return this.getAttribute('placement') || 'start';
    }
    set placement(value) {
        this.setAttribute('placement', value);
    }
    get label() {
        return this.getAttribute('label') || '';
    }
    set label(value) {
        this.setAttribute('label', value);
    }
    get noOverlay() {
        return this.hasAttribute('no-overlay');
    }
    set noOverlay(value) {
        if (value) {
            this.setAttribute('no-overlay', '');
        }
        else {
            this.removeAttribute('no-overlay');
        }
    }
    attributeChangedCallback(name, oldVal, newVal) {
        super.attributeChangedCallback(name, oldVal, newVal);
        if (name === 'open') {
            if (this.open) {
                this.emit('show');
                this.style.pointerEvents = 'auto';
            }
            else {
                this.emit('hide');
                this.style.pointerEvents = 'none';
            }
        }
    }
    close() {
        this.open = false;
        this.emit('close');
    }
    show() {
        this.open = true;
    }
    handleOverlayClick() {
        this.close();
    }
    render() {
        const placementClass = `aui-drawer--${this.placement}`;
        const openClass = this.open ? 'aui-drawer--open' : '';
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div 
        class="aui-drawer ${placementClass} ${openClass}"
        role="dialog"
        aria-modal="true"
        aria-label="${this.label}"
        aria-hidden="${!this.open}"
      >
        ${!this.noOverlay ? `
          <div 
            class="aui-drawer__overlay" 
            aria-hidden="true"
          ></div>
        ` : ''}
        
        <div class="aui-drawer__panel" tabindex="-1">
          <header class="aui-drawer__header">
            <h2 class="aui-drawer__title">
              <slot name="label">${this.label}</slot>
            </h2>
            <button 
              class="aui-drawer__close" 
              type="button" 
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </header>
          
          <div class="aui-drawer__body">
            <slot></slot>
          </div>
          
          <footer class="aui-drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
        this.setupEventListeners();
    }
    setupEventListeners() {
        const overlay = this._shadowRoot.querySelector('.aui-drawer__overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.handleOverlayClick());
        }
        const closeButton = this._shadowRoot.querySelector('.aui-drawer__close');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.close());
        }
    }
}
if (!customElements.get('aui-drawer')) {
    customElements.define('aui-drawer', AuiDrawer);
}
//# sourceMappingURL=aui-drawer.js.map