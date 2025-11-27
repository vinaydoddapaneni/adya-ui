import { AuiElement } from '../../base/aui-element';
/**
 * AuiStep - A single step in a stepper
 *
 * @element aui-step
 *
 * @attr {string} label - Step label
 * @attr {string} description - Step description (optional)
 *
 * @slot - Default slot for step content
 */
export class AuiStep extends AuiElement {
    static get observedAttributes() {
        return ['label', 'description'];
    }
    constructor() {
        super();
    }
    get label() {
        return this.getAttribute('label') || '';
    }
    set label(val) {
        this.setAttribute('label', val);
    }
    get description() {
        return this.getAttribute('description') || '';
    }
    set description(val) {
        this.setAttribute('description', val);
    }
    render() {
        // Step content is managed by the parent stepper
        this._shadowRoot.innerHTML = `<slot></slot>`;
    }
}
if (!customElements.get('aui-step')) {
    customElements.define('aui-step', AuiStep);
}
//# sourceMappingURL=aui-step.js.map