import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiCircularProgress } from './aui-circular-progress';

// Register the element if not already registered
if (!customElements.get('aui-circular-progress')) {
  customElements.define('aui-circular-progress', AuiCircularProgress);
}

describe('AuiCircularProgress', () => {
  let progress: AuiCircularProgress;

  beforeEach(() => {
    progress = new AuiCircularProgress();
    document.body.appendChild(progress);
  });

  afterEach(() => {
    document.body.removeChild(progress);
  });

  it('should render with default attributes', () => {
    expect(progress.shadowRoot).toBeTruthy();
    const progressElement = progress.shadowRoot!.querySelector('.aui-circular-progress');
    expect(progressElement).toBeTruthy();
    expect(progressElement!.classList.contains('variant-primary')).toBe(true);
  });

  it('should render with correct value', () => {
    progress.setAttribute('value', '75');
    
    const label = progress.shadowRoot!.querySelector('.progress-label');
    expect(label).toBeTruthy();
    expect(label!.textContent).toBe('75%');
  });

  it('should clamp value between 0 and 100', () => {
    progress.setAttribute('value', '150');
    const label = progress.shadowRoot!.querySelector('.progress-label');
    expect(label!.textContent).toBe('100%');
    
    progress.setAttribute('value', '-10');
    const label2 = progress.shadowRoot!.querySelector('.progress-label');
    expect(label2!.textContent).toBe('0%');
  });

  it('should render indeterminate state', () => {
    progress.setAttribute('indeterminate', '');
    
    const progressElement = progress.shadowRoot!.querySelector('.aui-circular-progress');
    expect(progressElement!.classList.contains('indeterminate')).toBe(true);
    
    const label = progress.shadowRoot!.querySelector('.progress-label');
    expect(label).toBeFalsy();
  });

  it('should apply size correctly', () => {
    progress.setAttribute('size', '64');
    
    const svg = progress.shadowRoot!.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg!.getAttribute('width')).toBe('64');
    expect(svg!.getAttribute('height')).toBe('64');
  });

  it('should apply variant correctly', () => {
    progress.setAttribute('variant', 'success');
    
    const progressElement = progress.shadowRoot!.querySelector('.aui-circular-progress');
    expect(progressElement!.classList.contains('variant-success')).toBe(true);
  });

  it('should update when attributes change', () => {
    progress.setAttribute('value', '25');
    expect(progress.shadowRoot!.querySelector('.progress-label')!.textContent).toBe('25%');
    
    progress.setAttribute('value', '80');
    expect(progress.shadowRoot!.querySelector('.progress-label')!.textContent).toBe('80%');
  });
});
