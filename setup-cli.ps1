# setup-cli.ps1
Write-Host "Setting up AdyaUI CLI..."

# Navigate to CLI package
cd packages/cli

# Install dependencies
Write-Host "Installing dependencies..."
npm install

# Build the CLI
Write-Host "Building CLI..."
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed"
    exit 1
}

# Link globally
Write-Host "Linking globally..."
npm link

cd ../..

Write-Host "AdyaUI CLI setup complete!"
Write-Host "You can now use 'adya-ui' command anywhere."
