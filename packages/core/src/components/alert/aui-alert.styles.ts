import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: block;
    margin-bottom: var(--aui-spacing-md);
  }

  .aui-alert {
    display: flex;
    align-items: flex-start;
    padding: var(--aui-spacing-md);
    border-radius: var(--aui-radius-md);
    font-size: var(--aui-font-size-md);
    line-height: var(--aui-line-height-normal);
  }

  /* Variants */
  .aui-alert--filled {
    color: #ffffff;
  }

  .aui-alert--outlined {
    background-color: transparent;
    border: 1px solid currentColor;
  }

  .aui-alert--standard {
    /* Background colors will be set per severity */
  }

  /* Severities - Filled */
  .aui-alert--filled.aui-alert--success {
    background-color: var(--aui-success);
  }

  .aui-alert--filled.aui-alert--info {
    background-color: var(--aui-info);
  }

  .aui-alert--filled.aui-alert--warning {
    background-color: var(--aui-warning);
  }

  .aui-alert--filled.aui-alert--error {
    background-color: var(--aui-error);
  }

  /* Severities - Outlined */
  .aui-alert--outlined.aui-alert--success {
    color: var(--aui-success);
  }

  .aui-alert--outlined.aui-alert--info {
    color: var(--aui-info);
  }

  .aui-alert--outlined.aui-alert--warning {
    color: var(--aui-warning);
  }

  .aui-alert--outlined.aui-alert--error {
    color: var(--aui-error);
  }

  /* Severities - Standard */
  .aui-alert--standard.aui-alert--success {
    background-color: #edf7ed;
    color: #1e4620;
  }

  .aui-alert--standard.aui-alert--info {
    background-color: #e5f6fd;
    color: #014361;
  }

  .aui-alert--standard.aui-alert--warning {
    background-color: #fff4e5;
    color: #663c00;
  }

  .aui-alert--standard.aui-alert--error {
    background-color: #fdeded;
    color: #5f2120;
  }

  /* Icon */
  .aui-alert__icon {
    display: flex;
    margin-right: var(--aui-spacing-md);
    padding: 2px 0;
  }

  .aui-alert__icon svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
  }

  /* Content */
  .aui-alert__content {
    flex: 1;
    min-width: 0;
  }

  .aui-alert__title {
    margin: 0 0 var(--aui-spacing-xs);
    font-weight: var(--aui-font-weight-medium);
  }
`;
