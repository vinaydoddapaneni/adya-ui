/**
 * AdyaUI Theme System
 * Manages design tokens and theme switching
 */
export const defaultLightTheme = {
    // Primary Colors - Vibrant Blue/Indigo
    primaryMain: '#4F46E5', // Indigo 600
    primaryLight: '#818CF8', // Indigo 400
    primaryDark: '#3730A3', // Indigo 800
    primaryContrast: '#ffffff',
    // Secondary Colors - Vibrant Purple/Pink
    secondaryMain: '#D946EF', // Fuchsia 500
    secondaryLight: '#E879F9', // Fuchsia 400
    secondaryDark: '#A21CAF', // Fuchsia 700
    secondaryContrast: '#ffffff',
    // Semantic Colors
    success: '#10B981', // Emerald 500
    error: '#EF4444', // Red 500
    warning: '#F59E0B', // Amber 500
    info: '#3B82F6', // Blue 500
    // Neutral Colors
    background: '#F3F4F6', // Gray 100
    surface: '#ffffff',
    textPrimary: '#111827', // Gray 900
    textSecondary: '#6B7280', // Gray 500
    divider: 'rgba(0, 0, 0, 0.06)',
    // Typography
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSizeXs: '0.75rem',
    fontSizeSm: '0.875rem',
    fontSizeMd: '1rem',
    fontSizeLg: '1.125rem',
    fontSizeXl: '1.25rem',
    // Spacing
    spacingXs: '4px',
    spacingSm: '8px',
    spacingMd: '16px',
    spacingLg: '24px',
    spacingXl: '32px',
    // Border Radius
    radiusSm: '6px',
    radiusMd: '12px',
    radiusLg: '20px',
    radiusFull: '9999px',
    // Shadows - Soft & Layered
    shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    // Transitions
    transitionFast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    transitionBase: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    transitionSlow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    // Gradients
    primaryGradient: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)',
    secondaryGradient: 'linear-gradient(135deg, #D946EF 0%, #E879F9 100%)',
    // Glassmorphism
    surfaceGlass: 'rgba(255, 255, 255, 0.8)',
    // Hover Shadows
    shadowHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};
export const defaultDarkTheme = {
    ...defaultLightTheme,
    // Override for dark mode
    background: '#0F172A', // Slate 900
    surface: '#1E293B', // Slate 800
    textPrimary: '#F8FAFC', // Slate 50
    textSecondary: '#94A3B8', // Slate 400
    divider: 'rgba(255, 255, 255, 0.08)',
    // Dark mode specific overrides
    shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
    surfaceGlass: 'rgba(30, 41, 59, 0.8)',
};
export class AuiTheme {
    constructor() {
        this.currentTheme = defaultLightTheme;
        this.isDark = false;
        this.applyTheme(this.currentTheme);
    }
    static getInstance() {
        if (!AuiTheme.instance) {
            AuiTheme.instance = new AuiTheme();
        }
        return AuiTheme.instance;
    }
    /**
     * Apply theme tokens to CSS custom properties
     */
    applyTheme(theme) {
        const root = document.documentElement;
        const fullTheme = { ...this.currentTheme, ...theme };
        Object.entries(fullTheme).forEach(([key, value]) => {
            const cssVar = `--aui-${this.camelToKebab(key)}`;
            root.style.setProperty(cssVar, value);
        });
        this.currentTheme = fullTheme;
    }
    /**
     * Switch between light and dark mode
     */
    setMode(mode) {
        this.isDark = mode === 'dark';
        const theme = mode === 'dark' ? defaultDarkTheme : defaultLightTheme;
        this.applyTheme(theme);
        document.documentElement.setAttribute('data-theme', mode);
    }
    /**
     * Toggle between light and dark mode
     */
    toggleMode() {
        this.setMode(this.isDark ? 'light' : 'dark');
    }
    /**
     * Get current theme tokens
     */
    getTheme() {
        return { ...this.currentTheme };
    }
    /**
     * Convert camelCase to kebab-case
     */
    camelToKebab(str) {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }
}
// Export singleton instance
export const theme = AuiTheme.getInstance();
//# sourceMappingURL=theme.js.map