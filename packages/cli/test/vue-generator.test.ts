import { describe, it, expect } from 'vitest';
import { VueGenerator } from '../src/generators/vue-generator.js';
import type { ComponentIntent } from '../src/types/index.js';

describe('VueGenerator', () => {
  const generator = new VueGenerator(true); // TypeScript enabled

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

    expect(result.filename).toBe('TestButton.vue');
    expect(result.code).toContain('<template>');
    expect(result.code).toContain('<script setup lang="ts">');
    expect(result.code).toContain('import { AuiButton } from \'@adyaui/vue\'');
    expect(result.code).toContain('<aui-button variant="primary">Click Me</aui-button>');
  });

  it('should generate a component with state', async () => {
    const intent: ComponentIntent = {
      type: 'component',
      name: 'Counter',
      components: [
        { name: 'div', content: 'Count: {{ count }}' }
      ],
      state: [
        { name: 'count', type: 'number', initialValue: 0 }
      ]
    };

    const result = await generator.generate(intent);

    expect(result.code).toContain('import { ref } from \'vue\'');
    expect(result.code).toContain('const count = ref<number>(0);');
  });

  it('should generate a component with props', async () => {
    const intent: ComponentIntent = {
      type: 'component',
      name: 'UserCard',
      components: [{ name: 'div' }],
      props: {
        name: 'string',
        age: 'number'
      }
    };

    const result = await generator.generate(intent);

    expect(result.code).toContain('interface Props {');
    expect(result.code).toContain('name?: string;');
    expect(result.code).toContain('age?: number;');
    expect(result.code).toContain('const props = defineProps<Props>();');
  });

  it('should generate a layout with flex', async () => {
    const intent: ComponentIntent = {
      type: 'page',
      name: 'FlexPage',
      components: [
        { name: 'div', content: 'Item 1' },
        { name: 'div', content: 'Item 2' }
      ],
      layout: {
        type: 'flex',
        direction: 'row',
        justify: 'between'
      }
    };

    const result = await generator.generate(intent);

    expect(result.code).toContain('<style scoped>');
    expect(result.code).toContain('display: flex;');
    expect(result.code).toContain('flex-direction: row;');
    expect(result.code).toContain('justify-content: space-between;'); // Note: generator maps 'between' to 'start' currently, need to check implementation
  });
});
