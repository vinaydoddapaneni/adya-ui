import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-radio.styles';
export class AuiRadio extends AuiElement {
    constructor() {
        super(...arguments);
        this.handleClick = (e) => {
            if (this.disabled) {
                e.preventDefault();
                return;
            }
            // If already checked, do nothing (radio buttons don't toggle off by clicking)
            if (this.checked)
                return;
            this.checked = true;
            this.emit('change', { checked: true, value: this.value });
            // Handle radio group behavior if name is present
            if (this.name) {
                const radios = document.querySelectorAll(`aui-radio[name="${this.name}"]`);
                radios.forEach((radio) => {
                    if (radio !== this && radio instanceof AuiRadio) {
                        radio.checked = false;
                    }
                });
            }
        };
    }
    static get observedAttributes() {
        return ['checked', 'disabled', 'name', 'value', 'label'];
    }
    get checked() {
        return this.hasAttribute('checked');
    }
    set checked(value) {
        if (value) {
            this.setAttribute('checked', '');
        }
        else {
            this.removeAttribute('checked');
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
    get name() {
        return this.getAttribute('name') || '';
    }
    set name(value) {
        this.setAttribute('name', value);
    }
    get value() {
        return this.getAttribute('value') || '';
    }
    set value(value) {
        this.setAttribute('value', value);
    }
    get label() {
        return this.getAttribute('label') || '';
    }
    set label(value) {
        this.setAttribute('label', value);
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.handleClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this.handleClick);
    }
    render() {
        const disabledClass = this.disabled ? 'aui-radio--disabled' : '';
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <label class="aui-radio ${disabledClass}">
        <input 
          type="radio" 
          class="aui-radio__input"
          name="${this.name}"
          value="${this.value}"
          ${this.checked ? 'checked' : ''}
          ${this.disabled ? 'disabled' : ''}
          tabindex="-1"
        />
        <span class="aui-radio__control"></span>
        <span class="aui-radio__label">
          <slot>${this.label}</slot>
        </span>
      </label>
    `;
    }
}
if (!customElements.get('aui-radio')) {
    customElements.define('aui-radio', AuiRadio);
}
//# sourceMappingURL=aui-radio.js.map