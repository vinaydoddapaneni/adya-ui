import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .aui-alert {
    display: flex;
    align-items: flex-start;
    padding: var(--aui-spacing-md) var(--aui-spacing-lg);
    border-radius: var(--aui-radius-md);
    font-size: var(--aui-font-size-md);
    line-height: 1.5;
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity var(--aui-transition-normal), transform var(--aui-transition-normal);
    visibility: hidden;
    height: 0;
    margin: 0;
    overflow: hidden;
  }

  .aui-alert--open {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
    height: auto;
    margin-bottom: var(--aui-spacing-md);
    overflow: visible;
  }

  .aui-alert__icon {
    display: flex;
    margin-right: var(--aui-spacing-md);
    padding: 4px 0;
  }

  .aui-alert__icon svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
  }

  .aui-alert__content {
    flex: 1;
    padding: 2px 0;
    min-width: 0; /* Fix flexbox overflow */
  }

  .aui-alert__title {
    font-weight: var(--aui-font-weight-bold);
    margin-bottom: 2px;
  }

  .aui-alert__message {
    word-break: break-word;
  }

  .aui-alert__action {
    display: flex;
    align-items: center;
    margin-left: var(--aui-spacing-md);
    padding: 0;
  }

  .aui-alert__close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    margin-left: var(--aui-spacing-sm);
    border-radius: 50%;
    color: inherit;
    opacity: 0.7;
    transition: opacity var(--aui-transition-fast), background-color var(--aui-transition-fast);
  }

  .aui-alert__close-button:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.05);
  }

  .aui-alert__close-button svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  /* Variants */
  
  /* Standard (Default) */
  .aui-alert--standard.aui-alert--success {
    background-color: var(--aui-success-light);
    color: var(--aui-success-dark);
  }
  .aui-alert--standard.aui-alert--success .aui-alert__icon { color: var(--aui-success-main); }

  .aui-alert--standard.aui-alert--info {
    background-color: var(--aui-info-light);
    color: var(--aui-info-dark);
  }
  .aui-alert--standard.aui-alert--info .aui-alert__icon { color: var(--aui-info-main); }

  .aui-alert--standard.aui-alert--warning {
    background-color: var(--aui-warning-light);
    color: var(--aui-warning-dark);
  }
  .aui-alert--standard.aui-alert--warning .aui-alert__icon { color: var(--aui-warning-main); }

  .aui-alert--standard.aui-alert--error {
    background-color: var(--aui-error-light);
    color: var(--aui-error-dark);
  }
  .aui-alert--standard.aui-alert--error .aui-alert__icon { color: var(--aui-error-main); }

  /* Filled */
  .aui-alert--filled {
    color: #fff;
  }
  .aui-alert--filled .aui-alert__icon { color: inherit; }
  .aui-alert--filled .aui-alert__close-button:hover { background-color: rgba(255, 255, 255, 0.1); }

  .aui-alert--filled.aui-alert--success { background-color: var(--aui-success-main); }
  .aui-alert--filled.aui-alert--info { background-color: var(--aui-info-main); }
  .aui-alert--filled.aui-alert--warning { background-color: var(--aui-warning-main); }
  .aui-alert--filled.aui-alert--error { background-color: var(--aui-error-main); }

  /* Outlined */
  .aui-alert--outlined {
    background-color: transparent;
    border: 1px solid;
  }
  
  .aui-alert--outlined.aui-alert--success {
    border-color: var(--aui-success-main);
    color: var(--aui-success-dark);
  }
  .aui-alert--outlined.aui-alert--success .aui-alert__icon { color: var(--aui-success-main); }

  .aui-alert--outlined.aui-alert--info {
    border-color: var(--aui-info-main);
    color: var(--aui-info-dark);
  }
  .aui-alert--outlined.aui-alert--info .aui-alert__icon { color: var(--aui-info-main); }

  .aui-alert--outlined.aui-alert--warning {
    border-color: var(--aui-warning-main);
    color: var(--aui-warning-dark);
  }
  .aui-alert--outlined.aui-alert--warning .aui-alert__icon { color: var(--aui-warning-main); }

  .aui-alert--outlined.aui-alert--error {
    border-color: var(--aui-error-main);
    color: var(--aui-error-dark);
  }
  .aui-alert--outlined.aui-alert--error .aui-alert__icon { color: var(--aui-error-main); }
`;
