import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: inline-block;
    position: relative;
    width: 100%;
    font-family: var(--aui-font-family);
  }

  .aui-autocomplete {
    position: relative;
  }

  .aui-autocomplete__input {
    width: 100%;
    padding: var(--aui-spacing-sm) var(--aui-spacing-md);
    border: 1px solid var(--aui-border-color);
    border-radius: var(--aui-radius-sm);
    font-size: var(--aui-font-size-md);
    font-family: var(--aui-font-family);
    color: var(--aui-text-primary);
    background-color: var(--aui-background-paper);
    outline: none;
    transition: border-color var(--aui-transition-fast);
    box-sizing: border-box;
  }

  .aui-autocomplete__input:focus {
    border-color: var(--aui-primary-main);
  }

  .aui-autocomplete__input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .aui-autocomplete__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    max-height: 300px;
    overflow-y: auto;
    background-color: var(--aui-background-paper);
    border: 1px solid var(--aui-border-color);
    border-radius: var(--aui-radius-sm);
    box-shadow: var(--aui-shadow-md);
    z-index: 1000;
    display: none;
  }

  .aui-autocomplete__dropdown--open {
    display: block;
  }

  .aui-autocomplete__option {
    padding: var(--aui-spacing-sm) var(--aui-spacing-md);
    cursor: pointer;
    transition: background-color var(--aui-transition-fast);
  }

  .aui-autocomplete__option:hover {
    background-color: var(--aui-action-hover);
  }

  .aui-autocomplete__option--selected {
    background-color: var(--aui-action-selected);
    color: var(--aui-primary-main);
  }

  .aui-autocomplete__option--highlighted {
    background-color: var(--aui-action-hover);
  }

  .aui-autocomplete__no-options {
    padding: var(--aui-spacing-md);
    text-align: center;
    color: var(--aui-text-secondary);
  }

  .aui-autocomplete__loading {
    padding: var(--aui-spacing-md);
    text-align: center;
    color: var(--aui-text-secondary);
  }
`;
//# sourceMappingURL=aui-autocomplete.styles.js.map