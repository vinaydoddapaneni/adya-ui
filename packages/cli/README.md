# @adyaui/cli

AI-powered CLI for AdyaUI component generation.

## Installation

```bash
# Global installation
npm install -g @adyaui/cli

# Or use with npx (no installation needed)
npx @adyaui/cli --help
```

## Quick Start

```bash
# Initialize in your project
cd my-app
adya-ui init

# Generate components with AI
adya-ui ai

# Or use a direct prompt
adya-ui ai -p "Create a login page with email and password"
```

## Commands

### `adya-ui init`

Initialize AdyaUI in your project.

```bash
adya-ui init [options]

Options:
  -f, --framework <framework>  Force framework (react|vue|core)
  --skip-install              Skip dependency installation
  --api-key <key>             Set AI API key
```

### `adya-ui ai`

Generate components using natural language AI prompts.

```bash
adya-ui ai [options]

Options:
  -p, --prompt <prompt>       Natural language prompt
  -f, --framework <framework> Target framework (react|vue|core)
  --dry-run                   Preview without writing files
  -o, --output <dir>          Output directory
  --provider <provider>       AI provider (openai|anthropic)
```

### `adya-ui add`

Add specific components to your project (coming soon).

```bash
adya-ui add <components...> [options]

Options:
  -f, --framework <framework>  Target framework
  -o, --output <dir>           Output directory
```

## Configuration

The CLI creates a `.adyaui.json` file in your project root:

```json
{
  "framework": "react",
  "typescript": true,
  "componentDir": "src/components",
  "styleFormat": "css-modules",
  "aiProvider": "openai",
  "apiKey": "sk-...",
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

## Environment Variables

```bash
# AI API Key
export ADYAUI_AI_API_KEY="sk-..."

# AI Provider
export ADYAUI_AI_PROVIDER="openai"
```

## Examples

### Create a login page

```bash
adya-ui ai -p "Create a login page with email and password fields, remember me checkbox, and submit button"
```

### Build a product grid

```bash
adya-ui ai -p "Build a product grid with 3 columns, each card showing image, title, price, and add to cart button"
```

### Generate a dashboard

```bash
adya-ui ai -p "Create a dashboard with sidebar navigation, top header, and 4 stat cards showing metrics"
```

### Preview before creating

```bash
adya-ui ai -p "Create a contact form" --dry-run
```

## Documentation

- [Full CLI Guide](../../CLI_GUIDE.md)
- [Example Prompts](../../AI_PROMPTS.md)
- [Technical Architecture](../../AI_ARCHITECTURE.md)

## License

MIT © AdyaUI Team
