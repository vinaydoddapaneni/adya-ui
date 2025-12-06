import { describe, it, expect } from 'vitest';

import { ReactGenerator } from '../src/generators/react-generator.js';
import { VueGenerator } from '../src/generators/vue-generator.js';
import type { ProjectContext, ComponentIntent } from '../src/types/index.js';

describe('Context-Aware Generators', () => {
  const mockContext: ProjectContext = {
    root: '/tmp',
    framework: 'react',
    typescript: true,
    componentDir: 'src/components',
    designTokens: {
      primaryColor: '#ff0000',
      spacing: '2rem',
      borderRadius: '8px',
      fontFamily: 'Arial',
    },
  };

  const mockIntent: ComponentIntent = {
    name: 'TestComponent',
    type: 'component',
    description: 'A test component',
    components: [
      {
        name: 'div',
        content: 'Hello',
      },
    ],
    layout: {
      type: 'flex',
      direction: 'column',
      gap: '1rem',
    },
    styling: {},
  };

  it('ReactGenerator should use design tokens in styles', async () => {
    const generator = new ReactGenerator(mockContext);
    const result = await generator.generate(mockIntent);

    expect(result.styles).toBeDefined();
    // Should use the spacing token '2rem' instead of default '1rem'
    expect(result.styles).toContain('gap: 1rem'); // Wait, layout.gap overrides token if present.
    
    // Let's test with a layout that doesn't specify gap, or check padding which uses token
    const intentNoGap = { ...mockIntent, layout: { type: 'flex', direction: 'column' } as any };
    const result2 = await generator.generate(intentNoGap);
    
    // The generator uses tokens.spacing for padding and gap default
    expect(result2.styles).toContain('padding: 2rem');
    expect(result2.styles).toContain('gap: 2rem');
  });

  it('VueGenerator should use design tokens in styles', async () => {
    const vueContext = { ...mockContext, framework: 'vue' as const };
    const generator = new VueGenerator(vueContext);
    const intentNoGap = { ...mockIntent, layout: { type: 'flex', direction: 'column' } as any };
    
    const result = await generator.generate(intentNoGap);

    expect(result.code).toContain('<style scoped>');
    expect(result.code).toContain('padding: 2rem');
    expect(result.code).toContain('gap: 2rem');
  });
});
