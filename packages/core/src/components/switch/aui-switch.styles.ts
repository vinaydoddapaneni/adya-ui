import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: inline-block;
    vertical-align: middle;
  }

  .aui-switch {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  /* Input */
  .aui-switch__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  /* Track */
  .aui-switch__track {
    position: relative;
    width: 36px;
    height: 20px;
    background-color: var(--aui-gray-400);
    border-radius: 9999px;
    transition: background-color var(--aui-transition-base);
  }

  .aui-switch__input:checked + .aui-switch__track {
    background-color: var(--aui-primary-main);
  }

  /* Thumb */
  .aui-switch__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: var(--aui-shadow-sm);
    transition: transform var(--aui-transition-base);
  }

  .aui-switch__input:checked + .aui-switch__track .aui-switch__thumb {
    transform: translateX(16px);
  }

  /* Focus State */
  .aui-switch__input:focus-visible + .aui-switch__track {
    box-shadow: 0 0 0 2px var(--aui-primary-100);
  }

  /* Disabled State */
  :host([disabled]) .aui-switch {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Label */
  .aui-switch__label {
    margin-left: var(--aui-spacing-sm);
    font-size: var(--aui-font-size-md);
    color: var(--aui-text-primary);
  }
`;
