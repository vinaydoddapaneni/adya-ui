import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: block;
    width: 100%;
    z-index: var(--aui-z-index-app-bar);
    font-family: var(--aui-font-family);
  }

  .aui-app-bar {
    display: flex;
    align-items: center;
    padding: 0 var(--aui-spacing-lg);
    min-height: 72px;
    background-color: var(--aui-surface);
    color: var(--aui-text-primary);
    box-shadow: var(--aui-shadow-sm);
    transition: all var(--aui-transition-base);
    position: relative;
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.8);
    border-bottom: 1px solid var(--aui-divider);
  }

  [data-theme="dark"] .aui-app-bar {
    background-color: rgba(30, 30, 30, 0.8);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  /* Variants */
  .aui-app-bar--dense {
    min-height: 56px;
    padding: 0 var(--aui-spacing-md);
  }

  .aui-app-bar--dense .aui-app-bar__title {
    font-size: 1.1rem;
  }

  .aui-app-bar--flat {
    box-shadow: none;
    border: none;
  }

  .aui-app-bar--outlined {
    background-color: transparent;
    color: var(--aui-text-primary);
    border: 1px solid var(--aui-divider);
    border-radius: var(--aui-radius-md);
    margin: var(--aui-spacing-sm);
    width: calc(100% - (var(--aui-spacing-sm) * 2));
    box-shadow: none;
  }

  .aui-app-bar--transparent {
    background-color: transparent;
    color: var(--aui-text-primary);
    box-shadow: none;
    border: none;
    backdrop-filter: none;
  }

  /* Colors */
  .aui-app-bar--primary {
    background-color: var(--aui-primary-main);
    color: var(--aui-primary-contrast);
    border: none;
  }

  .aui-app-bar--primary .aui-app-bar__title,
  .aui-app-bar--primary .aui-icon-button {
    color: inherit;
  }

  .aui-app-bar--secondary {
    background-color: var(--aui-secondary-main);
    color: var(--aui-secondary-contrast);
    border: none;
  }

  .aui-app-bar--secondary .aui-app-bar__title,
  .aui-app-bar--secondary .aui-icon-button {
    color: inherit;
  }

  /* App Bar Content */
  .aui-app-bar__content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .aui-app-bar__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.5;
    letter-spacing: -0.01em;
  }

  .aui-app-bar__spacer {
    flex-grow: 1;
  }

  .aui-app-bar__actions {
    display: flex;
    align-items: center;
    gap: var(--aui-spacing-sm);
  }

  .aui-app-bar--default {
    background-color: var(--aui-surface);
    color: var(--aui-text-primary);
  }

  /* Positions */
  :host([position="fixed"]) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  :host([position="absolute"]) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  :host([position="sticky"]) {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
  }

  /* Slots */
  .aui-app-bar__start {
    display: flex;
    align-items: center;
    margin-right: var(--aui-spacing-md);
  }

  .aui-app-bar__title {
    flex: 1;
    font-size: var(--aui-font-size-xl);
    font-weight: var(--aui-font-weight-medium);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .aui-app-bar__end {
    display: flex;
    align-items: center;
    margin-left: var(--aui-spacing-md);
  }
`;
