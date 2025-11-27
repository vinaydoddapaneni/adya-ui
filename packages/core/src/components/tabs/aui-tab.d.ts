import { AuiElement } from '../../base/aui-element';
export declare const styles: string;
/**
 * AuiTab - A single tab component
 *
 * @element aui-tab
 *
 * @attr {string} value - The value of the tab
 * @attr {boolean} disabled - Whether the tab is disabled
 * @attr {boolean} selected - Whether the tab is selected
 *
 * @slot - Default slot for tab label
 */
export declare class AuiTab extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    get value(): string;
    set value(val: string);
    get disabled(): boolean;
    set disabled(val: boolean);
    get selected(): boolean;
    set selected(val: boolean);
    protected render(): void;
}
//# sourceMappingURL=aui-tab.d.ts.map