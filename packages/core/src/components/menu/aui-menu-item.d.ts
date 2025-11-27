import { AuiElement } from '../../base/aui-element';
export declare const styles: string;
/**
 * AuiMenuItem - A single item in a menu
 *
 * @element aui-menu-item
 *
 * @attr {string} value - The value of the item
 * @attr {boolean} disabled - Whether the item is disabled
 * @attr {boolean} selected - Whether the item is selected
 *
 * @slot - Default slot for item label
 * @slot icon - Slot for item icon
 */
export declare class AuiMenuItem extends AuiElement {
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
//# sourceMappingURL=aui-menu-item.d.ts.map