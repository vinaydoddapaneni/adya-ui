import path from 'path';

import fs from 'fs-extra';
import { describe, it, expect, beforeAll } from 'vitest';

import { ReactGenerator } from '../src/generators/react-generator.js';
import type { ProjectContext, ComponentIntent } from '../src/types/index.js';
import { ProjectDetector } from '../src/utils/project-detector.js';
import { ProjectScanner } from '../src/utils/project-scanner.js';

describe('Integration: Intelligent AI Assistant Workflow', () => {
  let testProjectDir: string;
  let context: ProjectContext;

  beforeAll(async () => {
    // Create a temporary test project structure
    testProjectDir = path.join(process.cwd(), 'test-fixtures', 'sample-project');
    await fs.ensureDir(testProjectDir);
    await fs.ensureDir(path.join(testProjectDir, 'src', 'components'));
    await fs.ensureDir(path.join(testProjectDir, 'src', 'styles'));

    // Create a sample component with props
    const sampleComponent = `
import React from 'react';

interface CardProps {
  title: string;
  description?: string;
  variant?: 'default' | 'elevated';
  onClick?: () => void;
}

/**
 * A reusable card component for displaying content
 */
export const Card: React.FC<CardProps> = ({ title, description, variant = 'default', onClick }) => {
  return (
    <div className={\`card card--\${variant}\`} onClick={onClick}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};
`;
    await fs.writeFile(
      path.join(testProjectDir, 'src', 'components', 'Card.tsx'),
      sampleComponent
    );

    // Create a theme file with design tokens
    const themeCSS = `
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --font-family: 'Inter', sans-serif;
  --spacing: 1.5rem;
  --border-radius: 0.5rem;
}
`;
    await fs.writeFile(
      path.join(testProjectDir, 'src', 'styles', 'theme.css'),
      themeCSS
    );

    // Create package.json with dependencies
    const packageJson = {
      name: 'sample-project',
      dependencies: {
        'react': '^18.0.0',
        'react-router-dom': '^6.0.0',
        'zustand': '^4.0.0'
      }
    };
    await fs.writeFile(
      path.join(testProjectDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Create tsconfig.json to indicate TypeScript project
    const tsconfig = {
      compilerOptions: {
        jsx: 'react',
        module: 'esnext',
        target: 'es2015'
      }
    };
    await fs.writeFile(
      path.join(testProjectDir, 'tsconfig.json'),
      JSON.stringify(tsconfig, null, 2)
    );
  });

  it('should detect project context correctly', async () => {
    const detector = new ProjectDetector(testProjectDir);
    const baseContext = await detector.detect();

    expect(baseContext.framework).toBe('react');
    expect(baseContext.typescript).toBe(true);
    expect(baseContext.componentDir).toBe('src/components');
  });

  it('should scan and extract comprehensive project context', async () => {
    const detector = new ProjectDetector(testProjectDir);
    const baseContext = await detector.detect();
    
    const scanner = new ProjectScanner(testProjectDir);
    context = await scanner.scan(baseContext);

    // Verify component discovery
    expect(context.discoveredComponents).toBeDefined();
    expect(context.discoveredComponents).toContain('Card');

    // Verify component metadata extraction
    expect(context.componentMetadata).toBeDefined();
    expect(context.componentMetadata?.length).toBeGreaterThan(0);
    
    const cardMeta = context.componentMetadata?.find(m => m.name === 'Card');
    expect(cardMeta).toBeDefined();
    expect(cardMeta?.description).toContain('reusable card component');
    expect(cardMeta?.props).toHaveLength(4);
    
    const titleProp = cardMeta?.props.find(p => p.name === 'title');
    expect(titleProp?.type).toBe('string');
    expect(titleProp?.required).toBe(true);

    // Verify design tokens extraction
    expect(context.designTokens).toBeDefined();
    expect(context.designTokens?.primaryColor).toBe('#3b82f6');
    expect(context.designTokens?.spacing).toBe('1.5rem');
    expect(context.designTokens?.fontFamily).toBe("'Inter', sans-serif");

    // Verify library detection
    expect(context.routing).toBe('react-router-dom');
    expect(context.stateManagement).toBe('Zustand');
  });

  it('should generate context-aware component using extracted metadata', async () => {
    const mockIntent: ComponentIntent = {
      name: 'UserProfile',
      type: 'component',
      components: [
        {
          name: 'div',
          children: [
            {
              name: 'Card',
              props: {
                title: 'user.name',
                description: 'user.bio',
                variant: 'elevated'
              }
            }
          ]
        }
      ],
      layout: {
        type: 'flex',
        direction: 'column',
        gap: '1rem'
      }
    };

    const generator = new ReactGenerator(context);
    const result = await generator.generate(mockIntent);

    // Verify generated code uses design tokens
    expect(result.styles).toBeDefined();
    expect(result.styles).toContain('1.5rem'); // Uses spacing token
    
    // Verify component name
    expect(result.filename).toBe('UserProfile.tsx');
    expect(result.code).toContain('export const UserProfile');
    
    // Verify it references the existing Card component
    expect(result.code).toContain('Card');
  });

  it('should demonstrate full workflow: scan → analyze → generate', async () => {
    // Step 1: Detect project
    const detector = new ProjectDetector(testProjectDir);
    const baseContext = await detector.detect();

    // Step 2: Scan for deep context
    const scanner = new ProjectScanner(testProjectDir);
    const fullContext = await scanner.scan(baseContext);

    // Step 3: Generate component with context
    const intent: ComponentIntent = {
      name: 'Dashboard',
      type: 'page',
      components: [
        {
          name: 'div',
          children: [
            {
              name: 'Card',
              props: { title: 'Stats', variant: 'elevated' }
            }
          ]
        }
      ],
      layout: {
        type: 'grid',
        columns: 3
      }
    };

    const generator = new ReactGenerator(fullContext);
    const result = await generator.generate(intent);

    // Verify the complete workflow produced valid output
    expect(result.code).toBeTruthy();
    expect(result.filename).toBe('Dashboard.tsx');
    expect(result.styles).toContain('1.5rem'); // Design token
    expect(result.code).toContain('Card'); // Existing component
    
    console.log('\n✅ Full Workflow Test Passed!');
    console.log('📊 Context Extracted:');
    console.log(`   - Components: ${fullContext.discoveredComponents?.join(', ')}`);
    console.log(`   - Design Tokens: spacing=${fullContext.designTokens?.spacing}`);
    console.log(`   - Routing: ${fullContext.routing}`);
    console.log(`   - State: ${fullContext.stateManagement}`);
    console.log('\n📝 Generated Component:');
    console.log(`   - File: ${result.filename}`);
    console.log(`   - Uses existing Card component: ✓`);
    console.log(`   - Applies design tokens: ✓`);
  });
});
