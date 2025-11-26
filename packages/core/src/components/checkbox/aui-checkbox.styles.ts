import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: inline-block;
  }

  .aui-checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    vertical-align: middle;
  }

  .aui-checkbox__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  /* Control (Box) */
  .aui-checkbox__control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--aui-text-secondary);
    border-radius: var(--aui-radius-sm);
    background-color: transparent;
    transition: all var(--aui-transition-fast);
    box-sizing: border-box;
  }

  /* Icon */
  .aui-checkbox__icon {
    width: 100%;
    height: 100%;
    fill: var(--aui-surface);
    opacity: 0;
    transition: opacity var(--aui-transition-fast);
  }

  /* Checked & Indeterminate State */
  .aui-checkbox__input:checked + .aui-checkbox__control,
  .aui-checkbox__input:indeterminate + .aui-checkbox__control {
    background-color: var(--aui-primary-main);
    border-color: var(--aui-primary-main);
  }

  .aui-checkbox__input:checked + .aui-checkbox__control .aui-checkbox__icon,
  .aui-checkbox__input:indeterminate + .aui-checkbox__control .aui-checkbox__icon {
    opacity: 1;
  }

  /* Label */
  .aui-checkbox__label {
    margin-left: var(--aui-spacing-sm);
    font-size: var(--aui-font-size-md);
    color: var(--aui-text-primary);
    user-select: none;
  }

  /* Focus State */
  .aui-checkbox__input:focus-visible + .aui-checkbox__control {
    box-shadow: 0 0 0 2px var(--aui-surface), 0 0 0 4px var(--aui-primary-main);
  }

  /* Hover State */
  .aui-checkbox:hover .aui-checkbox__control {
    border-color: var(--aui-primary-main);
  }

  .aui-checkbox:hover .aui-checkbox__input:checked + .aui-checkbox__control,
  .aui-checkbox:hover .aui-checkbox__input:indeterminate + .aui-checkbox__control {
    background-color: var(--aui-primary-dark);
    border-color: var(--aui-primary-dark);
  }

  /* Disabled State */
  .aui-checkbox__input:disabled + .aui-checkbox__control {
    border-color: var(--aui-gray-300);
    background-color: var(--aui-gray-100);
    cursor: not-allowed;
  }

  .aui-checkbox__input:disabled:checked + .aui-checkbox__control,
  .aui-checkbox__input:disabled:indeterminate + .aui-checkbox__control {
    background-color: var(--aui-gray-300);
    border-color: var(--aui-gray-300);
  }

  .aui-checkbox__input:disabled + .aui-checkbox__control .aui-checkbox__icon {
    fill: var(--aui-gray-500);
  }

  .aui-checkbox__input:disabled ~ .aui-checkbox__label {
    color: var(--aui-text-disabled);
    cursor: not-allowed;
  }

  :host([disabled]) .aui-checkbox {
    cursor: not-allowed;
  }

  /* Sizes */
  .aui-checkbox--small .aui-checkbox__control {
    width: 16px;
    height: 16px;
  }

  .aui-checkbox--small .aui-checkbox__label {
    font-size: var(--aui-font-size-sm);
  }

  .aui-checkbox--medium .aui-checkbox__control {
    width: 20px;
    height: 20px;
  }

  .aui-checkbox--medium .aui-checkbox__label {
    font-size: var(--aui-font-size-md);
  }

  .aui-checkbox--large .aui-checkbox__control {
    width: 24px;
    height: 24px;
  }

  .aui-checkbox--large .aui-checkbox__label {
    font-size: var(--aui-font-size-lg);
  }

  /* Colors */
  .aui-checkbox--secondary .aui-checkbox__input:checked + .aui-checkbox__control,
  .aui-checkbox--secondary .aui-checkbox__input:indeterminate + .aui-checkbox__control {
    background-color: var(--aui-secondary-main);
    border-color: var(--aui-secondary-main);
  }

  .aui-checkbox--secondary:hover .aui-checkbox__input:checked + .aui-checkbox__control,
  .aui-checkbox--secondary:hover .aui-checkbox__input:indeterminate + .aui-checkbox__control {
    background-color: var(--aui-secondary-dark);
    border-color: var(--aui-secondary-dark);
  }

  .aui-checkbox--secondary .aui-checkbox__input:focus-visible + .aui-checkbox__control {
    box-shadow: 0 0 0 2px var(--aui-surface), 0 0 0 4px var(--aui-secondary-main);
  }

  .aui-checkbox--success .aui-checkbox__input:checked + .aui-checkbox__control,
  .aui-checkbox--success .aui-checkbox__input:indeterminate + .aui-checkbox__control {
    background-color: var(--aui-success-main);
    border-color: var(--aui-success-main);
  }

  .aui-checkbox--success:hover .aui-checkbox__input:checked + .aui-checkbox__control,
  .aui-checkbox--success:hover .aui-checkbox__input:indeterminate + .aui-checkbox__control {
    background-color: var(--aui-success-dark);
    border-color: var(--aui-success-dark);
  }

  .aui-checkbox--success .aui-checkbox__input:focus-visible + .aui-checkbox__control {
    box-shadow: 0 0 0 2px var(--aui-surface), 0 0 0 4px var(--aui-success-main);
  }

  .aui-checkbox--error .aui-checkbox__input:checked + .aui-checkbox__control,
  .aui-checkbox--error .aui-checkbox__input:indeterminate + .aui-checkbox__control {
    background-color: var(--aui-error-main);
    border-color: var(--aui-error-main);
  }

  .aui-checkbox--error:hover .aui-checkbox__input:checked + .aui-checkbox__control,
  .aui-checkbox--error:hover .aui-checkbox__input:indeterminate + .aui-checkbox__control {
    background-color: var(--aui-error-dark);
    border-color: var(--aui-error-dark);
  }

  .aui-checkbox--error .aui-checkbox__input:focus-visible + .aui-checkbox__control {
    box-shadow: 0 0 0 2px var(--aui-surface), 0 0 0 4px var(--aui-error-main);
  }
`;
