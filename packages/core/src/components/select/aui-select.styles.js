import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
    margin-bottom: var(--aui-spacing-md);
  }

  .aui-select {
    display: flex;
    flex-direction: column;
    gap: var(--aui-spacing-xs);
  }

  /* Label */
  .aui-select__label {
    font-size: var(--aui-font-size-sm);
    font-weight: var(--aui-font-weight-medium);
    color: var(--aui-text-secondary);
    transition: color var(--aui-transition-fast);
  }

  :host([focused]) .aui-select__label {
    color: var(--aui-primary-main);
  }

  /* Input Wrapper */
  .aui-select__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--aui-surface);
    border: 1px solid var(--aui-divider);
    border-radius: var(--aui-radius-md);
    transition: border-color var(--aui-transition-fast), box-shadow var(--aui-transition-fast);
  }

  :host([focused]) .aui-select__wrapper {
    border-color: var(--aui-primary-main);
    box-shadow: 0 0 0 2px var(--aui-primary-100);
  }

  :host([disabled]) .aui-select__wrapper {
    background-color: var(--aui-gray-100);
    border-color: var(--aui-gray-300);
    cursor: not-allowed;
  }

  /* Select Input */
  .aui-select__input {
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
    appearance: none; /* Remove default arrow */
    cursor: pointer;
  }

  :host([disabled]) .aui-select__input {
    color: var(--aui-text-secondary);
    cursor: not-allowed;
  }

  /* Arrow Icon */
  .aui-select__icon {
    position: absolute;
    right: var(--aui-spacing-md);
    width: 24px;
    height: 24px;
    fill: var(--aui-text-secondary);
    pointer-events: none;
  }
`;
//# sourceMappingURL=aui-select.styles.js.map