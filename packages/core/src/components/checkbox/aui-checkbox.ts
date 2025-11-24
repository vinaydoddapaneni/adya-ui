import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-checkbox.styles';

/**
 * AuiCheckbox - A boolean selection component
 * 
 * @element aui-checkbox
 * 
 * @attr {boolean} checked - Whether the checkbox is checked
 * @attr {boolean} disabled - Whether the checkbox is disabled
 * @attr {string} label - Label to display next to checkbox
 * @attr {string} name - Name of the checkbox input
 * @attr {string} value - Value of the checkbox input
 * 
 * @fires change - Emitted when checked state changes
 */
export class AuiCheckbox extends AuiElement {
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
      <label class="aui-checkbox">
        <input
          class="aui-checkbox__input"
          type="checkbox"
          name="${this.name}"
          value="${this.value}"
          ${this.checked ? 'checked' : ''}
          ${this.disabled ? 'disabled' : ''}
        />
        <span class="aui-checkbox__control">
          <svg class="aui-checkbox__icon" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </span>
        ${this.label ? `<span class="aui-checkbox__label">${this.label}</span>` : ''}
      </label>
    `;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    const input = this._shadowRoot.querySelector('input');
    if (!input) return;

    input.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.checked = target.checked;
      this.emit('change', { checked: this.checked });
    });
  }
}

if (!customElements.get('aui-checkbox')) {
  customElements.define('aui-checkbox', AuiCheckbox);
}
