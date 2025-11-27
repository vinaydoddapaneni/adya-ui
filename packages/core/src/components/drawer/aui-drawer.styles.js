import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: var(--aui-z-index-drawer);
  }

  .aui-drawer {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .aui-drawer__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--aui-overlay-color);
    opacity: 0;
    transition: opacity var(--aui-transition-normal);
    pointer-events: auto;
  }

  .aui-drawer--open .aui-drawer__overlay {
    opacity: 1;
  }

  .aui-drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: var(--aui-background-paper);
    box-shadow: var(--aui-shadow-lg);
    transition: transform var(--aui-transition-normal);
    pointer-events: auto;
    overflow: auto;
  }

  /* Placements */
  .aui-drawer--start .aui-drawer__panel {
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--aui-drawer-width, 250px);
    transform: translateX(-100%);
    border-right: 1px solid var(--aui-border-color);
  }

  .aui-drawer--end .aui-drawer__panel {
    top: 0;
    right: 0;
    bottom: 0;
    width: var(--aui-drawer-width, 250px);
    transform: translateX(100%);
    border-left: 1px solid var(--aui-border-color);
  }

  .aui-drawer--top .aui-drawer__panel {
    top: 0;
    left: 0;
    right: 0;
    height: var(--aui-drawer-height, auto);
    max-height: 50vh;
    transform: translateY(-100%);
    border-bottom: 1px solid var(--aui-border-color);
  }

  .aui-drawer--bottom .aui-drawer__panel {
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--aui-drawer-height, auto);
    max-height: 50vh;
    transform: translateY(100%);
    border-top: 1px solid var(--aui-border-color);
  }

  /* Open State */
  .aui-drawer--open.aui-drawer--start .aui-drawer__panel,
  .aui-drawer--open.aui-drawer--end .aui-drawer__panel {
    transform: translateX(0);
  }

  .aui-drawer--open.aui-drawer--top .aui-drawer__panel,
  .aui-drawer--open.aui-drawer--bottom .aui-drawer__panel {
    transform: translateY(0);
  }

  /* Header, Body, Footer */
  .aui-drawer__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--aui-spacing-md);
    border-bottom: 1px solid var(--aui-border-color);
  }

  .aui-drawer__title {
    font-size: var(--aui-font-size-lg);
    font-weight: var(--aui-font-weight-bold);
    margin: 0;
  }

  .aui-drawer__close {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--aui-spacing-xs);
    color: var(--aui-text-secondary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--aui-transition-fast);
  }

  .aui-drawer__close:hover {
    background-color: var(--aui-action-hover);
    color: var(--aui-text-primary);
  }

  .aui-drawer__body {
    flex: 1;
    padding: var(--aui-spacing-md);
    overflow-y: auto;
  }

  .aui-drawer__footer {
    padding: var(--aui-spacing-md);
    border-top: 1px solid var(--aui-border-color);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--aui-spacing-sm);
  }
`;
//# sourceMappingURL=aui-drawer.styles.js.map