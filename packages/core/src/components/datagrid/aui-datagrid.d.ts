import { AuiElement } from '../../base/aui-element';
export interface AuiDataGridColumn {
    field: string;
    header: string;
    sortable?: boolean;
    width?: string;
}
export interface AuiDataGridRow {
    [key: string]: unknown;
}
/**
 * AuiDataGrid - An advanced data grid component
 *
 * @element aui-datagrid
 *
 * @attr {number} page - Current page (0-based)
 * @attr {number} page-size - Number of rows per page
 * @attr {boolean} show-pagination - Show pagination controls
 *
 * @fires sort - Emitted when column is sorted
 * @fires page-change - Emitted when page changes
 * @fires row-select - Emitted when row is selected
 */
export declare class AuiDataGrid extends AuiElement {
    static get observedAttributes(): string[];
    private columns;
    private rows;
    private sortField;
    private sortDirection;
    private selectedRows;
    constructor();
    get page(): number;
    set page(val: number);
    get pageSize(): number;
    set pageSize(val: number);
    get showPagination(): boolean;
    set showPagination(val: boolean);
    setColumns(columns: AuiDataGridColumn[]): void;
    setRows(rows: AuiDataGridRow[]): void;
    private handleSort;
    private sortRows;
    private handleRowClick;
    private changePage;
    private getPaginatedRows;
    protected render(): void;
}
//# sourceMappingURL=aui-datagrid.d.ts.map