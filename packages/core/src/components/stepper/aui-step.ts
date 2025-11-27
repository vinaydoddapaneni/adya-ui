import { AuiElement } from '../../base/aui-element';

/**
 * AuiStep - A single step in a stepper
 * 
 * @element aui-step
 * 
 * @attr {string} label - Step label
 * @attr {string} description - Step description (optional)
 * 
 * @slot - Default slot for step content
 */
export class AuiStep extends AuiElement {
  static get observedAttributes() {
    return ['label', 'description'];
  }

  constructor() {
    super();
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(val: string) {
    this.setAttribute('label', val);
  }

  get description(): string {
    return this.getAttribute('description') || '';
  }

  set description(val: string) {
    this.setAttribute('description', val);
  }

  protected render() {
    // Step content is managed by the parent stepper
    this._shadowRoot.innerHTML = `<slot></slot>`;
  }
}

if (!customElements.get('aui-step')) {
  customElements.define('aui-step', AuiStep);
}
