import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-checkbox.styles';
/**
 * AuiCheckbox - A boolean selection component
 *
 * @element aui-checkbox
 *
 * @attr {boolean} checked - Whether the checkbox is checked
 * @attr {boolean} indeterminate - Whether the checkbox is in indeterminate state
 * @attr {boolean} disabled - Whether the checkbox is disabled
 * @attr {boolean} required - Whether the checkbox is required
 * @attr {string} label - Label to display next to checkbox
 * @attr {string} name - Name of the checkbox input
 * @attr {string} value - Value of the checkbox input
 * @attr {string} size - Size: 'small' | 'medium' | 'large'
 * @attr {string} color - Color: 'primary' | 'secondary' | 'success' | 'error'
 *
 * @fires change - Emitted when checked state changes
 */
export class AuiCheckbox extends AuiElement {
    static get observedAttributes() {
        return ['checked', 'indeterminate', 'disabled', 'required', 'label', 'name', 'value', 'size', 'color'];
    }
    get checked() {
        return this.hasAttribute('checked');
    }
    set checked(value) {
        if (value) {
            this.setAttribute('checked', '');
            this.removeAttribute('indeterminate');
        }
        else {
            this.removeAttribute('checked');
        }
    }
    get indeterminate() {
        return this.hasAttribute('indeterminate');
    }
    set indeterminate(value) {
        if (value) {
            this.setAttribute('indeterminate', '');
            this.removeAttribute('checked');
        }
        else {
            this.removeAttribute('indeterminate');
        }
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
    get label() {
        return this.getAttribute('label') || '';
    }
    set label(value) {
        this.setAttribute('label', value);
    }
    get name() {
        return this.getAttribute('name') || '';
    }
    set name(value) {
        this.setAttribute('name', value);
    }
    get value() {
        return this.getAttribute('value') || 'on';
    }
    set value(value) {
        this.setAttribute('value', value);
    }
    get size() {
        return this.getAttribute('size') || 'medium';
    }
    set size(value) {
        this.setAttribute('size', value);
    }
    get color() {
        return this.getAttribute('color') || 'primary';
    }
    set color(value) {
        this.setAttribute('color', value);
    }
    render() {
        const sizeClass = `aui-checkbox--${this.size}`;
        const colorClass = `aui-checkbox--${this.color}`;
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <label class="aui-checkbox ${sizeClass} ${colorClass}">
        <input
          class="aui-checkbox__input"
          type="checkbox"
          name="${this.name}"
          value="${this.value}"
          ${this.checked ? 'checked' : ''}
          ${this.disabled ? 'disabled' : ''}
          ${this.required ? 'required' : ''}
          aria-checked="${this.indeterminate ? 'mixed' : this.checked}"
          aria-disabled="${this.disabled}"
          aria-required="${this.required}"
        />
        <span class="aui-checkbox__control">
          ${this.indeterminate
            ? `<svg class="aui-checkbox__icon" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z" /></svg>`
            : `<svg class="aui-checkbox__icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>`}
        </span>
        ${this.label ? `<span class="aui-checkbox__label">${this.label}</span>` : ''}
      </label>
    `;
        this.setupEventListeners();
    }
    setupEventListeners() {
        const input = this._shadowRoot.querySelector('input');
        if (!input)
            return;
        // Handle indeterminate state on input
        input.indeterminate = this.indeterminate;
        input.addEventListener('change', (e) => {
            const target = e.target;
            // If it was indeterminate, it becomes checked
            if (this.indeterminate) {
                this.indeterminate = false;
                this.checked = true;
            }
            else {
                this.checked = target.checked;
            }
            this.emit('change', { checked: this.checked, indeterminate: this.indeterminate });
        });
        // Keyboard navigation
        this.addEventListener('keydown', (e) => {
            if (e.key === ' ' && !this.disabled) {
                e.preventDefault();
                input.click();
            }
        });
    }
}
if (!customElements.get('aui-checkbox')) {
    customElements.define('aui-checkbox', AuiCheckbox);
}
//# sourceMappingURL=aui-checkbox.js.map