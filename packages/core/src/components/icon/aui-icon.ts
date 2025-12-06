import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-icon.styles';

/**
 * AuiIcon - A component for displaying icons
 * 
 * @element aui-icon
 * 
 * @attr {string} name - The name of the icon (if using an icon library)
 * @attr {string} src - The URL of the SVG icon
 * @attr {string} label - The accessible label for the icon
 * @attr {string} size - The size of the icon: 'small' | 'medium' | 'large'
 */
export class AuiIcon extends AuiElement {
  static get observedAttributes() {
    return ['name', 'src', 'label', 'size'];
  }

  get name(): string {
    return this.getAttribute('name') || '';
  }

  set name(value: string) {
    this.setAttribute('name', value);
  }

  get src(): string {
    return this.getAttribute('src') || '';
  }

  set src(value: string) {
    this.setAttribute('src', value);
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(value: string) {
    this.setAttribute('label', value);
  }

  get size(): 'small' | 'medium' | 'large' {
    return (this.getAttribute('size') as 'small' | 'medium' | 'large') || 'medium';
  }

  set size(value: 'small' | 'medium' | 'large') {
    this.setAttribute('size', value);
  }

  protected render() {
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <slot>
        ${this.src ? `<img src="${this.src}" alt="${this.label}" />` : ''}
      </slot>
    `;
    
    if (this.label) {
      this.setAttribute('aria-label', this.label);
      this.setAttribute('role', 'img');
    } else {
      this.setAttribute('aria-hidden', 'true');
    }
  }
}

if (!customElements.get('aui-icon')) {
  customElements.define('aui-icon', AuiIcon);
}
