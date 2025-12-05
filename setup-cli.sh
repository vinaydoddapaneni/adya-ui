#!/bin/bash

echo "🚀 Setting up AdyaUI CLI..."

# Navigate to CLI package
CLI_PATH="./packages/cli"

if [ ! -d "$CLI_PATH" ]; then
    echo "❌ Could not find CLI package at $CLI_PATH"
    exit 1
fi

cd "$CLI_PATH"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the CLI
echo "🔨 Building CLI..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    cd - > /dev/null
    exit 1
fi

# Link globally
echo "🔗 Linking globally..."
npm link

cd - > /dev/null

echo "✅ AdyaUI CLI setup complete!"
echo "👉 You can now use 'adya-ui' command anywhere."
