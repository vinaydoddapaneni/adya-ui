import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-radio.styles';

/**
 * AuiRadio - A single selection component
 * 
 * @element aui-radio
 * 
 * @attr {boolean} checked - Whether the radio is checked
 * @attr {boolean} disabled - Whether the radio is disabled
 * @attr {string} label - Label to display next to radio
 * @attr {string} name - Name of the radio group
 * @attr {string} value - Value of the radio input
 * 
 * @fires change - Emitted when checked state changes
 */
export class AuiRadio extends AuiElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'label', 'name', 'value'];
  }

  get checked(): boolean {
    return this.hasAttribute('checked');
  }

  set checked(value: boolean) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(value: string) {
    this.setAttribute('label', value);
  }

  get name(): string {
    return this.getAttribute('name') || '';
  }

  set name(value: string) {
    this.setAttribute('name', value);
  }

  get value(): string {
    return this.getAttribute('value') || 'on';
  }

  set value(value: string) {
    this.setAttribute('value', value);
  }

  protected render() {
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <label class="aui-radio">
        <input
          class="aui-radio__input"
          type="radio"
          name="${this.name}"
          value="${this.value}"
          ${this.checked ? 'checked' : ''}
          ${this.disabled ? 'disabled' : ''}
        />
        <span class="aui-radio__control"></span>
        ${this.label ? `<span class="aui-radio__label">${this.label}</span>` : ''}
      </label>
    `;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    const input = this._shadowRoot.querySelector('input');
    if (!input) return;

    input.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      // Radio buttons only emit change when checked
      if (target.checked) {
        this.checked = true;
        this.emit('change', { checked: true, value: this.value });
        
        // Uncheck other radios with same name in the same scope (if needed logic can be added here or handled by parent group)
      }
    });
  }
}

if (!customElements.get('aui-radio')) {
  customElements.define('aui-radio', AuiRadio);
}
