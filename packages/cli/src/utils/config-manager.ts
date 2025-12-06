import path from 'path';

import fs from 'fs-extra';

import type { AdyaUIConfig, Framework } from '../types/index.js';

const CONFIG_FILENAME = '.adyaui.json';

/**
 * Default configuration
 */
const DEFAULT_CONFIG: AdyaUIConfig = {
  framework: 'react',
  typescript: true,
  componentDir: 'src/components',
  styleFormat: 'css-modules',
  aiProvider: 'openai',
  preferences: {
    functionalComponents: true,
    useHooks: true,
    importStyle: 'named',
    formatting: {
      semi: true,
      singleQuote: true,
      tabWidth: 2,
    },
  },
};

/**
 * Configuration manager
 */
export class ConfigManager {
  private rootDir: string;
  private configPath: string;

  constructor(rootDir: string = process.cwd()) {
    this.rootDir = rootDir;
    this.configPath = path.join(rootDir, CONFIG_FILENAME);
  }

  /**
   * Load configuration
   */
  async load(): Promise<AdyaUIConfig> {
    if (await fs.pathExists(this.configPath)) {
      const config = await fs.readJSON(this.configPath);
      return { ...DEFAULT_CONFIG, ...config };
    }

    return DEFAULT_CONFIG;
  }

  /**
   * Save configuration
   */
  async save(config: Partial<AdyaUIConfig>): Promise<void> {
    const existingConfig = await this.load();
    const newConfig = { ...existingConfig, ...config };
    
    await fs.writeJSON(this.configPath, newConfig, { spaces: 2 });
  }

  /**
   * Update configuration
   */
  async update(updates: Partial<AdyaUIConfig>): Promise<void> {
    await this.save(updates);
  }

  /**
   * Check if config exists
   */
  async exists(): Promise<boolean> {
    return await fs.pathExists(this.configPath);
  }

  /**
   * Get API key from config or environment
   */
  async getApiKey(): Promise<string | undefined> {
    // Check environment variable first
    const envKey = process.env.ADYAUI_AI_API_KEY;
    if (envKey) {
      return envKey;
    }

    // Check config file
    const config = await this.load();
    return config.apiKey;
  }

  /**
   * Set API key in config
   */
  async setApiKey(apiKey: string): Promise<void> {
    await this.update({ apiKey });
  }

  /**
   * Initialize config with detected values
   */
  async initialize(framework: Framework, typescript: boolean, componentDir: string): Promise<void> {
    const config: AdyaUIConfig = {
      ...DEFAULT_CONFIG,
      framework,
      typescript,
      componentDir,
    };

    await fs.writeJSON(this.configPath, config, { spaces: 2 });
  }

  /**
   * Get config path
   */
  getConfigPath(): string {
    return this.configPath;
  }
}
