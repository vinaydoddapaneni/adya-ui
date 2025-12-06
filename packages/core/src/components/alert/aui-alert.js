import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-alert.styles';
/**
 * AuiAlert - A feedback component
 *
 * @element aui-alert
 *
 * @attr {string} severity - Alert severity: 'success' | 'info' | 'warning' | 'error'
 * @attr {string} variant - Alert variant: 'filled' | 'outlined' | 'standard'
 * @attr {boolean} dismissible - Whether the alert can be dismissed
 * @attr {boolean} open - Whether the alert is visible
 * @attr {string} title - Alert title
 * @attr {number} duration - Auto-dismiss duration in milliseconds
 *
 * @slot - Default slot for content
 * @slot icon - Slot for custom icon
 * @slot title - Slot for alert title
 * @slot action - Slot for action buttons
 *
 * @fires close - Emitted when the alert is closed
 * @fires show - Emitted when the alert is shown
 * @fires hide - Emitted when the alert is hidden
 */
export class AuiAlert extends AuiElement {
    static get observedAttributes() {
        return ['severity', 'variant', 'dismissible', 'open', 'title', 'duration'];
    }
    constructor() {
        super();
        this.autoDismissTimer = null;
        // Default to open
        if (!this.hasAttribute('open')) {
            this.setAttribute('open', '');
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.handleAutoDismiss();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.clearAutoDismissTimer();
    }
    attributeChangedCallback(name, oldVal, newVal) {
        super.attributeChangedCallback(name, oldVal, newVal);
        if (name === 'open') {
            if (this.open) {
                this.emit('show');
                this.handleAutoDismiss();
            }
            else {
                this.emit('hide');
                this.clearAutoDismissTimer();
            }
        }
        if (name === 'duration') {
            this.handleAutoDismiss();
        }
    }
    get severity() {
        return this.getAttribute('severity') || 'success';
    }
    set severity(value) {
        this.setAttribute('severity', value);
    }
    get variant() {
        return this.getAttribute('variant') || 'standard';
    }
    set variant(value) {
        this.setAttribute('variant', value);
    }
    get dismissible() {
        return this.hasAttribute('dismissible');
    }
    set dismissible(value) {
        if (value) {
            this.setAttribute('dismissible', '');
        }
        else {
            this.removeAttribute('dismissible');
        }
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
    get title() {
        return this.getAttribute('title') || '';
    }
    set title(value) {
        this.setAttribute('title', value);
    }
    get duration() {
        const val = this.getAttribute('duration');
        return val ? parseInt(val, 10) : 0;
    }
    set duration(value) {
        this.setAttribute('duration', value.toString());
    }
    close() {
        this.open = false;
        this.emit('close');
    }
    show() {
        this.open = true;
    }
    handleAutoDismiss() {
        this.clearAutoDismissTimer();
        if (this.open && this.duration > 0) {
            this.autoDismissTimer = window.setTimeout(() => {
                this.close();
            }, this.duration);
        }
    }
    clearAutoDismissTimer() {
        if (this.autoDismissTimer) {
            clearTimeout(this.autoDismissTimer);
            this.autoDismissTimer = null;
        }
    }
    render() {
        const variantClass = `aui-alert--${this.variant}`;
        const severityClass = `aui-alert--${this.severity}`;
        const openClass = this.open ? 'aui-alert--open' : '';
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div 
        class="aui-alert ${variantClass} ${severityClass} ${openClass}" 
        role="alert"
        aria-hidden="${!this.open}"
      >
        <div class="aui-alert__icon">
          <slot name="icon">
            ${this.getDefaultIcon()}
          </slot>
        </div>
        <div class="aui-alert__content">
          ${this.title ? `<div class="aui-alert__title"><slot name="title">${this.title}</slot></div>` : '<slot name="title"></slot>'}
          <div class="aui-alert__message">
            <slot></slot>
          </div>
        </div>
        <div class="aui-alert__action">
          <slot name="action"></slot>
          ${this.dismissible ? `
            <button 
              class="aui-alert__close-button" 
              type="button" 
              aria-label="Close alert"
            >
              <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;
        this.setupEventListeners();
    }
    setupEventListeners() {
        const closeButton = this._shadowRoot.querySelector('.aui-alert__close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.close());
        }
    }
    getDefaultIcon() {
        switch (this.severity) {
            case 'success':
                return `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
            case 'info':
                return `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
            case 'warning':
                return `<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
            case 'error':
                return `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
            default:
                return '';
        }
    }
}
if (!customElements.get('aui-alert')) {
    customElements.define('aui-alert', AuiAlert);
}
//# sourceMappingURL=aui-alert.js.map