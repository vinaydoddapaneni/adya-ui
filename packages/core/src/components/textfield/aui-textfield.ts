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
 * @attr {string} type - Input type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
 * @attr {boolean} disabled - Whether the input is disabled
 * @attr {boolean} error - Whether the input is in error state
 * @attr {string} helper-text - Helper text to display below input
 * 
 * @fires input - Emitted when value changes
 * @fires change - Emitted when value is committed
 * @fires focus - Emitted when input is focused
 * @fires blur - Emitted when input is blurred
 */
export class AuiTextField extends AuiElement {
  static get observedAttributes() {
    return ['label', 'placeholder', 'value', 'type', 'disabled', 'error', 'helper-text'];
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

  get type(): string {
    return this.getAttribute('type') || 'text';
  }

  set type(value: string) {
    this.setAttribute('type', value);
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

  get error(): boolean {
    return this.hasAttribute('error');
  }

  set error(value: boolean) {
    if (value) {
      this.setAttribute('error', '');
    } else {
      this.removeAttribute('error');
    }
  }

  get helperText(): string {
    return this.getAttribute('helper-text') || '';
  }

  set helperText(value: string) {
    this.setAttribute('helper-text', value);
  }

  protected render() {
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-textfield">
        ${this.label ? `<label class="aui-textfield__label">${this.label}</label>` : ''}
        <div class="aui-textfield__input-wrapper">
          <input
            class="aui-textfield__input"
            type="${this.type}"
            value="${this.value}"
            placeholder="${this.placeholder}"
            ${this.disabled ? 'disabled' : ''}
            aria-invalid="${this.error}"
          />
        </div>
        ${this.helperText ? `<span class="aui-textfield__helper-text">${this.helperText}</span>` : ''}
      </div>
    `;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    const input = this._shadowRoot.querySelector('input');
    if (!input) return;

    input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      this.value = target.value;
      this.emit('input', { value: this.value });
    });

    input.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
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
