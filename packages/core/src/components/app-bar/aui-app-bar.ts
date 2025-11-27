import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-app-bar.styles';

export type AuiAppBarPosition = 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
export type AuiAppBarColor = 'primary' | 'secondary' | 'default' | 'transparent';

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

  get position(): AuiAppBarPosition {
    return (this.getAttribute('position') as AuiAppBarPosition) || 'static';
  }

  set position(value: AuiAppBarPosition) {
    this.setAttribute('position', value);
  }

  get color(): AuiAppBarColor {
    return (this.getAttribute('color') as AuiAppBarColor) || 'primary';
  }

  set color(value: AuiAppBarColor) {
    this.setAttribute('color', value);
  }

  get dense(): boolean {
    return this.hasAttribute('dense');
  }

  set dense(value: boolean) {
    if (value) {
      this.setAttribute('dense', '');
    } else {
      this.removeAttribute('dense');
    }
  }

  get flat(): boolean {
    return this.hasAttribute('flat');
  }

  set flat(value: boolean) {
    if (value) {
      this.setAttribute('flat', '');
    } else {
      this.removeAttribute('flat');
    }
  }

  get outlined(): boolean {
    return this.hasAttribute('outlined');
  }

  set outlined(value: boolean) {
    if (value) {
      this.setAttribute('outlined', '');
    } else {
      this.removeAttribute('outlined');
    }
  }

  protected render() {
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
