import { AuiElement } from '../../base/aui-element';
export type AuiDrawerPlacement = 'start' | 'end' | 'top' | 'bottom';
/**
 * AuiDrawer - A navigation component that slides in from the side
 *
 * @element aui-drawer
 *
 * @attr {boolean} open - Whether the drawer is open
 * @attr {string} placement - Drawer placement: 'start' | 'end' | 'top' | 'bottom'
 * @attr {string} label - The accessible label for the drawer
 * @attr {boolean} no-overlay - Whether to hide the overlay
 *
 * @slot - Default slot for content (body)
 * @slot header - Slot for header content
 * @slot footer - Slot for footer content
 * @slot label - Slot for title/label
 *
 * @fires close - Emitted when the drawer is closed
 * @fires show - Emitted when the drawer is shown
 * @fires hide - Emitted when the drawer is hidden
 */
export declare class AuiDrawer extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    get open(): boolean;
    set open(value: boolean);
    get placement(): AuiDrawerPlacement;
    set placement(value: AuiDrawerPlacement);
    get label(): string;
    set label(value: string);
    get noOverlay(): boolean;
    set noOverlay(value: boolean);
    attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void;
    close(): void;
    show(): void;
    private handleOverlayClick;
    protected render(): void;
    private setupEventListeners;
}
//# sourceMappingURL=aui-drawer.d.ts.map