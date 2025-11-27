import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-carousel.styles';

/**
 * AuiCarousel - A carousel/slider component
 * 
 * @element aui-carousel
 * 
 * @attr {number} active - Active slide index (0-based)
 * @attr {boolean} autoplay - Enable autoplay
 * @attr {number} interval - Autoplay interval in milliseconds (default: 3000)
 * @attr {boolean} loop - Enable infinite loop
 * @attr {boolean} show-controls - Show navigation controls
 * @attr {boolean} show-indicators - Show slide indicators
 * 
 * @slot - Default slot for carousel slides
 * 
 * @fires slide-change - Emitted when active slide changes
 */
export class AuiCarousel extends AuiElement {
  static get observedAttributes() {
    return ['active', 'autoplay', 'interval', 'loop', 'show-controls', 'show-indicators'];
  }

  private autoplayTimer: number | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoplay();
  }

  get active(): number {
    return parseInt(this.getAttribute('active') || '0', 10);
  }

  set active(val: number) {
    this.setAttribute('active', val.toString());
  }

  get autoplay(): boolean {
    return this.hasAttribute('autoplay');
  }

  set autoplay(val: boolean) {
    if (val) {
      this.setAttribute('autoplay', '');
      this.startAutoplay();
    } else {
      this.removeAttribute('autoplay');
      this.stopAutoplay();
    }
  }

  get interval(): number {
    return parseInt(this.getAttribute('interval') || '3000', 10);
  }

  set interval(val: number) {
    this.setAttribute('interval', val.toString());
  }

  get loop(): boolean {
    return this.hasAttribute('loop');
  }

  set loop(val: boolean) {
    if (val) {
      this.setAttribute('loop', '');
    } else {
      this.removeAttribute('loop');
    }
  }

  get showControls(): boolean {
    return this.hasAttribute('show-controls');
  }

  set showControls(val: boolean) {
    if (val) {
      this.setAttribute('show-controls', '');
    } else {
      this.removeAttribute('show-controls');
    }
  }

  get showIndicators(): boolean {
    return this.hasAttribute('show-indicators');
  }

  set showIndicators(val: boolean) {
    if (val) {
      this.setAttribute('show-indicators', '');
    } else {
      this.removeAttribute('show-indicators');
    }
  }

  private getSlides() {
    return Array.from(this.querySelectorAll('aui-carousel-slide'));
  }

  private goToSlide(index: number) {
    const slides = this.getSlides();
    if (index < 0 || index >= slides.length) return;

    this.active = index;
    this.emit('slide-change', { index });
    this.updateTrackPosition();
  }

  private next() {
    const slides = this.getSlides();
    const nextIndex = this.active + 1;

    if (nextIndex >= slides.length) {
      if (this.loop) {
        this.goToSlide(0);
      }
    } else {
      this.goToSlide(nextIndex);
    }
  }

  private prev() {
    const slides = this.getSlides();
    const prevIndex = this.active - 1;

    if (prevIndex < 0) {
      if (this.loop) {
        this.goToSlide(slides.length - 1);
      }
    } else {
      this.goToSlide(prevIndex);
    }
  }

  private startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = window.setInterval(() => {
      this.next();
    }, this.interval);
  }

  private stopAutoplay() {
    if (this.autoplayTimer !== null) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private updateTrackPosition() {
    const track = this._shadowRoot.querySelector('.aui-carousel__track') as HTMLElement;
    if (track) {
      track.style.transform = `translateX(-${this.active * 100}%)`;
    }
  }

  protected render() {
    const slides = this.getSlides();
    const active = this.active;
    const showControls = this.showControls;
    const showIndicators = this.showIndicators;

    let controlsHTML = '';
    if (showControls) {
      const canGoPrev = this.loop || active > 0;
      const canGoNext = this.loop || active < slides.length - 1;

      controlsHTML = `
        <div class="aui-carousel__controls">
          <button class="aui-carousel__button aui-carousel__button--prev" ${!canGoPrev ? 'disabled' : ''}>
            ‹
          </button>
          <button class="aui-carousel__button aui-carousel__button--next" ${!canGoNext ? 'disabled' : ''}>
            ›
          </button>
        </div>
      `;
    }

    let indicatorsHTML = '';
    if (showIndicators) {
      indicatorsHTML = `
        <div class="aui-carousel__indicators">
          ${slides.map((_, index) => `
            <div class="aui-carousel__indicator ${index === active ? 'aui-carousel__indicator--active' : ''}" data-index="${index}"></div>
          `).join('')}
        </div>
      `;
    }

    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-carousel">
        <div class="aui-carousel__track">
          <slot></slot>
        </div>
        ${controlsHTML}
        ${indicatorsHTML}
      </div>
    `;

    // Add event listeners
    const prevBtn = this._shadowRoot.querySelector('.aui-carousel__button--prev');
    const nextBtn = this._shadowRoot.querySelector('.aui-carousel__button--next');

    prevBtn?.addEventListener('click', () => this.prev());
    nextBtn?.addEventListener('click', () => this.next());

    this._shadowRoot.querySelectorAll('.aui-carousel__indicator').forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    this.updateTrackPosition();
  }
}

if (!customElements.get('aui-carousel')) {
  customElements.define('aui-carousel', AuiCarousel);
}
