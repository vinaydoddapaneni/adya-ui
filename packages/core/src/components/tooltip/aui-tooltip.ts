import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-tooltip.styles';

export type AuiTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * AuiTooltip - A component that displays informative text when hovering over an element
 * 
 * @element aui-tooltip
 * 
 * @attr {string} content - The tooltip content
 * @attr {string} placement - Tooltip placement: 'top' | 'bottom' | 'left' | 'right'
 * @attr {boolean} open - Whether the tooltip is manually open
 * @attr {boolean} disabled - Whether the tooltip is disabled
 * 
 * @slot - Default slot for the trigger element
 */
export class AuiTooltip extends AuiElement {
  static get observedAttributes() {
    return ['content', 'placement', 'open', 'disabled'];
  }

  private _hoverOpen = false;
  private _focusOpen = false;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  get content(): string {
    return this.getAttribute('content') || '';
  }

  set content(value: string) {
    this.setAttribute('content', value);
    this.render();
  }

  get placement(): AuiTooltipPlacement {
    return (this.getAttribute('placement') as AuiTooltipPlacement) || 'top';
  }

  set placement(value: AuiTooltipPlacement) {
    this.setAttribute('placement', value);
    this.render();
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
    this.requestUpdate();
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
    this.requestUpdate();
  }

  private get isOpen(): boolean {
    return this.open || ((this._hoverOpen || this._focusOpen) && !this.disabled);
  }

  private setupEventListeners() {
    const trigger = this.shadowRoot?.querySelector('.aui-tooltip__trigger');
    if (trigger) {
      trigger.addEventListener('mouseenter', this.handleMouseEnter);
      trigger.addEventListener('mouseleave', this.handleMouseLeave);
      trigger.addEventListener('focusin', this.handleFocusIn);
      trigger.addEventListener('focusout', this.handleFocusOut);
    }
  }

  private removeEventListeners() {
    const trigger = this.shadowRoot?.querySelector('.aui-tooltip__trigger');
    if (trigger) {
      trigger.removeEventListener('mouseenter', this.handleMouseEnter);
      trigger.removeEventListener('mouseleave', this.handleMouseLeave);
      trigger.removeEventListener('focusin', this.handleFocusIn);
      trigger.removeEventListener('focusout', this.handleFocusOut);
    }
  }

  private handleMouseEnter = () => {
    this._hoverOpen = true;
    this.requestUpdate();
  };

  private handleMouseLeave = () => {
    this._hoverOpen = false;
    this.requestUpdate();
  };

  private handleFocusIn = () => {
    this._focusOpen = true;
    this.requestUpdate();
  };

  private handleFocusOut = () => {
    this._focusOpen = false;
    this.requestUpdate();
  };

  private requestUpdate() {
    const tooltip = this.shadowRoot?.querySelector('.aui-tooltip');
    if (tooltip) {
      if (this.isOpen) {
        tooltip.classList.add('aui-tooltip--open');
      } else {
        tooltip.classList.remove('aui-tooltip--open');
      }
    }
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'open' || name === 'disabled') {
      this.requestUpdate();
    }
  }

  protected render() {
    const openClass = this.isOpen ? 'aui-tooltip--open' : '';

    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-tooltip ${openClass}">
        <div class="aui-tooltip__trigger">
          <slot></slot>
        </div>
        <div class="aui-tooltip__content" role="tooltip">
          ${this.content}
        </div>
      </div>
    `;
    
    // Re-attach listeners because innerHTML replaced the elements
    this.setupEventListeners();
  }
}

if (!customElements.get('aui-tooltip')) {
  customElements.define('aui-tooltip', AuiTooltip);
}
