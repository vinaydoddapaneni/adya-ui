import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: inline-block;
    outline: none;
  }

  .aui-radio {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    cursor: pointer;
    position: relative;
    user-select: none;
  }

  .aui-radio--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .aui-radio__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  .aui-radio__control {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: 2px solid var(--aui-color-text-secondary, #666);
    border-radius: 50%;
    background-color: transparent;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .aui-radio:hover:not(.aui-radio--disabled) .aui-radio__control {
    border-color: var(--aui-color-primary, #007bff);
  }

  .aui-radio__input:checked + .aui-radio__control {
    border-color: var(--aui-color-primary, #007bff);
  }

  .aui-radio__control::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--aui-color-primary, #007bff);
    transform: scale(0);
    transition: transform 0.2s ease;
  }

  .aui-radio__input:checked + .aui-radio__control::after {
    transform: scale(1);
  }

  .aui-radio__input:focus-visible + .aui-radio__control {
    outline: 2px solid var(--aui-color-primary-light, #80bdff);
    outline-offset: 2px;
  }

  .aui-radio__label {
    margin-left: 8px;
    font-family: var(--aui-font-family, sans-serif);
    font-size: var(--aui-font-size-md, 14px);
    color: var(--aui-color-text-primary, #333);
  }
`;
//# sourceMappingURL=aui-radio.styles.js.map