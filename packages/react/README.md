# adya-ui-react

React wrapper components for AdyaUI - providing a clean, React-style API for AdyaUI Web Components.

## Installation

```bash
# Install both packages (required)
npm install adya-ui-core adya-ui-react

# or with pnpm
pnpm add adya-ui-core adya-ui-react

# or with yarn
yarn add adya-ui-core adya-ui-react
```

**Note**: `adya-ui-core` is required as it contains the actual Web Components that `adya-ui-react` wraps.

## Usage

```jsx
// Import React components
import { Button, TextField, Card, Alert } from 'adya-ui-react';
// Import core package to register Web Components
import 'adya-ui-core';
// Import theme CSS
import 'adya-ui-core/dist/theme.css';

function App() {
  return (
    <Card>
      <Alert severity="success">Welcome to AdyaUI!</Alert>
      
      <TextField 
        label="Email" 
        type="email"
        placeholder="Enter your email"
      />
      
      <Button variant="primary" size="large">
        Submit
      </Button>
    </Card>
  );
}
```

## Available Components

- `<Button>` - Button component with multiple variants
- `<TextField>` - Input field with label and validation
- `<Card>` - Container component with elevation
- `<Alert>` - Alert/notification component
- `<Checkbox>` - Checkbox input

## Features

- ✅ **Clean React API**: Use `<Button>` instead of `<aui-button>`
- ✅ **TypeScript Support**: Full type definitions included
- ✅ **Ref Forwarding**: All components support React refs
- ✅ **Props Interface**: Proper TypeScript interfaces for all props
- ✅ **Tree Shakeable**: Import only what you need

## TypeScript

All components are fully typed:

```tsx
import { Button, ButtonProps } from 'adya-ui-react';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## License

MIT
