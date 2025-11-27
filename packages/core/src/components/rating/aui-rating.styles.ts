import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--aui-spacing-xs);
    font-family: var(--aui-font-family);
  }

  .aui-rating {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .aui-rating__star {
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: var(--aui-text-disabled);
    transition: color var(--aui-transition-fast), transform var(--aui-transition-fast);
  }

  .aui-rating__star:hover {
    transform: scale(1.1);
  }

  .aui-rating__star--filled {
    color: #ffc107;
  }

  .aui-rating__star--half {
    position: relative;
    color: var(--aui-text-disabled);
  }

  .aui-rating__star--half::before {
    content: '★';
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    overflow: hidden;
    color: #ffc107;
  }

  :host([readonly]) .aui-rating__star {
    cursor: default;
  }

  :host([readonly]) .aui-rating__star:hover {
    transform: none;
  }

  :host([disabled]) .aui-rating__star {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .aui-rating__label {
    margin-left: var(--aui-spacing-xs);
    font-size: var(--aui-font-size-sm);
    color: var(--aui-text-secondary);
  }
`;
