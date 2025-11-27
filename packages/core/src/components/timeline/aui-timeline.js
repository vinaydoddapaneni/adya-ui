import { AuiElement } from '../../base/aui-element';
import { styles } from './aui-timeline.styles';
/**
 * AuiTimeline - A timeline component for displaying chronological events
 *
 * @element aui-timeline
 *
 * @attr {string} position - Timeline position: 'left' | 'right' | 'alternate'
 *
 * @slot - Default slot for timeline items
 */
export class AuiTimeline extends AuiElement {
    static get observedAttributes() {
        return ['position'];
    }
    constructor() {
        super();
    }
    get position() {
        return this.getAttribute('position') || 'left';
    }
    set position(val) {
        this.setAttribute('position', val);
    }
    render() {
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-timeline">
        <slot></slot>
      </div>
    `;
    }
}
if (!customElements.get('aui-timeline')) {
    customElements.define('aui-timeline', AuiTimeline);
}
//# sourceMappingURL=aui-timeline.js.map