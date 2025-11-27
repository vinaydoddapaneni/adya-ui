import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
    background-color: var(--aui-surface);
    color: var(--aui-text-primary);
    border-radius: var(--aui-radius-lg);
    overflow: hidden;
    transition: all var(--aui-transition-base);
    box-shadow: var(--aui-shadow-md);
    border: 1px solid var(--aui-divider);
  }

  :host(:hover) {
    transform: translateY(-4px);
    box-shadow: var(--aui-shadow-xl);
    border-color: rgba(79, 70, 229, 0.1);
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
//# sourceMappingURL=aui-card.styles.js.map