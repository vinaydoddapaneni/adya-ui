export const styles = `
  :host {
    display: block;
    width: 100%;
    font-family: var(--aui-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif);
  }

  .aui-table-container {
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
    background: var(--aui-surface-color, #ffffff);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid var(--aui-border-color, #e5e7eb);
  }

  .aui-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    color: var(--aui-text-color, #1f2937);
  }

  /* Table Header */
  .aui-table thead {
    background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
    border-bottom: 2px solid var(--aui-primary, #3b82f6);
  }

  .aui-table th {
    padding: 16px 20px;
    text-align: left;
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--aui-text-secondary, #4b5563);
    white-space: nowrap;
    background: transparent;
  }

  .aui-table th.sortable {
    cursor: pointer;
    user-select: none;
    position: relative;
    padding-right: 36px;
    transition: all 0.2s ease;
  }

  .aui-table th.sortable:hover {
    background: rgba(59, 130, 246, 0.05);
    color: var(--aui-primary, #3b82f6);
  }

  .aui-table th.sorted {
    color: var(--aui-primary, #3b82f6);
    background: rgba(59, 130, 246, 0.08);
  }

  .sort-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    opacity: 0.6;
  }

  .sort-icon.asc {
    border-bottom: 7px solid currentColor;
  }

  .sort-icon.desc {
    border-top: 7px solid currentColor;
  }

  /* Table Body */
  .aui-table tbody tr {
    border-bottom: 1px solid var(--aui-border-color, #f3f4f6);
    transition: all 0.2s ease;
  }

  .aui-table tbody tr:last-child {
    border-bottom: none;
  }

  .aui-table td {
    padding: 16px 20px;
    font-size: 14px;
    color: var(--aui-text-color, #374151);
  }

  /* Variants */
  :host([striped]) .aui-table tbody tr:nth-child(even) {
    background: linear-gradient(to right, #fafafa, #f9fafb);
  }

  :host([bordered]) .aui-table {
    border: 1px solid var(--aui-border-color, #e5e7eb);
  }

  :host([bordered]) .aui-table th,
  :host([bordered]) .aui-table td {
    border-right: 1px solid var(--aui-border-color, #f3f4f6);
  }

  :host([bordered]) .aui-table th:last-child,
  :host([bordered]) .aui-table td:last-child {
    border-right: none;
  }

  :host([hoverable]) .aui-table tbody tr:hover {
    background: linear-gradient(to right, #f0f9ff, #e0f2fe);
    cursor: pointer;
    transform: scale(1.001);
    box-shadow: 0 1px 3px rgba(59, 130, 246, 0.1);
  }

  /* Selection */
  :host([selectable]) .aui-table tbody tr.selected {
    background: linear-gradient(to right, #dbeafe, #bfdbfe);
    border-left: 3px solid var(--aui-primary, #3b82f6);
  }

  .selection-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--aui-primary, #3b82f6);
    border-radius: 4px;
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
    padding: 20px 24px;
    border-top: 1px solid var(--aui-border-color, #f3f4f6);
    background: linear-gradient(to bottom, #fafafa, #ffffff);
  }

  .pagination-info {
    font-size: 14px;
    color: var(--aui-text-secondary, #6b7280);
    font-weight: 500;
  }

  .pagination-controls {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .pagination-button {
    padding: 8px 16px;
    border: 1px solid var(--aui-border-color, #d1d5db);
    background: white;
    color: var(--aui-text-color, #374151);
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .pagination-button:hover:not(:disabled) {
    background: var(--aui-primary, #3b82f6);
    color: white;
    border-color: var(--aui-primary, #3b82f6);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
  }

  .pagination-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: #f9fafb;
  }

  .pagination-button.active {
    background: var(--aui-primary, #3b82f6);
    color: white;
    border-color: var(--aui-primary, #3b82f6);
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
  }

  .page-size-select {
    padding: 8px 12px;
    border: 1px solid var(--aui-border-color, #d1d5db);
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    background: white;
    color: var(--aui-text-color, #374151);
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .page-size-select:hover {
    border-color: var(--aui-primary, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .page-size-select:focus {
    outline: none;
    border-color: var(--aui-primary, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
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
