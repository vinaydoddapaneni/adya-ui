import { AuiElement } from '../../base/aui-element';
/**
 * AuiPagination - A pagination component
 *
 * @element aui-pagination
 *
 * @attr {number} page - Current page (1-indexed)
 * @attr {number} total - Total number of pages
 * @attr {number} siblings - Number of sibling pages to show on each side
 * @attr {boolean} show-first-last - Whether to show first/last buttons
 *
 * @fires change - Emitted when page changes
 */
export declare class AuiPagination extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    get page(): number;
    set page(val: number);
    get total(): number;
    set total(val: number);
    get siblings(): number;
    set siblings(val: number);
    get showFirstLast(): boolean;
    set showFirstLast(val: boolean);
    private handlePageClick;
    private getPageNumbers;
    protected render(): void;
}
//# sourceMappingURL=aui-pagination.d.ts.map