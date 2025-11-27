import { AuiElement } from '../../base/aui-element';
import { css } from '../../base/utils';
const styles = css `
  :host {
    display: block;
  }
`;
/**
 * AuiTimelineItem - A single item in a timeline
 *
 * @element aui-timeline-item
 *
 * @attr {string} time - Time/date of the event
 * @attr {string} title - Event title
 * @attr {string} variant - Dot variant: 'filled' | 'outlined'
 *
 * @slot - Default slot for event description
 */
export class AuiTimelineItem extends AuiElement {
    static get observedAttributes() {
        return ['time', 'title', 'variant'];
    }
    constructor() {
        super();
    }
    get time() {
        return this.getAttribute('time') || '';
    }
    set time(val) {
        this.setAttribute('time', val);
    }
    get title() {
        return this.getAttribute('title') || '';
    }
    set title(val) {
        this.setAttribute('title', val);
    }
    get variant() {
        return this.getAttribute('variant') || 'filled';
    }
    set variant(val) {
        this.setAttribute('variant', val);
    }
    render() {
        const time = this.time;
        const title = this.title;
        const variant = this.variant;
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-timeline__item aui-timeline__item--variant-${variant}">
        <div class="aui-timeline__separator">
          <div class="aui-timeline__dot"></div>
          <div class="aui-timeline__connector"></div>
        </div>
        <div class="aui-timeline__content">
          ${time ? `<div class="aui-timeline__time">${time}</div>` : ''}
          ${title ? `<div class="aui-timeline__title">${title}</div>` : ''}
          <div class="aui-timeline__description">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
    }
}
if (!customElements.get('aui-timeline-item')) {
    customElements.define('aui-timeline-item', AuiTimelineItem);
}
//# sourceMappingURL=aui-timeline-item.js.map