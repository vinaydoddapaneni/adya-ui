import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
    font-family: var(--aui-font-family);
    overflow: auto;
  }

  .aui-datagrid {
    width: 100%;
    border: 1px solid var(--aui-border-color);
    border-radius: var(--aui-radius-sm);
    overflow: hidden;
  }

  .aui-datagrid__table {
    width: 100%;
    border-collapse: collapse;
  }

  .aui-datagrid__header {
    background-color: var(--aui-background-paper);
    border-bottom: 2px solid var(--aui-border-color);
  }

  .aui-datagrid__header-cell {
    padding: var(--aui-spacing-md);
    text-align: left;
    font-weight: var(--aui-font-weight-medium);
    color: var(--aui-text-primary);
    cursor: pointer;
    user-select: none;
    position: relative;
  }

  .aui-datagrid__header-cell--sortable:hover {
    background-color: var(--aui-action-hover);
  }

  .aui-datagrid__sort-icon {
    margin-left: var(--aui-spacing-xs);
    font-size: 12px;
    color: var(--aui-text-secondary);
  }

  .aui-datagrid__body {
    background-color: var(--aui-background-default);
  }

  .aui-datagrid__row {
    border-bottom: 1px solid var(--aui-border-color);
    transition: background-color var(--aui-transition-fast);
  }

  .aui-datagrid__row:hover {
    background-color: var(--aui-action-hover);
  }

  .aui-datagrid__row--selected {
    background-color: var(--aui-action-selected);
  }

  .aui-datagrid__cell {
    padding: var(--aui-spacing-md);
    color: var(--aui-text-primary);
  }

  .aui-datagrid__pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--aui-spacing-md);
    border-top: 1px solid var(--aui-border-color);
    background-color: var(--aui-background-paper);
  }

  .aui-datagrid__pagination-info {
    color: var(--aui-text-secondary);
    font-size: var(--aui-font-size-sm);
  }

  .aui-datagrid__pagination-controls {
    display: flex;
    gap: var(--aui-spacing-xs);
  }

  .aui-datagrid__pagination-button {
    padding: var(--aui-spacing-xs) var(--aui-spacing-sm);
    border: 1px solid var(--aui-border-color);
    border-radius: var(--aui-radius-sm);
    background-color: transparent;
    cursor: pointer;
    transition: background-color var(--aui-transition-fast);
  }

  .aui-datagrid__pagination-button:hover:not(:disabled) {
    background-color: var(--aui-action-hover);
  }

  .aui-datagrid__pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
//# sourceMappingURL=aui-datagrid.styles.js.map