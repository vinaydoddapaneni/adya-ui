import { css } from '../../base/utils';
export const styles = css `
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
    font-weight: 600;
    color: var(--aui-text-secondary);
    transition: color var(--aui-transition-fast);
    letter-spacing: 0.01em;
  }

  .aui-textfield__required {
    color: var(--aui-error);
    margin-left: 2px;
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
    gap: var(--aui-spacing-xs);
    background-color: var(--aui-surface);
    border: 2px solid var(--aui-divider);
    border-radius: var(--aui-radius-md);
    transition: all var(--aui-transition-base);
  }

  .aui-textfield__input-wrapper:hover:not(:has(input:disabled)) {
    border-color: var(--aui-gray-400);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  :host([focused]) .aui-textfield__input-wrapper {
    border-color: var(--aui-primary-main);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    background-color: var(--aui-surface);
  }

  :host([error]) .aui-textfield__input-wrapper {
    border-color: var(--aui-error);
  }

  :host([error][focused]) .aui-textfield__input-wrapper {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  :host([disabled]) .aui-textfield__input-wrapper {
    background-color: var(--aui-gray-100);
    border-color: var(--aui-gray-300);
    cursor: not-allowed;
    opacity: 0.6;
  }

  :host([readonly]) .aui-textfield__input-wrapper {
    background-color: var(--aui-gray-50);
    border-color: var(--aui-gray-300);
  }

  /* Prefix and Suffix Slots */
  .aui-textfield__prefix,
  .aui-textfield__suffix {
    display: flex;
    align-items: center;
    color: var(--aui-text-secondary);
  }

  .aui-textfield__prefix {
    padding-left: var(--aui-spacing-md);
  }

  .aui-textfield__suffix {
    padding-right: var(--aui-spacing-md);
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

  :host([readonly]) .aui-textfield__input {
    cursor: default;
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

  /* Variant: Filled */
  .aui-textfield--filled .aui-textfield__input-wrapper {
    background-color: var(--aui-gray-100);
    border: none;
    border-bottom: 2px solid var(--aui-divider);
    border-radius: var(--aui-radius-md) var(--aui-radius-md) 0 0;
  }

  .aui-textfield--filled:host([focused]) .aui-textfield__input-wrapper {
    background-color: var(--aui-gray-200);
    border-bottom-color: var(--aui-primary-main);
    box-shadow: none;
  }

  .aui-textfield--filled:host([error]) .aui-textfield__input-wrapper {
    border-bottom-color: var(--aui-error);
  }

  /* Variant: Standard */
  .aui-textfield--standard .aui-textfield__input-wrapper {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--aui-divider);
    border-radius: 0;
    padding: 0;
  }

  .aui-textfield--standard:host([focused]) .aui-textfield__input-wrapper {
    border-bottom: 2px solid var(--aui-primary-main);
    box-shadow: none;
  }

  .aui-textfield--standard:host([error]) .aui-textfield__input-wrapper {
    border-bottom-color: var(--aui-error);
  }

  .aui-textfield--standard .aui-textfield__input {
    padding-left: 0;
    padding-right: 0;
  }

  .aui-textfield--standard .aui-textfield__prefix {
    padding-left: 0;
  }

  .aui-textfield--standard .aui-textfield__suffix {
    padding-right: 0;
  }

  /* Size: Small */
  .aui-textfield--small .aui-textfield__label {
    font-size: var(--aui-font-size-xs);
  }

  .aui-textfield--small .aui-textfield__input {
    padding: var(--aui-spacing-xs) var(--aui-spacing-sm);
    font-size: var(--aui-font-size-sm);
  }

  .aui-textfield--small .aui-textfield__prefix {
    padding-left: var(--aui-spacing-sm);
  }

  .aui-textfield--small .aui-textfield__suffix {
    padding-right: var(--aui-spacing-sm);
  }

  .aui-textfield--small .aui-textfield__helper-text {
    font-size: 10px;
  }

  /* Size: Large */
  .aui-textfield--large .aui-textfield__label {
    font-size: var(--aui-font-size-md);
  }

  .aui-textfield--large .aui-textfield__input {
    padding: var(--aui-spacing-md) var(--aui-spacing-lg);
    font-size: var(--aui-font-size-lg);
  }

  .aui-textfield--large .aui-textfield__prefix {
    padding-left: var(--aui-spacing-lg);
  }

  .aui-textfield--large .aui-textfield__suffix {
    padding-right: var(--aui-spacing-lg);
  }

  .aui-textfield--large .aui-textfield__helper-text {
    font-size: var(--aui-font-size-sm);
  }
`;
//# sourceMappingURL=aui-textfield.styles.js.map