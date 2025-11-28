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
 * Vue component code generator
 */
export class VueGenerator {
  private typescript: boolean;

  constructor(typescript: boolean = true) {
    this.typescript = typescript;
  }

  /**
   * Generate Vue component from intent
   */
  async generate(intent: ComponentIntent): Promise<GeneratedCode> {
    const componentName = intent.name || this.generateComponentName(intent);
    const template = this.generateTemplate(intent.components, intent.layout);
    const script = this.generateScript(intent);
    const styles = this.generateStyles(intent.layout, intent.styling);

    const code = `<template>
  ${template}
</template>

<script setup${this.typescript ? ' lang="ts"' : ''}>
${script}
</script>

<style scoped>
${styles}
</style>`;

    const formatted = await this.formatCode(code);

    return {
      filename: `${componentName}.vue`,
      code: formatted,
      imports: ['@adyaui/vue', '@adyaui/core/dist/theme.css'],
    };
  }

  /**
   * Generate template section
   */
  private generateTemplate(components: ComponentReference[], layout?: LayoutDefinition): string {
    const layoutClass = layout ? this.getLayoutClass(layout) : 'container';
    const componentsHTML = components.map(c => this.generateComponentHTML(c, 2)).join('\n    ');

    return `<div class="${layoutClass}">
    ${componentsHTML}
  </div>`;
  }

  /**
   * Generate HTML for a single component
   */
  private generateComponentHTML(component: ComponentReference, indent: number = 0): string {
    const indentStr = ' '.repeat(indent);
    const props = this.generatePropsHTML(component.props || {});
    const content = component.content || '';

    // Convert React event names to Vue event names
    const vueProps = props.replace(/onClick/g, '@click').replace(/onChange/g, '@change');

    if (component.children && component.children.length > 0) {
      const childrenHTML = component.children
        .map(c => this.generateComponentHTML(c, indent + 2))
        .join('\n');
      
      return `${indentStr}<${this.toKebabCase(component.name)}${vueProps}>
${childrenHTML}
${indentStr}</${this.toKebabCase(component.name)}>`;
    }

    if (content) {
      return `${indentStr}<${this.toKebabCase(component.name)}${vueProps}>${content}</${this.toKebabCase(component.name)}>`;
    }

    return `${indentStr}<${this.toKebabCase(component.name)}${vueProps} />`;
  }

  /**
   * Generate props HTML
   */
  private generatePropsHTML(props: Record<string, any>): string {
    const propStrings = Object.entries(props).map(([key, value]) => {
      const kebabKey = this.toKebabCase(key);
      
      if (typeof value === 'boolean') {
        return value ? ` ${kebabKey}` : '';
      }
      if (typeof value === 'string') {
        return ` ${kebabKey}="${value}"`;
      }
      return ` :${kebabKey}="${JSON.stringify(value)}"`;
    });

    return propStrings.join('');
  }

  /**
   * Generate script section
   */
  private generateScript(intent: ComponentIntent): string {
    const imports = this.generateImports(intent.components);
    const props = this.generateProps(intent.props);
    const state = this.generateState(intent.state || []);
    const events = this.generateEvents(intent.events || []);
    const emits = this.generateEmits(intent.events || []);

    return `${imports}

${emits}
${props}
${state}
${events}`.trim();
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

    return `import { ref } from 'vue';
import { ${componentList} } from '@adyaui/vue';
import '@adyaui/core/dist/theme.css';`;
  }

  /**
   * Generate props definition
   */
  private generateProps(props?: Record<string, any>): string {
    if (!props || Object.keys(props).length === 0) {
      return '';
    }

    if (this.typescript) {
      const propDefs = Object.entries(props).map(([key, value]) => {
        let type: string = typeof value;
        if (type === 'function') type = 'Function';
        
        // If value is a string that looks like a type, use it directly
        if (typeof value === 'string' && ['string', 'number', 'boolean', 'any', 'void'].includes(value)) {
          type = value;
        } else {
          type = this.capitalize(type);
        }
        
        return `  ${key}?: ${type};`;
      }).join('\n');

      return `\ninterface Props {
${propDefs}
}

const props = defineProps<Props>();`;
    }

    return '';
  }

  /**
   * Generate state (refs)
   */
  private generateState(state: StateDefinition[]): string {
    if (state.length === 0) return '';

    return '\n' + state.map(s => {
      const initialValue = typeof s.initialValue === 'string' 
        ? `'${s.initialValue}'` 
        : JSON.stringify(s.initialValue);
      
      return `const ${s.name} = ref${this.typescript ? `<${s.type}>` : ''}(${initialValue});`;
    }).join('\n');
  }

  /**
   * Generate event emits
   */
  private generateEmits(events: EventDefinition[]): string {
    if (events.length === 0) return '';

    const emitNames = events.map(e => `'${e.name}'`).join(', ');
    return `const emit = defineEmits([${emitNames}]);`;
  }

  /**
   * Generate event handlers
   */
  private generateEvents(events: EventDefinition[]): string {
    if (events.length === 0) return '';

    return '\n' + events.map(e => {
      const params = e.params?.join(', ') || '';
      return `const ${e.handler} = (${params}${this.typescript ? ': any' : ''}) => {
  // TODO: Implement ${e.handler}
};`;
    }).join('\n\n');
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
        parser: 'vue',
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
   * Convert PascalCase to kebab-case
   */
  private toKebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  /**
   * Capitalize first letter
   */
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
