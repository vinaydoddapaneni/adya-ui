import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuiTable } from './aui-table';

// Register the element if not already registered
if (!customElements.get('aui-table')) {
  customElements.define('aui-table', AuiTable);
}

describe('AuiTable', () => {
  let element: AuiTable;

  const sampleColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true, align: 'right' as const },
    { key: 'email', label: 'Email' },
  ];

  const sampleData = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
  ];

  beforeEach(() => {
    element = document.createElement('aui-table') as AuiTable;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe('Rendering', () => {
    it('renders with default attributes', () => {
      expect(element.striped).toBe(false);
      expect(element.bordered).toBe(false);
      expect(element.hoverable).toBe(false);
      expect(element.selectable).toBe(false);
      expect(element.sortable).toBe(false);
      expect(element.paginated).toBe(false);
      expect(element.loading).toBe(false);
      expect(element.responsive).toBe(false);
    });

    it('renders empty state when no data', () => {
      element.columns = sampleColumns;
      element.data = [];
      
      const emptyCell = element.shadowRoot!.querySelector('.aui-table-empty');
      expect(emptyCell).toBeTruthy();
      expect(emptyCell!.textContent).toContain('No data available');
    });

    it('renders custom empty message', () => {
      element.columns = sampleColumns;
      element.data = [];
      element.emptyMessage = 'Custom empty message';
      
      const emptyCell = element.shadowRoot!.querySelector('.aui-table-empty');
      expect(emptyCell!.textContent).toContain('Custom empty message');
    });

    it('renders table with data', () => {
      element.columns = sampleColumns;
      element.data = sampleData;
      
      const rows = element.shadowRoot!.querySelectorAll('tbody tr');
      expect(rows.length).toBe(3);
    });

    it('renders correct number of columns', () => {
      element.columns = sampleColumns;
      element.data = sampleData;
      
      const headers = element.shadowRoot!.querySelectorAll('thead th');
      expect(headers.length).toBe(3);
    });
  });

  describe('Attributes', () => {
    it('reflects striped attribute', () => {
      element.striped = true;
      expect(element.hasAttribute('striped')).toBe(true);
      
      element.striped = false;
      expect(element.hasAttribute('striped')).toBe(false);
    });

    it('reflects bordered attribute', () => {
      element.bordered = true;
      expect(element.hasAttribute('bordered')).toBe(true);
    });

    it('reflects hoverable attribute', () => {
      element.hoverable = true;
      expect(element.hasAttribute('hoverable')).toBe(true);
    });

    it('reflects selectable attribute', () => {
      element.selectable = true;
      expect(element.hasAttribute('selectable')).toBe(true);
    });

    it('reflects loading attribute', () => {
      element.loading = true;
      expect(element.hasAttribute('loading')).toBe(true);
      
      const loadingOverlay = element.shadowRoot!.querySelector('.loading-overlay');
      expect(loadingOverlay).toBeTruthy();
    });
  });

  describe('Pagination', () => {
    it('shows pagination when paginated is true', () => {
      element.columns = sampleColumns;
      element.data = sampleData;
      element.paginated = true;
      
      const pagination = element.shadowRoot!.querySelector('.aui-table-pagination');
      expect(pagination).toBeTruthy();
    });

    it('hides pagination when paginated is false', () => {
      element.columns = sampleColumns;
      element.data = sampleData;
      element.paginated = false;
      
      const pagination = element.shadowRoot!.querySelector('.aui-table-pagination');
      expect(pagination).toBeFalsy();
    });

    it('respects page size', () => {
      const largeData = Array.from({ length: 25 }, (_, i) => ({
        name: `Person ${i}`,
        age: 20 + i,
        email: `person${i}@example.com`,
      }));

      element.columns = sampleColumns;
      element.data = largeData;
      element.paginated = true;
      element.pageSize = 10;
      
      const rows = element.shadowRoot!.querySelectorAll('tbody tr');
      expect(rows.length).toBe(10);
    });

    it('updates current page', () => {
      const largeData = Array.from({ length: 25 }, (_, i) => ({
        name: `Person ${i}`,
        age: 20 + i,
        email: `person${i}@example.com`,
      }));

      element.columns = sampleColumns;
      element.data = largeData;
      element.paginated = true;
      element.pageSize = 10;
      element.currentPage = 2;
      
      const paginationInfo = element.shadowRoot!.querySelector('.pagination-info');
      expect(paginationInfo!.textContent).toContain('11 to 20');
    });
  });

  describe('Sorting', () => {
    it('shows sortable columns', () => {
      element.columns = sampleColumns;
      element.data = sampleData;
      element.sortable = true;
      
      const sortableHeaders = element.shadowRoot!.querySelectorAll('th.sortable');
      expect(sortableHeaders.length).toBe(2); // name and age are sortable
    });

    it('emits sort event when column header is clicked', () => {
      const sortSpy = vi.fn();
      element.addEventListener('aui-sort', sortSpy);
      
      element.columns = sampleColumns;
      element.data = sampleData;
      element.sortable = true;
      
      const firstHeader = element.shadowRoot!.querySelector('th.sortable') as HTMLElement;
      firstHeader.click();
      
      expect(sortSpy).toHaveBeenCalled();
      expect(sortSpy.mock.calls[0][0].detail.column).toBe('name');
      expect(sortSpy.mock.calls[0][0].detail.direction).toBe('asc');
    });
  });

  describe('Selection', () => {
    it('shows selection checkboxes when selectable', () => {
      element.columns = sampleColumns;
      element.data = sampleData;
      element.selectable = true;
      
      const checkboxes = element.shadowRoot!.querySelectorAll('.selection-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('emits select event when row is selected', () => {
      const selectSpy = vi.fn();
      element.addEventListener('aui-select', selectSpy);
      
      element.columns = sampleColumns;
      element.data = sampleData;
      element.selectable = true;
      
      const firstCheckbox = element.shadowRoot!.querySelectorAll('.selection-checkbox')[1] as HTMLInputElement;
      firstCheckbox.click();
      
      expect(selectSpy).toHaveBeenCalled();
    });

    it('tracks selected rows', () => {
      element.columns = sampleColumns;
      element.data = sampleData;
      element.selectedRows = [0, 2];
      
      expect(element.selectedRows).toEqual([0, 2]);
    });
  });

  describe('Row Click', () => {
    it('emits row-click event when row is clicked', () => {
      const clickSpy = vi.fn();
      element.addEventListener('aui-row-click', clickSpy);
      
      element.columns = sampleColumns;
      element.data = sampleData;
      
      const firstRow = element.shadowRoot!.querySelector('tbody tr') as HTMLElement;
      firstRow.click();
      
      expect(clickSpy).toHaveBeenCalled();
      expect(clickSpy.mock.calls[0][0].detail.index).toBe(0);
    });
  });

  describe('Custom Rendering', () => {
    it('uses custom render function for column', () => {
      const customColumns = [
        {
          key: 'name',
          label: 'Name',
          render: (value: unknown) => `<strong>${value}</strong>`,
        },
      ];

      element.columns = customColumns;
      element.data = [{ name: 'Test' }];
      
      const cell = element.shadowRoot!.querySelector('tbody td');
      expect(cell!.innerHTML).toContain('<strong>Test</strong>');
    });
  });
});
