# Publishing script for AdyaUI packages
Write-Host "🚀 Publishing AdyaUI packages to npm..." -ForegroundColor Green

# Check if user is logged in to npm
$npmUser = npm whoami 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ You are not logged in to npm. Please run 'npm login' first." -ForegroundColor Red
    exit 1
}

# Function to publish a package
function Publish-Package {
    param(
        [string]$PackageDir,
        [string]$PackageName
    )
    
    Write-Host ""
    Write-Host "📦 Publishing $PackageName..." -ForegroundColor Cyan
    
    Push-Location $PackageDir
    
    # Check if dist folder exists
    if (-not (Test-Path "dist")) {
        Write-Host "❌ dist folder not found. Running build first..." -ForegroundColor Red
        npm run build
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Build failed for $PackageName" -ForegroundColor Red
            Pop-Location
            exit 1
        }
    }
    
    # Check if package.json exists
    if (-not (Test-Path "package.json")) {
        Write-Host "❌ package.json not found in $PackageDir" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    
    # Check if README.md exists
    if (-not (Test-Path "README.md")) {
        Write-Host "❌ README.md not found in $PackageDir" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    
    # Publish the package
    Write-Host "📤 Publishing $PackageName..." -ForegroundColor Yellow
    npm publish --access public
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully published $PackageName" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to publish $PackageName" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    
    Pop-Location
}

# Publish in order: core first, then framework packages
Publish-Package -PackageDir "packages/core" -PackageName "@adyaui/core"
Publish-Package -PackageDir "packages/react" -PackageName "@adyaui/react"
Publish-Package -PackageDir "packages/vue" -PackageName "@adyaui/vue"

Write-Host ""
Write-Host "🎉 All packages published successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Package URLs:" -ForegroundColor Cyan
Write-Host "   - @adyaui/core: https://www.npmjs.com/package/@adyaui/core"
Write-Host "   - @adyaui/react: https://www.npmjs.com/package/@adyaui/react"
Write-Host "   - @adyaui/vue: https://www.npmjs.com/package/@adyaui/vue"
