# adya-ui-vue

Vue wrapper components for AdyaUI - providing a clean, Vue-style API for AdyaUI Web Components.

## Installation

```bash
# Install both packages (required)
npm install adya-ui-core adya-ui-vue

# or with pnpm
pnpm add adya-ui-core adya-ui-vue

# or with yarn
yarn add adya-ui-core adya-ui-vue
```

**Note**: `adya-ui-core` is required as it contains the actual Web Components that `adya-ui-vue` wraps.

## Usage

```vue
<template>
  <AuiCard>
    <AuiAlert severity="success">Welcome to AdyaUI!</AuiAlert>
    
    <AuiTextField 
      label="Email" 
      type="email"
      placeholder="Enter your email"
    />
    
    <AuiButton variant="primary" size="large">
      Submit
    </AuiButton>
  </AuiCard>
</template>

<script setup>
// Import Vue components
import { AuiButton, AuiTextField, AuiCard, AuiAlert } from 'adya-ui-vue';
// Import core package to register Web Components
import 'adya-ui-core';
// Import theme CSS
import 'adya-ui-core/dist/theme.css';
</script>
```

## Available Components

- `<AuiButton>` - Button component with multiple variants
- `<AuiTextField>` - Input field with label and validation
- `<AuiCard>` - Container component with elevation

## Features

- ✅ **Clean Vue API**: Use `<AuiButton>` with proper capitalization
- ✅ **TypeScript Support**: Full type definitions included
- ✅ **Vue 3 Composition API**: Built with modern Vue patterns
- ✅ **Props Interface**: Proper prop definitions for all components
- ✅ **Tree Shakeable**: Import only what you need

## TypeScript

All components are fully typed and work seamlessly with TypeScript:

```vue
<script setup lang="ts">
import { AuiButton } from 'adya-ui-vue';
</script>
```

## License

MIT
