import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-timeline.styles';

export type AuiTimelinePosition = 'left' | 'right' | 'alternate';

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

  get position(): AuiTimelinePosition {
    return (this.getAttribute('position') as AuiTimelinePosition) || 'left';
  }

  set position(val: AuiTimelinePosition) {
    this.setAttribute('position', val);
  }

  protected render() {
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
