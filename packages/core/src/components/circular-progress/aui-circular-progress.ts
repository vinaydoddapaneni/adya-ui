import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-circular-progress.styles';

export class AuiCircularProgress extends AuiElement {
  static get observedAttributes() {
    return ['value', 'size', 'thickness', 'variant', 'indeterminate'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    super.attributeChangedCallback(name, oldValue, newValue);
    this.render();
  }

  render() {
    const value = Math.min(100, Math.max(0, parseFloat(this.getAttribute('value') || '0')));
    const size = parseInt(this.getAttribute('size') || '48', 10);
    const thickness = parseInt(this.getAttribute('thickness') || '4', 10);
    const variant = this.getAttribute('variant') || 'primary';
    const indeterminate = this.hasAttribute('indeterminate');

    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    const center = size / 2;

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <div class="aui-circular-progress variant-${variant} ${indeterminate ? 'indeterminate' : ''}">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <!-- Background circle -->
          <circle
            class="progress-bg"
            cx="${center}"
            cy="${center}"
            r="${radius}"
            stroke-width="${thickness}"
            fill="none"
          />
          <!-- Progress circle -->
          <circle
            class="progress-circle"
            cx="${center}"
            cy="${center}"
            r="${radius}"
            stroke-width="${thickness}"
            fill="none"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${indeterminate ? circumference * 0.75 : offset}"
            transform="rotate(-90 ${center} ${center})"
          />
        </svg>
        ${!indeterminate ? `<span class="progress-label">${Math.round(value)}%</span>` : ''}
      </div>
    `;
  }
}

customElements.define('aui-circular-progress', AuiCircularProgress);
