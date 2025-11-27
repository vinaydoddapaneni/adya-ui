import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: inline-block;
    font-family: var(--aui-font-family);
  }

  .aui-timepicker {
    position: relative;
  }

  .aui-timepicker__input {
    width: 100%;
    padding: var(--aui-spacing-sm) var(--aui-spacing-md);
    border: 1px solid var(--aui-border-color);
    border-radius: var(--aui-radius-sm);
    font-size: var(--aui-font-size-md);
    font-family: var(--aui-font-family);
    color: var(--aui-text-primary);
    background-color: var(--aui-background-paper);
    cursor: pointer;
    box-sizing: border-box;
  }

  .aui-timepicker__input:focus {
    outline: none;
    border-color: var(--aui-primary-main);
  }

  .aui-timepicker__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    background-color: var(--aui-background-paper);
    border: 1px solid var(--aui-border-color);
    border-radius: var(--aui-radius-sm);
    box-shadow: var(--aui-shadow-md);
    padding: var(--aui-spacing-md);
    z-index: 1000;
    display: none;
  }

  .aui-timepicker__dropdown--open {
    display: flex;
    gap: var(--aui-spacing-sm);
  }

  .aui-timepicker__column {
    display: flex;
    flex-direction: column;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid var(--aui-border-color);
    border-radius: var(--aui-radius-sm);
  }

  .aui-timepicker__option {
    padding: var(--aui-spacing-xs) var(--aui-spacing-md);
    cursor: pointer;
    text-align: center;
    transition: background-color var(--aui-transition-fast);
  }

  .aui-timepicker__option:hover {
    background-color: var(--aui-action-hover);
  }

  .aui-timepicker__option--selected {
    background-color: var(--aui-primary-main);
    color: var(--aui-primary-contrast);
  }
`;
