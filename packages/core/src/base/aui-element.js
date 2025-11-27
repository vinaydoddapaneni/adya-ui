/**
 * Base class for all AdyaUI Web Components
 * Provides common functionality like theming, accessibility, and lifecycle management
 */
export class AuiElement extends HTMLElement {
    constructor() {
        super();
        this._internals = null;
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        // Enable form participation if supported
        // Enable form participation if supported
        if ('attachInternals' in this && this.constructor.formAssociated) {
            this._internals = this.attachInternals();
        }
    }
    /**
     * Called when element is connected to DOM
     */
    connectedCallback() {
        this.render();
    }
    /**
     * Called when element is disconnected from DOM
     */
    disconnectedCallback() {
        // Cleanup logic can be added here
    }
    /**
     * Called when attributes change
     */
    attributeChangedCallback(_name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
    /**
     * Render the component
     * Override this method in subclasses
     */
    render() {
        // To be implemented by subclasses
    }
    /**
     * Emit a custom event
     */
    emit(eventName, detail) {
        const event = new CustomEvent(eventName, {
            detail,
            bubbles: true,
            composed: true,
            cancelable: true,
        });
        return this.dispatchEvent(event);
    }
    /**
     * Query selector within shadow DOM
     */
    $(selector) {
        return this._shadowRoot.querySelector(selector);
    }
    /**
     * Query selector all within shadow DOM
     */
    $$(selector) {
        return this._shadowRoot.querySelectorAll(selector);
    }
}
//# sourceMappingURL=aui-element.js.map