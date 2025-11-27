import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
    font-family: var(--aui-font-family);
  }

  .aui-timeline {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .aui-timeline__item {
    display: flex;
    position: relative;
    padding-bottom: var(--aui-spacing-lg);
  }

  .aui-timeline__item:last-child {
    padding-bottom: 0;
  }

  .aui-timeline__separator {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: var(--aui-spacing-md);
  }

  .aui-timeline__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--aui-primary-main);
    border: 2px solid var(--aui-background-default);
    box-shadow: 0 0 0 2px var(--aui-primary-main);
    z-index: 1;
  }

  .aui-timeline__item--variant-outlined .aui-timeline__dot {
    background-color: var(--aui-background-default);
  }

  .aui-timeline__connector {
    flex: 1;
    width: 2px;
    background-color: var(--aui-border-color);
    margin-top: 4px;
    min-height: 24px;
  }

  .aui-timeline__item:last-child .aui-timeline__connector {
    display: none;
  }

  .aui-timeline__content {
    flex: 1;
    padding-top: 0;
  }

  .aui-timeline__time {
    font-size: var(--aui-font-size-sm);
    color: var(--aui-text-secondary);
    margin-bottom: var(--aui-spacing-xs);
  }

  .aui-timeline__title {
    font-size: var(--aui-font-size-md);
    font-weight: var(--aui-font-weight-medium);
    color: var(--aui-text-primary);
    margin-bottom: var(--aui-spacing-xs);
  }

  .aui-timeline__description {
    font-size: var(--aui-font-size-sm);
    color: var(--aui-text-secondary);
    line-height: 1.5;
  }

  /* Alternate layout */
  :host([position='alternate']) .aui-timeline {
    align-items: center;
  }

  :host([position='alternate']) .aui-timeline__item {
    width: 100%;
    max-width: 600px;
  }

  :host([position='alternate']) .aui-timeline__item:nth-child(even) {
    flex-direction: row-reverse;
  }

  :host([position='alternate']) .aui-timeline__item:nth-child(even) .aui-timeline__separator {
    margin-right: 0;
    margin-left: var(--aui-spacing-md);
  }
`;
//# sourceMappingURL=aui-timeline.styles.js.map