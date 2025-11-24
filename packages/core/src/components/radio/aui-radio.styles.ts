import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: inline-block;
    vertical-align: middle;
  }

  .aui-radio {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  /* Input */
  .aui-radio__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  /* Control */
  .aui-radio__control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background-color: transparent;
    border: 2px solid var(--aui-text-secondary);
    border-radius: 50%;
    transition: all var(--aui-transition-fast);
    box-sizing: border-box;
  }

  /* Checked State */
  .aui-radio__input:checked + .aui-radio__control {
    border-color: var(--aui-primary-main);
  }

  .aui-radio__control::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--aui-primary-main);
    transform: scale(0);
    transition: transform var(--aui-transition-fast);
  }

  .aui-radio__input:checked + .aui-radio__control::after {
    transform: scale(1);
  }

  /* Focus State */
  .aui-radio__input:focus-visible + .aui-radio__control {
    box-shadow: 0 0 0 2px var(--aui-primary-100);
  }

  /* Disabled State */
  :host([disabled]) .aui-radio {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :host([disabled]) .aui-radio__input:checked + .aui-radio__control {
    border-color: var(--aui-gray-400);
  }

  :host([disabled]) .aui-radio__input:checked + .aui-radio__control::after {
    background-color: var(--aui-gray-400);
  }

  /* Label */
  .aui-radio__label {
    margin-left: var(--aui-spacing-sm);
    font-size: var(--aui-font-size-md);
    color: var(--aui-text-primary);
  }
`;
