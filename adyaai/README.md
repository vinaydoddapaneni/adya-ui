# AdyaAI - Offline AI Component Advisor

An offline, Ollama-powered AI system that analyzes user code and recommends the best AdyaUI components with explanations and example code.

## Features

- 🤖 **Component Suggestion** - Get AI-powered component recommendations based on your requirements
- 🎨 **UI Generator** - Generate complete page layouts with AdyaUI components
- 🌈 **Theme Generator** - Create custom themes with AI-generated color palettes
- 🔍 **Code Analyzer** - Analyze and improve your AdyaUI code
- 📦 **Dynamic Component Registry** - Automatically discovers all AdyaUI components
- 🚀 **Offline First** - Works completely offline with local Ollama

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Ollama** - Install from [ollama.ai](https://ollama.ai)
3. **DeepSeek-R1 Model** - Pull the model after installing Ollama

### Installing Ollama and Model

```bash
# Install Ollama (visit ollama.ai for your platform)

# Pull the DeepSeek-R1 model
ollama pull deepseek-r1

# Start Ollama server
ollama serve
```

## Installation

```bash
# Navigate to the adyaai directory
cd adyaai

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Extract component metadata
npm run extract-metadata
```

## Configuration

Edit `.env` file to configure:

```env
PORT=3000
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=deepseek-r1
COMPONENT_PATH=../packages/core/src/components
```

## Usage

### Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm run build
npm start
```

The server will start at `http://localhost:3000`

### Using the Dashboard

1. Open `http://localhost:3000` in your browser
2. Select a mode:
   - **Component Suggestion** - Describe what you need
   - **UI Generator** - Describe a page or component
   - **Theme Generator** - Describe your desired theme
   - **Code Analyzer** - Paste code for analysis or improvement

### API Endpoints

#### Component Suggestion
```bash
POST /api/suggest
Content-Type: application/json

{
  "input": "I need a form with email and password fields"
}
```

#### UI Generation
```bash
POST /api/generate-ui
Content-Type: application/json

{
  "description": "Create a login page"
}
```

#### Theme Generation
```bash
POST /api/theme
Content-Type: application/json

{
  "description": "Dark theme with purple accents"
}
```

#### Code Analysis
```bash
POST /api/analyze
Content-Type: application/json

{
  "code": "<aui-button>Click me</aui-button>"
}
```

#### Code Improvement
```bash
POST /api/analyze/improve
Content-Type: application/json

{
  "code": "<aui-button>Click me</aui-button>"
}
```

#### Health Check
```bash
GET /api/health
```

#### Component Metadata
```bash
GET /api/components
```

#### Refresh Metadata
```bash
POST /api/components/refresh
```

## Project Structure

```
adyaai/
├── src/
│   ├── ai/
│   │   ├── ollama-client.ts    # Ollama integration
│   │   ├── prompts.ts          # AI prompt templates
│   │   └── parser.ts           # Response parsing
│   ├── config/
│   │   └── index.ts            # Configuration
│   ├── metadata/
│   │   ├── extractor.ts        # Component metadata extraction
│   │   └── registry.ts         # Component registry
│   ├── routes/
│   │   ├── suggest.ts          # Component suggestions
│   │   ├── generate-ui.ts      # UI generation
│   │   ├── theme.ts            # Theme generation
│   │   └── analyze.ts          # Code analysis
│   ├── utils/
│   │   └── validation.ts       # Request validation
│   └── server.ts               # Express server
├── public/
│   ├── index.html              # Dashboard UI
│   ├── css/
│   │   └── styles.css          # Styles
│   └── js/
│       └── app.js              # Frontend logic
├── data/
│   └── components.json         # Generated metadata
└── package.json
```

## How It Works

1. **Component Discovery** - Scans AdyaUI components and extracts metadata from TypeScript files
2. **AI Integration** - Uses Ollama with DeepSeek-R1 for intelligent suggestions
3. **Prompt Engineering** - Crafted prompts for different modes (suggest, generate, theme, analyze)
4. **Response Parsing** - Validates and parses AI responses with Zod schemas
5. **Dynamic Updates** - Automatically detects new components when added to AdyaUI

## Troubleshooting

### Ollama Connection Issues
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Start Ollama if not running
ollama serve
```

### Model Not Available
```bash
# Pull the model
ollama pull deepseek-r1

# List available models
ollama list
```

### Component Metadata Issues
```bash
# Refresh component metadata
npm run extract-metadata

# Or use the API
curl -X POST http://localhost:3000/api/components/refresh
```

## Development

```bash
# Run in development mode
npm run dev

# Build TypeScript
npm run build

# Run tests
npm test
```

## License

MIT © AdyaUI Team

## Credits

- Built with [Ollama](https://ollama.ai)
- Powered by [DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1)
- UI Components by [AdyaUI](https://github.com/yourusername/adyaui)
