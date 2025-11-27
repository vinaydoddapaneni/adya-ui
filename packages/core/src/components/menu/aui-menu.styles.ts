import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: inline-block;
    position: relative;
  }

  .aui-menu__trigger {
    display: inline-block;
    cursor: pointer;
  }

  .aui-menu__content {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background-color: var(--aui-background-paper);
    border-radius: var(--aui-radius-md);
    box-shadow: var(--aui-shadow-lg);
    padding: var(--aui-spacing-xs) 0;
    margin-top: var(--aui-spacing-xs);
    z-index: var(--aui-z-index-menu);
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity var(--aui-transition-fast), transform var(--aui-transition-fast);
    visibility: hidden;
    pointer-events: none;
    border: 1px solid var(--aui-border-color);
  }

  .aui-menu--open .aui-menu__content {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
    pointer-events: auto;
  }

  /* Placements */
  :host([placement="bottom-start"]) .aui-menu__content {
    top: 100%;
    left: 0;
    right: auto;
  }

  :host([placement="bottom-end"]) .aui-menu__content {
    top: 100%;
    right: 0;
    left: auto;
  }

  :host([placement="top-start"]) .aui-menu__content {
    bottom: 100%;
    top: auto;
    left: 0;
    right: auto;
    margin-bottom: var(--aui-spacing-xs);
    margin-top: 0;
  }

  :host([placement="top-end"]) .aui-menu__content {
    bottom: 100%;
    top: auto;
    right: 0;
    left: auto;
    margin-bottom: var(--aui-spacing-xs);
    margin-top: 0;
  }
`;
