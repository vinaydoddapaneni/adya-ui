import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-stepper.styles';
/**
 * AuiStepper - A stepper component for multi-step processes
 *
 * @element aui-stepper
 *
 * @attr {number} active - Active step index (0-based)
 * @attr {string} orientation - Stepper orientation: 'horizontal' | 'vertical'
 *
 * @slot - Default slot for step elements
 *
 * @fires step-change - Emitted when active step changes
 */
export class AuiStepper extends AuiElement {
    static get observedAttributes() {
        return ['active', 'orientation'];
    }
    constructor() {
        super();
    }
    get active() {
        return parseInt(this.getAttribute('active') || '0', 10);
    }
    set active(val) {
        this.setAttribute('active', val.toString());
    }
    get orientation() {
        return this.getAttribute('orientation') || 'horizontal';
    }
    set orientation(val) {
        this.setAttribute('orientation', val);
    }
    getSteps() {
        return Array.from(this.querySelectorAll('aui-step'));
    }
    handleStepClick(index) {
        this.active = index;
        this.emit('step-change', { step: index });
    }
    render() {
        const steps = this.getSteps();
        const active = this.active;
        let stepsHTML = '';
        steps.forEach((step, index) => {
            const isActive = index === active;
            const isCompleted = index < active;
            const label = step.getAttribute('label') || `Step ${index + 1}`;
            const description = step.getAttribute('description') || '';
            const stepClass = `aui-stepper__step ${isActive ? 'aui-stepper__step--active' : ''} ${isCompleted ? 'aui-stepper__step--completed' : ''}`;
            stepsHTML += `
        <div class="${stepClass}">
          <div class="aui-stepper__step-header" data-index="${index}">
            <div class="aui-stepper__step-icon">
              ${isCompleted ? '✓' : index + 1}
            </div>
            <div class="aui-stepper__step-label">
              <div class="aui-stepper__step-title">${label}</div>
              ${description ? `<div class="aui-stepper__step-description">${description}</div>` : ''}
            </div>
          </div>
          ${index < steps.length - 1 ? '<div class="aui-stepper__step-connector"></div>' : ''}
          ${this.orientation === 'vertical' && isActive ? `
            <div class="aui-stepper__step-content">
              <slot name="step-${index}"></slot>
            </div>
          ` : ''}
        </div>
      `;
        });
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-stepper">
        ${stepsHTML}
      </div>
    `;
        // Add click listeners
        this._shadowRoot.querySelectorAll('[data-index]').forEach(header => {
            header.addEventListener('click', () => {
                const index = parseInt(header.dataset.index || '0', 10);
                this.handleStepClick(index);
            });
        });
    }
}
if (!customElements.get('aui-stepper')) {
    customElements.define('aui-stepper', AuiStepper);
}
//# sourceMappingURL=aui-stepper.js.map