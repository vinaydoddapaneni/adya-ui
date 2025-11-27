/**
 * AdyaUI Theme System
 * Manages design tokens and theme switching
 */
export interface AuiThemeTokens {
    primaryMain: string;
    primaryLight: string;
    primaryDark: string;
    primaryContrast: string;
    secondaryMain: string;
    secondaryLight: string;
    secondaryDark: string;
    secondaryContrast: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    divider: string;
    fontFamily: string;
    fontSizeXs: string;
    fontSizeSm: string;
    fontSizeMd: string;
    fontSizeLg: string;
    fontSizeXl: string;
    spacingXs: string;
    spacingSm: string;
    spacingMd: string;
    spacingLg: string;
    spacingXl: string;
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    radiusFull: string;
    shadowSm: string;
    shadowMd: string;
    shadowLg: string;
    shadowXl: string;
    transitionFast: string;
    transitionBase: string;
    transitionSlow: string;
    primaryGradient: string;
    secondaryGradient: string;
    surfaceGlass: string;
    shadowHover: string;
}
export declare const defaultLightTheme: AuiThemeTokens;
export declare const defaultDarkTheme: AuiThemeTokens;
export declare class AuiTheme {
    private static instance;
    private currentTheme;
    private isDark;
    private constructor();
    static getInstance(): AuiTheme;
    /**
     * Apply theme tokens to CSS custom properties
     */
    applyTheme(theme: Partial<AuiThemeTokens>): void;
    /**
     * Switch between light and dark mode
     */
    setMode(mode: 'light' | 'dark'): void;
    /**
     * Toggle between light and dark mode
     */
    toggleMode(): void;
    /**
     * Get current theme tokens
     */
    getTheme(): AuiThemeTokens;
    /**
     * Convert camelCase to kebab-case
     */
    private camelToKebab;
}
export declare const theme: AuiTheme;
//# sourceMappingURL=theme.d.ts.map