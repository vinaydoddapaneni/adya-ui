import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: block;
    font-family: var(--aui-font-family);
  }

  .aui-stepper {
    display: flex;
  }

  :host([orientation='vertical']) .aui-stepper {
    flex-direction: column;
  }

  .aui-stepper__step {
    display: flex;
    flex: 1;
    position: relative;
  }

  :host([orientation='vertical']) .aui-stepper__step {
    flex-direction: column;
  }

  .aui-stepper__step-header {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: var(--aui-spacing-sm);
  }

  .aui-stepper__step-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--aui-background-paper);
    border: 2px solid var(--aui-border-color);
    color: var(--aui-text-secondary);
    font-weight: var(--aui-font-weight-medium);
    transition: all var(--aui-transition-fast);
    z-index: 1;
  }

  .aui-stepper__step--active .aui-stepper__step-icon {
    background-color: var(--aui-primary-main);
    border-color: var(--aui-primary-main);
    color: var(--aui-primary-contrast);
  }

  .aui-stepper__step--completed .aui-stepper__step-icon {
    background-color: var(--aui-primary-main);
    border-color: var(--aui-primary-main);
    color: var(--aui-primary-contrast);
  }

  .aui-stepper__step-label {
    margin-left: var(--aui-spacing-sm);
    display: flex;
    flex-direction: column;
  }

  .aui-stepper__step-title {
    font-size: var(--aui-font-size-md);
    font-weight: var(--aui-font-weight-medium);
    color: var(--aui-text-primary);
  }

  .aui-stepper__step-description {
    font-size: var(--aui-font-size-sm);
    color: var(--aui-text-secondary);
  }

  .aui-stepper__step-connector {
    flex: 1;
    height: 2px;
    background-color: var(--aui-border-color);
    margin: 0 var(--aui-spacing-sm);
    align-self: center;
  }

  .aui-stepper__step--completed .aui-stepper__step-connector {
    background-color: var(--aui-primary-main);
  }

  :host([orientation='vertical']) .aui-stepper__step-connector {
    width: 2px;
    height: 100%;
    margin: var(--aui-spacing-sm) 0;
    margin-left: 15px;
  }

  .aui-stepper__step-content {
    padding: var(--aui-spacing-md);
    padding-left: calc(32px + var(--aui-spacing-md) * 2);
  }

  :host([orientation='horizontal']) .aui-stepper__step-content {
    display: none;
  }
`;
