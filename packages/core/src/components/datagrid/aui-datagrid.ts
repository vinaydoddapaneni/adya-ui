import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-datagrid.styles';

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
export class AuiDataGrid extends AuiElement {
  static get observedAttributes() {
    return ['page', 'page-size', 'show-pagination'];
  }

  private columns: AuiDataGridColumn[] = [];
  private rows: AuiDataGridRow[] = [];
  private sortField: string | null = null;
  private sortDirection: 'asc' | 'desc' = 'asc';
  private selectedRows: Set<number> = new Set();

  constructor() {
    super();
  }

  get page(): number {
    return parseInt(this.getAttribute('page') || '0', 10);
  }

  set page(val: number) {
    this.setAttribute('page', val.toString());
  }

  get pageSize(): number {
    return parseInt(this.getAttribute('page-size') || '10', 10);
  }

  set pageSize(val: number) {
    this.setAttribute('page-size', val.toString());
  }

  get showPagination(): boolean {
    return this.hasAttribute('show-pagination');
  }

  set showPagination(val: boolean) {
    if (val) {
      this.setAttribute('show-pagination', '');
    } else {
      this.removeAttribute('show-pagination');
    }
  }

  public setColumns(columns: AuiDataGridColumn[]) {
    this.columns = columns;
    this.render();
  }

  public setRows(rows: AuiDataGridRow[]) {
    this.rows = rows;
    this.render();
  }

  private handleSort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.sortRows();
    this.emit('sort', { field, direction: this.sortDirection });
    this.render();
  }

  private sortRows() {
    if (!this.sortField) return;

    this.rows.sort((a, b) => {
      const aVal = a[this.sortField!] as string | number;
      const bVal = b[this.sortField!] as string | number;

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  private handleRowClick(index: number) {
    if (this.selectedRows.has(index)) {
      this.selectedRows.delete(index);
    } else {
      this.selectedRows.add(index);
    }

    this.emit('row-select', { index, selected: this.selectedRows.has(index) });
    this.render();
  }

  private changePage(newPage: number) {
    const totalPages = Math.ceil(this.rows.length / this.pageSize);
    if (newPage < 0 || newPage >= totalPages) return;

    this.page = newPage;
    this.emit('page-change', { page: newPage });
    this.render();
  }

  private getPaginatedRows(): AuiDataGridRow[] {
    if (!this.showPagination) return this.rows;

    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    return this.rows.slice(start, end);
  }

  protected render() {
    const paginatedRows = this.getPaginatedRows();
    const totalPages = Math.ceil(this.rows.length / this.pageSize);

    const headersHTML = this.columns.map(col => {
      const isSorted = this.sortField === col.field;
      const sortIcon = isSorted ? (this.sortDirection === 'asc' ? '▲' : '▼') : '';

      return `
        <th 
          class="aui-datagrid__header-cell ${col.sortable ? 'aui-datagrid__header-cell--sortable' : ''}"
          data-field="${col.field}"
          style="${col.width ? `width: ${col.width}` : ''}"
        >
          ${col.header}
          ${col.sortable ? `<span class="aui-datagrid__sort-icon">${sortIcon}</span>` : ''}
        </th>
      `;
    }).join('');

    const rowsHTML = paginatedRows.map((row, index) => {
      const globalIndex = this.page * this.pageSize + index;
      const isSelected = this.selectedRows.has(globalIndex);

      const cellsHTML = this.columns.map(col => {
        return `<td class="aui-datagrid__cell">${row[col.field] ?? ''}</td>`;
      }).join('');

      return `
        <tr class="aui-datagrid__row ${isSelected ? 'aui-datagrid__row--selected' : ''}" data-index="${globalIndex}">
          ${cellsHTML}
        </tr>
      `;
    }).join('');

    const paginationHTML = this.showPagination ? `
      <div class="aui-datagrid__pagination">
        <div class="aui-datagrid__pagination-info">
          Showing ${this.page * this.pageSize + 1}-${Math.min((this.page + 1) * this.pageSize, this.rows.length)} of ${this.rows.length}
        </div>
        <div class="aui-datagrid__pagination-controls">
          <button class="aui-datagrid__pagination-button" data-action="first" ${this.page === 0 ? 'disabled' : ''}>First</button>
          <button class="aui-datagrid__pagination-button" data-action="prev" ${this.page === 0 ? 'disabled' : ''}>Previous</button>
          <button class="aui-datagrid__pagination-button" data-action="next" ${this.page >= totalPages - 1 ? 'disabled' : ''}>Next</button>
          <button class="aui-datagrid__pagination-button" data-action="last" ${this.page >= totalPages - 1 ? 'disabled' : ''}>Last</button>
        </div>
      </div>
    ` : '';

    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-datagrid">
        <table class="aui-datagrid__table">
          <thead class="aui-datagrid__header">
            <tr>${headersHTML}</tr>
          </thead>
          <tbody class="aui-datagrid__body">
            ${rowsHTML}
          </tbody>
        </table>
        ${paginationHTML}
      </div>
    `;

    // Add event listeners
    this._shadowRoot.querySelectorAll('.aui-datagrid__header-cell--sortable').forEach(header => {
      header.addEventListener('click', () => {
        const field = (header as HTMLElement).dataset.field || '';
        this.handleSort(field);
      });
    });

    this._shadowRoot.querySelectorAll('.aui-datagrid__row').forEach(row => {
      row.addEventListener('click', () => {
        const index = parseInt((row as HTMLElement).dataset.index || '0', 10);
        this.handleRowClick(index);
      });
    });

    this._shadowRoot.querySelectorAll('[data-action]').forEach(button => {
      button.addEventListener('click', () => {
        const action = (button as HTMLElement).dataset.action;
        switch (action) {
          case 'first':
            this.changePage(0);
            break;
          case 'prev':
            this.changePage(this.page - 1);
            break;
          case 'next':
            this.changePage(this.page + 1);
            break;
          case 'last':
            this.changePage(totalPages - 1);
            break;
        }
      });
    });
  }
}

if (!customElements.get('aui-datagrid')) {
  customElements.define('aui-datagrid', AuiDataGrid);
}
