import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-select.styles';

/**
 * AuiSelect - A dropdown selection component
 * 
 * @element aui-select
 * 
 * @attr {string} label - Input label
 * @attr {string} placeholder - Input placeholder
 * @attr {string} value - Selected value
 * @attr {boolean} disabled - Whether the input is disabled
 * 
 * @fires change - Emitted when value changes
 */
export class AuiSelect extends AuiElement {
  static get observedAttributes() {
    return ['label', 'placeholder', 'value', 'disabled'];
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(value: string) {
    this.setAttribute('label', value);
  }

  get placeholder(): string {
    return this.getAttribute('placeholder') || '';
  }

  set placeholder(value: string) {
    this.setAttribute('placeholder', value);
  }

  get value(): string {
    return this.getAttribute('value') || '';
  }

  set value(value: string) {
    this.setAttribute('value', value);
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

  protected render() {
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-select">
        ${this.label ? `<label class="aui-select__label">${this.label}</label>` : ''}
        <div class="aui-select__wrapper">
          <select
            class="aui-select__input"
            ${this.disabled ? 'disabled' : ''}
          >
            ${this.placeholder ? `<option value="" disabled selected>${this.placeholder}</option>` : ''}
          </select>
          <svg class="aui-select__icon" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
        <slot style="display: none;"></slot>
      </div>
    `;

    this.setupEventListeners();
    this.syncOptions();
  }

  private setupEventListeners() {
    const select = this._shadowRoot.querySelector('select');
    if (!select) return;

    select.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      this.value = target.value;
      this.emit('change', { value: this.value });
    });

    select.addEventListener('focus', () => {
      this.setAttribute('focused', '');
    });

    select.addEventListener('blur', () => {
      this.removeAttribute('focused');
    });

    // Listen for slot changes to update options
    const slot = this._shadowRoot.querySelector('slot');
    if (slot) {
      slot.addEventListener('slotchange', () => this.syncOptions());
    }
  }

  private syncOptions() {
    const select = this._shadowRoot.querySelector('select');
    if (!select) return;

    // Keep the placeholder if it exists
    const placeholderOption = select.querySelector('option[disabled]');
    select.innerHTML = '';
    if (placeholderOption) {
      select.appendChild(placeholderOption);
    }

    // Copy options from light DOM
    Array.from(this.children).forEach((child) => {
      if (child.tagName === 'OPTION') {
        const option = child as HTMLOptionElement;
        const newOption = document.createElement('option');
        newOption.value = option.value;
        newOption.textContent = option.textContent;
        newOption.disabled = option.disabled;
        newOption.selected = option.selected;
        select.appendChild(newOption);
      }
    });

    // Set value
    if (this.value) {
      select.value = this.value;
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'value') {
      const select = this._shadowRoot.querySelector('select');
      if (select) {
        select.value = newValue;
      }
    }
  }
}

if (!customElements.get('aui-select')) {
  customElements.define('aui-select', AuiSelect);
}
