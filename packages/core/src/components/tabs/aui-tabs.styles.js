import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
  }

  .aui-tabs {
    display: flex;
    flex-direction: column;
  }

  .aui-tabs__nav {
    display: flex;
    position: relative;
    border-bottom: 1px solid var(--aui-border-color);
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
  }

  .aui-tabs__nav::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  .aui-tabs__indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: var(--aui-primary-main);
    transition:
      transform var(--aui-transition-normal),
      width var(--aui-transition-normal);
    pointer-events: none;
  }

  .aui-tabs__panels {
    padding: var(--aui-spacing-md) 0;
  }

  /* Variants */
  :host([variant='contained']) .aui-tabs__nav {
    background-color: var(--aui-background-paper);
    border-radius: var(--aui-radius-md);
    padding: 4px;
    border: 1px solid var(--aui-border-color);
  }

  :host([variant='contained']) .aui-tabs__indicator {
    display: none;
  }

  /* Orientation */
  :host([orientation='vertical']) .aui-tabs {
    flex-direction: row;
  }

  :host([orientation='vertical']) .aui-tabs__nav {
    flex-direction: column;
    border-bottom: none;
    border-right: 1px solid var(--aui-border-color);
    min-width: 150px;
  }

  :host([orientation='vertical']) .aui-tabs__indicator {
    right: 0;
    left: auto;
    top: 0;
    bottom: auto;
    width: 2px;
    height: auto;
  }
`;
//# sourceMappingURL=aui-tabs.styles.js.map