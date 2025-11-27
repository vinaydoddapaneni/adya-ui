import { AuiElement } from '../../base/aui-element';
export type AuiTabsVariant = 'standard' | 'contained';
export type AuiTabsOrientation = 'horizontal' | 'vertical';
/**
 * AuiTabs - A component for switching between different views
 *
 * @element aui-tabs
 *
 * @attr {string} value - The value of the currently selected tab
 * @attr {string} variant - Tabs variant: 'standard' | 'contained'
 * @attr {string} orientation - Tabs orientation: 'horizontal' | 'vertical'
 *
 * @slot - Default slot for tabs and panels
 *
 * @fires change - Emitted when the selected tab changes
 */
export declare class AuiTabs extends AuiElement {
    static get observedAttributes(): string[];
    private indicator;
    private nav;
    private mutationObserver;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    get value(): string;
    set value(val: string);
    get variant(): AuiTabsVariant;
    set variant(val: AuiTabsVariant);
    get orientation(): AuiTabsOrientation;
    set orientation(val: AuiTabsOrientation);
    attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void;
    private setupMutationObserver;
    private handleResize;
    private getAllTabs;
    private getAllPanels;
    private updateSelection;
    private updateIndicator;
    private handleTabClick;
    protected render(): void;
}
//# sourceMappingURL=aui-tabs.d.ts.map