import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-linear-progress.styles';

/**
 * AuiLinearProgress - A linear progress indicator
 * 
 * @element aui-linear-progress
 * 
 * @attr {number} value - The progress value (0-100)
 * @attr {number} buffer - The buffer value (0-100)
 * @attr {boolean} indeterminate - Whether the progress is indeterminate
 */
export class AuiLinearProgress extends AuiElement {
  static get observedAttributes() {
    return ['value', 'buffer', 'indeterminate'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get value(): number {
    const val = parseFloat(this.getAttribute('value') || '0');
    return Math.min(100, Math.max(0, val));
  }

  set value(val: number) {
    this.setAttribute('value', val.toString());
    // Only call render if element is connected
    if (this.isConnected) {
      this.render();
    }
  }

  get buffer(): number {
    const val = parseFloat(this.getAttribute('buffer') || '0');
    return Math.min(100, Math.max(0, val));
  }

  set buffer(val: number) {
    this.setAttribute('buffer', val.toString());
    // Only call render if element is connected
    if (this.isConnected) {
      this.render();
    }
  }

  get indeterminate(): boolean {
    return this.hasAttribute('indeterminate');
  }

  set indeterminate(val: boolean) {
    if (val) {
      this.setAttribute('indeterminate', '');
    } else {
      this.removeAttribute('indeterminate');
    }
    // Only call render if element is connected
    if (this.isConnected) {
      this.render();
    }
  }

  protected render() {
    const isIndeterminate = this.indeterminate;
    
    let content = '';
    
    if (isIndeterminate) {
      content = `
        <div class="aui-linear-progress__bar aui-linear-progress__bar-1"></div>
        <div class="aui-linear-progress__bar aui-linear-progress__bar-2"></div>
      `;
    } else {
      const valueScale = this.value / 100;
      const bufferScale = this.buffer / 100;
      
      content = `
        ${this.buffer > 0 ? `<div class="aui-linear-progress__buffer" style="transform: scaleX(${bufferScale})"></div>` : ''}
        <div class="aui-linear-progress__bar" style="transform: scaleX(${valueScale})"></div>
      `;
    }

    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-linear-progress" role="progressbar" 
           aria-valuenow="${isIndeterminate ? '' : this.value}" 
           aria-valuemin="0" 
           aria-valuemax="100">
        ${content}
      </div>
    `;
  }
}

if (!customElements.get('aui-linear-progress')) {
  customElements.define('aui-linear-progress', AuiLinearProgress);
}
