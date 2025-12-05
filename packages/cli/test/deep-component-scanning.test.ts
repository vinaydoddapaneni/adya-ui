import { describe, it, expect, vi } from 'vitest';
import path from 'path';
import fs from 'fs-extra';
import { ComponentParser } from '../src/utils/component-parser.js';
import { ProjectScanner } from '../src/utils/project-scanner.js';
import { BaseAIService } from '../src/services/ai-service.js';
import type { ProjectContext, ComponentIntent } from '../src/types/index.js';

// Mock BaseAIService since it's abstract
class TestAIService extends BaseAIService {
  getDefaultModel() { return 'test-model'; }
  async analyzePrompt(prompt: string, context: ProjectContext): Promise<ComponentIntent> {
    return {} as any;
  }
  public getSystemPrompt(context: ProjectContext) {
    return this.buildSystemPrompt(context);
  }
}

describe('Deep Component Scanning', () => {
  const mockComponentContent = `
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  label: string;
  onClick: () => void;
}

/**
 * A reusable button component
 */
export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
`;

  it('ComponentParser should extract props and description', async () => {
    // Mock fs.readFile
    vi.spyOn(fs, 'readFile').mockResolvedValue(mockComponentContent);
    
    const parser = new ComponentParser();
    const metadata = await parser.parse('src/components/Button.tsx');

    expect(metadata).not.toBeNull();
    expect(metadata?.name).toBe('Button');
    expect(metadata?.description).toBe('A reusable button component');
    expect(metadata?.props).toHaveLength(3);
    
    const variantProp = metadata?.props.find(p => p.name === 'variant');
    expect(variantProp).toBeDefined();
    expect(variantProp?.type).toBe("'primary' | 'secondary'");
    expect(variantProp?.required).toBe(false);

    const labelProp = metadata?.props.find(p => p.name === 'label');
    expect(labelProp).toBeDefined();
    expect(labelProp?.type).toBe('string');
    expect(labelProp?.required).toBe(true);
  });

  it('BaseAIService should include component metadata in system prompt', () => {
    const service = new TestAIService({ apiKey: 'test' });
    const context: ProjectContext = {
      framework: 'react',
      typescript: true,
      componentDir: 'src/components',
      rootDir: '/tmp',
      styleFormat: 'css',
      componentMetadata: [
        {
          name: 'Button',
          category: 'feedback',
          description: 'A reusable button component',
          props: [
            { name: 'label', type: 'string', required: true, description: '' },
            { name: 'variant', type: "'primary' | 'secondary'", required: false, description: '' }
          ],
          events: [],
          examples: [],
          keywords: [],
          relatedComponents: []
        }
      ]
    };

    const prompt = service.getSystemPrompt(context);
    
    expect(prompt).toContain('Component Details (Props & Interfaces):');
    expect(prompt).toContain('- Button: A reusable button component');
    expect(prompt).toContain("Props: { label: string, variant?: 'primary' | 'secondary' }");
  });
});
