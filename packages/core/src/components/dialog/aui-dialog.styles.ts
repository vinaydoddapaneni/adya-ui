import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: none;
  }

  :host([open]) {
    display: block;
  }

  /* Backdrop */
  .aui-dialog__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn var(--aui-transition-base);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Dialog Container */
  .aui-dialog {
    background-color: var(--aui-surface);
    border-radius: var(--aui-radius-lg);
    box-shadow: var(--aui-shadow-lg);
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    animation: slideUp var(--aui-transition-base);
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Header */
  .aui-dialog__header {
    padding: var(--aui-spacing-lg);
    border-bottom: 1px solid var(--aui-divider);
  }

  .aui-dialog__headline {
    margin: 0;
    font-size: var(--aui-font-size-xl);
    font-weight: var(--aui-font-weight-medium);
    color: var(--aui-text-primary);
  }

  /* Content */
  .aui-dialog__content {
    padding: var(--aui-spacing-lg);
    overflow-y: auto;
    flex: 1;
  }

  /* Actions */
  .aui-dialog__actions {
    padding: var(--aui-spacing-lg);
    border-top: 1px solid var(--aui-divider);
    display: flex;
    justify-content: flex-end;
    gap: var(--aui-spacing-md);
  }
`;
