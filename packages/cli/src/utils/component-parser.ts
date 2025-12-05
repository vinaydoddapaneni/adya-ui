import fs from 'fs-extra';
import path from 'path';
import type { ComponentMetadata, PropDefinition } from '../types/index.js';

/**
 * Parses component files to extract metadata
 */
export class ComponentParser {
  /**
   * Parse a component file and extract metadata
   */
  async parse(filePath: string): Promise<ComponentMetadata | null> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const filename = path.basename(filePath);
      const name = path.basename(filePath, path.extname(filePath));
      
      // Skip index files and test files
      if (name === 'index' || name.includes('.test') || name.includes('.spec')) {
        return null;
      }

      const props = this.extractProps(content);
      const description = this.extractDescription(content);

      return {
        name,
        category: 'feedback', // Default category, would need smarter detection
        description: description || `Component ${name}`,
        props,
        events: [], // TODO: Extract events
        examples: [],
        keywords: [],
        relatedComponents: []
      };
    } catch (error) {
      console.warn(`Failed to parse component ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Extract props definition from content
   * Currently supports TypeScript interfaces named 'Props' or '${ComponentName}Props'
   */
  private extractProps(content: string): PropDefinition[] {
    const props: PropDefinition[] = [];
    
    // Regex to find interface definition
    // Matches: interface Props { ... } or interface ComponentNameProps { ... }
    const interfaceRegex = /interface\s+(\w+Props|Props)\s*{([^}]+)}/s;
    const match = content.match(interfaceRegex);

    if (match) {
      const propsBody = match[2];
      // Split by newlines and parse each line
      const lines = propsBody.split('\n');
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;

        // Match prop definition: name?: type; or name: type;
        // e.g. variant?: 'primary' | 'secondary';
        const propMatch = trimmed.match(/^(\w+)(\?)?:\s*([^;]+);/);
        
        if (propMatch) {
          const [, name, optional, type] = propMatch;
          props.push({
            name,
            type: type.trim(),
            required: !optional,
            description: '', // TODO: Extract JSDoc comments
            default: undefined
          });
        }
      }
    }

    return props;
  }

  /**
   * Extract component description from JSDoc
   */
  private extractDescription(content: string): string {
    // Look for JSDoc before the component definition
    // This is a simplified approach
    const jsDocRegex = /\/\*\*\s*\n\s*\*\s*([^*]+)/;
    const match = content.match(jsDocRegex);
    
    if (match) {
      return match[1].trim();
    }
    
    return '';
  }
}
