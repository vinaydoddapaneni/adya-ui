import { AuiElement } from '../../base/aui-element';
import { styles } from './aui-badge.styles.js';



export class AuiBadge extends AuiElement {
  static get observedAttributes() { 
    return ['value', 'variant', 'size', 'max'];
  }

  // Value property
  get value(): string { 
    return this.getAttribute('value') || ''; 
  }
  set value(v: string | number) { 
    this.setAttribute('value', v.toString()); 
  }

  // Variant property (standard, dot, etc.)
  get variant() { return this.getAttribute('variant') || 'standard'; }
  set variant(v: string) { this.setAttribute('variant', v); }

  // Size property (small, medium, etc.)
  get size() { return this.getAttribute('size') || 'medium'; }
  set size(v: string) { this.setAttribute('size', v); }

  // Max value for number badges
  get max() { 
    const max = this.getAttribute('max');
    return max ? parseInt(max, 10) : 99; // Default to 99 to match test expectation
  }
  set max(v: number | string) { 
    this.setAttribute('max', v.toString());
  }

  connectedCallback() { 
    super.connectedCallback(); 
    this.render(); 
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) { 
    super.attributeChangedCallback(name, oldVal, newVal);
    this.render(); 
  }

  render() {
    // Apply variant and size as classes for styling
    const variantClass = `variant-${this.variant}`;
    const sizeClass = `size-${this.size}`;
    
    // Format the badge content based on variant
    let badgeContent = this.value;
    if (this.variant === 'dot') {
      badgeContent = '';
    } else if (this.variant === 'number' && this.value) {
      const numValue = parseInt(this.value, 10);
      const maxValue = this.max;
      if (!isNaN(numValue) && maxValue !== undefined && numValue > Number(maxValue)) {
        badgeContent = `${maxValue}+`;
      }
    }

    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="badge-container ${variantClass} ${sizeClass}">
        <slot></slot>
        ${badgeContent ? `<span class="badge">${badgeContent}</span>` : '<span class="badge dot"></span>'}
      </div>
    `;
  }
}

if (!customElements.get('aui-badge')) { customElements.define('aui-badge', AuiBadge); }
