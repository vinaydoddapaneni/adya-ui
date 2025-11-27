import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: block;
    font-family: var(--aui-font-family);
  }

  .aui-treeview {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .aui-treeview__item {
    list-style: none;
  }

  .aui-treeview__item-content {
    display: flex;
    align-items: center;
    padding: var(--aui-spacing-xs) var(--aui-spacing-sm);
    cursor: pointer;
    border-radius: var(--aui-radius-sm);
    transition: background-color var(--aui-transition-fast);
  }

  .aui-treeview__item-content:hover {
    background-color: var(--aui-action-hover);
  }

  .aui-treeview__item--selected > .aui-treeview__item-content {
    background-color: var(--aui-action-selected);
    color: var(--aui-primary-main);
  }

  .aui-treeview__expand-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: var(--aui-spacing-xs);
    transition: transform var(--aui-transition-fast);
    font-size: 12px;
  }

  .aui-treeview__expand-icon--expanded {
    transform: rotate(90deg);
  }

  .aui-treeview__expand-icon--empty {
    visibility: hidden;
  }

  .aui-treeview__icon {
    margin-right: var(--aui-spacing-sm);
    display: flex;
    align-items: center;
  }

  .aui-treeview__label {
    flex: 1;
    font-size: var(--aui-font-size-md);
  }

  .aui-treeview__children {
    list-style: none;
    padding-left: var(--aui-spacing-lg);
    margin: 0;
    display: none;
  }

  .aui-treeview__item--expanded > .aui-treeview__children {
    display: block;
  }
`;
