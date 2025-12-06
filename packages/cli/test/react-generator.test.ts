import { describe, it, expect } from 'vitest';

import { ReactGenerator } from '../src/generators/react-generator.js';
import type { ComponentIntent } from '../src/types/index.js';

describe('ReactGenerator', () => {
  const generator = new ReactGenerator(true); // TypeScript enabled

  it('should generate a simple component', async () => {
    const intent: ComponentIntent = {
      type: 'component',
      name: 'TestButton',
      components: [
        {
          name: 'AuiButton',
          props: { variant: 'primary' },
          content: 'Click Me'
        }
      ]
    };

    const result = await generator.generate(intent);

    expect(result.filename).toBe('TestButton.tsx');
    expect(result.code).toContain("import React from 'react'");
    expect(result.code).toContain("import styles from './TestButton.module.css'");
    expect(result.code).toContain('export const TestButton: React.FC<TestButtonProps>');
    // Aui components are now converted to standard HTML elements
    expect(result.code).toContain('<button');
    expect(result.code).toContain('Click Me');
  });

  it('should generate a component with state', async () => {
    const intent: ComponentIntent = {
      type: 'component',
      name: 'Counter',
      components: [
        { name: 'div', content: 'Count: {count}' },
        { name: 'AuiButton', content: 'Increment' }
      ],
      state: [
        { name: 'count', type: 'number', initialValue: 0 }
      ]
    };

    const result = await generator.generate(intent);

    expect(result.code).toContain('const [count, setCount] = React.useState<number>(0);');
  });

  it('should generate a component with props', async () => {
    const intent: ComponentIntent = {
      type: 'component',
      name: 'UserCard',
      components: [{ name: 'div' }],
      props: {
        name: 'string',
        age: 'number',
        isAdmin: 'boolean'
      }
    };

    const result = await generator.generate(intent);

    expect(result.code).toContain('interface UserCardProps {');
    expect(result.code).toContain('name?: string;');
    expect(result.code).toContain('age?: number;');
    expect(result.code).toContain('isAdmin?: boolean;');
  });

  it('should generate a layout with grid', async () => {
    const intent: ComponentIntent = {
      type: 'page',
      name: 'GridPage',
      components: [
        { name: 'div', content: 'Item 1' },
        { name: 'div', content: 'Item 2' }
      ],
      layout: {
        type: 'grid',
        columns: 2,
        gap: '2rem'
      }
    };

    const result = await generator.generate(intent);

    expect(result.styles).toContain('display: grid;');
    expect(result.styles).toContain('grid-template-columns: repeat(2, 1fr);');
    expect(result.styles).toContain('gap: 2rem;');
  });
});
