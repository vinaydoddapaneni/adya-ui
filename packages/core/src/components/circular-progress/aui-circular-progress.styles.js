export const styles = `
  :host {
    display: inline-block;
  }

  .aui-circular-progress {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    transform: rotate(0deg);
  }

  .progress-bg {
    stroke: var(--aui-color-gray-200, #e5e7eb);
  }

  .progress-circle {
    stroke: var(--aui-color-primary, #3b82f6);
    stroke-linecap: round;
    transition: stroke-dashoffset 0.3s ease;
  }

  /* Variants */
  .variant-primary .progress-circle {
    stroke: var(--aui-color-primary, #3b82f6);
  }

  .variant-secondary .progress-circle {
    stroke: var(--aui-color-secondary, #6b7280);
  }

  .variant-success .progress-circle {
    stroke: var(--aui-color-success, #10b981);
  }

  .variant-warning .progress-circle {
    stroke: var(--aui-color-warning, #f59e0b);
  }

  .variant-error .progress-circle {
    stroke: var(--aui-color-error, #ef4444);
  }

  /* Indeterminate animation */
  .indeterminate svg {
    animation: rotate 1.4s linear infinite;
  }

  .indeterminate .progress-circle {
    animation: dash 1.4s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dashoffset: calc(var(--circumference, 150) * -0.5);
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  /* Label */
  .progress-label {
    position: absolute;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--aui-text-primary, #1f2937);
  }

  /* Dark mode */
  :host([data-theme="dark"]) .progress-bg,
  :host-context([data-theme="dark"]) .progress-bg {
    stroke: var(--aui-color-gray-700, #374151);
  }

  :host([data-theme="dark"]) .progress-label,
  :host-context([data-theme="dark"]) .progress-label {
    color: var(--aui-text-dark, #f9fafb);
  }
`;
//# sourceMappingURL=aui-circular-progress.styles.js.map