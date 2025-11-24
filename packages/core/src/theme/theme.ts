/**
 * AdyaUI Theme System
 * Manages design tokens and theme switching
 */

export interface AuiThemeTokens {
  // Primary Colors
  primaryMain: string;
  primaryLight: string;
  primaryDark: string;
  primaryContrast: string;

  // Secondary Colors
  secondaryMain: string;
  secondaryLight: string;
  secondaryDark: string;
  secondaryContrast: string;

  // Semantic Colors
  success: string;
  error: string;
  warning: string;
  info: string;

  // Neutral Colors
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  divider: string;

  // Typography
  fontFamily: string;
  fontSizeXs: string;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
  fontSizeXl: string;

  // Spacing
  spacingXs: string;
  spacingSm: string;
  spacingMd: string;
  spacingLg: string;
  spacingXl: string;

  // Border Radius
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusFull: string;

  // Shadows
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowXl: string;

  // Transitions
  transitionFast: string;
  transitionBase: string;
  transitionSlow: string;
}

export const defaultLightTheme: AuiThemeTokens = {
  // Primary Colors
  primaryMain: '#2196f3',
  primaryLight: '#64b5f6',
  primaryDark: '#1976d2',
  primaryContrast: '#ffffff',

  // Secondary Colors
  secondaryMain: '#9c27b0',
  secondaryLight: '#ba68c8',
  secondaryDark: '#7b1fa2',
  secondaryContrast: '#ffffff',

  // Semantic Colors
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',

  // Neutral Colors
  background: '#ffffff',
  surface: '#f5f5f5',
  textPrimary: 'rgba(0, 0, 0, 0.87)',
  textSecondary: 'rgba(0, 0, 0, 0.6)',
  divider: 'rgba(0, 0, 0, 0.12)',

  // Typography
  fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
  radiusSm: '4px',
  radiusMd: '8px',
  radiusLg: '12px',
  radiusFull: '9999px',

  // Shadows
  shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',

  // Transitions
  transitionFast: '150ms ease-in-out',
  transitionBase: '250ms ease-in-out',
  transitionSlow: '350ms ease-in-out',
};

export const defaultDarkTheme: AuiThemeTokens = {
  ...defaultLightTheme,
  // Override for dark mode
  background: '#121212',
  surface: '#1e1e1e',
  textPrimary: 'rgba(255, 255, 255, 0.87)',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  divider: 'rgba(255, 255, 255, 0.12)',
};

export class AuiTheme {
  private static instance: AuiTheme;
  private currentTheme: AuiThemeTokens = defaultLightTheme;
  private isDark = false;

  private constructor() {
    this.applyTheme(this.currentTheme);
  }

  static getInstance(): AuiTheme {
    if (!AuiTheme.instance) {
      AuiTheme.instance = new AuiTheme();
    }
    return AuiTheme.instance;
  }

  /**
   * Apply theme tokens to CSS custom properties
   */
  applyTheme(theme: Partial<AuiThemeTokens>): void {
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
  setMode(mode: 'light' | 'dark'): void {
    this.isDark = mode === 'dark';
    const theme = mode === 'dark' ? defaultDarkTheme : defaultLightTheme;
    this.applyTheme(theme);
    document.documentElement.setAttribute('data-theme', mode);
  }

  /**
   * Toggle between light and dark mode
   */
  toggleMode(): void {
    this.setMode(this.isDark ? 'light' : 'dark');
  }

  /**
   * Get current theme tokens
   */
  getTheme(): AuiThemeTokens {
    return { ...this.currentTheme };
  }

  /**
   * Convert camelCase to kebab-case
   */
  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
}

// Export singleton instance
export const theme = AuiTheme.getInstance();
