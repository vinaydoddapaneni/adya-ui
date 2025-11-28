# @adyaui/core

A modern, framework-agnostic web components library built with TypeScript and designed for accessibility and performance.

## Features

- 🎨 **Modern Design System** - Beautiful, consistent UI components
- 🔧 **Framework Agnostic** - Works with any framework or vanilla JavaScript
- 📱 **Responsive** - Mobile-first design approach
- ♿ **Accessible** - WCAG compliant components
- 🌙 **Dark Mode** - Built-in theme support
- 🚀 **Lightweight** - Optimized for performance
- 🎯 **TypeScript** - Full type support

## Installation

```bash
npm install @adyaui/core
```

## Usage

### Import the library

```javascript
// Import all components
import '@adyaui/core';

// Or import specific components
import '@adyaui/core/dist/button';
import '@adyaui/core/dist/card';
```

### Use in HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link href="node_modules/@adyaui/core/dist/theme.css" rel="stylesheet">
</head>
<body>
  <aui-button variant="primary">Click me</aui-button>
  <aui-card>
    <h3>Card Title</h3>
    <p>Card content goes here</p>
  </aui-card>
</body>
</html>
```

### Use with Frameworks

#### React
```jsx
import React from 'react';
import '@adyaui/core';

function App() {
  return (
    <div>
      <aui-button variant="primary">React Button</aui-button>
    </div>
  );
}
```

#### Vue
```vue
<template>
  <div>
    <aui-button variant="primary">Vue Button</aui-button>
  </div>
</template>

<script>
import '@adyaui/core';
</script>
```

## Components

### Button
```html
<aui-button variant="primary" size="medium">Primary Button</aui-button>
<aui-button variant="outlined">Outlined Button</aui-button>
<aui-button variant="text">Text Button</aui-button>
```

### Card
```html
<aui-card>
  <h3>Card Title</h3>
  <p>This is a card component with content.</p>
</aui-card>
```

### App Bar
```html
<aui-app-bar variant="primary">
  <span slot="title">My App</span>
  <aui-button slot="actions" variant="text">Menu</aui-button>
</aui-app-bar>
```

### Typography
```html
<aui-typography variant="h1">Heading 1</aui-typography>
<aui-typography variant="body1">Body text</aui-typography>
```

## Theme Customization

```javascript
import { theme } from '@adyaui/core';

// Apply custom theme
theme.applyTheme({
  primaryMain: '#your-color',
  secondaryMain: '#your-secondary-color'
});

// Toggle dark mode
theme.toggleMode();
```

## API Reference

### Button Component

#### Attributes
- `variant`: 'primary' | 'secondary' | 'outlined' | 'text' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `disabled`: boolean

#### Events
- `click`: Fired when button is clicked

### Card Component

#### Attributes
- `elevation`: number (0-24, default: 1)
- `variant`: 'elevated' | 'outlined' (default: 'elevated')

## Browser Support

- Chrome >= 54
- Firefox >= 63
- Safari >= 10.1
- Edge >= 79

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

MIT © [AdyaUI Team](LICENSE)

## Links

- [Documentation](https://adyaui.com)
- [GitHub Repository](https://github.com/adyaui/adyaui)
- [React Integration](https://www.npmjs.com/package/@adyaui/react)
- [Vue Integration](https://www.npmjs.com/package/@adyaui/vue)
