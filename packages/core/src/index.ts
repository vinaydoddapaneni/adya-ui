/**
 * AdyaUI Core Library
 * Framework-agnostic Web Components for modern web applications
 */

// Import theme CSS for bundling
import './theme.css';

// Base classes
export * from './base';

// Theme system
export * from './theme';

// Components
export * from './components';

// Auto-initialize theme
import { theme } from './theme';
theme.applyTheme(theme.getTheme());
