import { AuiElement } from '../../base/aui-element';
import { styles } from './aui-textfield.styles';
/**
 * AuiTextField - A versatile text input component
 *
 * @element aui-textfield
 *
 * @attr {string} label - Input label
 * @attr {string} placeholder - Input placeholder
 * @attr {string} value - Input value
 * @attr {string} type - Input type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
 * @attr {string} variant - Visual variant: 'outlined' | 'filled' | 'standard'
 * @attr {string} size - Size: 'small' | 'medium' | 'large'
 * @attr {boolean} disabled - Whether the input is disabled
 * @attr {boolean} readonly - Whether the input is readonly
 * @attr {boolean} required - Whether the input is required
 * @attr {boolean} error - Whether the input is in error state
 * @attr {string} helper-text - Helper text to display below input
 * @attr {number} maxlength - Maximum length of input
 * @attr {number} minlength - Minimum length of input
 *
 * @slot prefix - Slot for prefix icon or content
 * @slot suffix - Slot for suffix icon or content
 *
 * @fires input - Emitted when value changes
 * @fires change - Emitted when value is committed
 * @fires focus - Emitted when input is focused
 * @fires blur - Emitted when input is blurred
 */
export class AuiTextField extends AuiElement {
    static get observedAttributes() {
        return [
            'label', 'placeholder', 'value', 'type', 'variant', 'size',
            'disabled', 'readonly', 'required', 'error', 'helper-text',
            'maxlength', 'minlength'
        ];
    }
    get label() {
        return this.getAttribute('label') || '';
    }
    set label(value) {
        this.setAttribute('label', value);
    }
    get placeholder() {
        return this.getAttribute('placeholder') || '';
    }
    set placeholder(value) {
        this.setAttribute('placeholder', value);
    }
    get value() {
        return this.getAttribute('value') || '';
    }
    set value(value) {
        this.setAttribute('value', value);
    }
    get type() {
        return this.getAttribute('type') || 'text';
    }
    set type(value) {
        this.setAttribute('type', value);
    }
    get variant() {
        return this.getAttribute('variant') || 'outlined';
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
    get readonly() {
        return this.hasAttribute('readonly');
    }
    set readonly(value) {
        if (value) {
            this.setAttribute('readonly', '');
        }
        else {
            this.removeAttribute('readonly');
        }
    }
    get required() {
        return this.hasAttribute('required');
    }
    set required(value) {
        if (value) {
            this.setAttribute('required', '');
        }
        else {
            this.removeAttribute('required');
        }
    }
    get error() {
        return this.hasAttribute('error');
    }
    set error(value) {
        if (value) {
            this.setAttribute('error', '');
        }
        else {
            this.removeAttribute('error');
        }
    }
    get helperText() {
        return this.getAttribute('helper-text') || '';
    }
    set helperText(value) {
        this.setAttribute('helper-text', value);
    }
    get maxlength() {
        const value = this.getAttribute('maxlength');
        return value ? parseInt(value, 10) : null;
    }
    set maxlength(value) {
        if (value !== null) {
            this.setAttribute('maxlength', value.toString());
        }
        else {
            this.removeAttribute('maxlength');
        }
    }
    get minlength() {
        const value = this.getAttribute('minlength');
        return value ? parseInt(value, 10) : null;
    }
    set minlength(value) {
        if (value !== null) {
            this.setAttribute('minlength', value.toString());
        }
        else {
            this.removeAttribute('minlength');
        }
    }
    render() {
        const variantClass = `aui-textfield--${this.variant}`;
        const sizeClass = `aui-textfield--${this.size}`;
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-textfield ${variantClass} ${sizeClass}">
        ${this.label ? `<label class="aui-textfield__label">
          ${this.label}${this.required ? '<span class="aui-textfield__required" aria-label="required">*</span>' : ''}
        </label>` : ''}
        <div class="aui-textfield__input-wrapper">
          <slot name="prefix" class="aui-textfield__prefix"></slot>
          <input
            class="aui-textfield__input"
            type="${this.type}"
            value="${this.value}"
            placeholder="${this.placeholder}"
            ${this.disabled ? 'disabled' : ''}
            ${this.readonly ? 'readonly' : ''}
            ${this.required ? 'required' : ''}
            ${this.maxlength !== null ? `maxlength="${this.maxlength}"` : ''}
            ${this.minlength !== null ? `minlength="${this.minlength}"` : ''}
            aria-invalid="${this.error}"
            aria-required="${this.required}"
            aria-readonly="${this.readonly}"
            ${this.helperText ? `aria-describedby="helper-text"` : ''}
          />
          <slot name="suffix" class="aui-textfield__suffix"></slot>
        </div>
        ${this.helperText ? `<span id="helper-text" class="aui-textfield__helper-text">${this.helperText}</span>` : ''}
      </div>
    `;
        this.setupEventListeners();
    }
    setupEventListeners() {
        const input = this._shadowRoot.querySelector('input');
        if (!input)
            return;
        input.addEventListener('input', (e) => {
            const target = e.target;
            this.value = target.value;
            this.emit('input', { value: this.value });
        });
        input.addEventListener('change', (e) => {
            const target = e.target;
            this.value = target.value;
            this.emit('change', { value: this.value });
        });
        input.addEventListener('focus', () => {
            this.setAttribute('focused', '');
            this.emit('focus');
        });
        input.addEventListener('blur', () => {
            this.removeAttribute('focused');
            this.emit('blur');
        });
    }
}
if (!customElements.get('aui-textfield')) {
    customElements.define('aui-textfield', AuiTextField);
}
//# sourceMappingURL=aui-textfield.js.map