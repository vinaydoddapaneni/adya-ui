import prettier from 'prettier';

import type {
  ComponentIntent,
  ComponentReference,
  GeneratedCode,
  LayoutDefinition,
  StateDefinition,
  EventDefinition,
  ProjectContext
} from '../types/index.js';

/**
 * Mapping of Aui components to standard HTML elements
 */
const COMPONENT_MAP: Record<string, { element: string; defaultProps?: Record<string, string> }> = {
  AuiButton: { element: 'button', defaultProps: { className: 'btn' } },
  AuiTextField: { element: 'input', defaultProps: { type: 'text', className: 'input' } },
  AuiCard: { element: 'div', defaultProps: { className: 'card' } },
  AuiAlert: { element: 'div', defaultProps: { className: 'alert', role: 'alert' } },
  AuiCheckbox: { element: 'input', defaultProps: { type: 'checkbox', className: 'checkbox' } },
  AuiContainer: { element: 'div', defaultProps: { className: 'container' } },
  AuiDialog: { element: 'dialog', defaultProps: { className: 'dialog' } },
  AuiIcon: { element: 'span', defaultProps: { className: 'icon' } },
  AuiProgress: { element: 'progress', defaultProps: { className: 'progress' } },
  AuiSwitch: { element: 'input', defaultProps: { type: 'checkbox', className: 'switch', role: 'switch' } },
  AuiTable: { element: 'table', defaultProps: { className: 'table' } },
  AuiTypography: { element: 'p', defaultProps: { className: 'text' } },
};

/**
 * React component code generator
 * Generates standalone React components without external dependencies
 */
export class ReactGenerator {
  private typescript: boolean;
  private context?: ProjectContext;

  constructor(contextOrTypescript: ProjectContext | boolean = true) {
    if (typeof contextOrTypescript === 'boolean') {
      this.typescript = contextOrTypescript;
    } else {
      this.context = contextOrTypescript;
      this.typescript = contextOrTypescript.typescript;
    }
  }

  /**
   * Generate React component from intent
   */
  async generate(intent: ComponentIntent): Promise<GeneratedCode> {
    const componentName = intent.name || this.generateComponentName(intent);
    const imports = this.generateImports(componentName);
    const propsInterface = this.generatePropsInterface(componentName, intent.props);
    const stateHooks = this.generateStateHooks(intent.state || []);
    const eventHandlers = this.generateEventHandlers(intent.events || []);
    const jsx = this.generateJSX(intent.components, intent.layout);
    const styles = this.generateStyles(intent.layout, intent.styling, intent.components);

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
      imports: [], // No external dependencies!
      styles: styles,
      styleFilename: styles ? `${componentName}.module.css` : undefined
    };
  }

  /**
   * Generate imports - now generates clean imports without external dependencies
   */
  private generateImports(componentName: string): string {
    return `import React from 'react';
import styles from './${componentName}.module.css';`;
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
   * Generate JSX - converts Aui components to standard HTML elements
   */
  private generateJSX(components: ComponentReference[], layout?: LayoutDefinition): string {
    const layoutClass = layout ? this.getLayoutClass(layout) : 'container';
    const componentsJSX = components.map(c => this.generateComponentJSX(c, 2)).join('\n      ');

    return `<div className={styles.${layoutClass}}>
      ${componentsJSX}
    </div>`;
  }

  /**
   * Generate JSX for a single component - converts Aui to standard HTML
   */
  private generateComponentJSX(component: ComponentReference, indent: number = 0): string {
    const indentStr = ' '.repeat(indent);
    
    // Convert Aui components to standard HTML elements, preserve other component names
    const mapping = COMPONENT_MAP[component.name];
    let elementName: string;
    if (mapping) {
      elementName = mapping.element;
    } else if (component.name.startsWith('Aui')) {
      // Convert unmapped Aui components to lowercase HTML elements
      elementName = component.name.replace('Aui', '').toLowerCase();
    } else {
      // Preserve original component name (e.g., Card, Button, etc.)
      elementName = component.name;
    }
    
    // Merge default props with component props
    const allProps = { ...(mapping?.defaultProps || {}), ...(component.props || {}) };
    const props = this.generatePropsJSX(allProps);
    const content = component.content || '';

    if (component.children && component.children.length > 0) {
      const childrenJSX = component.children
        .map(c => this.generateComponentJSX(c, indent + 2))
        .join('\n');
      
      return `${indentStr}<${elementName}${props}>
${childrenJSX}
${indentStr}</${elementName}>`;
    }

    if (content) {
      return `${indentStr}<${elementName}${props}>${content}</${elementName}>`;
    }

    // Self-closing for input elements
    if (['input', 'img', 'br', 'hr'].includes(elementName)) {
      return `${indentStr}<${elementName}${props} />`;
    }

    return `${indentStr}<${elementName}${props}></${elementName}>`;
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
   * Generate CSS styles - now includes component-specific styles
   */
  private generateStyles(layout?: LayoutDefinition, _styling?: any, components?: ComponentReference[]): string {
    // Use design tokens from context if available
    const spacing = this.context?.designTokens?.spacing || '1rem';
    const gap = layout?.gap || spacing;
    const primaryColor = this.context?.designTokens?.primaryColor || '#007bff';
    
    let styles = '';
    
    // Container/layout styles
    if (!layout) {
      styles += `.container {
  max-width: 400px;
  margin: 2rem auto;
  padding: ${spacing};
}

`;
    } else if (layout.type === 'grid') {
      styles += `.grid {
  display: grid;
  grid-template-columns: repeat(${layout.columns || 3}, 1fr);
  gap: ${gap};
  padding: ${spacing};
}

`;
    } else {
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

      styles += `.flex {
  display: flex;
  flex-direction: ${layout.direction || 'column'};
  align-items: ${alignMap[layout.align || 'stretch'] || layout.align || 'stretch'};
  justify-content: ${justifyMap[layout.justify || 'start'] || layout.justify || 'flex-start'};
  gap: ${gap};
  padding: ${spacing};
}

`;
    }

    // Add common component styles
    styles += `.card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.btn {
  background-color: ${primaryColor};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #0056b3;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.input:focus {
  outline: none;
  border-color: ${primaryColor};
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.alert {
  padding: 1rem;
  border-radius: 4px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.checkbox {
  margin-right: 0.5rem;
}

.text {
  margin: 0.5rem 0;
}`;

    return styles;
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
