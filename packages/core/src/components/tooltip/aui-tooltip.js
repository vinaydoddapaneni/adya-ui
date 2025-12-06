import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-tooltip.styles';
/**
 * AuiTooltip - A component that displays informative text when hovering over an element
 *
 * @element aui-tooltip
 *
 * @attr {string} content - The tooltip content
 * @attr {string} placement - Tooltip placement: 'top' | 'bottom' | 'left' | 'right'
 * @attr {boolean} open - Whether the tooltip is manually open
 * @attr {boolean} disabled - Whether the tooltip is disabled
 *
 * @slot - Default slot for the trigger element
 */
export class AuiTooltip extends AuiElement {
    static get observedAttributes() {
        return ['content', 'placement', 'open', 'disabled'];
    }
    constructor() {
        super();
        this._hoverOpen = false;
        this._focusOpen = false;
        this.handleMouseEnter = () => {
            this._hoverOpen = true;
            this.requestUpdate();
        };
        this.handleMouseLeave = () => {
            this._hoverOpen = false;
            this.requestUpdate();
        };
        this.handleFocusIn = () => {
            this._focusOpen = true;
            this.requestUpdate();
        };
        this.handleFocusOut = () => {
            this._focusOpen = false;
            this.requestUpdate();
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.setupEventListeners();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListeners();
    }
    get content() {
        return this.getAttribute('content') || '';
    }
    set content(value) {
        this.setAttribute('content', value);
        this.render();
    }
    get placement() {
        return this.getAttribute('placement') || 'top';
    }
    set placement(value) {
        this.setAttribute('placement', value);
        this.render();
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
        this.requestUpdate();
    }
    get disabled() {
        return this.hasAttribute('disabled');
    }
    set disabled(value) {
        if (value) {
            this.setAttribute('disabled', '');
        }
        else {
            this.removeAttribute('disabled');
        }
        this.requestUpdate();
    }
    get isOpen() {
        return this.open || ((this._hoverOpen || this._focusOpen) && !this.disabled);
    }
    setupEventListeners() {
        const trigger = this.shadowRoot?.querySelector('.aui-tooltip__trigger');
        if (trigger) {
            trigger.addEventListener('mouseenter', this.handleMouseEnter);
            trigger.addEventListener('mouseleave', this.handleMouseLeave);
            trigger.addEventListener('focusin', this.handleFocusIn);
            trigger.addEventListener('focusout', this.handleFocusOut);
        }
    }
    removeEventListeners() {
        const trigger = this.shadowRoot?.querySelector('.aui-tooltip__trigger');
        if (trigger) {
            trigger.removeEventListener('mouseenter', this.handleMouseEnter);
            trigger.removeEventListener('mouseleave', this.handleMouseLeave);
            trigger.removeEventListener('focusin', this.handleFocusIn);
            trigger.removeEventListener('focusout', this.handleFocusOut);
        }
    }
    requestUpdate() {
        const tooltip = this.shadowRoot?.querySelector('.aui-tooltip');
        if (tooltip) {
            if (this.isOpen) {
                tooltip.classList.add('aui-tooltip--open');
            }
            else {
                tooltip.classList.remove('aui-tooltip--open');
            }
        }
    }
    attributeChangedCallback(name, oldVal, newVal) {
        super.attributeChangedCallback(name, oldVal, newVal);
        if (name === 'open' || name === 'disabled') {
            this.requestUpdate();
        }
    }
    render() {
        const openClass = this.isOpen ? 'aui-tooltip--open' : '';
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-tooltip ${openClass}">
        <div class="aui-tooltip__trigger">
          <slot></slot>
        </div>
        <div class="aui-tooltip__content" role="tooltip">
          ${this.content}
        </div>
      </div>
    `;
        // Re-attach listeners because innerHTML replaced the elements
        this.setupEventListeners();
    }
}
if (!customElements.get('aui-tooltip')) {
    customElements.define('aui-tooltip', AuiTooltip);
}
//# sourceMappingURL=aui-tooltip.js.map