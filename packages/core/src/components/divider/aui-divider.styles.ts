export const styles = `
  :host {
    display: block;
    margin: 24px 0;
  }

  :host([orientation="vertical"]) {
    display: inline-block;
    height: auto;
    margin: 0 16px;
    vertical-align: middle;
  }

  .aui-divider {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 14px;
    color: var(--aui-text-secondary, #6b7280);
  }

  :host([orientation="vertical"]) .aui-divider {
    flex-direction: column;
    height: 100%;
    width: auto;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: var(--aui-border-color, #e5e7eb);
    border: none;
  }

  :host([variant="dashed"]) .divider-line {
    background: transparent;
    border-top: 1px dashed var(--aui-border-color, #e5e7eb);
  }

  :host([variant="dotted"]) .divider-line {
    background: transparent;
    border-top: 1px dotted var(--aui-border-color, #e5e7eb);
  }

  :host([orientation="vertical"]) .divider-line {
    width: 1px;
    height: 100%;
    background: var(--aui-border-color, #e5e7eb);
    border: none;
  }

  :host([orientation="vertical"][variant="dashed"]) .divider-line {
    background: transparent;
    border-left: 1px dashed var(--aui-border-color, #e5e7eb);
    border-top: none;
  }

  :host([orientation="vertical"][variant="dotted"]) .divider-line {
    background: transparent;
    border-left: 1px dotted var(--aui-border-color, #e5e7eb);
    border-top: none;
  }

  .divider-content {
    padding: 0 16px;
    white-space: nowrap;
    font-weight: 500;
  }

  :host([orientation="vertical"]) .divider-content {
    padding: 16px 0;
  }

  :host([text-align="left"]) .divider-content {
    padding-left: 0;
  }

  :host([text-align="right"]) .divider-content {
    padding-right: 0;
  }

  /* Premium Variants */
  :host([variant="gradient"]) .divider-line {
    background: linear-gradient(90deg, transparent, var(--aui-primary, #3b82f6), transparent);
    height: 2px;
  }

  :host([variant="gradient"][orientation="vertical"]) .divider-line {
    background: linear-gradient(180deg, transparent, var(--aui-primary, #3b82f6), transparent);
    width: 2px;
    height: 100%;
  }

  :host([variant="glow"]) .divider-line {
    background: var(--aui-primary, #3b82f6);
    height: 2px;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
  }

  :host([variant="glow"][orientation="vertical"]) .divider-line {
    width: 2px;
    height: 100%;
  }

  :host([variant="thick"]) .divider-line {
    height: 3px;
  }

  :host([variant="thick"][orientation="vertical"]) .divider-line {
    width: 3px;
  }

  /* Dark Mode */
  :host([data-theme="dark"]) .divider-line,
  :host-context([data-theme="dark"]) .divider-line {
    background: var(--aui-border-dark, #374151);
  }

  :host([data-theme="dark"]) .divider-content,
  :host-context([data-theme="dark"]) .divider-content {
    color: var(--aui-text-dark, #9ca3af);
  }
`;
