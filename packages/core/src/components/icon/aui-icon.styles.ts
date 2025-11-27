import { css } from '../../base/utils';

export const styles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  :host([size='small']) {
    font-size: var(--aui-font-size-sm);
  }

  :host([size='medium']) {
    font-size: var(--aui-font-size-md);
  }

  :host([size='large']) {
    font-size: var(--aui-font-size-lg);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;
