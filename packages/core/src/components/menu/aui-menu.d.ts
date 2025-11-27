import { AuiElement } from '../../base/aui-element';
export type AuiMenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
/**
 * AuiMenu - A dropdown menu component
 *
 * @element aui-menu
 *
 * @attr {boolean} open - Whether the menu is open
 * @attr {string} placement - Menu placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
 *
 * @slot trigger - Slot for the menu trigger element
 * @slot - Default slot for menu items
 *
 * @fires open - Emitted when the menu is opened
 * @fires close - Emitted when the menu is closed
 */
export declare class AuiMenu extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    get open(): boolean;
    set open(value: boolean);
    get placement(): AuiMenuPlacement;
    set placement(value: AuiMenuPlacement);
    attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void;
    private handleDocumentClick;
    private handleDocumentKeydown;
    protected render(): void;
}
//# sourceMappingURL=aui-menu.d.ts.map