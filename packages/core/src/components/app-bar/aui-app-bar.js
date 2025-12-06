import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-app-bar.styles';
/**
 * AuiAppBar - A top app bar component
 *
 * @element aui-app-bar
 *
 * @attr {string} position - Positioning: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'
 * @attr {string} color - Background color: 'primary' | 'secondary' | 'default' | 'transparent'
 * @attr {boolean} dense - Reduces the height of the app bar
 * @attr {boolean} flat - Removes the shadow
 * @attr {boolean} outlined - Applies an outlined style
 *
 * @slot - Default slot for title or center content
 * @slot start - Slot for navigation icon or start content
 * @slot end - Slot for action items or end content
 */
export class AuiAppBar extends AuiElement {
    static get observedAttributes() {
        return ['position', 'color', 'dense', 'flat', 'outlined'];
    }
    get position() {
        return this.getAttribute('position') || 'static';
    }
    set position(value) {
        this.setAttribute('position', value);
    }
    get color() {
        return this.getAttribute('color') || 'primary';
    }
    set color(value) {
        this.setAttribute('color', value);
    }
    get dense() {
        return this.hasAttribute('dense');
    }
    set dense(value) {
        if (value) {
            this.setAttribute('dense', '');
        }
        else {
            this.removeAttribute('dense');
        }
    }
    get flat() {
        return this.hasAttribute('flat');
    }
    set flat(value) {
        if (value) {
            this.setAttribute('flat', '');
        }
        else {
            this.removeAttribute('flat');
        }
    }
    get outlined() {
        return this.hasAttribute('outlined');
    }
    set outlined(value) {
        if (value) {
            this.setAttribute('outlined', '');
        }
        else {
            this.removeAttribute('outlined');
        }
    }
    render() {
        const colorClass = `aui-app-bar--${this.color}`;
        const denseClass = this.dense ? 'aui-app-bar--dense' : '';
        const flatClass = this.flat ? 'aui-app-bar--flat' : '';
        const outlinedClass = this.outlined ? 'aui-app-bar--outlined' : '';
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <header 
        class="aui-app-bar ${colorClass} ${denseClass} ${flatClass} ${outlinedClass}"
        role="banner"
      >
        <div class="aui-app-bar__start">
          <slot name="start"></slot>
        </div>
        <div class="aui-app-bar__title">
          <slot></slot>
        </div>
        <div class="aui-app-bar__end">
          <slot name="end"></slot>
        </div>
      </header>
    `;
    }
}
if (!customElements.get('aui-app-bar')) {
    customElements.define('aui-app-bar', AuiAppBar);
}
//# sourceMappingURL=aui-app-bar.js.map