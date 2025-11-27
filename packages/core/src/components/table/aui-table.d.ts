import { AuiElement } from '../../base';
export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
    render?: (value: unknown, row: Record<string, unknown>) => string;
}
export type SortDirection = 'asc' | 'desc' | null;
export interface SortState {
    column: string | null;
    direction: SortDirection;
}
/**
 * AuiTable - A comprehensive table component with sorting, pagination, and selection
 *
 * @element aui-table
 *
 * @attr {boolean} striped - Alternating row colors
 * @attr {boolean} bordered - Show borders around cells
 * @attr {boolean} hoverable - Highlight rows on hover
 * @attr {boolean} selectable - Enable row selection
 * @attr {boolean} sortable - Enable column sorting
 * @attr {boolean} paginated - Enable pagination
 * @attr {number} page-size - Number of rows per page (default: 10)
 * @attr {number} current-page - Current page number (default: 1)
 * @attr {boolean} loading - Show loading state
 * @attr {string} empty-message - Message when no data
 * @attr {boolean} responsive - Enable responsive mode
 *
 * @fires aui-sort - Emitted when column is sorted
 * @fires aui-select - Emitted when row is selected
 * @fires aui-page-change - Emitted when page changes
 * @fires aui-row-click - Emitted when row is clicked
 */
export declare class AuiTable extends AuiElement {
    private _columns;
    private _data;
    private _selectedRows;
    private _sortState;
    static get observedAttributes(): string[];
    constructor();
    get striped(): boolean;
    set striped(value: boolean);
    get bordered(): boolean;
    set bordered(value: boolean);
    get hoverable(): boolean;
    set hoverable(value: boolean);
    get selectable(): boolean;
    set selectable(value: boolean);
    get sortable(): boolean;
    set sortable(value: boolean);
    get paginated(): boolean;
    set paginated(value: boolean);
    get pageSize(): number;
    set pageSize(value: number);
    get currentPage(): number;
    set currentPage(value: number);
    get loading(): boolean;
    set loading(value: boolean);
    get emptyMessage(): string;
    set emptyMessage(value: string);
    get responsive(): boolean;
    set responsive(value: boolean);
    get columns(): TableColumn[];
    set columns(value: TableColumn[]);
    get data(): Record<string, unknown>[];
    set data(value: Record<string, unknown>[]);
    get selectedRows(): number[];
    set selectedRows(value: number[]);
    connectedCallback(): void;
    private setupEventListeners;
    private handleSort;
    private handleRowSelection;
    private handleRowClick;
    private previousPage;
    private nextPage;
    private getSortedData;
    private getDisplayData;
    private getTotalPages;
    private renderTableHeader;
    private renderTableBody;
    private renderPagination;
    protected render(): void;
}
//# sourceMappingURL=aui-table.d.ts.map