import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
  }

  .aui-list-item {
    display: flex;
    align-items: center;
    padding: var(--aui-spacing-sm) var(--aui-spacing-md);
    cursor: pointer;
    font-size: var(--aui-font-size-md);
    color: var(--aui-text-primary);
    transition: background-color var(--aui-transition-fast);
    text-decoration: none;
    user-select: none;
    min-height: 48px;
    box-sizing: border-box;
  }

  .aui-list-item:hover,
  .aui-list-item:focus {
    background-color: var(--aui-action-hover);
    outline: none;
  }

  :host([disabled]) .aui-list-item {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([selected]) .aui-list-item {
    background-color: var(--aui-action-selected);
    color: var(--aui-primary-main);
  }

  .aui-list-item__icon {
    margin-right: var(--aui-spacing-md);
    display: flex;
    align-items: center;
    color: var(--aui-text-secondary);
  }

  :host([selected]) .aui-list-item__icon {
    color: var(--aui-primary-main);
  }

  .aui-list-item__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .aui-list-item__secondary {
    font-size: var(--aui-font-size-sm);
    color: var(--aui-text-secondary);
    margin-top: 2px;
  }
`;
//# sourceMappingURL=aui-list-item.styles.js.map