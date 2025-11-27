export const styles = `
  :host {
    display: inline-block;
    --button-hover-scale: 1.02;
    --button-active-scale: 0.98;
  }

  .aui-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--aui-spacing-sm, 8px);
    font-family: var(--aui-font-family, 'Inter', -apple-system, sans-serif);
    font-weight: 500;
    border: none;
    border-radius: var(--aui-radius-md, 12px);
    cursor: pointer;
    transition: all var(--aui-transition-base, 200ms) cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
    user-select: none;
    vertical-align: middle;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    transform-origin: center;
    will-change: transform, box-shadow, background-color;
    box-shadow: var(--aui-shadow-sm);
    letter-spacing: 0.01em;
  }

  .aui-button:hover:not([disabled]) {
    transform: translateY(-1px) scale(var(--button-hover-scale));
    box-shadow: var(--aui-shadow-md);
  }

  .aui-button:active:not([disabled]) {
    transform: translateY(0) scale(var(--button-active-scale));
    box-shadow: var(--aui-shadow-sm);
  }

  .aui-button:focus-visible {
    outline: 2px solid var(--aui-primary-main, #2196f3);
    outline-offset: 2px;
  }

  /* Sizes */
  .aui-button--small {
    padding: 0.5rem 1rem;
    font-size: var(--aui-font-size-sm, 0.875rem);
    min-height: 36px;
    font-weight: 500;
    letter-spacing: 0.01em;
  }

  .aui-button--medium {
    padding: 0.625rem 1.25rem;
    font-size: var(--aui-font-size-md, 1rem);
    min-height: 44px;
    font-weight: 500;
  }

  .aui-button--large {
    padding: 0.875rem 1.75rem;
    font-size: var(--aui-font-size-lg, 1.125rem);
    min-height: 52px;
    font-weight: 500;
  }

  /* Primary Variant */
  .aui-button--primary {
    background: linear-gradient(135deg, var(--aui-primary-main, #4361ee), var(--aui-primary-dark, #3a56d4));
    color: var(--aui-primary-contrast, #ffffff);
    box-shadow: 0 2px 4px -1px rgba(67, 97, 238, 0.2);
  }

  .aui-button--primary:hover:not([disabled]) {
    background: linear-gradient(135deg, var(--aui-primary-main, #4361ee), var(--aui-primary-dark, #3a56d4));
    box-shadow: 0 4px 12px -1px rgba(67, 97, 238, 0.3);
  }

  .aui-button--primary:active:not([disabled]) {
    background: linear-gradient(135deg, var(--aui-primary-dark, #3a56d4), var(--aui-primary-main, #4361ee));
    box-shadow: 0 1px 3px -1px rgba(67, 97, 238, 0.2);
  }

  /* Secondary Variant */
  .aui-button--secondary {
    background: linear-gradient(135deg, var(--aui-secondary-main, #7209b7), var(--aui-secondary-dark, #5e0d9d));
    color: var(--aui-secondary-contrast, #ffffff);
    box-shadow: 0 2px 4px -1px rgba(114, 9, 183, 0.2);
  }

  .aui-button--secondary:hover:not([disabled]) {
    background: linear-gradient(135deg, var(--aui-secondary-main, #7209b7), var(--aui-secondary-dark, #5e0d9d));
    box-shadow: 0 4px 12px -1px rgba(114, 9, 183, 0.3);
  }

  .aui-button--secondary:active:not([disabled]) {
    background: linear-gradient(135deg, var(--aui-secondary-dark, #5e0d9d), var(--aui-secondary-main, #7209b7));
    box-shadow: 0 1px 3px -1px rgba(114, 9, 183, 0.2);
  }

  /* Outlined Variant */
  .aui-button--outlined {
    background: transparent;
    color: var(--aui-primary-main, #4361ee);
    border: 2px solid var(--aui-primary-main, #4361ee);
    box-shadow: none;
    transition: all var(--aui-transition-base), box-shadow 0.2s ease;
  }

  .aui-button--outlined:hover:not([disabled]) {
    background: rgba(67, 97, 238, 0.05);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px -1px rgba(67, 97, 238, 0.15);
  }

  .aui-button--outlined:active:not([disabled]) {
    background: rgba(67, 97, 238, 0.1);
    transform: translateY(0);
    box-shadow: 0 1px 3px -1px rgba(67, 97, 238, 0.1);
  }

  /* Text Variant */
  .aui-button--text {
    background: transparent;
    color: var(--aui-primary-main, #4361ee);
    box-shadow: none;
    position: relative;
    overflow: hidden;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .aui-button--text::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--aui-primary-main, #4361ee);
    transition: all var(--aui-transition-base);
    transform: translateX(-50%);
  }

  .aui-button--text:hover:not([disabled]) {
    background: rgba(67, 97, 238, 0.05);
    transform: none;
    box-shadow: none;
  }

  .aui-button--text:hover:not([disabled])::after {
    width: calc(100% - 1.5rem);
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
//# sourceMappingURL=aui-button.styles.js.map