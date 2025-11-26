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
 * @attr {boolean} dismissible - Whether the alert can be dismissed
 * @attr {boolean} open - Whether the alert is visible
 * @attr {string} title - Alert title
 * @attr {number} duration - Auto-dismiss duration in milliseconds
 * 
 * @slot - Default slot for content
 * @slot icon - Slot for custom icon
 * @slot title - Slot for alert title
 * @slot action - Slot for action buttons
 * 
 * @fires close - Emitted when the alert is closed
 * @fires show - Emitted when the alert is shown
 * @fires hide - Emitted when the alert is hidden
 */
export class AuiAlert extends AuiElement {
  private autoDismissTimer: number | null = null;

  static get observedAttributes() {
    return ['severity', 'variant', 'dismissible', 'open', 'title', 'duration'];
  }

  constructor() {
    super();
    // Default to open
    if (!this.hasAttribute('open')) {
      this.setAttribute('open', '');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleAutoDismiss();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearAutoDismissTimer();
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
    super.attributeChangedCallback(name, oldVal, newVal);
    
    if (name === 'open') {
      if (this.open) {
        this.emit('show');
        this.handleAutoDismiss();
      } else {
        this.emit('hide');
        this.clearAutoDismissTimer();
      }
    }

    if (name === 'duration') {
      this.handleAutoDismiss();
    }
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

  get dismissible(): boolean {
    return this.hasAttribute('dismissible');
  }

  set dismissible(value: boolean) {
    if (value) {
      this.setAttribute('dismissible', '');
    } else {
      this.removeAttribute('dismissible');
    }
  }

  get open(): boolean {
    return this.hasAttribute('open');
  }

  set open(value: boolean) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get title(): string {
    return this.getAttribute('title') || '';
  }

  set title(value: string) {
    this.setAttribute('title', value);
  }

  get duration(): number {
    const val = this.getAttribute('duration');
    return val ? parseInt(val, 10) : 0;
  }

  set duration(value: number) {
    this.setAttribute('duration', value.toString());
  }

  close() {
    this.open = false;
    this.emit('close');
  }

  show() {
    this.open = true;
  }

  private handleAutoDismiss() {
    this.clearAutoDismissTimer();
    if (this.open && this.duration > 0) {
      this.autoDismissTimer = window.setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  private clearAutoDismissTimer() {
    if (this.autoDismissTimer) {
      clearTimeout(this.autoDismissTimer);
      this.autoDismissTimer = null;
    }
  }

  protected render() {
    const variantClass = `aui-alert--${this.variant}`;
    const severityClass = `aui-alert--${this.severity}`;
    const openClass = this.open ? 'aui-alert--open' : '';

    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div 
        class="aui-alert ${variantClass} ${severityClass} ${openClass}" 
        role="alert"
        aria-hidden="${!this.open}"
      >
        <div class="aui-alert__icon">
          <slot name="icon">
            ${this.getDefaultIcon()}
          </slot>
        </div>
        <div class="aui-alert__content">
          ${this.title ? `<div class="aui-alert__title"><slot name="title">${this.title}</slot></div>` : '<slot name="title"></slot>'}
          <div class="aui-alert__message">
            <slot></slot>
          </div>
        </div>
        <div class="aui-alert__action">
          <slot name="action"></slot>
          ${this.dismissible ? `
            <button 
              class="aui-alert__close-button" 
              type="button" 
              aria-label="Close alert"
            >
              <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    const closeButton = this._shadowRoot.querySelector('.aui-alert__close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }
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
