import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-alert.styles';

export type AuiAlertSeverity = 'success' | 'info' | 'warning' | 'error';
export type AuiAlertVariant = 'filled' | 'outlined' | 'standard';

/**
 * AuiAlert - A feedback component
 * 
 * @element aui-alert
 * 
 * @attr {string} severity - Alert severity: 'success' | 'info' | 'warning' | 'error'
 * @attr {string} variant - Alert variant: 'filled' | 'outlined' | 'standard'
 * 
 * @slot - Default slot for content
 * @slot icon - Slot for custom icon
 * @slot title - Slot for alert title
 */
export class AuiAlert extends AuiElement {
  static get observedAttributes() {
    return ['severity', 'variant'];
  }

  get severity(): AuiAlertSeverity {
    return (this.getAttribute('severity') as AuiAlertSeverity) || 'success';
  }

  set severity(value: AuiAlertSeverity) {
    this.setAttribute('severity', value);
  }

  get variant(): AuiAlertVariant {
    return (this.getAttribute('variant') as AuiAlertVariant) || 'standard';
  }

  set variant(value: AuiAlertVariant) {
    this.setAttribute('variant', value);
  }

  protected render() {
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-alert aui-alert--${this.variant} aui-alert--${this.severity}" role="alert">
        <div class="aui-alert__icon">
          <slot name="icon">
            ${this.getDefaultIcon()}
          </slot>
        </div>
        <div class="aui-alert__content">
          <slot name="title"></slot>
          <slot></slot>
        </div>
      </div>
    `;
  }

  private getDefaultIcon(): string {
    switch (this.severity) {
      case 'success':
        return `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
      case 'info':
        return `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
      case 'warning':
        return `<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
      case 'error':
        return `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
      default:
        return '';
    }
  }
}

if (!customElements.get('aui-alert')) {
  customElements.define('aui-alert', AuiAlert);
}
