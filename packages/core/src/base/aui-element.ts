/**
 * Base class for all AdyaUI Web Components
 * Provides common functionality like theming, accessibility, and lifecycle management
 */
export class AuiElement extends HTMLElement {
  protected _internals: ElementInternals | null = null;
  protected _shadowRoot: ShadowRoot;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    
    // Enable form participation if supported
    // Enable form participation if supported
    if ('attachInternals' in this && (this.constructor as any).formAssociated) {
      this._internals = this.attachInternals();
    }
  }

  /**
   * Called when element is connected to DOM
   */
  connectedCallback(): void {
    this.render();
  }

  /**
   * Called when element is disconnected from DOM
   */
  disconnectedCallback(): void {
    // Cleanup logic can be added here
  }

  /**
   * Called when attributes change
   */
  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  /**
   * Render the component
   * Override this method in subclasses
   */
  protected render(): void {
    // To be implemented by subclasses
  }

  /**
   * Emit a custom event
   */
  protected emit<T = unknown>(eventName: string, detail?: T): boolean {
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
  protected $(selector: string): HTMLElement | null {
    return this._shadowRoot.querySelector(selector);
  }

  /**
   * Query selector all within shadow DOM
   */
  protected $$(selector: string): NodeListOf<HTMLElement> {
    return this._shadowRoot.querySelectorAll(selector);
  }
}
