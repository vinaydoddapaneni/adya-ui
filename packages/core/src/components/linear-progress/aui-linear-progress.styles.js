import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
    width: 100%;
  }

  .aui-linear-progress {
    position: relative;
    width: 100%;
    height: 4px;
    background-color: var(--aui-action-hover);
    overflow: hidden;
    border-radius: var(--aui-radius-sm);
  }

  .aui-linear-progress__bar {
    height: 100%;
    background-color: var(--aui-primary-main);
    transform-origin: left;
    transition: transform var(--aui-transition-normal);
  }

  .aui-linear-progress__buffer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--aui-primary-light);
    opacity: 0.3;
    transform-origin: left;
    transition: transform var(--aui-transition-normal);
    z-index: 0;
  }

  /* Indeterminate Animation */
  @keyframes indeterminate-1 {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }

  @keyframes indeterminate-2 {
    0% {
      left: -200%;
      right: 100%;
    }
    60% {
      left: 107%;
      right: -8%;
    }
    100% {
      left: 107%;
      right: -8%;
    }
  }

  :host([indeterminate]) .aui-linear-progress__bar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: auto;
    transform: none;
    transition: none;
  }

  :host([indeterminate]) .aui-linear-progress__bar-1 {
    animation: indeterminate-1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }

  :host([indeterminate]) .aui-linear-progress__bar-2 {
    animation: indeterminate-2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
  }
`;
//# sourceMappingURL=aui-linear-progress.styles.js.map