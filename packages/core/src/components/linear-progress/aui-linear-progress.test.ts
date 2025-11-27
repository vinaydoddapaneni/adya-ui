import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiLinearProgress } from './aui-linear-progress';

// Register the element if not already registered
if (!customElements.get('aui-linear-progress')) {
  customElements.define('aui-linear-progress', AuiLinearProgress);
}

describe('aui-linear-progress', () => {
  let progress: AuiLinearProgress;

  beforeEach(() => {
    progress = document.createElement('aui-linear-progress') as AuiLinearProgress;
    document.body.appendChild(progress);
  });

  afterEach(() => {
    document.body.removeChild(progress);
  });

  it('should render', () => {
    expect(progress).toBeDefined();
  });

  it('should set default attributes', () => {
    expect(progress.value).toBe(0);
    expect(progress.buffer).toBe(0);
    expect(progress.indeterminate).toBe(false);
  });

  it('should update value', () => {
    progress.value = 50;
    expect(progress.getAttribute('value')).toBe('50');
    const bar = progress.shadowRoot?.querySelector('.aui-linear-progress__bar') as HTMLElement;
    expect(bar.style.transform).toBe('scaleX(0.5)');
  });

  it('should update buffer', () => {
    progress.buffer = 75;
    expect(progress.getAttribute('buffer')).toBe('75');
    const buffer = progress.shadowRoot?.querySelector('.aui-linear-progress__buffer') as HTMLElement;
    expect(buffer.style.transform).toBe('scaleX(0.75)');
  });

  it('should handle indeterminate state', () => {
    progress.indeterminate = true;
    expect(progress.hasAttribute('indeterminate')).toBe(true);
    const bars = progress.shadowRoot?.querySelectorAll('.aui-linear-progress__bar');
    expect(bars?.length).toBe(2);
  });
});
