# 🐛 Bugs Found in AdyaUI

## Critical Bugs Identified

### Bug #1: ❌ Incorrect Disabled Attribute Syntax (aui-button.ts:108)
**Location**: `packages/core/src/components/button/aui-button.ts` line 108

**Issue**: Using Lit.js syntax `?disabled="${this.disabled}"` in vanilla Web Components
```typescript
// WRONG (Line 108)
?disabled="${this.disabled}"
```

**Problem**: The `?` prefix is Lit.js syntax for boolean attributes. In vanilla HTML strings, this doesn't work.

**Fix**: Use proper conditional rendering
```typescript
// CORRECT
${this.disabled ? 'disabled' : ''}
```

---

### Bug #2: ❌ Event Listeners Added Before DOM Exists
**Location**: `packages/core/src/components/button/aui-button.ts` lines 80-90

**Issue**: `setupEventListeners()` is called in `connectedCallback()` which runs before `render()`, so the button doesn't exist yet.

**Problem**: 
```typescript
connectedCallback() {
  super.connectedCallback();  // This calls render()
  this.setupEventListeners(); // But we try to find button here
}

private setupEventListeners() {
  const button = this.$('button'); // button is null!
  if (button) {
    button.addEventListener('click', (e) => this.handleClick(e));
  }
}
```

The button element doesn't exist when `setupEventListeners()` is called because `render()` is called in `super.connectedCallback()` but the event listener setup happens after.

**Fix**: Add event listeners after rendering or use event delegation.

---

### Bug #3: ❌ Missing CSS Import in Vite Config
**Location**: `packages/core/vite.config.ts`

**Issue**: The `theme.css` file is not being imported/processed by Vite

**Problem**: No CSS file is imported in the main entry point, so Vite won't bundle it.

**Fix**: Import CSS in `src/index.ts` or add it to Vite's input configuration.

---

### Bug #4: ❌ AssetFileNames Callback Type Error
**Location**: `packages/core/vite.config.ts` line 16

**Issue**: `assetInfo.name` might be undefined

**Problem**:
```typescript
assetFileNames: assetInfo => {
  if (assetInfo.name === 'style.css') return 'theme.css';
  return assetInfo.name; // name could be undefined!
}
```

**Fix**: Add null check
```typescript
return assetInfo.name ?? 'asset';
```

---

### Bug #5: ❌ Path Module Not Available in Vite Config
**Location**: `packages/core/vite.config.ts` line 2

**Issue**: Using Node.js `path` module without proper typing

**Problem**:
```typescript
import { resolve } from 'path';
```

In Vite + TypeScript, this needs `@types/node` and proper configuration.

**Fix**: Use `import.meta.url` or ensure `@types/node` is installed.

---

## Summary

| Bug # | Severity | File | Line | Status |
|-------|----------|------|------|--------|
| 1 | 🔴 High | aui-button.ts | 108 | ❌ Not Fixed |
| 2 | 🔴 High | aui-button.ts | 85-89 | ❌ Not Fixed |
| 3 | 🟡 Medium | vite.config.ts | N/A | ❌ Not Fixed |
| 4 | 🟡 Medium | vite.config.ts | 16 | ❌ Not Fixed |
| 5 | 🟢 Low | vite.config.ts | 2 | ❌ Not Fixed |

---

## Impact

- **Bug #1**: Disabled buttons won't work properly
- **Bug #2**: Click events won't fire
- **Bug #3**: Theme CSS won't be included in build
- **Bug #4**: Build might fail with some assets
- **Bug #5**: TypeScript errors in config

---

**Ready to fix these bugs?**
