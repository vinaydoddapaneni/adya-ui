import path from 'path';

import fs from 'fs-extra';

import type { ProjectContext, DesignTokens, NamingConventions, ComponentMetadata } from '../types/index.js';

import { ComponentParser } from './component-parser.js';

/**
 * Enhanced project scanner for AI agent context awareness
 */
export class ProjectScanner {
  private rootDir: string;
  private componentParser: ComponentParser;

  constructor(rootDir: string = process.cwd()) {
    this.rootDir = rootDir;
    this.componentParser = new ComponentParser();
  }

  /**
   * Scan project and build comprehensive context
   */
  async scan(baseContext: ProjectContext): Promise<ProjectContext> {
    const discoveredComponents = await this.scanComponents(baseContext.componentDir);
    const componentMetadata = await this.scanComponentMetadata(baseContext.componentDir, discoveredComponents);
    const designTokens = await this.extractDesignTokens();
    const namingConventions = await this.detectNamingConventions(baseContext.componentDir);
    const routing = await this.detectRouting();
    const stateManagement = await this.detectStateManagement();
    const existingLayouts = await this.findLayouts(baseContext.componentDir);

    return {
      ...baseContext,
      discoveredComponents,
      componentMetadata,
      designTokens,
      namingConventions,
      routing,
      stateManagement,
      existingLayouts,
    };
  }

  /**
   * Scan component directory for existing components
   */
  private async scanComponents(componentDir: string): Promise<string[]> {
    const components: string[] = [];
    const fullPath = path.join(this.rootDir, componentDir);

    if (!await fs.pathExists(fullPath)) {
      return components;
    }

    try {
      const files = await this.getAllFiles(fullPath);
      
      for (const file of files) {
        // Extract component names from files
        const ext = path.extname(file);
        if (['.tsx', '.jsx', '.ts', '.js', '.vue'].includes(ext)) {
          const basename = path.basename(file, ext);
          
          // Skip index files and test files
          if (basename !== 'index' && !basename.includes('.test') && !basename.includes('.spec')) {
            components.push(basename);
          }
        }
      }
    } catch (error) {
      console.warn('Warning: Could not scan components directory:', error);
    }

    return [...new Set(components)]; // Remove duplicates
  }

  /**
   * Scan component metadata
   */
  private async scanComponentMetadata(componentDir: string, components: string[]): Promise<ComponentMetadata[]> {
    const metadata: ComponentMetadata[] = [];
    const fullPath = path.join(this.rootDir, componentDir);

    if (!await fs.pathExists(fullPath)) {
      return metadata;
    }

    try {
      const files = await this.getAllFiles(fullPath);
      
      for (const file of files) {
        const ext = path.extname(file);
        const basename = path.basename(file, ext);
        
        if (components.includes(basename)) {
          const meta = await this.componentParser.parse(file);
          if (meta) {
            metadata.push(meta);
          }
        }
      }
    } catch (error) {
      console.warn('Warning: Could not scan component metadata:', error);
    }

    return metadata;
  }

  /**
   * Extract design tokens from CSS/theme files
   */
  private async extractDesignTokens(): Promise<DesignTokens> {
    const tokens: DesignTokens = {};

    // Look for common theme/style files
    const possibleFiles = [
      'src/styles/theme.css',
      'src/styles/variables.css',
      'src/theme/index.css',
      'src/index.css',
      'src/App.css',
      'src/styles/globals.css',
    ];

    for (const file of possibleFiles) {
      const fullPath = path.join(this.rootDir, file);
      
      if (await fs.pathExists(fullPath)) {
        try {
          const content = await fs.readFile(fullPath, 'utf-8');
          
          // Extract CSS variables
          const primaryColorMatch = content.match(/--primary[^:]*:\s*([^;]+)/);
          if (primaryColorMatch) {
            tokens.primaryColor = primaryColorMatch[1].trim();
          }

          const secondaryColorMatch = content.match(/--secondary[^:]*:\s*([^;]+)/);
          if (secondaryColorMatch) {
            tokens.secondaryColor = secondaryColorMatch[1].trim();
          }

          const fontMatch = content.match(/--font-family[^:]*:\s*([^;]+)/);
          if (fontMatch) {
            tokens.fontFamily = fontMatch[1].trim();
          }

          const spacingMatch = content.match(/--spacing[^:]*:\s*([^;]+)/);
          if (spacingMatch) {
            tokens.spacing = spacingMatch[1].trim();
          }

          const radiusMatch = content.match(/--border-radius[^:]*:\s*([^;]+)/);
          if (radiusMatch) {
            tokens.borderRadius = radiusMatch[1].trim();
          }

          // If we found tokens, break
          if (Object.keys(tokens).length > 0) {
            break;
          }
        } catch (error) {
          // Continue to next file
        }
      }
    }

    return tokens;
  }

  /**
   * Detect naming conventions from existing components
   */
  private async detectNamingConventions(componentDir: string): Promise<NamingConventions> {
    const fullPath = path.join(this.rootDir, componentDir);
    
    if (!await fs.pathExists(fullPath)) {
      return {
        componentCase: 'PascalCase',
        fileCase: 'PascalCase',
      };
    }

    try {
      const files = await fs.readdir(fullPath);
      const componentFiles = files.filter(f => 
        ['.tsx', '.jsx', '.vue'].some(ext => f.endsWith(ext))
      );

      if (componentFiles.length === 0) {
        return {
          componentCase: 'PascalCase',
          fileCase: 'PascalCase',
        };
      }

      // Analyze file naming
      const hasPascalCase = componentFiles.some(f => /^[A-Z][a-zA-Z0-9]*\.(tsx|jsx|vue)$/.test(f));
      const hasKebabCase = componentFiles.some(f => /^[a-z][a-z0-9-]*\.(tsx|jsx|vue)$/.test(f));

      return {
        componentCase: 'PascalCase', // Components are typically PascalCase
        fileCase: hasPascalCase ? 'PascalCase' : hasKebabCase ? 'kebab-case' : 'PascalCase',
      };
    } catch (error) {
      return {
        componentCase: 'PascalCase',
        fileCase: 'PascalCase',
      };
    }
  }

  /**
   * Detect routing library
   */
  private async detectRouting(): Promise<string | undefined> {
    const packageJsonPath = path.join(this.rootDir, 'package.json');
    
    if (!await fs.pathExists(packageJsonPath)) {
      return undefined;
    }

    try {
      const packageJson = await fs.readJSON(packageJsonPath);
      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      if (dependencies['react-router-dom']) {
        return 'react-router-dom';
      }
      if (dependencies['vue-router']) {
        return 'vue-router';
      }
      if (dependencies['@tanstack/react-router']) {
        return '@tanstack/react-router';
      }
    } catch (error) {
      // Ignore
    }

    return undefined;
  }

  /**
   * Detect state management library
   */
  private async detectStateManagement(): Promise<string | undefined> {
    const packageJsonPath = path.join(this.rootDir, 'package.json');
    
    if (!await fs.pathExists(packageJsonPath)) {
      return undefined;
    }

    try {
      const packageJson = await fs.readJSON(packageJsonPath);
      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      if (dependencies['redux'] || dependencies['@reduxjs/toolkit']) {
        return 'Redux';
      }
      if (dependencies['zustand']) {
        return 'Zustand';
      }
      if (dependencies['jotai']) {
        return 'Jotai';
      }
      if (dependencies['recoil']) {
        return 'Recoil';
      }
      if (dependencies['mobx']) {
        return 'MobX';
      }
      if (dependencies['pinia']) {
        return 'Pinia';
      }
    } catch (error) {
      // Ignore
    }

    return undefined;
  }

  /**
   * Find existing layout components
   */
  private async findLayouts(componentDir: string): Promise<string[]> {
    const layouts: string[] = [];
    const fullPath = path.join(this.rootDir, componentDir);

    if (!await fs.pathExists(fullPath)) {
      return layouts;
    }

    try {
      const files = await this.getAllFiles(fullPath);
      
      for (const file of files) {
        const basename = path.basename(file, path.extname(file));
        
        // Look for common layout naming patterns
        if (
          basename.toLowerCase().includes('layout') ||
          basename.toLowerCase().includes('template') ||
          basename === 'Layout' ||
          basename === 'MainLayout' ||
          basename === 'AuthLayout' ||
          basename === 'DashboardLayout'
        ) {
          layouts.push(basename);
        }
      }
    } catch (error) {
      // Ignore
    }

    return [...new Set(layouts)];
  }

  /**
   * Recursively get all files in a directory
   */
  private async getAllFiles(dir: string): Promise<string[]> {
    const files: string[] = [];

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          // Skip node_modules and common build directories
          if (!['node_modules', 'dist', 'build', '.git'].includes(entry.name)) {
            const subFiles = await this.getAllFiles(fullPath);
            files.push(...subFiles);
          }
        } else {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore errors
    }

    return files;
  }
}

