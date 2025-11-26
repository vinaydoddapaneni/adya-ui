import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiDivider } from './aui-divider';

describe('AuiDivider', () => {
  let divider: AuiDivider;

  beforeEach(() => {
    divider = new AuiDivider();
    document.body.appendChild(divider);
  });

  afterEach(() => {
    document.body.removeChild(divider);
  });

  it('should render horizontal divider by default', () => {
    expect(divider.getAttribute('orientation')).toBeNull();
    expect(divider.shadowRoot?.innerHTML).toContain('class="aui-divider"');
  });

  it('should render vertical divider', () => {
    divider.setAttribute('orientation', 'vertical');
    expect(divider.getAttribute('orientation')).toBe('vertical');
  });

  it('should render with text content', () => {
    divider.textContent = 'Section';
    divider.connectedCallback();
    const content = divider.shadowRoot?.querySelector('.divider-content');
    expect(content).toBeTruthy();
  });

  it('should support different variants', () => {
    const variants = ['solid', 'dashed', 'dotted', 'gradient', 'glow', 'thick'];
    variants.forEach(variant => {
      divider.setAttribute('variant', variant);
      expect(divider.getAttribute('variant')).toBe(variant);
    });
  });

  it('should support text alignment', () => {
    const alignments = ['left', 'center', 'right'];
    alignments.forEach(align => {
      divider.setAttribute('text-align', align);
      expect(divider.getAttribute('text-align')).toBe(align);
    });
  });
});
