import type { ComponentInfo } from '../types/component';

export const componentList: ComponentInfo[] = [
  // GENERAL
  {
    id: 'button',
    name: 'Button',
    description: 'A versatile button component with multiple variants and states.',
    category: 'General',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiButton } from 'adya-ui-react';`,
        code: `import { AuiButton } from 'adya-ui-react';

function App() {
  return (
    <div>
      <AuiButton variant="primary">Primary Button</AuiButton>
      <AuiButton variant="secondary">Secondary Button</AuiButton>
      <AuiButton variant="outlined">Outlined Button</AuiButton>
      <AuiButton disabled>Disabled Button</AuiButton>
    </div>
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiButton } from 'adya-ui-vue';`,
        code: `<template>
  <div>
    <aui-button variant="primary">Primary Button</aui-button>
    <aui-button variant="secondary">Secondary Button</aui-button>
    <aui-button variant="outlined">Outlined Button</aui-button>
    <aui-button disabled>Disabled Button</aui-button>
  </div>
</template>

<script setup>
import { AuiButton } from 'adya-ui-vue';
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import 'adya-ui-core';
  </script>
</head>
<body>
  <aui-button variant="primary">Primary Button</aui-button>
  <aui-button variant="secondary">Secondary Button</aui-button>
  <aui-button variant="outlined">Outlined Button</aui-button>
  <aui-button disabled>Disabled Button</aui-button>
</body>
</html>`
      }
    },
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outlined' | 'text'", default: "'primary'", description: 'Button style variant' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled' },
      { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Whether the button takes full width' },
      { name: 'onClick', type: '() => void', description: 'Click event handler' }
    ]
  },
  {
    id: 'icon',
    name: 'Icon',
    description: 'Display icons from various icon sets.',
    category: 'General',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiIcon } from 'adya-ui-react';`,
        code: `import { AuiIcon } from 'adya-ui-react';

function App() {
  return (
    <div>
      <AuiIcon name="home" size="24" />
      <AuiIcon name="settings" size="32" color="#1976d2" />
      <AuiIcon name="search" size="48" />
    </div>
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiIcon } from 'adya-ui-vue';`,
        code: `<template>
  <div>
    <aui-icon name="home" size="24"></aui-icon>
    <aui-icon name="settings" size="32" color="#1976d2"></aui-icon>
    <aui-icon name="search" size="48"></aui-icon>
  </div>
</template>

<script setup>
import { AuiIcon } from 'adya-ui-vue';
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<aui-icon name="home" size="24"></aui-icon>
<aui-icon name="settings" size="32" color="#1976d2"></aui-icon>
<aui-icon name="search" size="48"></aui-icon>`
      }
    },
    props: [
      { name: 'name', type: 'string', description: 'Icon name' },
      { name: 'size', type: 'string | number', default: "'24'", description: 'Icon size in pixels' },
      { name: 'color', type: 'string', description: 'Icon color' }
    ]
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Text component with various styles and variants.',
    category: 'General',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiTypography } from 'adya-ui-react';`,
        code: `import { AuiTypography } from 'adya-ui-react';

function App() {
  return (
    <div>
      <AuiTypography variant="h1">Heading 1</AuiTypography>
      <AuiTypography variant="h2">Heading 2</AuiTypography>
      <AuiTypography variant="body1">Body text</AuiTypography>
      <AuiTypography variant="caption">Caption text</AuiTypography>
    </div>
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiTypography } from 'adya-ui-vue';`,
        code: `<template>
  <div>
    <aui-typography variant="h1">Heading 1</aui-typography>
    <aui-typography variant="h2">Heading 2</aui-typography>
    <aui-typography variant="body1">Body text</aui-typography>
    <aui-typography variant="caption">Caption text</aui-typography>
  </div>
</template>

<script setup>
import { AuiTypography } from 'adya-ui-vue';
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<aui-typography variant="h1">Heading 1</aui-typography>
<aui-typography variant="h2">Heading 2</aui-typography>
<aui-typography variant="body1">Body text</aui-typography>
<aui-typography variant="caption">Caption text</aui-typography>`
      }
    },
    props: [
      { name: 'variant', type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption'", default: "'body1'", description: 'Typography variant' },
      { name: 'color', type: 'string', description: 'Text color' },
      { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Text alignment' }
    ]
  },
  // LAYOUT
  {
    id: 'container',
    name: 'Container',
    description: 'A responsive container component for layout.',
    category: 'Layout',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiContainer } from 'adya-ui-react';`,
        code: `import { AuiContainer } from 'adya-ui-react';

function App() {
  return (
    <AuiContainer maxWidth="lg">
      <h1>Content goes here</h1>
    </AuiContainer>
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiContainer } from 'adya-ui-vue';`,
        code: `<template>
  <aui-container max-width="lg">
    <h1>Content goes here</h1>
  </aui-container>
</template>

<script setup>
import { AuiContainer } from 'adya-ui-vue';
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<aui-container max-width="lg">
  <h1>Content goes here</h1>
</aui-container>`
      }
    },
    props: [
      { name: 'maxWidth', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'lg'", description: 'Maximum width of the container' }
    ]
  },
  {
    id: 'divider',
    name: 'Divider',
    description: 'A thin line to separate content.',
    category: 'Layout',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiDivider } from 'adya-ui-react';`,
        code: `import { AuiDivider } from 'adya-ui-react';

function App() {
  return (
    <div>
      <p>Content above</p>
      <AuiDivider />
      <p>Content below</p>
      <AuiDivider orientation="vertical" />
    </div>
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiDivider } from 'adya-ui-vue';`,
        code: `<template>
  <div>
    <p>Content above</p>
    <aui-divider></aui-divider>
    <p>Content below</p>
    <aui-divider orientation="vertical"></aui-divider>
  </div>
</template>

<script setup>
import { AuiDivider } from 'adya-ui-vue';
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<p>Content above</p>
<aui-divider></aui-divider>
<p>Content below</p>
<aui-divider orientation="vertical"></aui-divider>`
      }
    },
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Divider orientation' }
    ]
  },
  // DATA ENTRY
  {
    id: 'textfield',
    name: 'TextField',
    description: 'Input field for text entry with validation support.',
    category: 'Data Entry',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiTextField } from 'adya-ui-react';`,
        code: `import { AuiTextField } from 'adya-ui-react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  
  return (
    <div>
      <AuiTextField 
        label="Username" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <AuiTextField 
        label="Password" 
        type="password"
      />
      <AuiTextField 
        label="Email" 
        type="email"
        helperText="Enter your email address"
      />
    </div>
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiTextField } from 'adya-ui-vue';`,
        code: `<template>
  <div>
    <aui-textfield 
      label="Username" 
      v-model="username"
    ></aui-textfield>
    <aui-textfield 
      label="Password" 
      type="password"
    ></aui-textfield>
    <aui-textfield 
      label="Email" 
      type="email"
      helper-text="Enter your email address"
    ></aui-textfield>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AuiTextField } from 'adya-ui-vue';

const username = ref('');
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<aui-textfield label="Username"></aui-textfield>
<aui-textfield label="Password" type="password"></aui-textfield>
<aui-textfield 
  label="Email" 
  type="email"
  helper-text="Enter your email address"
></aui-textfield>

<script>
  const textfield = document.querySelector('aui-textfield');
  textfield.addEventListener('input', (e) => {
    console.log('Value:', e.target.value);
  });
</script>`
      }
    },
    props: [
      { name: 'label', type: 'string', description: 'Input label' },
      { name: 'value', type: 'string', description: 'Input value' },
      { name: 'type', type: 'string', default: "'text'", description: 'Input type (text, password, email, etc.)' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'helperText', type: 'string', description: 'Helper text below input' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'required', type: 'boolean', default: 'false', description: 'Required field' }
    ]
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'Checkbox input for boolean selections.',
    category: 'Data Entry',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiCheckbox } from 'adya-ui-react';`,
        code: `import { AuiCheckbox } from 'adya-ui-react';
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div>
      <AuiCheckbox 
        label="Accept terms" 
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <AuiCheckbox label="Subscribe to newsletter" />
      <AuiCheckbox label="Disabled" disabled />
    </div>
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiCheckbox } from 'adya-ui-vue';`,
        code: `<template>
  <div>
    <aui-checkbox 
      label="Accept terms" 
      v-model="checked"
    ></aui-checkbox>
    <aui-checkbox label="Subscribe to newsletter"></aui-checkbox>
    <aui-checkbox label="Disabled" disabled></aui-checkbox>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AuiCheckbox } from 'adya-ui-vue';

const checked = ref(false);
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<aui-checkbox label="Accept terms"></aui-checkbox>
<aui-checkbox label="Subscribe to newsletter"></aui-checkbox>
<aui-checkbox label="Disabled" disabled></aui-checkbox>`
      }
    },
    props: [
      { name: 'label', type: 'string', description: 'Checkbox label' },
      { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate state' }
    ]
  },
  {
    id: 'select',
    name: 'Select',
    description: 'Dropdown select component for choosing from options.',
    category: 'Data Entry',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiSelect } from 'adya-ui-react';`,
        code: `import { AuiSelect } from 'adya-ui-react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  
  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' }
  ];
  
  return (
    <AuiSelect 
      label="Framework" 
      value={value}
      options={options}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiSelect } from 'adya-ui-vue';`,
        code: `<template>
  <aui-select 
    label="Framework" 
    v-model="selected"
    :options="options"
  ></aui-select>
</template>

<script setup>
import { ref } from 'vue';
import { AuiSelect } from 'adya-ui-vue';

const selected = ref('');
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' }
];
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<aui-select label="Framework"></aui-select>

<script>
  const select = document.querySelector('aui-select');
  select.options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' }
  ];
</script>`
      }
    },
    props: [
      { name: 'label', type: 'string', description: 'Select label' },
      { name: 'value', type: 'string', description: 'Selected value' },
      { name: 'options', type: 'Array<{value: string, label: string}>', description: 'Select options' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' }
    ]
  },
  {
    id: 'radio',
    name: 'Radio',
    description: 'Radio button for single selection from a group.',
    category: 'Data Entry',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiRadio } from 'adya-ui-react';`,
        code: `import { AuiRadio } from 'adya-ui-react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('option1');
  
  return (
    <div>
      <AuiRadio 
        name="options"
        value="option1"
        label="Option 1"
        checked={value === 'option1'}
        onChange={(e) => setValue(e.target.value)}
      />
      <AuiRadio 
        name="options"
        value="option2"
        label="Option 2"
        checked={value === 'option2'}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiRadio } from 'adya-ui-vue';`,
        code: `<template>
  <div>
    <aui-radio 
      name="options"
      value="option1"
      label="Option 1"
      v-model="selected"
    ></aui-radio>
    <aui-radio 
      name="options"
      value="option2"
      label="Option 2"
      v-model="selected"
    ></aui-radio>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AuiRadio } from 'adya-ui-vue';

const selected = ref('option1');
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<aui-radio name="options" value="option1" label="Option 1"></aui-radio>
<aui-radio name="options" value="option2" label="Option 2"></aui-radio>`
      }
    },
    props: [
      { name: 'name', type: 'string', description: 'Radio group name' },
      { name: 'value', type: 'string', description: 'Radio value' },
      { name: 'label', type: 'string', description: 'Radio label' },
      { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' }
    ]
  },
  {
    id: 'switch',
    name: 'Switch',
    description: 'Toggle switch for on/off states.',
    category: 'Data Entry',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiSwitch } from 'adya-ui-react';`,
        code: `import { AuiSwitch } from 'adya-ui-react';
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div>
      <AuiSwitch 
        label="Enable notifications" 
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <AuiSwitch label="Dark mode" />
      <AuiSwitch label="Disabled" disabled />
    </div>
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiSwitch } from 'adya-ui-vue';`,
        code: `<template>
  <div>
    <aui-switch 
      label="Enable notifications" 
      v-model="checked"
    ></aui-switch>
    <aui-switch label="Dark mode"></aui-switch>
    <aui-switch label="Disabled" disabled></aui-switch>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AuiSwitch } from 'adya-ui-vue';

const checked = ref(false);
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<aui-switch label="Enable notifications"></aui-switch>
<aui-switch label="Dark mode"></aui-switch>
<aui-switch label="Disabled" disabled></aui-switch>`
      }
    },
    props: [
      { name: 'label', type: 'string', description: 'Switch label' },
      { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' }
    ]
  },
  // DATA DISPLAY
  {
    id: 'card',
    name: 'Card',
    description: 'Container for displaying content in a card layout.',
    category: 'Data Display',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiCard } from 'adya-ui-react';`,
        code: `import { AuiCard } from 'adya-ui-react';

function App() {
  return (
    <AuiCard>
      <h2>Card Title</h2>
      <p>Card content goes here</p>
    </AuiCard>
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiCard } from 'adya-ui-vue';`,
        code: `<template>
  <aui-card>
    <h2>Card Title</h2>
    <p>Card content goes here</p>
  </aui-card>
</template>

<script setup>
import { AuiCard } from 'adya-ui-vue';
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<aui-card>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</aui-card>`
      }
    },
    props: [
      { name: 'elevation', type: 'number', default: '1', description: 'Card shadow elevation (0-5)' },
      { name: 'variant', type: "'outlined' | 'elevated'", default: "'elevated'", description: 'Card variant' }
    ]
  },
  {
    id: 'alert',
    name: 'Alert',
    description: 'Display important messages and notifications.',
    category: 'Feedback',
    examples: {
      react: {
        installation: 'npm install adya-ui-react',
        import: `import { AuiAlert } from 'adya-ui-react';`,
        code: `import { AuiAlert } from 'adya-ui-react';

function App() {
  return (
    <div>
      <AuiAlert severity="success">
        Operation completed successfully!
      </AuiAlert>
      <AuiAlert severity="error">
        An error occurred
      </AuiAlert>
      <AuiAlert severity="warning">
        Warning message
      </AuiAlert>
      <AuiAlert severity="info">
        Information message
      </AuiAlert>
    </div>
  );
}`
      },
      vue: {
        installation: 'npm install adya-ui-vue',
        import: `import { AuiAlert } from 'adya-ui-vue';`,
        code: `<template>
  <div>
    <aui-alert severity="success">
      Operation completed successfully!
    </aui-alert>
    <aui-alert severity="error">
      An error occurred
    </aui-alert>
    <aui-alert severity="warning">
      Warning message
    </aui-alert>
    <aui-alert severity="info">
      Information message
    </aui-alert>
  </div>
</template>

<script setup>
import { AuiAlert } from 'adya-ui-vue';
</script>`
      },
      core: {
        installation: 'npm install adya-ui-core',
        import: `import 'adya-ui-core';`,
        code: `<aui-alert severity="success">
  Operation completed successfully!
</aui-alert>
<aui-alert severity="error">
  An error occurred
</aui-alert>
<aui-alert severity="warning">
  Warning message
</aui-alert>
<aui-alert severity="info">
  Information message
</aui-alert>`
      }
    },
    props: [
      { name: 'severity', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", description: 'Alert severity type' },
      { name: 'variant', type: "'filled' | 'outlined' | 'standard'", default: "'standard'", description: 'Alert variant' },
      { name: 'closable', type: 'boolean', default: 'false', description: 'Show close button' }
    ]
  }
];

// Group components by category
export const groupedComponents = componentList.reduce((acc, component) => {
  const category = component.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(component);
  return acc;
}, {} as Record<string, ComponentInfo[]>);

export const categories = Object.keys(groupedComponents).sort();
