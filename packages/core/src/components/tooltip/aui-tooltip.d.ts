import { AuiElement } from '../../base/aui-element';
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
export declare class AuiTooltip extends AuiElement {
    static get observedAttributes(): string[];
    private _hoverOpen;
    private _focusOpen;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    get content(): string;
    set content(value: string);
    get placement(): AuiTooltipPlacement;
    set placement(value: AuiTooltipPlacement);
    get open(): boolean;
    set open(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    private get isOpen();
    private setupEventListeners;
    private removeEventListeners;
    private handleMouseEnter;
    private handleMouseLeave;
    private handleFocusIn;
    private handleFocusOut;
    private requestUpdate;
    attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void;
    protected render(): void;
}
//# sourceMappingURL=aui-tooltip.d.ts.map