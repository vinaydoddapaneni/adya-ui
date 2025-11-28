# AdyaUI AI CLI - User Guide

## 🚀 Quick Start

### Installation

```bash
# Install globally
npm install -g @adyaui/cli

# Or use with npx (no installation needed)
npx @adyaui/cli --help
```

### Initialize Your Project

```bash
# Navigate to your project directory
cd my-react-app

# Initialize AdyaUI AI
npx @adyaui/cli init
```

This will:
- ✅ Detect your framework (React, Vue, etc.)
- ✅ Create `.adyaui.json` configuration file
- ✅ Setup component directory structure
- ✅ Prompt for AI API key (optional)

---

## 🎯 Commands

### `adya-ui init`

Initialize AdyaUI in your project.

```bash
adya-ui init [options]

Options:
  -f, --framework <framework>  Force framework (react|vue|core)
  --skip-install              Skip dependency installation
  --api-key <key>             Set AI API key
```

**Example:**
```bash
adya-ui init --framework react --api-key sk-...
```

---

### `adya-ui ai`

Generate components using natural language AI prompts.

```bash
adya-ui ai [options]

Options:
  -p, --prompt <prompt>       Natural language prompt
  -f, --framework <framework> Target framework (react|vue|core)
  --dry-run                   Preview without writing files
  --output <dir>              Output directory (default: src/components)
  --provider <provider>       AI provider (openai|anthropic)
```

**Examples:**

```bash
# Interactive mode (recommended for beginners)
adya-ui ai

# Direct prompt
adya-ui ai -p "Create a login page with email and password"

# Preview without creating files
adya-ui ai -p "Build a product grid" --dry-run

# Specify framework
adya-ui ai -p "Make a navbar" --framework vue
```

---

### `adya-ui add`

Add specific components to your project (no AI required).

```bash
adya-ui add <components...> [options]

Options:
  -f, --framework <framework>  Target framework
  --output <dir>               Output directory
```

**Examples:**

```bash
# Add single component
adya-ui add Button

# Add multiple components
adya-ui add Button TextField Card Alert

# Specify framework
adya-ui add Navbar --framework vue
```

---

## 💡 Example Prompts

### E-commerce

```bash
# Product listing page
adya-ui ai -p "Create a product grid with 3 columns, each card showing image, title, price, and add to cart button"

# Shopping cart
adya-ui ai -p "Build a shopping cart page with item list, quantity controls, and checkout button"

# Checkout form
adya-ui ai -p "Generate a checkout form with shipping address, payment method, and order summary"
```

### Authentication

```bash
# Login page
adya-ui ai -p "Create a login page with email, password, remember me checkbox, and forgot password link"

# Registration form
adya-ui ai -p "Build a signup form with name, email, password, confirm password, and terms checkbox"

# Password reset
adya-ui ai -p "Make a password reset page with email input and submit button"
```

### Dashboard

```bash
# Admin dashboard
adya-ui ai -p "Create a dashboard layout with sidebar navigation, top header, and main content area"

# Stats cards
adya-ui ai -p "Generate 4 stat cards showing total users, revenue, orders, and growth percentage"

# Data table
adya-ui ai -p "Build a user management table with columns for name, email, role, status, and actions"
```

### Landing Page

```bash
# Hero section
adya-ui ai -p "Create a hero section with headline, subtitle, CTA button, and background image"

# Features section
adya-ui ai -p "Build a features section with 3 columns showing icon, title, and description"

# Pricing cards
adya-ui ai -p "Generate pricing cards for Free, Pro, and Enterprise plans with features list"
```

### Forms

```bash
# Contact form
adya-ui ai -p "Create a contact form with name, email, subject, message, and submit button"

# Survey form
adya-ui ai -p "Build a multi-step survey with progress indicator and next/previous buttons"

# Profile settings
adya-ui ai -p "Generate a profile settings page with avatar upload, name, email, and bio fields"
```

---

## ⚙️ Configuration

### `.adyaui.json`

The configuration file created by `adya-ui init`:

```json
{
  "framework": "react",
  "typescript": true,
  "componentDir": "src/components",
  "styleFormat": "css-modules",
  "aiProvider": "openai",
  "preferences": {
    "functionalComponents": true,
    "useHooks": true,
    "importStyle": "named",
    "formatting": {
      "semi": true,
      "singleQuote": true,
      "tabWidth": 2
    }
  }
}
```

### Environment Variables

```bash
# AI API Key
export ADYAUI_AI_API_KEY="sk-..."

# AI Provider (openai or anthropic)
export ADYAUI_AI_PROVIDER="openai"

# Component output directory
export ADYAUI_COMPONENT_DIR="src/components"
```

---

## 🎨 Generated Code Examples

### React Component

```tsx
// src/components/LoginPage.tsx
import React from 'react';
import { AuiButton, AuiTextField, AuiCard } from '@adyaui/react';
import '@adyaui/core/dist/theme.css';
import styles from './LoginPage.module.css';

interface LoginPageProps {
  onSubmit?: (data: { email: string; password: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSubmit }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <div className={styles.container}>
      <AuiCard className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <AuiTextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <AuiTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <AuiButton variant="primary" type="submit" fullWidth>
            Login
          </AuiButton>
        </form>
      </AuiCard>
    </div>
  );
};
```

### Vue Component

```vue
<!-- src/components/LoginPage.vue -->
<template>
  <div class="container">
    <aui-card class="card">
      <h1 class="title">Login</h1>
      <form @submit.prevent="handleSubmit" class="form">
        <aui-text-field
          label="Email"
          type="email"
          v-model="email"
          required
        />
        <aui-text-field
          label="Password"
          type="password"
          v-model="password"
          required
        />
        <aui-button variant="primary" type="submit" full-width>
          Login
        </aui-button>
      </form>
    </aui-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AuiButton, AuiTextField, AuiCard } from '@adyaui/vue';
import '@adyaui/core/dist/theme.css';

interface LoginData {
  email: string;
  password: string;
}

const emit = defineEmits<{
  submit: [data: LoginData];
}>();

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  emit('submit', {
    email: email.value,
    password: password.value,
  });
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.card {
  max-width: 400px;
  width: 100%;
}

.title {
  margin-bottom: 1.5rem;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
```

---

## 🔧 Advanced Usage

### Custom Templates

Create custom component templates in `.adyaui/templates/`:

```tsx
// .adyaui/templates/page.tsx
import React from 'react';
import { {{COMPONENTS}} } from '@adyaui/react';

export const {{NAME}}: React.FC = () => {
  return (
    <div>
      {{CONTENT}}
    </div>
  );
};
```

### Hooks and Plugins

Extend CLI functionality with hooks:

```javascript
// .adyaui/hooks.js
module.exports = {
  beforeGenerate: async (intent) => {
    console.log('Generating:', intent);
  },
  afterGenerate: async (files) => {
    console.log('Created:', files);
  },
};
```

---

## 🐛 Troubleshooting

### API Key Issues

```bash
# Error: Missing API key
# Solution: Set API key in config or environment
adya-ui init --api-key sk-...
# or
export ADYAUI_AI_API_KEY="sk-..."
```

### Framework Detection Failed

```bash
# Error: Could not detect framework
# Solution: Manually specify framework
adya-ui ai -p "..." --framework react
```

### Component Already Exists

```bash
# Error: File already exists
# Solution: Use --force to overwrite or rename
adya-ui ai -p "..." --force
# or
adya-ui ai -p "..." --output src/components/v2
```

### Generated Code Doesn't Compile

```bash
# Error: TypeScript errors in generated code
# Solution: Use --dry-run to preview, then manually adjust
adya-ui ai -p "..." --dry-run
```

---

## 📚 Best Practices

### 1. Be Specific in Prompts

❌ **Bad:** "Create a form"
✅ **Good:** "Create a contact form with name, email, message fields, and submit button"

### 2. Use Dry Run First

```bash
# Preview before creating
adya-ui ai -p "..." --dry-run
```

### 3. Organize Components

```bash
# Use subdirectories for organization
adya-ui ai -p "..." --output src/components/auth
adya-ui ai -p "..." --output src/components/dashboard
```

### 4. Review Generated Code

Always review and test generated code before committing.

### 5. Iterate on Prompts

If the first result isn't perfect, refine your prompt:
```bash
adya-ui ai -p "Create a login page with email and password, centered on screen, with dark mode support"
```

---

## 🎓 Learning Resources

- [AdyaUI Documentation](https://adyaui.dev)
- [Component Catalog](https://adyaui.dev/components)
- [Example Prompts Library](./AI_PROMPTS.md)
- [Video Tutorials](https://youtube.com/adyaui)

---

## 💬 Support

- [GitHub Issues](https://github.com/yourusername/adyaui/issues)
- [Discord Community](https://discord.gg/adyaui)
- [Twitter](https://twitter.com/adyaui)

---

**Made with ❤️ by the AdyaUI Team**
