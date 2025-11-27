import { AuiElement } from '../../base/aui-element';
import { styles } from './aui-switch.styles';
/**
 * AuiSwitch - A toggle switch component
 *
 * @element aui-switch
 *
 * @attr {boolean} checked - Whether the switch is checked
 * @attr {boolean} disabled - Whether the switch is disabled
 * @attr {string} label - Label to display next to switch
 * @attr {string} name - Name of the switch input
 * @attr {string} value - Value of the switch input
 *
 * @fires change - Emitted when checked state changes
 */
export class AuiSwitch extends AuiElement {
    static get observedAttributes() {
        return ['checked', 'disabled', 'label', 'name', 'value'];
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
    render() {
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <label class="aui-switch">
        <input
          class="aui-switch__input"
          type="checkbox"
          name="${this.name}"
          value="${this.value}"
          ${this.checked ? 'checked' : ''}
          ${this.disabled ? 'disabled' : ''}
        />
        <div class="aui-switch__track">
          <div class="aui-switch__thumb"></div>
        </div>
        ${this.label ? `<span class="aui-switch__label">${this.label}</span>` : ''}
      </label>
    `;
        this.setupEventListeners();
    }
    setupEventListeners() {
        const input = this._shadowRoot.querySelector('input');
        if (!input)
            return;
        input.addEventListener('change', (e) => {
            const target = e.target;
            this.checked = target.checked;
            this.emit('change', { checked: this.checked });
        });
    }
}
if (!customElements.get('aui-switch')) {
    customElements.define('aui-switch', AuiSwitch);
}
//# sourceMappingURL=aui-switch.js.map