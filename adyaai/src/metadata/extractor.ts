import fs from 'fs/promises';
import path from 'path';
import { config } from '../config/index.js';

export interface ComponentProperty {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: string;
}

export interface ComponentMetadata {
  name: string;
  tagName: string;
  description: string;
  category: string;
  properties: ComponentProperty[];
  attributes: ComponentProperty[];
  events: Array<{ name: string; description: string }>;
  slots: Array<{ name: string; description: string }>;
  examples: string[];
  useCases: string[];
}

/**
 * Extracts component metadata from TypeScript files
 */
export class MetadataExtractor {
  private componentPath: string;

  constructor(componentPath?: string) {
    this.componentPath = componentPath || config.paths.componentPath;
  }

  /**
   * Extract all component metadata
   */
  async extractAll(): Promise<Record<string, ComponentMetadata>> {
    const components: Record<string, ComponentMetadata> = {};
    
    try {
      const entries = await fs.readdir(this.componentPath, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const componentName = entry.name;
          const componentFile = path.join(
            this.componentPath,
            componentName,
            `aui-${componentName}.ts`
          );
          
          try {
            const metadata = await this.extractFromFile(componentFile, componentName);
            if (metadata) {
              components[metadata.tagName] = metadata;
            }
          } catch (error) {
            console.warn(`Failed to extract metadata for ${componentName}:`, error);
          }
        }
      }
      
      return components;
    } catch (error) {
      console.error('Failed to extract component metadata:', error);
      throw error;
    }
  }

  /**
   * Extract metadata from a single component file
   */
  private async extractFromFile(
    filePath: string,
    componentName: string
  ): Promise<ComponentMetadata | null> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const tagName = `aui-${componentName}`;
      
      // Extract JSDoc comment block
      const jsdocMatch = content.match(/\/\*\*[\s\S]*?\*\//);
      const jsdoc = jsdocMatch ? jsdocMatch[0] : '';
      
      // Extract description
      const descMatch = jsdoc.match(/\* (.*?) - (.*?)(?:\n|\*\/)/);
      const description = descMatch ? descMatch[2].trim() : `${componentName} component`;
      
      // Extract properties from @attr tags
      const attributes = this.extractAttributes(jsdoc);
      
      // Extract events from @fires tags
      const events = this.extractEvents(jsdoc);
      
      // Extract slots from @slot tags
      const slots = this.extractSlots(jsdoc);
      
      // Extract properties from getters/setters
      const properties = this.extractProperties(content);
      
      // Generate examples
      const examples = this.generateExamples(tagName, attributes);
      
      // Determine category
      const category = this.categorizeComponent(componentName);
      
      // Generate use cases
      const useCases = this.generateUseCases(componentName, description);
      
      return {
        name: componentName,
        tagName,
        description,
        category,
        properties,
        attributes,
        events,
        slots,
        examples,
        useCases,
      };
    } catch (error) {
      console.error(`Error extracting metadata from ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Extract attributes from JSDoc @attr tags
   */
  private extractAttributes(jsdoc: string): ComponentProperty[] {
    const attributes: ComponentProperty[] = [];
    const attrRegex = /\* @attr \{([^}]+)\} ([^ ]+) - (.+)/g;
    let match;
    
    while ((match = attrRegex.exec(jsdoc)) !== null) {
      attributes.push({
        name: match[2],
        type: match[1],
        description: match[3].trim(),
      });
    }
    
    return attributes;
  }

  /**
   * Extract events from JSDoc @fires tags
   */
  private extractEvents(jsdoc: string): Array<{ name: string; description: string }> {
    const events: Array<{ name: string; description: string }> = [];
    const eventRegex = /\* @fires ([^ ]+) - (.+)/g;
    let match;
    
    while ((match = eventRegex.exec(jsdoc)) !== null) {
      events.push({
        name: match[1],
        description: match[2].trim(),
      });
    }
    
    return events;
  }

  /**
   * Extract slots from JSDoc @slot tags
   */
  private extractSlots(jsdoc: string): Array<{ name: string; description: string }> {
    const slots: Array<{ name: string; description: string }> = [];
    const slotRegex = /\* @slot ([^ ]*) ?- ?(.+)/g;
    let match;
    
    while ((match = slotRegex.exec(jsdoc)) !== null) {
      slots.push({
        name: match[1] || 'default',
        description: match[2]?.trim() || 'Default slot',
      });
    }
    
    return slots;
  }

  /**
   * Extract properties from getter/setter pairs
   */
  private extractProperties(content: string): ComponentProperty[] {
    const properties: ComponentProperty[] = [];
    const getterRegex = /get (\w+)\(\): (\w+(?:\[\])?)/g;
    let match;
    
    while ((match = getterRegex.exec(content)) !== null) {
      const propName = match[1];
      const propType = match[2];
      
      // Skip internal properties
      if (propName.startsWith('_')) continue;
      
      properties.push({
        name: propName,
        type: propType,
        description: `${propName} property`,
      });
    }
    
    return properties;
  }

  /**
   * Generate example usage code
   */
  private generateExamples(tagName: string, attributes: ComponentProperty[]): string[] {
    const examples: string[] = [];
    
    // Basic example
    examples.push(`<${tagName}>Content</${tagName}>`);
    
    // Example with common attributes
    if (attributes.length > 0) {
      const commonAttrs = attributes.slice(0, 3);
      const attrString = commonAttrs
        .map(attr => {
          if (attr.type === 'boolean') return attr.name;
          return `${attr.name}="${this.getExampleValue(attr)}"`;
        })
        .join(' ');
      examples.push(`<${tagName} ${attrString}>Content</${tagName}>`);
    }
    
    return examples;
  }

  /**
   * Get example value for an attribute
   */
  private getExampleValue(attr: ComponentProperty): string {
    if (attr.name === 'variant') return 'primary';
    if (attr.name === 'size') return 'medium';
    if (attr.name === 'type') return 'text';
    if (attr.name === 'label') return 'Label';
    if (attr.name === 'placeholder') return 'Enter text...';
    if (attr.name === 'value') return 'value';
    return 'example';
  }

  /**
   * Categorize component
   */
  private categorizeComponent(name: string): string {
    const categories: Record<string, string[]> = {
      'Form Inputs': ['button', 'textfield', 'checkbox', 'radio', 'switch', 'select'],
      'Layout': ['container', 'card'],
      'Feedback': ['alert', 'dialog', 'badge'],
      'Typography': ['typography'],
      'Data Display': ['badge', 'card'],
    };
    
    for (const [category, components] of Object.entries(categories)) {
      if (components.includes(name)) {
        return category;
      }
    }
    
    return 'Other';
  }

  /**
   * Generate use cases for a component
   */
  private generateUseCases(name: string, description: string): string[] {
    const useCases: Record<string, string[]> = {
      button: [
        'Primary actions in forms',
        'Call-to-action buttons',
        'Navigation triggers',
        'Submit buttons',
      ],
      textfield: [
        'User input forms',
        'Search bars',
        'Login/registration forms',
        'Data entry fields',
      ],
      checkbox: [
        'Multi-select options',
        'Terms and conditions acceptance',
        'Feature toggles',
        'Filter selections',
      ],
      radio: [
        'Single-choice selections',
        'Survey questions',
        'Settings options',
        'Payment method selection',
      ],
      switch: [
        'Boolean settings',
        'Feature toggles',
        'Dark mode toggle',
        'Notification preferences',
      ],
      select: [
        'Dropdown menus',
        'Country/state selection',
        'Category filters',
        'Sorting options',
      ],
      card: [
        'Content containers',
        'Product displays',
        'Dashboard widgets',
        'Article previews',
      ],
      alert: [
        'Success messages',
        'Error notifications',
        'Warning alerts',
        'Info banners',
      ],
      dialog: [
        'Confirmation modals',
        'Form dialogs',
        'Alert dialogs',
        'Content overlays',
      ],
      badge: [
        'Notification counts',
        'Status indicators',
        'Labels and tags',
        'New item markers',
      ],
    };
    
    return useCases[name] || [`Use ${description} in your application`];
  }

  /**
   * Save metadata to JSON file
   */
  async saveToFile(metadata: Record<string, ComponentMetadata>, outputPath: string): Promise<void> {
    try {
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, JSON.stringify(metadata, null, 2), 'utf-8');
      console.log(`✅ Metadata saved to ${outputPath}`);
    } catch (error) {
      console.error('Failed to save metadata:', error);
      throw error;
    }
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const extractor = new MetadataExtractor();
  const metadata = await extractor.extractAll();
  const outputPath = path.join(config.paths.dataPath, 'components.json');
  await extractor.saveToFile(metadata, outputPath);
  console.log(`\n📊 Extracted ${Object.keys(metadata).length} components`);
  console.log('Components:', Object.keys(metadata).join(', '));
}
