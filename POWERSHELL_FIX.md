# PowerShell Execution Policy Fix

## The Issue
You're seeing this error because PowerShell's execution policy is preventing scripts from running:
```
running scripts is disabled on this system
```

## Quick Fix Options

### Option 1: Temporary Fix (Recommended for Testing)
Run this command in PowerShell **as Administrator**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try again:
```powershell
cd c:\Users\vinay\Downloads\AdyaUI
pnpm install
```

### Option 2: Use npm Instead of pnpm
If you prefer not to change execution policy, use npm:

```powershell
cd c:\Users\vinay\Downloads\AdyaUI
npm install
npm run dev
```

Note: Scripts in package.json will need slight modifications for npm workspaces.

### Option 3: Bypass Policy for Single Command
Run commands with bypass:

```powershell
powershell -ExecutionPolicy Bypass -Command "pnpm install"
```

---

## Alternative: Use cmd.exe Instead of PowerShell

1. Open **Command Prompt** (cmd.exe) instead of PowerShell
2. Navigate to project:
   ```cmd
   cd c:\Users\vinay\Downloads\AdyaUI
   ```
3. Run commands normally:
   ```cmd
   pnpm install
   pnpm dev
   ```

---

## Recommended Setup Steps

1. **Open PowerShell as Administrator**
   - Right-click Start menu
   - Select "Windows PowerShell (Admin)"

2. **Set Execution Policy**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Navigate to Project**
   ```powershell
   cd c:\Users\vinay\Downloads\AdyaUI
   ```

4. **Install pnpm (if not installed)**
   ```powershell
   npm install -g pnpm
   ```

5. **Install Project Dependencies**
   ```powershell
   pnpm install
   ```

6. **Start Development**
   ```powershell
   cd packages\core
   pnpm dev
   ```

---

## After Setup

Once dependencies are installed and dev server is running:
- Browser will open to `http://localhost:5173`
- You'll see the AdyaUI Button demo page
- You can test all button variants and features
- Toggle dark mode to see theme switching

---

**Need help? Let me know which method you prefer!**
