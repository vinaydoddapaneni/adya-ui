import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: block;
    margin-bottom: var(--aui-spacing-md);
  }

  .aui-textfield {
    display: flex;
    flex-direction: column;
    gap: var(--aui-spacing-xs);
  }

  /* Label */
  .aui-textfield__label {
    font-size: var(--aui-font-size-sm);
    font-weight: var(--aui-font-weight-medium);
    color: var(--aui-text-secondary);
    transition: color var(--aui-transition-fast);
  }

  :host([focused]) .aui-textfield__label {
    color: var(--aui-primary-main);
  }

  :host([error]) .aui-textfield__label {
    color: var(--aui-error);
  }

  /* Input Wrapper */
  .aui-textfield__input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--aui-surface);
    border: 1px solid var(--aui-divider);
    border-radius: var(--aui-radius-md);
    transition: border-color var(--aui-transition-fast), box-shadow var(--aui-transition-fast);
  }

  :host([focused]) .aui-textfield__input-wrapper {
    border-color: var(--aui-primary-main);
    box-shadow: 0 0 0 2px var(--aui-primary-100);
  }

  :host([error]) .aui-textfield__input-wrapper {
    border-color: var(--aui-error);
  }

  :host([error][focused]) .aui-textfield__input-wrapper {
    box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
  }

  :host([disabled]) .aui-textfield__input-wrapper {
    background-color: var(--aui-gray-100);
    border-color: var(--aui-gray-300);
    cursor: not-allowed;
  }

  /* Input */
  .aui-textfield__input {
    flex: 1;
    width: 100%;
    padding: var(--aui-spacing-sm) var(--aui-spacing-md);
    font-family: inherit;
    font-size: var(--aui-font-size-md);
    color: var(--aui-text-primary);
    background: none;
    border: none;
    outline: none;
    border-radius: var(--aui-radius-md);
  }

  .aui-textfield__input::placeholder {
    color: var(--aui-text-secondary);
    opacity: 0.7;
  }

  :host([disabled]) .aui-textfield__input {
    color: var(--aui-text-secondary);
    cursor: not-allowed;
  }

  /* Helper Text */
  .aui-textfield__helper-text {
    font-size: var(--aui-font-size-xs);
    color: var(--aui-text-secondary);
    margin-left: var(--aui-spacing-xs);
  }

  :host([error]) .aui-textfield__helper-text {
    color: var(--aui-error);
  }
`;
