import { AuiElement } from '../../base';

import { styles } from './aui-table.styles';
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
export class AuiTable extends AuiElement {
    static get observedAttributes() {
        return [
            'striped',
            'bordered',
            'hoverable',
            'selectable',
            'sortable',
            'paginated',
            'page-size',
            'current-page',
            'loading',
            'empty-message',
            'responsive',
        ];
    }
    constructor() {
        super();
        this._columns = [];
        this._data = [];
        this._selectedRows = new Set();
        this._sortState = { column: null, direction: null };
    }
    // Getters and Setters for attributes
    get striped() {
        return this.hasAttribute('striped');
    }
    set striped(value) {
        if (value) {
            this.setAttribute('striped', '');
        }
        else {
            this.removeAttribute('striped');
        }
    }
    get bordered() {
        return this.hasAttribute('bordered');
    }
    set bordered(value) {
        if (value) {
            this.setAttribute('bordered', '');
        }
        else {
            this.removeAttribute('bordered');
        }
    }
    get hoverable() {
        return this.hasAttribute('hoverable');
    }
    set hoverable(value) {
        if (value) {
            this.setAttribute('hoverable', '');
        }
        else {
            this.removeAttribute('hoverable');
        }
    }
    get selectable() {
        return this.hasAttribute('selectable');
    }
    set selectable(value) {
        if (value) {
            this.setAttribute('selectable', '');
        }
        else {
            this.removeAttribute('selectable');
        }
    }
    get sortable() {
        return this.hasAttribute('sortable');
    }
    set sortable(value) {
        if (value) {
            this.setAttribute('sortable', '');
        }
        else {
            this.removeAttribute('sortable');
        }
    }
    get paginated() {
        return this.hasAttribute('paginated');
    }
    set paginated(value) {
        if (value) {
            this.setAttribute('paginated', '');
        }
        else {
            this.removeAttribute('paginated');
        }
    }
    get pageSize() {
        return parseInt(this.getAttribute('page-size') || '10', 10);
    }
    set pageSize(value) {
        this.setAttribute('page-size', value.toString());
    }
    get currentPage() {
        return parseInt(this.getAttribute('current-page') || '1', 10);
    }
    set currentPage(value) {
        this.setAttribute('current-page', value.toString());
    }
    get loading() {
        return this.hasAttribute('loading');
    }
    set loading(value) {
        if (value) {
            this.setAttribute('loading', '');
        }
        else {
            this.removeAttribute('loading');
        }
    }
    get emptyMessage() {
        return this.getAttribute('empty-message') || 'No data available';
    }
    set emptyMessage(value) {
        this.setAttribute('empty-message', value);
    }
    get responsive() {
        return this.hasAttribute('responsive');
    }
    set responsive(value) {
        if (value) {
            this.setAttribute('responsive', '');
        }
        else {
            this.removeAttribute('responsive');
        }
    }
    // Property getters and setters
    get columns() {
        return this._columns;
    }
    set columns(value) {
        this._columns = value;
        this.render();
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
        this.render();
    }
    get selectedRows() {
        return Array.from(this._selectedRows);
    }
    set selectedRows(value) {
        this._selectedRows = new Set(value);
        this.render();
    }
    connectedCallback() {
        super.connectedCallback();
        this.render();
    }
    setupEventListeners() {
        // Sort handlers
        const headers = this._shadowRoot.querySelectorAll('th.sortable');
        headers.forEach((header) => {
            header.addEventListener('click', () => {
                const column = header.getAttribute('data-column');
                if (column) {
                    this.handleSort(column);
                }
            });
        });
        // Selection handlers
        const checkboxes = this._shadowRoot.querySelectorAll('.selection-checkbox');
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', (e) => {
                const target = e.target;
                this.handleRowSelection(index, target.checked);
            });
        });
        // Row click handlers
        const rows = this._shadowRoot.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            row.addEventListener('click', (e) => {
                const target = e.target;
                if (!target.classList.contains('selection-checkbox')) {
                    this.handleRowClick(index);
                }
            });
        });
        // Pagination handlers
        const prevButton = this._shadowRoot.querySelector('.pagination-prev');
        const nextButton = this._shadowRoot.querySelector('.pagination-next');
        const pageSizeSelect = this._shadowRoot.querySelector('.page-size-select');
        if (prevButton) {
            prevButton.addEventListener('click', () => this.previousPage());
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => this.nextPage());
        }
        if (pageSizeSelect) {
            pageSizeSelect.addEventListener('change', (e) => {
                const target = e.target;
                this.pageSize = parseInt(target.value, 10);
                this.currentPage = 1;
                this.render();
            });
        }
    }
    handleSort(column) {
        if (this._sortState.column === column) {
            // Toggle direction
            if (this._sortState.direction === 'asc') {
                this._sortState.direction = 'desc';
            }
            else if (this._sortState.direction === 'desc') {
                this._sortState.direction = null;
                this._sortState.column = null;
            }
            else {
                this._sortState.direction = 'asc';
            }
        }
        else {
            this._sortState.column = column;
            this._sortState.direction = 'asc';
        }
        this.emit('aui-sort', {
            column,
            direction: this._sortState.direction,
        });
        this.render();
    }
    handleRowSelection(index, selected) {
        if (selected) {
            this._selectedRows.add(index);
        }
        else {
            this._selectedRows.delete(index);
        }
        this.emit('aui-select', {
            selectedRows: this.selectedRows,
            index,
            selected,
        });
        this.render();
    }
    handleRowClick(index) {
        const row = this.getDisplayData()[index];
        this.emit('aui-row-click', { row, index });
    }
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.emit('aui-page-change', { page: this.currentPage });
            this.render();
        }
    }
    nextPage() {
        const totalPages = this.getTotalPages();
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.emit('aui-page-change', { page: this.currentPage });
            this.render();
        }
    }
    getSortedData() {
        if (!this._sortState.column || !this._sortState.direction) {
            return [...this._data];
        }
        const sorted = [...this._data].sort((a, b) => {
            const aVal = a[this._sortState.column];
            const bVal = b[this._sortState.column];
            if (aVal === bVal)
                return 0;
            if (aVal == null)
                return 1;
            if (bVal == null)
                return -1;
            const comparison = aVal < bVal ? -1 : 1;
            return this._sortState.direction === 'asc' ? comparison : -comparison;
        });
        return sorted;
    }
    getDisplayData() {
        const sorted = this.getSortedData();
        if (!this.paginated) {
            return sorted;
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return sorted.slice(start, end);
    }
    getTotalPages() {
        return Math.ceil(this._data.length / this.pageSize);
    }
    renderTableHeader() {
        if (this._columns.length === 0)
            return '';
        const selectionColumn = this.selectable
            ? '<th><input type="checkbox" class="selection-checkbox select-all" aria-label="Select all rows" /></th>'
            : '';
        const columnHeaders = this._columns
            .map((col) => {
            const isSortable = this.sortable && col.sortable === true;
            const isSorted = this._sortState.column === col.key;
            const sortIcon = isSorted && this._sortState.direction
                ? `<span class="sort-icon ${this._sortState.direction}"></span>`
                : '';
            const classes = [
                isSortable ? 'sortable' : '',
                isSorted ? 'sorted' : '',
                col.align ? `align-${col.align}` : '',
            ]
                .filter(Boolean)
                .join(' ');
            return `
          <th 
            class="${classes}" 
            data-column="${col.key}"
            style="${col.width ? `width: ${col.width}` : ''}"
            ${isSortable ? 'role="button" tabindex="0"' : ''}
            aria-sort="${isSorted ? this._sortState.direction : 'none'}"
          >
            ${col.label}
            ${sortIcon}
          </th>
        `;
        })
            .join('');
        return `
      <thead>
        <tr>
          ${selectionColumn}
          ${columnHeaders}
        </tr>
      </thead>
    `;
    }
    renderTableBody() {
        const displayData = this.getDisplayData();
        if (displayData.length === 0) {
            const colspan = this._columns.length + (this.selectable ? 1 : 0);
            return `
        <tbody>
          <tr>
            <td colspan="${colspan}" class="aui-table-empty">
              ${this.emptyMessage}
            </td>
          </tr>
        </tbody>
      `;
        }
        const rows = displayData
            .map((row, index) => {
            const isSelected = this._selectedRows.has(index);
            const selectionCell = this.selectable
                ? `<td><input type="checkbox" class="selection-checkbox" ${isSelected ? 'checked' : ''} aria-label="Select row ${index + 1}" /></td>`
                : '';
            const cells = this._columns
                .map((col) => {
                const value = row[col.key];
                const content = col.render ? col.render(value, row) : String(value ?? '');
                const align = col.align ? `align-${col.align}` : '';
                return `<td class="${align}">${content}</td>`;
            })
                .join('');
            return `
          <tr class="${isSelected ? 'selected' : ''}" data-index="${index}">
            ${selectionCell}
            ${cells}
          </tr>
        `;
        })
            .join('');
        return `<tbody>${rows}</tbody>`;
    }
    renderPagination() {
        if (!this.paginated)
            return '';
        const totalPages = this.getTotalPages();
        const start = (this.currentPage - 1) * this.pageSize + 1;
        const end = Math.min(this.currentPage * this.pageSize, this._data.length);
        return `
      <div class="aui-table-pagination">
        <div class="pagination-info">
          Showing ${start} to ${end} of ${this._data.length} entries
        </div>
        <div class="pagination-controls">
          <label>
            Rows per page:
            <select class="page-size-select">
              <option value="5" ${this.pageSize === 5 ? 'selected' : ''}>5</option>
              <option value="10" ${this.pageSize === 10 ? 'selected' : ''}>10</option>
              <option value="25" ${this.pageSize === 25 ? 'selected' : ''}>25</option>
              <option value="50" ${this.pageSize === 50 ? 'selected' : ''}>50</option>
            </select>
          </label>
          <button 
            class="pagination-button pagination-prev" 
            ${this.currentPage === 1 ? 'disabled' : ''}
            aria-label="Previous page"
          >
            Previous
          </button>
          <span>Page ${this.currentPage} of ${totalPages}</span>
          <button 
            class="pagination-button pagination-next" 
            ${this.currentPage === totalPages ? 'disabled' : ''}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>
    `;
    }
    render() {
        const loadingOverlay = this.loading
            ? '<div class="loading-overlay"><div class="loading-spinner"></div></div>'
            : '';
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-table-container ${this.loading ? 'aui-table-loading' : ''}">
        ${loadingOverlay}
        <table class="aui-table" role="table">
          ${this.renderTableHeader()}
          ${this.renderTableBody()}
        </table>
        ${this.renderPagination()}
      </div>
    `;
        this.setupEventListeners();
    }
}
// Register the custom element
if (!customElements.get('aui-table')) {
    customElements.define('aui-table', AuiTable);
}
//# sourceMappingURL=aui-table.js.map