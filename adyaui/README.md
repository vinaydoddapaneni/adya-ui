# AdyaUI Documentation Website

A comprehensive documentation website for the AdyaUI component library, built with React, TypeScript, and Vite.

## Features

- 🎨 **Framework Selector**: Switch between React, Vue, and Core (vanilla JS) examples
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 🔍 **Search**: Quickly find components with autocomplete search
- 📱 **Responsive**: Fully responsive design for all screen sizes
- 💅 **Beautiful UI**: Ant Design-inspired aesthetics
- 📚 **Comprehensive Docs**: Complete API reference for all components

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the documentation site.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
adyaui/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── CodeBlock.tsx
│   │   ├── FrameworkSelector.tsx
│   │   └── PropsTable.tsx
│   ├── context/          # React context providers
│   │   └── AppContext.tsx
│   ├── data/             # Component metadata
│   │   └── componentList.ts
│   ├── layout/           # Layout components
│   │   ├── MainLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopNav.tsx
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   └── ComponentPage.tsx
│   ├── styles/           # CSS stylesheets
│   │   ├── variables.css
│   │   ├── global.css
│   │   ├── layout.css
│   │   └── components.css
│   ├── types/            # TypeScript types
│   │   └── component.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Adding New Components

To add documentation for a new component:

1. Open `src/data/componentList.ts`
2. Add a new entry to the `componentList` array with:
   - Component metadata (id, name, description, category)
   - Framework-specific examples (React, Vue, Core)
   - Props documentation

The sidebar and routes will be automatically generated.

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **PrismJS** - Syntax highlighting
- **CSS Custom Properties** - Theming

## License

MIT
