import { AuiElement } from '../../base';
import { styles } from './aui-button.styles';
/**
 * AuiButton - A versatile button component
 *
 * @element aui-button
 *
 * @attr {string} variant - Button variant: 'primary' | 'secondary' | 'outlined' | 'text'
 * @attr {string} size - Button size: 'small' | 'medium' | 'large'
 * @attr {boolean} disabled - Whether the button is disabled
 * @attr {boolean} loading - Whether the button is in loading state
 * @attr {string} type - Button type: 'button' | 'submit' | 'reset'
 *
 * @fires aui-click - Emitted when button is clicked
 *
 * @slot - Default slot for button content
 * @slot icon - Slot for button icon
 */
export class AuiButton extends AuiElement {
    static get observedAttributes() {
        return ['variant', 'size', 'disabled', 'loading', 'type'];
    }
    constructor() {
        super();
    }
    get variant() {
        return this.getAttribute('variant') || 'primary';
    }
    set variant(value) {
        this.setAttribute('variant', value);
    }
    get size() {
        return this.getAttribute('size') || 'medium';
    }
    set size(value) {
        this.setAttribute('size', value);
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
    }
    get loading() {
        return this.hasAttribute('loading');
    }
    set loading(value) {
        if (value) {
            this.setAttribute('loading', '');
        }
        else {
            this.removeAttribute('loading');
        }
    }
    get type() {
        return this.getAttribute('type') || 'button';
    }
    set type(value) {
        this.setAttribute('type', value);
    }
    connectedCallback() {
        super.connectedCallback();
    }
    setupEventListeners() {
        const button = this.$('button');
        if (button) {
            button.addEventListener('click', (e) => this.handleClick(e));
        }
    }
    handleClick(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.emit('aui-click', { originalEvent: e });
    }
    render() {
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <button
        class="aui-button aui-button--${this.variant} aui-button--${this.size}"
        type="${this.type}"
        ${this.disabled ? 'disabled' : ''}
        aria-disabled="${this.disabled}"
      >
        ${this.loading ? '<span class="aui-button__loader"></span>' : ''}
        <slot name="icon"></slot>
        <span class="aui-button__content">
          <slot></slot>
        </span>
      </button>
    `;
        // Setup event listeners after rendering
        this.setupEventListeners();
    }
}
// Register the custom element
if (!customElements.get('aui-button')) {
    customElements.define('aui-button', AuiButton);
}
//# sourceMappingURL=aui-button.js.map