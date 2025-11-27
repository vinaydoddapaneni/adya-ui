import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-rating.styles';

/**
 * AuiRating - A star rating component
 * 
 * @element aui-rating
 * 
 * @attr {number} value - Current rating value
 * @attr {number} max - Maximum rating (default: 5)
 * @attr {boolean} readonly - Whether the rating is readonly
 * @attr {boolean} disabled - Whether the rating is disabled
 * @attr {boolean} precision - Allow half-star ratings
 * 
 * @fires change - Emitted when rating changes
 */
export class AuiRating extends AuiElement {
  static get observedAttributes() {
    return ['value', 'max', 'readonly', 'disabled', 'precision'];
  }

  private hoverValue: number | null = null;

  constructor() {
    super();
  }

  get value(): number {
    return parseFloat(this.getAttribute('value') || '0');
  }

  set value(val: number) {
    this.setAttribute('value', val.toString());
  }

  get max(): number {
    return parseInt(this.getAttribute('max') || '5', 10);
  }

  set max(val: number) {
    this.setAttribute('max', val.toString());
  }

  get readonly(): boolean {
    return this.hasAttribute('readonly');
  }

  set readonly(val: boolean) {
    if (val) {
      this.setAttribute('readonly', '');
    } else {
      this.removeAttribute('readonly');
    }
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(val: boolean) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get precision(): boolean {
    return this.hasAttribute('precision');
  }

  set precision(val: boolean) {
    if (val) {
      this.setAttribute('precision', '');
    } else {
      this.removeAttribute('precision');
    }
  }

  private handleStarClick(starIndex: number, isHalf: boolean = false) {
    if (this.readonly || this.disabled) return;

    const newValue = isHalf ? starIndex + 0.5 : starIndex + 1;
    this.value = newValue;
    this.emit('change', { value: newValue });
  }

  private handleStarHover(starIndex: number) {
    if (this.readonly || this.disabled) return;
    this.hoverValue = starIndex + 1;
    this.render();
  }

  private handleMouseLeave() {
    if (this.readonly || this.disabled) return;
    this.hoverValue = null;
    this.render();
  }

  protected render() {
    const max = this.max;
    const value = this.value;
    const displayValue = this.hoverValue !== null ? this.hoverValue : value;

    let starsHTML = '';

    for (let i = 0; i < max; i++) {
      const isFilled = i < Math.floor(displayValue);
      const isHalf = this.precision && i === Math.floor(displayValue) && displayValue % 1 !== 0;

      let starClass = 'aui-rating__star';
      if (isFilled) starClass += ' aui-rating__star--filled';
      if (isHalf) starClass += ' aui-rating__star--half';

      starsHTML += `
        <span 
          class="${starClass}" 
          data-index="${i}"
          role="button"
          aria-label="Rate ${i + 1} out of ${max}"
        >
          ${isHalf ? '☆' : (isFilled ? '★' : '☆')}
        </span>
      `;
    }

    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-rating" role="slider" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${max}">
        ${starsHTML}
        ${value > 0 ? `<span class="aui-rating__label">${value.toFixed(this.precision ? 1 : 0)}</span>` : ''}
      </div>
    `;

    // Add event listeners
    if (!this.readonly && !this.disabled) {
      this._shadowRoot.querySelectorAll('.aui-rating__star').forEach((star, index) => {
        star.addEventListener('click', (e) => {
          const rect = (star as HTMLElement).getBoundingClientRect();
          const x = (e as MouseEvent).clientX - rect.left;
          const isHalf = this.precision && x < rect.width / 2;
          this.handleStarClick(index, isHalf);
        });

        star.addEventListener('mouseenter', () => {
          this.handleStarHover(index);
        });
      });

      const container = this._shadowRoot.querySelector('.aui-rating');
      container?.addEventListener('mouseleave', () => {
        this.handleMouseLeave();
      });
    }
  }
}

if (!customElements.get('aui-rating')) {
  customElements.define('aui-rating', AuiRating);
}
