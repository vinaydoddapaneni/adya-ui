export const styles = `
  :host {
    display: inline-block;
  }

  .aui-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--aui-spacing-sm, 8px);
    font-family: var(--aui-font-family, sans-serif);
    font-weight: 500;
    border: none;
    border-radius: var(--aui-radius-md, 8px);
    cursor: pointer;
    transition: all var(--aui-transition-fast, 150ms ease-in-out);
    outline: none;
    user-select: none;
    vertical-align: middle;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  .aui-button:focus-visible {
    outline: 2px solid var(--aui-primary-main, #2196f3);
    outline-offset: 2px;
  }

  /* Sizes */
  .aui-button--small {
    padding: 6px 12px;
    font-size: var(--aui-font-size-sm, 0.875rem);
    min-height: 32px;
  }

  .aui-button--medium {
    padding: 8px 16px;
    font-size: var(--aui-font-size-md, 1rem);
    min-height: 40px;
  }

  .aui-button--large {
    padding: 12px 24px;
    font-size: var(--aui-font-size-lg, 1.125rem);
    min-height: 48px;
  }

  /* Primary Variant */
  .aui-button--primary {
    background: var(--aui-primary-main, #2196f3);
    color: var(--aui-primary-contrast, #ffffff);
  }

  .aui-button--primary:hover:not([disabled]) {
    background: var(--aui-primary-dark, #1976d2);
    box-shadow: var(--aui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
  }

  .aui-button--primary:active:not([disabled]) {
    background: var(--aui-primary-dark, #1976d2);
    box-shadow: var(--aui-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  }

  /* Secondary Variant */
  .aui-button--secondary {
    background: var(--aui-secondary-main, #9c27b0);
    color: var(--aui-secondary-contrast, #ffffff);
  }

  .aui-button--secondary:hover:not([disabled]) {
    background: var(--aui-secondary-dark, #7b1fa2);
    box-shadow: var(--aui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
  }

  .aui-button--secondary:active:not([disabled]) {
    background: var(--aui-secondary-dark, #7b1fa2);
    box-shadow: var(--aui-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  }

  /* Outlined Variant */
  .aui-button--outlined {
    background: transparent;
    color: var(--aui-primary-main, #2196f3);
    border: 2px solid var(--aui-primary-main, #2196f3);
  }

  .aui-button--outlined:hover:not([disabled]) {
    background: rgba(33, 150, 243, 0.08);
  }

  .aui-button--outlined:active:not([disabled]) {
    background: rgba(33, 150, 243, 0.16);
  }

  /* Text Variant */
  .aui-button--text {
    background: transparent;
    color: var(--aui-primary-main, #2196f3);
  }

  .aui-button--text:hover:not([disabled]) {
    background: rgba(33, 150, 243, 0.08);
  }

  .aui-button--text:active:not([disabled]) {
    background: rgba(33, 150, 243, 0.16);
  }

  /* Disabled State */
  .aui-button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Loading State */
  .aui-button__loader {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-radius: 50%;
    border-top-color: transparent;
    animation: aui-spin 0.6s linear infinite;
  }

  @keyframes aui-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .aui-button__content {
    display: inline-flex;
    align-items: center;
    gap: var(--aui-spacing-xs, 4px);
  }
`;
