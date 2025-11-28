import fs from 'fs-extra';
import path from 'path';
import type { Framework, ProjectContext } from '../types/index.js';

/**
 * Detect project framework and configuration
 */
export class ProjectDetector {
  private rootDir: string;

  constructor(rootDir: string = process.cwd()) {
    this.rootDir = rootDir;
  }

  /**
   * Detect project context
   */
  async detect(): Promise<ProjectContext> {
    const framework = await this.detectFramework();
    const typescript = await this.detectTypeScript();
    const styleFormat = await this.detectStyleFormat();
    const componentDir = await this.detectComponentDir(framework);

    return {
      framework,
      typescript,
      styleFormat,
      componentDir,
      rootDir: this.rootDir,
    };
  }

  /**
   * Detect framework from package.json
   */
  private async detectFramework(): Promise<Framework> {
    const packageJsonPath = path.join(this.rootDir, 'package.json');
    
    if (!await fs.pathExists(packageJsonPath)) {
      throw new Error('package.json not found. Please run this command from your project root.');
    }

    const packageJson = await fs.readJSON(packageJsonPath);
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    // Check for React
    if (dependencies['react']) {
      return 'react';
    }

    // Check for Vue
    if (dependencies['vue']) {
      return 'vue';
    }

    // Default to core (vanilla)
    return 'core';
  }

  /**
   * Detect TypeScript usage
   */
  private async detectTypeScript(): Promise<boolean> {
    const tsconfigPath = path.join(this.rootDir, 'tsconfig.json');
    return await fs.pathExists(tsconfigPath);
  }

  /**
   * Detect style format
   */
  private async detectStyleFormat(): Promise<'css' | 'css-modules' | 'styled-components' | 'emotion'> {
    const packageJsonPath = path.join(this.rootDir, 'package.json');
    
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJSON(packageJsonPath);
      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      if (dependencies['styled-components']) {
        return 'styled-components';
      }
      if (dependencies['@emotion/react']) {
        return 'emotion';
      }
    }

    // Check for CSS modules
    const srcDir = path.join(this.rootDir, 'src');
    if (await fs.pathExists(srcDir)) {
      const files = await fs.readdir(srcDir);
      if (files.some(f => f.endsWith('.module.css'))) {
        return 'css-modules';
      }
    }

    return 'css';
  }

  /**
   * Detect component directory
   */
  private async detectComponentDir(framework: Framework): Promise<string> {
    const possibleDirs = [
      'src/components',
      'components',
      'src',
      'app/components',
      'lib/components',
    ];

    for (const dir of possibleDirs) {
      const fullPath = path.join(this.rootDir, dir);
      if (await fs.pathExists(fullPath)) {
        return dir;
      }
    }

    // Default based on framework
    return framework === 'react' ? 'src/components' : 'src/components';
  }

  /**
   * Check if directory is a valid project
   */
  async isValidProject(): Promise<boolean> {
    const packageJsonPath = path.join(this.rootDir, 'package.json');
    return await fs.pathExists(packageJsonPath);
  }

  /**
   * Get project name from package.json
   */
  async getProjectName(): Promise<string> {
    const packageJsonPath = path.join(this.rootDir, 'package.json');
    
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJSON(packageJsonPath);
      return packageJson.name || 'my-app';
    }

    return 'my-app';
  }
}
