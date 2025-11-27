import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: inline-block;
    position: relative;
  }

  .aui-tooltip__trigger {
    display: inline-block;
    cursor: help;
  }

  .aui-tooltip__content {
    position: absolute;
    background-color: var(--aui-tooltip-bg, rgba(97, 97, 97, 0.9));
    color: var(--aui-tooltip-color, #fff);
    padding: var(--aui-spacing-xs) var(--aui-spacing-sm);
    border-radius: var(--aui-radius-sm);
    font-size: var(--aui-font-size-sm);
    white-space: nowrap;
    z-index: var(--aui-z-index-tooltip);
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--aui-transition-fast), transform var(--aui-transition-fast);
    pointer-events: none;
  }

  .aui-tooltip--open .aui-tooltip__content {
    opacity: 1;
    visibility: visible;
  }

  /* Placements */
  :host([placement="top"]) .aui-tooltip__content {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    margin-bottom: var(--aui-spacing-xs);
  }

  :host([placement="top"]) .aui-tooltip--open .aui-tooltip__content {
    transform: translateX(-50%) translateY(0);
  }

  :host([placement="bottom"]) .aui-tooltip__content {
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-4px);
    margin-top: var(--aui-spacing-xs);
  }

  :host([placement="bottom"]) .aui-tooltip--open .aui-tooltip__content {
    transform: translateX(-50%) translateY(0);
  }

  :host([placement="left"]) .aui-tooltip__content {
    top: 50%;
    right: 100%;
    transform: translateY(-50%) translateX(4px);
    margin-right: var(--aui-spacing-xs);
  }

  :host([placement="left"]) .aui-tooltip--open .aui-tooltip__content {
    transform: translateY(-50%) translateX(0);
  }

  :host([placement="right"]) .aui-tooltip__content {
    top: 50%;
    left: 100%;
    transform: translateY(-50%) translateX(-4px);
    margin-left: var(--aui-spacing-xs);
  }

  :host([placement="right"]) .aui-tooltip--open .aui-tooltip__content {
    transform: translateY(-50%) translateX(0);
  }
`;
//# sourceMappingURL=aui-tooltip.styles.js.map