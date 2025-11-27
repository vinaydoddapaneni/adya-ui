import { AuiElement } from '../../base/aui-element';
export declare const styles: string;
/**
 * AuiTabPanel - A panel for tab content
 *
 * @element aui-tab-panel
 *
 * @attr {string} value - The value corresponding to the tab
 *
 * @slot - Default slot for panel content
 */
export declare class AuiTabPanel extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    get value(): string;
    set value(val: string);
    protected render(): void;
}
//# sourceMappingURL=aui-tab-panel.d.ts.map