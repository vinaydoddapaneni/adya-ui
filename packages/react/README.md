# @adyaui/react

React wrapper components for AdyaUI - providing a clean, React-style API for AdyaUI Web Components.

## Installation

```bash
npm install @adyaui/react
# or
pnpm add @adyaui/react
```

## Usage

```jsx
import { Button, TextField, Card, Alert } from '@adyaui/react';

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
import { Button, ButtonProps } from '@adyaui/react';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## License

MIT
