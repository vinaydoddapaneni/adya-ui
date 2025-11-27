import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--aui-spacing-xs);
    font-family: var(--aui-font-family);
  }

  .aui-pagination__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 var(--aui-spacing-xs);
    border: 1px solid var(--aui-border-color);
    border-radius: var(--aui-radius-sm);
    background-color: transparent;
    color: var(--aui-text-primary);
    font-size: var(--aui-font-size-sm);
    cursor: pointer;
    transition: all var(--aui-transition-fast);
    user-select: none;
  }

  .aui-pagination__button:hover:not(:disabled) {
    background-color: var(--aui-action-hover);
    border-color: var(--aui-primary-main);
  }

  .aui-pagination__button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .aui-pagination__button--active {
    background-color: var(--aui-primary-main);
    color: var(--aui-primary-contrast);
    border-color: var(--aui-primary-main);
  }

  .aui-pagination__button--active:hover {
    background-color: var(--aui-primary-dark);
  }

  .aui-pagination__ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    color: var(--aui-text-secondary);
  }
`;
//# sourceMappingURL=aui-pagination.styles.js.map