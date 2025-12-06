import path from 'path';

import fs from 'fs-extra';

import type { GeneratedCode, WriteOptions, WriteResult } from '../types/index.js';

/**
 * File writer with safety features
 */
export class FileWriter {
  private outputDir: string;

  constructor(outputDir: string) {
    this.outputDir = outputDir;
  }

  /**
   * Write generated code to file system
   */
  async write(code: GeneratedCode, options: WriteOptions = {}): Promise<WriteResult> {
    const filePath = path.join(this.outputDir, code.filename);
    const files: string[] = [];

    try {
      // Ensure output directory exists
      await fs.ensureDir(this.outputDir);

      // Check if file exists
      if (await fs.pathExists(filePath) && !options.force && !options.dryRun) {
        return {
          success: false,
          reason: `File already exists: ${code.filename}. Use --force to overwrite.`,
        };
      }

      // Dry run mode - just return success without writing
      if (options.dryRun) {
        return {
          success: true,
          files: [filePath],
        };
      }

      // Create backup if file exists
      if (await fs.pathExists(filePath)) {
        await this.createBackup(filePath);
      }

      // Write main file
      await fs.writeFile(filePath, code.code, 'utf-8');
      files.push(filePath);

      // Write styles if present
      if (code.styles && code.styleFilename) {
        const stylePath = path.join(this.outputDir, code.styleFilename);
        await fs.writeFile(stylePath, code.styles, 'utf-8');
        files.push(stylePath);
      }

      return {
        success: true,
        files,
      };
    } catch (error) {
      return {
        success: false,
        reason: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Create backup of existing file
   */
  private async createBackup(filePath: string): Promise<void> {
    const timestamp = Date.now();
    const backupPath = `${filePath}.backup.${timestamp}`;
    await fs.copy(filePath, backupPath);
  }

  /**
   * Check if file exists
   */
  async fileExists(filename: string): Promise<boolean> {
    const filePath = path.join(this.outputDir, filename);
    return await fs.pathExists(filePath);
  }

  /**
   * Preview file content without writing
   */
  preview(code: GeneratedCode): string {
    let preview = `\n${'='.repeat(60)}\n`;
    preview += `File: ${code.filename}\n`;
    preview += `${'='.repeat(60)}\n`;
    preview += code.code;
    preview += `\n${'='.repeat(60)}\n`;

    if (code.styles && code.styleFilename) {
      preview += `\nFile: ${code.styleFilename}\n`;
      preview += `${'='.repeat(60)}\n`;
      preview += code.styles;
      preview += `\n${'='.repeat(60)}\n`;
    }

    return preview;
  }
}
