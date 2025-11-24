import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: inline-block;
    vertical-align: middle;
  }

  .aui-checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  /* Input */
  .aui-checkbox__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  /* Control */
  .aui-checkbox__control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background-color: transparent;
    border: 2px solid var(--aui-text-secondary);
    border-radius: var(--aui-radius-sm);
    transition: all var(--aui-transition-fast);
    box-sizing: border-box;
  }

  /* Checked State */
  .aui-checkbox__input:checked + .aui-checkbox__control {
    background-color: var(--aui-primary-main);
    border-color: var(--aui-primary-main);
    color: var(--aui-primary-contrast);
  }

  /* Focus State */
  .aui-checkbox__input:focus-visible + .aui-checkbox__control {
    box-shadow: 0 0 0 2px var(--aui-primary-100);
  }

  /* Disabled State */
  :host([disabled]) .aui-checkbox {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :host([disabled]) .aui-checkbox__input:checked + .aui-checkbox__control {
    background-color: var(--aui-gray-400);
    border-color: var(--aui-gray-400);
  }

  /* Checkmark Icon */
  .aui-checkbox__icon {
    width: 12px;
    height: 12px;
    fill: currentColor;
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--aui-transition-fast);
  }

  .aui-checkbox__input:checked + .aui-checkbox__control .aui-checkbox__icon {
    opacity: 1;
    transform: scale(1);
  }

  /* Label */
  .aui-checkbox__label {
    margin-left: var(--aui-spacing-sm);
    font-size: var(--aui-font-size-md);
    color: var(--aui-text-primary);
  }
`;
