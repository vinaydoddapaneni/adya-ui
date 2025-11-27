# @adyaui/vue

Vue wrapper components for AdyaUI - providing a clean, Vue-style API for AdyaUI Web Components.

## Installation

```bash
npm install @adyaui/vue
# or
pnpm add @adyaui/vue
```

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
import { AuiButton, AuiTextField, AuiCard, AuiAlert } from '@adyaui/vue';
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
import { AuiButton } from '@adyaui/vue';
</script>
```

## License

MIT
