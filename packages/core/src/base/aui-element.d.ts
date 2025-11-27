/**
 * Base class for all AdyaUI Web Components
 * Provides common functionality like theming, accessibility, and lifecycle management
 */
export declare class AuiElement extends HTMLElement {
    protected _internals: ElementInternals | null;
    protected _shadowRoot: ShadowRoot;
    constructor();
    /**
     * Called when element is connected to DOM
     */
    connectedCallback(): void;
    /**
     * Called when element is disconnected from DOM
     */
    disconnectedCallback(): void;
    /**
     * Called when attributes change
     */
    attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void;
    /**
     * Render the component
     * Override this method in subclasses
     */
    protected render(): void;
    /**
     * Emit a custom event
     */
    protected emit<T = unknown>(eventName: string, detail?: T): boolean;
    /**
     * Query selector within shadow DOM
     */
    protected $(selector: string): HTMLElement | null;
    /**
     * Query selector all within shadow DOM
     */
    protected $$(selector: string): NodeListOf<HTMLElement>;
}
//# sourceMappingURL=aui-element.d.ts.map