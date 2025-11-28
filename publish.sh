#!/bin/bash

# Publishing script for AdyaUI packages
echo "🚀 Publishing AdyaUI packages to npm..."

# Check if user is logged in to npm
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ You are not logged in to npm. Please run 'npm login' first."
    exit 1
fi

# Function to publish a package
publish_package() {
    local package_dir=$1
    local package_name=$2
    
    echo ""
    echo "📦 Publishing $package_name..."
    
    cd "$package_dir"
    
    # Check if dist folder exists
    if [ ! -d "dist" ]; then
        echo "❌ dist folder not found. Running build first..."
        npm run build
        if [ $? -ne 0 ]; then
            echo "❌ Build failed for $package_name"
            exit 1
        fi
    fi
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        echo "❌ package.json not found in $package_dir"
        exit 1
    fi
    
    # Check if README.md exists
    if [ ! -f "README.md" ]; then
        echo "❌ README.md not found in $package_dir"
        exit 1
    fi
    
    # Publish the package
    echo "📤 Publishing $package_name..."
    npm publish --access public
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully published $package_name"
    else
        echo "❌ Failed to publish $package_name"
        exit 1
    fi
    
    cd - > /dev/null
}

# Publish in order: core first, then framework packages
publish_package "packages/core" "@adyaui/core"
publish_package "packages/react" "@adyaui/react"
publish_package "packages/vue" "@adyaui/vue"

echo ""
echo "🎉 All packages published successfully!"
echo ""
echo "📋 Package URLs:"
echo "   - @adyaui/core: https://www.npmjs.com/package/@adyaui/core"
echo "   - @adyaui/react: https://www.npmjs.com/package/@adyaui/react"
echo "   - @adyaui/vue: https://www.npmjs.com/package/@adyaui/vue"
