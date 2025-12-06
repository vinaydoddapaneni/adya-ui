import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-menu.styles';
/**
 * AuiMenu - A dropdown menu component
 *
 * @element aui-menu
 *
 * @attr {boolean} open - Whether the menu is open
 * @attr {string} placement - Menu placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
 *
 * @slot trigger - Slot for the menu trigger element
 * @slot - Default slot for menu items
 *
 * @fires open - Emitted when the menu is opened
 * @fires close - Emitted when the menu is closed
 */
export class AuiMenu extends AuiElement {
    static get observedAttributes() {
        return ['open', 'placement'];
    }
    constructor() {
        super();
        this.handleDocumentClick = (e) => {
            const target = e.target;
            // If clicked inside the menu, don't close immediately unless it's an item action
            // But usually menus close on item click.
            // If clicked on trigger, toggle.
            // If clicked outside, close.
            if (this.contains(target)) {
                // Clicked inside component
                const triggerSlot = this._shadowRoot.querySelector('slot[name="trigger"]');
                const triggerElements = triggerSlot.assignedElements({ flatten: true });
                const isTrigger = triggerElements.some(el => el.contains(target));
                if (isTrigger) {
                    this.open = !this.open;
                    return;
                }
                // If clicked on a menu item, close
                if (target.tagName.toLowerCase() === 'aui-menu-item') {
                    this.open = false;
                }
            }
            else {
                // Clicked outside
                if (this.open) {
                    this.open = false;
                }
            }
        };
        this.handleDocumentKeydown = (e) => {
            if (!this.open)
                return;
            if (e.key === 'Escape') {
                this.open = false;
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this.handleDocumentClick);
        document.addEventListener('keydown', this.handleDocumentKeydown);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this.handleDocumentClick);
        document.removeEventListener('keydown', this.handleDocumentKeydown);
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
        return this.getAttribute('placement') || 'bottom-start';
    }
    set placement(value) {
        this.setAttribute('placement', value);
    }
    attributeChangedCallback(name, oldVal, newVal) {
        super.attributeChangedCallback(name, oldVal, newVal);
        if (name === 'open') {
            if (this.open) {
                this.emit('open');
            }
            else {
                this.emit('close');
            }
        }
    }
    render() {
        const openClass = this.open ? 'aui-menu--open' : '';
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-menu ${openClass}">
        <div class="aui-menu__trigger">
          <slot name="trigger"></slot>
        </div>
        <div class="aui-menu__content" role="menu">
          <slot></slot>
        </div>
      </div>
    `;
    }
}
if (!customElements.get('aui-menu')) {
    customElements.define('aui-menu', AuiMenu);
}
//# sourceMappingURL=aui-menu.js.map