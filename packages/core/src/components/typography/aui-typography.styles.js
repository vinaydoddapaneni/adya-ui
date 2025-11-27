import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
    margin: 0;
  }

  /* Variants */
  .aui-typography--h1 {
    font-size: var(--aui-font-size-4xl);
    font-weight: var(--aui-font-weight-bold);
    line-height: var(--aui-line-height-tight);
    letter-spacing: -0.015em;
  }

  .aui-typography--h2 {
    font-size: var(--aui-font-size-3xl);
    font-weight: var(--aui-font-weight-bold);
    line-height: var(--aui-line-height-tight);
    letter-spacing: -0.005em;
  }

  .aui-typography--h3 {
    font-size: var(--aui-font-size-2xl);
    font-weight: var(--aui-font-weight-semibold);
    line-height: var(--aui-line-height-tight);
  }

  .aui-typography--h4 {
    font-size: var(--aui-font-size-xl);
    font-weight: var(--aui-font-weight-semibold);
    line-height: var(--aui-line-height-tight);
  }

  .aui-typography--h5 {
    font-size: var(--aui-font-size-lg);
    font-weight: var(--aui-font-weight-semibold);
    line-height: var(--aui-line-height-normal);
  }

  .aui-typography--h6 {
    font-size: var(--aui-font-size-md);
    font-weight: var(--aui-font-weight-semibold);
    line-height: var(--aui-line-height-normal);
  }

  .aui-typography--body1 {
    font-size: var(--aui-font-size-md);
    font-weight: var(--aui-font-weight-regular);
    line-height: var(--aui-line-height-relaxed);
  }

  .aui-typography--body2 {
    font-size: var(--aui-font-size-sm);
    font-weight: var(--aui-font-weight-regular);
    line-height: var(--aui-line-height-relaxed);
  }

  .aui-typography--caption {
    font-size: var(--aui-font-size-xs);
    font-weight: var(--aui-font-weight-regular);
    line-height: var(--aui-line-height-normal);
    letter-spacing: 0.02em;
  }

  .aui-typography--overline {
    font-size: var(--aui-font-size-xs);
    font-weight: var(--aui-font-weight-medium);
    line-height: var(--aui-line-height-normal);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* Colors */
  .aui-typography--primary {
    color: var(--aui-primary-main);
  }

  .aui-typography--secondary {
    color: var(--aui-secondary-main);
  }

  .aui-typography--text-primary {
    color: var(--aui-text-primary);
  }

  .aui-typography--text-secondary {
    color: var(--aui-text-secondary);
  }

  .aui-typography--success {
    color: var(--aui-success);
  }

  .aui-typography--error {
    color: var(--aui-error);
  }

  .aui-typography--warning {
    color: var(--aui-warning);
  }

  /* Alignment */
  .aui-typography--align-left {
    text-align: left;
  }

  .aui-typography--align-center {
    text-align: center;
  }

  .aui-typography--align-right {
    text-align: right;
  }
`;
//# sourceMappingURL=aui-typography.styles.js.map