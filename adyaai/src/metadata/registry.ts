import fs from 'fs/promises';
import path from 'path';
import { config } from '../config/index.js';
import { ComponentMetadata, MetadataExtractor } from './extractor.js';

/**
 * Component registry that manages component metadata
 */
export class ComponentRegistry {
  private components: Record<string, ComponentMetadata> = {};
  private metadataPath: string;
  private extractor: MetadataExtractor;

  constructor() {
    this.metadataPath = path.join(config.paths.dataPath, 'components.json');
    this.extractor = new MetadataExtractor();
  }

  /**
   * Initialize the registry by loading or extracting metadata
   */
  async initialize(): Promise<void> {
    try {
      // Try to load existing metadata
      const data = await fs.readFile(this.metadataPath, 'utf-8');
      this.components = JSON.parse(data);
      console.log(`✅ Loaded ${Object.keys(this.components).length} components from cache`);
    } catch (error) {
      // If file doesn't exist, extract metadata
      console.log('📊 Extracting component metadata...');
      this.components = await this.extractor.extractAll();
      await this.extractor.saveToFile(this.components, this.metadataPath);
    }
  }

  /**
   * Refresh metadata by re-extracting from source files
   */
  async refresh(): Promise<void> {
    console.log('🔄 Refreshing component metadata...');
    this.components = await this.extractor.extractAll();
    await this.extractor.saveToFile(this.components, this.metadataPath);
  }

  /**
   * Get all components
   */
  getAll(): Record<string, ComponentMetadata> {
    return this.components;
  }

  /**
   * Get component by tag name
   */
  getByTagName(tagName: string): ComponentMetadata | undefined {
    return this.components[tagName];
  }

  /**
   * Get components by category
   */
  getByCategory(category: string): ComponentMetadata[] {
    return Object.values(this.components).filter(
      (comp) => comp.category === category
    );
  }

  /**
   * Search components by keyword
   */
  search(query: string): ComponentMetadata[] {
    const lowerQuery = query.toLowerCase();
    return Object.values(this.components).filter(
      (comp) =>
        comp.name.toLowerCase().includes(lowerQuery) ||
        comp.description.toLowerCase().includes(lowerQuery) ||
        comp.useCases.some((uc) => uc.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    const categories = new Set(
      Object.values(this.components).map((comp) => comp.category)
    );
    return Array.from(categories);
  }

  /**
   * Get component count
   */
  getCount(): number {
    return Object.keys(this.components).length;
  }

  /**
   * Get formatted metadata for AI prompts
   */
  getFormattedForAI(): string {
    let formatted = '# AdyaUI Components\n\n';
    
    const categories = this.getCategories();
    
    for (const category of categories) {
      formatted += `## ${category}\n\n`;
      const components = this.getByCategory(category);
      
      for (const comp of components) {
        formatted += `### ${comp.tagName}\n`;
        formatted += `${comp.description}\n\n`;
        
        if (comp.attributes.length > 0) {
          formatted += '**Attributes:**\n';
          comp.attributes.forEach((attr) => {
            formatted += `- \`${attr.name}\` (${attr.type}): ${attr.description}\n`;
          });
          formatted += '\n';
        }
        
        if (comp.events.length > 0) {
          formatted += '**Events:**\n';
          comp.events.forEach((event) => {
            formatted += `- \`${event.name}\`: ${event.description}\n`;
          });
          formatted += '\n';
        }
        
        if (comp.examples.length > 0) {
          formatted += '**Examples:**\n';
          comp.examples.forEach((example) => {
            formatted += `\`\`\`html\n${example}\n\`\`\`\n`;
          });
          formatted += '\n';
        }
        
        formatted += '**Use Cases:**\n';
        comp.useCases.forEach((useCase) => {
          formatted += `- ${useCase}\n`;
        });
        formatted += '\n---\n\n';
      }
    }
    
    return formatted;
  }
}

// Create singleton instance
export const componentRegistry = new ComponentRegistry();
