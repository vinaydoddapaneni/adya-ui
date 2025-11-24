import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: block;
    background-color: var(--aui-background);
    color: var(--aui-text-primary);
    border-radius: var(--aui-radius-md);
    overflow: hidden;
    transition: box-shadow var(--aui-transition-base);
  }

  /* Variants */
  .aui-card--elevated {
    box-shadow: var(--aui-shadow-md);
    border: none;
  }

  .aui-card--outlined {
    box-shadow: none;
    border: 1px solid var(--aui-divider);
  }

  /* Padding */
  .aui-card--padding-none {
    padding: 0;
  }

  .aui-card--padding-sm {
    padding: var(--aui-spacing-sm);
  }

  .aui-card--padding-md {
    padding: var(--aui-spacing-md);
  }

  .aui-card--padding-lg {
    padding: var(--aui-spacing-lg);
  }
`;
