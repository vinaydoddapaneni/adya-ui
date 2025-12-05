/**
 * Simple README template generator for components
 */
export function generateComponentReadme(
  componentName: string,
  framework: 'react' | 'vue',
  description?: string
): string {
  const installPackage = framework === 'react' ? 'adya-ui-react' : '@adyaui/vue';
  const fileExt = framework === 'react' ? 'tsx' : 'vue';
  
  return `# ${componentName}

${description || `A ${componentName} component built with AdyaUI.`}

## Installation

\`\`\`bash
npm install ${installPackage}
\`\`\`

## Usage

### ${framework === 'react' ? 'React' : 'Vue'}

\`\`\`${fileExt}
${framework === 'react' ? generateReactExample(componentName) : generateVueExample(componentName)}
\`\`\`

## Props

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Component children |

## Testing

\`\`\`bash
npm test
\`\`\`

## License

MIT
`;
}

function generateReactExample(componentName: string): string {
  return `import { ${componentName} } from './${componentName}';

function App() {
  return (
    <${componentName}>
      Content here
    </${componentName}>
  );
}`;
}

function generateVueExample(componentName: string): string {
  const kebabName = componentName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
    
  return `<template>
  <${kebabName}>
    Content here
  </${kebabName}>
</template>

<script setup>
import ${componentName} from './${componentName}.vue';
</script>`;
}
