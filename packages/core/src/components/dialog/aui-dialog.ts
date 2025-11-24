import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-dialog.styles';

/**
 * AuiDialog - A modal dialog component
 * 
 * @element aui-dialog
 * 
 * @attr {boolean} open - Whether the dialog is open
 * @attr {string} headline - Dialog headline
 * 
 * @slot - Default slot for content
 * @slot actions - Slot for action buttons
 * 
 * @fires close - Emitted when dialog is closed
 */
export class AuiDialog extends AuiElement {
  static get observedAttributes() {
    return ['open', 'headline'];
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

  get headline(): string {
    return this.getAttribute('headline') || '';
  }

  set headline(value: string) {
    this.setAttribute('headline', value);
  }

  protected render() {
    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-dialog__backdrop">
        <div class="aui-dialog" role="dialog" aria-modal="true">
          ${this.headline ? `
            <div class="aui-dialog__header">
              <h2 class="aui-dialog__headline">${this.headline}</h2>
            </div>
          ` : ''}
          <div class="aui-dialog__content">
            <slot></slot>
          </div>
          <div class="aui-dialog__actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    const backdrop = this._shadowRoot.querySelector('.aui-dialog__backdrop');
    if (!backdrop) return;

    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        this.close();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.open) {
        this.close();
      }
    });
  }

  close() {
    this.open = false;
    this.emit('close');
  }
}

if (!customElements.get('aui-dialog')) {
  customElements.define('aui-dialog', AuiDialog);
}
