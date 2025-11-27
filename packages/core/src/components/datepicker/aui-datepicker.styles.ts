import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: inline-block;
    font-family: var(--aui-font-family);
  }

  .aui-datepicker {
    position: relative;
  }

  .aui-datepicker__input {
    width: 100%;
    padding: var(--aui-spacing-sm) var(--aui-spacing-md);
    border: 1px solid var(--aui-border-color);
    border-radius: var(--aui-radius-sm);
    font-size: var(--aui-font-size-md);
    font-family: var(--aui-font-family);
    color: var(--aui-text-primary);
    background-color: var(--aui-background-paper);
    cursor: pointer;
    box-sizing: border-box;
  }

  .aui-datepicker__input:focus {
    outline: none;
    border-color: var(--aui-primary-main);
  }

  .aui-datepicker__calendar {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    background-color: var(--aui-background-paper);
    border: 1px solid var(--aui-border-color);
    border-radius: var(--aui-radius-sm);
    box-shadow: var(--aui-shadow-md);
    padding: var(--aui-spacing-md);
    z-index: 1000;
    display: none;
    min-width: 280px;
  }

  .aui-datepicker__calendar--open {
    display: block;
  }

  .aui-datepicker__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--aui-spacing-md);
  }

  .aui-datepicker__nav-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--aui-spacing-xs);
    color: var(--aui-text-primary);
    font-size: 18px;
  }

  .aui-datepicker__month-year {
    font-weight: var(--aui-font-weight-medium);
    color: var(--aui-text-primary);
  }

  .aui-datepicker__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: var(--aui-spacing-xs);
  }

  .aui-datepicker__weekday {
    text-align: center;
    font-size: var(--aui-font-size-sm);
    color: var(--aui-text-secondary);
    font-weight: var(--aui-font-weight-medium);
    padding: var(--aui-spacing-xs);
  }

  .aui-datepicker__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  .aui-datepicker__day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--aui-radius-sm);
    cursor: pointer;
    font-size: var(--aui-font-size-sm);
    transition: background-color var(--aui-transition-fast);
  }

  .aui-datepicker__day:hover {
    background-color: var(--aui-action-hover);
  }

  .aui-datepicker__day--today {
    border: 1px solid var(--aui-primary-main);
  }

  .aui-datepicker__day--selected {
    background-color: var(--aui-primary-main);
    color: var(--aui-primary-contrast);
  }

  .aui-datepicker__day--other-month {
    color: var(--aui-text-disabled);
  }

  .aui-datepicker__day--disabled {
    color: var(--aui-text-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }
`;
