/**
 * Type definitions for AdyaUI CLI
 */

export type Framework = 'react' | 'vue' | 'core';

export type ComponentCategory = 
  | 'form'
  | 'layout'
  | 'navigation'
  | 'feedback'
  | 'data-display'
  | 'overlay';

export interface ProjectContext {
  framework: Framework;
  typescript: boolean;
  styleFormat: 'css' | 'css-modules' | 'styled-components' | 'emotion';
  componentDir: string;
  rootDir: string;
  // Enhanced context from project scanner
  discoveredComponents?: string[];
  componentMetadata?: ComponentMetadata[];
  designTokens?: DesignTokens;
  namingConventions?: NamingConventions;
  routing?: string;
  stateManagement?: string;
  existingLayouts?: string[];
}

export interface ComponentIntent {
  type: 'page' | 'component' | 'layout' | 'feature';
  name?: string;
  components: ComponentReference[];
  layout?: LayoutDefinition;
  styling?: StylingDefinition;
  props?: Record<string, any>;
  state?: StateDefinition[];
  events?: EventDefinition[];
}

export interface ComponentReference {
  name: string;
  props?: Record<string, any>;
  children?: ComponentReference[];
  content?: string;
}

export interface LayoutDefinition {
  type: 'grid' | 'flex' | 'stack' | 'custom';
  columns?: number;
  gap?: string;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}

export interface StylingDefinition {
  theme?: 'light' | 'dark' | 'auto';
  colors?: Record<string, string>;
  spacing?: string;
  customStyles?: string;
}

export interface StateDefinition {
  name: string;
  type: string;
  initialValue: any;
}

export interface EventDefinition {
  name: string;
  handler: string;
  params?: string[];
}

export interface GeneratedCode {
  filename: string;
  code: string;
  imports: string[];
  dependencies?: string[];
  styles?: string;
  styleFilename?: string;
}

export interface ComponentMetadata {
  name: string;
  category: ComponentCategory;
  description: string;
  props: PropDefinition[];
  events: EventDefinition[];
  slots?: SlotDefinition[];
  examples: string[];
  keywords: string[];
  relatedComponents: string[];
}

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  default?: any;
  description: string;
}

export interface SlotDefinition {
  name: string;
  description: string;
}

export interface DesignTokens {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  spacing?: string;
  borderRadius?: string;
}

export interface NamingConventions {
  componentCase: 'PascalCase' | 'camelCase' | 'kebab-case';
  fileCase: 'PascalCase' | 'camelCase' | 'kebab-case';
}

export interface UIPattern {
  name: string;
  description: string;
  category: string;
  components: ComponentReference[];
  layout: LayoutDefinition;
}

export interface AdyaUIConfig {
  framework: Framework;
  typescript: boolean;
  componentDir: string;
  styleFormat: string;
  aiProvider: 'openai' | 'anthropic';
  apiKey?: string;
  preferences: {
    functionalComponents: boolean;
    useHooks: boolean;
    importStyle: 'named' | 'default';
    formatting: {
      semi: boolean;
      singleQuote: boolean;
      tabWidth: number;
    };
  };
}

export interface WriteOptions {
  force?: boolean;
  interactive?: boolean;
  dryRun?: boolean;
}

export interface WriteResult {
  success: boolean;
  files?: string[];
  reason?: string;
}

export interface AIServiceOptions {
  apiKey: string;
  model?: string;
  temperature?: number;
}

export interface InitOptions {
  framework?: Framework;
  skipInstall?: boolean;
  apiKey?: string;
  force?: boolean;
}

export interface AIOptions {
  prompt?: string;
  framework?: Framework;
  dryRun?: boolean;
  output?: string;
  provider?: 'openai' | 'anthropic';
}

export interface AddOptions {
  framework?: Framework;
  output?: string;
}
