import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-radio.styles';

export class AuiRadio extends AuiElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'name', 'value', 'label'];
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

  get name(): string {
    return this.getAttribute('name') || '';
  }

  set name(value: string) {
    this.setAttribute('name', value);
  }

  get value(): string {
    return this.getAttribute('value') || '';
  }

  set value(value: string) {
    this.setAttribute('value', value);
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(value: string) {
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

  private handleClick = (e: Event) => {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    // If already checked, do nothing (radio buttons don't toggle off by clicking)
    if (this.checked) return;

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

  protected render() {
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
