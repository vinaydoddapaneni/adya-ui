export const styles = `
  :host {
    display: block;
    width: 100%;
    font-family: var(--aui-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  }

  .aui-table-container {
    width: 100%;
    overflow-x: auto;
    border-radius: var(--aui-border-radius, 8px);
    background: var(--aui-surface-color, #ffffff);
    box-shadow: var(--aui-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
  }

  .aui-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    color: var(--aui-text-color, #333);
  }

  /* Table Header */
  .aui-table thead {
    background: var(--aui-surface-secondary, #f5f5f5);
    border-bottom: 2px solid var(--aui-border-color, #e0e0e0);
  }

  .aui-table th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--aui-text-secondary, #666);
    white-space: nowrap;
  }

  .aui-table th.sortable {
    cursor: pointer;
    user-select: none;
    position: relative;
    padding-right: 32px;
  }

  .aui-table th.sortable:hover {
    background: var(--aui-surface-hover, #eeeeee);
  }

  .aui-table th.sorted {
    color: var(--aui-primary, #2196f3);
  }

  .sort-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }

  .sort-icon.asc {
    border-bottom: 6px solid currentColor;
  }

  .sort-icon.desc {
    border-top: 6px solid currentColor;
  }

  /* Table Body */
  .aui-table tbody tr {
    border-bottom: 1px solid var(--aui-border-color, #e0e0e0);
    transition: background-color 0.2s ease;
  }

  .aui-table tbody tr:last-child {
    border-bottom: none;
  }

  .aui-table td {
    padding: 12px 16px;
  }

  /* Variants */
  :host([striped]) .aui-table tbody tr:nth-child(even) {
    background: var(--aui-surface-secondary, #f9f9f9);
  }

  :host([bordered]) .aui-table {
    border: 1px solid var(--aui-border-color, #e0e0e0);
  }

  :host([bordered]) .aui-table th,
  :host([bordered]) .aui-table td {
    border: 1px solid var(--aui-border-color, #e0e0e0);
  }

  :host([hoverable]) .aui-table tbody tr:hover {
    background: var(--aui-surface-hover, #f5f5f5);
    cursor: pointer;
  }

  /* Selection */
  :host([selectable]) .aui-table tbody tr.selected {
    background: var(--aui-primary-light, #e3f2fd);
  }

  .selection-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--aui-primary, #2196f3);
  }

  /* Alignment */
  .align-left { text-align: left; }
  .align-center { text-align: center; }
  .align-right { text-align: right; }

  /* Pagination */
  .aui-table-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-top: 1px solid var(--aui-border-color, #e0e0e0);
    background: var(--aui-surface-color, #ffffff);
  }

  .pagination-info {
    font-size: 13px;
    color: var(--aui-text-secondary, #666);
  }

  .pagination-controls {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .pagination-button {
    padding: 6px 12px;
    border: 1px solid var(--aui-border-color, #e0e0e0);
    background: var(--aui-surface-color, #ffffff);
    color: var(--aui-text-color, #333);
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s ease;
  }

  .pagination-button:hover:not(:disabled) {
    background: var(--aui-surface-hover, #f5f5f5);
    border-color: var(--aui-primary, #2196f3);
  }

  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-button.active {
    background: var(--aui-primary, #2196f3);
    color: white;
    border-color: var(--aui-primary, #2196f3);
  }

  .page-size-select {
    padding: 6px 12px;
    border: 1px solid var(--aui-border-color, #e0e0e0);
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    background: var(--aui-surface-color, #ffffff);
  }

  /* Loading State */
  .aui-table-loading {
    position: relative;
    min-height: 200px;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--aui-border-color, #e0e0e0);
    border-top-color: var(--aui-primary, #2196f3);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Empty State */
  .aui-table-empty {
    padding: 48px 24px;
    text-align: center;
    color: var(--aui-text-secondary, #666);
    font-size: 14px;
  }

  /* Responsive */
  :host([responsive]) .aui-table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  @media (max-width: 768px) {
    :host([responsive]) .aui-table {
      font-size: 12px;
    }

    :host([responsive]) .aui-table th,
    :host([responsive]) .aui-table td {
      padding: 8px 12px;
    }

    .aui-table-pagination {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }

    .pagination-controls {
      justify-content: center;
    }
  }

  /* Dark Mode */
  :host([data-theme="dark"]) .aui-table-container,
  :host-context([data-theme="dark"]) .aui-table-container {
    background: var(--aui-surface-dark, #1e1e1e);
    color: var(--aui-text-dark, #e0e0e0);
  }

  :host([data-theme="dark"]) .aui-table thead,
  :host-context([data-theme="dark"]) .aui-table thead {
    background: var(--aui-surface-secondary-dark, #2a2a2a);
  }

  :host([data-theme="dark"]) .aui-table tbody tr,
  :host-context([data-theme="dark"]) .aui-table tbody tr {
    border-bottom-color: var(--aui-border-dark, #333);
  }

  :host([data-theme="dark"][striped]) .aui-table tbody tr:nth-child(even),
  :host-context([data-theme="dark"]):host([striped]) .aui-table tbody tr:nth-child(even) {
    background: var(--aui-surface-secondary-dark, #252525);
  }
`;
