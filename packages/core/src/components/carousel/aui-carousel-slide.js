import { AuiElement } from '../../base/aui-element';
import { css } from '../../base/utils';
const styles = css `
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }

  .aui-carousel-slide {
    width: 100%;
    height: 100%;
  }
`;
/**
 * AuiCarouselSlide - A single slide in a carousel
 *
 * @element aui-carousel-slide
 *
 * @slot - Default slot for slide content
 */
export class AuiCarouselSlide extends AuiElement {
    constructor() {
        super();
    }
    render() {
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-carousel-slide">
        <slot></slot>
      </div>
    `;
    }
}
if (!customElements.get('aui-carousel-slide')) {
    customElements.define('aui-carousel-slide', AuiCarouselSlide);
}
//# sourceMappingURL=aui-carousel-slide.js.map