# Publishing Checklist for AdyaUI

## ✅ Pre-Publishing Checklist

### 1. Package Structure Verification
- [x] Each package has its own `package.json`
- [x] Each package has an `index.js` or `index.ts`
- [x] Each package has a `README.md`
- [x] Build outputs exist in `dist/` folders
- [x] Version numbers updated to 1.0.0

### 2. Package Names Verified
- [x] `@adyaui/core` - Available
- [x] `@adyaui/react` - Available  
- [x] `@adyaui/vue` - Available

### 3. Files Configuration
- [x] Created `.npmignore` file
- [x] Each `package.json` has proper `"files"` field
- [x] Unnecessary files excluded from publish

### 4. Build Verification
- [x] Core package built successfully
- [x] React package built successfully
- [x] Vue package built successfully

## 📦 Publishing Steps

### Step 1: Login to npm
```bash
npm login
```

### Step 2: Publish Core Package
```bash
cd packages/core
npm publish --access public
```

### Step 3: Publish React Package
```bash
cd packages/react
npm publish --access public
```

### Step 4: Publish Vue Package
```bash
cd packages/vue
npm publish --access public
```

### Alternative: Use Publishing Script
```bash
# On Windows
.\publish.ps1

# On Unix/macOS
chmod +x publish.sh
./publish.sh
```

## 📋 Package Information

| Package | Version | Description |
|---------|---------|-------------|
| @adyaui/core | 1.0.0 | Framework-agnostic Web Components library |
| @adyaui/react | 1.0.0 | React wrapper components for AdyaUI |
| @adyaui/vue | 1.0.0 | Vue wrapper components for AdyaUI |

## 🔗 Package URLs (after publishing)

- https://www.npmjs.com/package/@adyaui/core
- https://www.npmjs.com/package/@adyaui/react
- https://www.npmjs.com/package/@adyaui/vue

## 📝 Post-Publishing Tasks

1. **Update Documentation**
   - Add installation instructions
   - Update README files with npm badges
   - Create getting started guide

2. **Verify Installation**
   ```bash
   npm install @adyaui/core
   npm install @adyaui/react
   npm install @adyaui/vue
   ```

3. **Test in Projects**
   - Create test projects
   - Verify components work correctly
   - Check TypeScript definitions

4. **Announce Release**
   - Create GitHub release
   - Update changelog
   - Share on social media

## 🚨 Troubleshooting

### Common Issues and Solutions

1. **"package not found" error**
   - Wait 2-3 minutes for npm to index the package
   - Check if package name is spelled correctly

2. **Permission denied**
   - Ensure you're logged in to npm
   - Check if you have publish permissions for the scope

3. **Build errors**
   - Run `npm run clean` then `npm run build`
   - Check TypeScript configuration

4. **Missing files**
   - Verify `files` field in package.json
   - Check `.npmignore` doesn't exclude necessary files

## 📊 Package Statistics (after publishing)

Track your packages with:
```bash
npm view @adyaui/core
npm view @adyaui/react
npm view @adyaui/vue
```

## 🔄 Future Updates

To update packages:
1. Increment version numbers
2. Run `npm run build`
3. Publish with `npm publish --access public`

## 📞 Support

For issues:
- Create GitHub issues
- Check documentation
- Review npm package pages
