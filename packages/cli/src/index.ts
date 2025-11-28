#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init.js';
import { aiCommand } from './commands/ai.js';

const program = new Command();

program
  .name('adya-ui')
  .description('AdyaUI CLI - AI-powered component generation')
  .version('0.1.0');

// Init command
program
  .command('init')
  .description('Initialize AdyaUI in your project')
  .option('-f, --framework <framework>', 'Force framework (react|vue|core)')
  .option('--skip-install', 'Skip dependency installation')
  .option('--api-key <key>', 'Set AI API key')
  .action(async (options) => {
    try {
      await initCommand(options);
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  });

// AI command
program
  .command('ai')
  .description('Generate components using AI')
  .option('-p, --prompt <prompt>', 'Natural language prompt')
  .option('-f, --framework <framework>', 'Target framework (react|vue|core)')
  .option('--dry-run', 'Preview without writing files')
  .option('-o, --output <dir>', 'Output directory (default: src/components)')
  .option('--provider <provider>', 'AI provider (openai|anthropic)', 'openai')
  .action(async (options) => {
    try {
      await aiCommand(options);
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  });

// Add command (future implementation)
program
  .command('add <components...>')
  .description('Add specific components to your project')
  .option('-f, --framework <framework>', 'Target framework')
  .option('-o, --output <dir>', 'Output directory')
  .action(async (components, options) => {
    console.log(chalk.yellow('\n⚠️  The "add" command is coming soon!\n'));
    console.log(chalk.gray('For now, use the "ai" command to generate components.\n'));
  });

// Show help if no command provided
if (process.argv.length === 2) {
  program.help();
}

program.parse();
