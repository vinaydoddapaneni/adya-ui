import prettier from 'prettier';
import type {
  ComponentIntent,
  ComponentReference,
  GeneratedCode,
  LayoutDefinition,
  StateDefinition,
  EventDefinition
} from '../types/index.js';

/**
 * React component code generator
 */
export class ReactGenerator {
  private typescript: boolean;

  constructor(typescript: boolean = true) {
    this.typescript = typescript;
  }

  /**
   * Generate React component from intent
   */
  async generate(intent: ComponentIntent): Promise<GeneratedCode> {
    const componentName = intent.name || this.generateComponentName(intent);
    const imports = this.generateImports(intent.components);
    const propsInterface = this.generatePropsInterface(componentName, intent.props);
    const stateHooks = this.generateStateHooks(intent.state || []);
    const eventHandlers = this.generateEventHandlers(intent.events || []);
    const jsx = this.generateJSX(intent.components, intent.layout);
    const styles = this.generateStyles(intent.layout, intent.styling);

    const code = `
${imports}

${propsInterface}

export const ${componentName}${this.typescript ? ': React.FC<' + componentName + 'Props>' : ''} = (${this.typescript ? 'props' : '{ onSubmit }'}) => {
  ${stateHooks}
  ${eventHandlers}

  return (
    ${jsx}
  );
};
    `.trim();

    const formatted = await this.formatCode(code);

    return {
      filename: `${componentName}.${this.typescript ? 'tsx' : 'jsx'}`,
      code: formatted,
      imports: ['@adyaui/react', '@adyaui/core/dist/theme.css'],
      styles: styles,
      styleFilename: styles ? `${componentName}.module.css` : undefined
    };
  }

  /**
   * Generate imports
   */
  private generateImports(components: ComponentReference[]): string {
    const auiComponents = new Set<string>();
    
    const collectComponents = (comp: ComponentReference) => {
      if (comp.name.startsWith('Aui')) {
        auiComponents.add(comp.name);
      }
      if (comp.children) {
        comp.children.forEach(collectComponents);
      }
    };

    components.forEach(collectComponents);

    const componentList = Array.from(auiComponents).sort().join(', ');

    return `import React from 'react';
import { ${componentList} } from '@adyaui/react';
import '@adyaui/core/dist/theme.css';
import styles from './styles.module.css';`;
  }

  /**
   * Generate TypeScript props interface
   */
  private generatePropsInterface(componentName: string, props?: Record<string, any>): string {
    if (!this.typescript) return '';

    const propDefs = props ? Object.entries(props).map(([key, value]) => {
      let type: string = typeof value;
      if (type === 'function') type = 'Function';
      
      // If value is a string that looks like a type, use it directly
      if (typeof value === 'string' && ['string', 'number', 'boolean', 'any', 'void'].includes(value)) {
        type = value;
      }
      
      return `  ${key}?: ${type};`;
    }).join('\n') : '';

    return `interface ${componentName}Props {
${propDefs || '  // No props'}
  onSubmit?: (data: any) => void;
}`;
  }

  /**
   * Generate state hooks
   */
  private generateStateHooks(state: StateDefinition[]): string {
    if (state.length === 0) return '';

    return state.map(s => {
      const initialValue = typeof s.initialValue === 'string' 
        ? `'${s.initialValue}'` 
        : JSON.stringify(s.initialValue);
      
      return `const [${s.name}, set${this.capitalize(s.name)}] = React.useState${this.typescript ? `<${s.type}>` : ''}(${initialValue});`;
    }).join('\n  ');
  }

  /**
   * Generate event handlers
   */
  private generateEventHandlers(events: EventDefinition[]): string {
    if (events.length === 0) return '';

    return events.map(e => {
      const params = e.params?.join(', ') || '';
      return `const ${e.handler} = (${params}${this.typescript ? ': any' : ''}) => {
    // TODO: Implement ${e.handler}
  };`;
    }).join('\n\n  ');
  }

  /**
   * Generate JSX
   */
  private generateJSX(components: ComponentReference[], layout?: LayoutDefinition): string {
    const layoutClass = layout ? this.getLayoutClass(layout) : 'container';
    const componentsJSX = components.map(c => this.generateComponentJSX(c, 2)).join('\n      ');

    return `<div className={styles.${layoutClass}}>
      ${componentsJSX}
    </div>`;
  }

  /**
   * Generate JSX for a single component
   */
  private generateComponentJSX(component: ComponentReference, indent: number = 0): string {
    const indentStr = ' '.repeat(indent);
    const props = this.generatePropsJSX(component.props || {});
    const content = component.content || '';

    if (component.children && component.children.length > 0) {
      const childrenJSX = component.children
        .map(c => this.generateComponentJSX(c, indent + 2))
        .join('\n');
      
      return `${indentStr}<${component.name}${props}>
${childrenJSX}
${indentStr}</${component.name}>`;
    }

    if (content) {
      return `${indentStr}<${component.name}${props}>${content}</${component.name}>`;
    }

    return `${indentStr}<${component.name}${props} />`;
  }

  /**
   * Generate props JSX
   */
  private generatePropsJSX(props: Record<string, any>): string {
    const propStrings = Object.entries(props).map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? ` ${key}` : '';
      }
      if (typeof value === 'string') {
        return ` ${key}="${value}"`;
      }
      return ` ${key}={${JSON.stringify(value)}}`;
    });

    return propStrings.join('');
  }

  /**
   * Get layout class name
   */
  private getLayoutClass(layout: LayoutDefinition): string {
    return layout.type === 'grid' ? 'grid' : 'flex';
  }

  /**
   * Generate CSS styles
   */
  private generateStyles(layout?: LayoutDefinition, styling?: any): string {
    if (!layout) {
      return `.container {
  padding: 1rem;
}`;
    }

    if (layout.type === 'grid') {
      return `.grid {
  display: grid;
  grid-template-columns: repeat(${layout.columns || 3}, 1fr);
  gap: ${layout.gap || '1rem'};
  padding: 1rem;
}`;
    }

    const alignMap: Record<string, string> = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline'
    };

    const justifyMap: Record<string, string> = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly'
    };

    return `.flex {
  display: flex;
  flex-direction: ${layout.direction || 'column'};
  align-items: ${alignMap[layout.align || 'stretch'] || layout.align || 'stretch'};
  justify-content: ${justifyMap[layout.justify || 'start'] || layout.justify || 'flex-start'};
  gap: ${layout.gap || '1rem'};
  padding: 1rem;
}`;
  }

  /**
   * Format code with Prettier
   */
  private async formatCode(code: string): Promise<string> {
    try {
      return await prettier.format(code, {
        parser: this.typescript ? 'typescript' : 'babel',
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
      });
    } catch (error) {
      console.warn('Failed to format code with Prettier:', error);
      return code;
    }
  }

  /**
   * Generate component name from intent
   */
  private generateComponentName(intent: ComponentIntent): string {
    if (intent.type === 'page') {
      return 'Page';
    }
    return 'Component';
  }

  /**
   * Capitalize first letter
   */
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
