import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--aui-spacing-md);
    padding-right: var(--aui-spacing-md);
    box-sizing: border-box;
  }

  /* Max Widths */
  .aui-container--xs {
    max-width: 444px;
  }

  .aui-container--sm {
    max-width: 640px;
  }

  .aui-container--md {
    max-width: 768px;
  }

  .aui-container--lg {
    max-width: 1024px;
  }

  .aui-container--xl {
    max-width: 1280px;
  }

  .aui-container--full {
    max-width: 100%;
  }

  /* Responsive padding adjustments could go here */
  @media (min-width: 600px) {
    :host {
      padding-left: var(--aui-spacing-lg);
      padding-right: var(--aui-spacing-lg);
    }
  }
`;
//# sourceMappingURL=aui-container.styles.js.map