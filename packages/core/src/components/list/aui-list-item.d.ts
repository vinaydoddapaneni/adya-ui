import { AuiElement } from '../../base/aui-element';
/**
 * AuiListItem - A single item in a list
 *
 * @element aui-list-item
 *
 * @attr {boolean} disabled - Whether the item is disabled
 * @attr {boolean} selected - Whether the item is selected
 * @attr {string} href - URL to navigate to (optional)
 *
 * @slot - Default slot for item content
 * @slot icon - Slot for item icon (start)
 * @slot secondary - Slot for secondary text
 */
export declare class AuiListItem extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    get disabled(): boolean;
    set disabled(val: boolean);
    get selected(): boolean;
    set selected(val: boolean);
    get href(): string;
    set href(val: string);
    private handleClick;
    protected render(): void;
}
//# sourceMappingURL=aui-list-item.d.ts.map