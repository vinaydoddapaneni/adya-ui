import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import { ProjectDetector } from '../utils/project-detector.js';
import { ConfigManager } from '../utils/config-manager.js';
import { FileWriter } from '../utils/file-writer.js';
import { OpenAIService } from '../services/openai-service.js';
import { ReactGenerator } from '../generators/react-generator.js';
import { VueGenerator } from '../generators/vue-generator.js';
import type { AIOptions } from '../types/index.js';

/**
 * AI-powered component generation command
 */
export async function aiCommand(options: AIOptions = {}): Promise<void> {
  console.log(chalk.blue.bold('\n🤖 AdyaUI AI Component Generator\n'));

  try {
    // Load configuration
    const configManager = new ConfigManager();
    const configExists = await configManager.exists();

    if (!configExists) {
      console.log(chalk.yellow('⚠️  AdyaUI not initialized. Running initialization...\n'));
      const { initCommand } = await import('./init.js');
      await initCommand();
      console.log('');
    }

    const config = await configManager.load();

    // Get API key
    const apiKey = await configManager.getApiKey();
    if (!apiKey) {
      console.error(chalk.red('❌ API key not found.'));
      console.log(chalk.yellow('\nSet your API key with one of these methods:'));
      console.log(chalk.gray('  1. Environment variable: export ADYAUI_AI_API_KEY="your-key"'));
      console.log(chalk.gray('  2. During init: adya-ui init'));
      console.log(chalk.gray('  3. Edit .adyaui.json manually\n'));
      process.exit(1);
    }

    // Get prompt
    let prompt = options.prompt;
    if (!prompt) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'prompt',
          message: 'Describe the component you want to create:',
          validate: (input) => input.trim().length > 0 || 'Please enter a prompt',
        },
      ]);
      prompt = answers.prompt;
    }

    // Detect project context
    const detector = new ProjectDetector();
    const context = await detector.detect();

    // Override with options if provided
    if (options.framework) {
      context.framework = options.framework;
    }

    console.log(chalk.gray(`\nFramework: ${context.framework}`));
    console.log(chalk.gray(`TypeScript: ${context.typescript ? 'Yes' : 'No'}\n`));

    // Analyze prompt with AI
    const spinner = ora('Analyzing your request with AI...').start();

    try {
      const aiService = new OpenAIService({ apiKey });
      const intent = await aiService.analyzePrompt(prompt!, context);

      spinner.succeed('AI analysis complete');

      // Display intent
      console.log(chalk.cyan('\n📋 Component Plan:'));
      console.log(chalk.gray(`  Type: ${intent.type}`));
      console.log(chalk.gray(`  Components: ${intent.components.map(c => c.name).join(', ')}`));
      if (intent.layout) {
        console.log(chalk.gray(`  Layout: ${intent.layout.type}${intent.layout.columns ? ` (${intent.layout.columns} columns)` : ''}`));
      }

      // Generate code
      spinner.start('Generating code...');

      let generator;
      if (context.framework === 'react') {
        generator = new ReactGenerator(context.typescript);
      } else if (context.framework === 'vue') {
        generator = new VueGenerator(context.typescript);
      } else {
        throw new Error('Core generator not yet implemented');
      }

      const generatedCode = await generator.generate(intent);
      spinner.succeed('Code generated');

      // Preview
      if (options.dryRun) {
        console.log(chalk.yellow('\n🔍 Preview Mode (--dry-run)\n'));
        const fileWriter = new FileWriter(context.componentDir);
        console.log(fileWriter.preview(generatedCode));
        console.log(chalk.yellow('\nNo files were written. Remove --dry-run to create files.\n'));
        return;
      }

      // Show preview and confirm
      console.log(chalk.cyan(`\n📁 Files to be created:`));
      console.log(chalk.gray(`  ${generatedCode.filename}`));
      if (generatedCode.styleFilename) {
        console.log(chalk.gray(`  ${generatedCode.styleFilename}`));
      }

      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Create these files?',
          default: true,
        },
      ]);

      if (!confirm) {
        console.log(chalk.yellow('\nCancelled.\n'));
        return;
      }

      // Write files
      spinner.start('Writing files...');

      const outputDir = options.output 
        ? path.join(process.cwd(), options.output)
        : path.join(process.cwd(), context.componentDir);

      const fileWriter = new FileWriter(outputDir);
      const result = await fileWriter.write(generatedCode, { force: true });

      if (!result.success) {
        spinner.fail('Failed to write files');
        console.error(chalk.red(`\nError: ${result.reason}\n`));
        process.exit(1);
      }

      spinner.succeed('Files created');

      // Success message
      console.log(chalk.green.bold('\n✅ Component generated successfully!\n'));
      console.log(chalk.cyan('Created files:'));
      result.files?.forEach(file => {
        console.log(chalk.gray(`  ${file}`));
      });

      console.log(chalk.blue.bold('\n📚 Next steps:\n'));
      console.log(chalk.white('  1. Import the component in your app'));
      console.log(chalk.white('  2. Customize the generated code as needed'));
      console.log(chalk.white('  3. Test the component\n'));

    } catch (error) {
      spinner.fail('AI generation failed');
      console.error(chalk.red('\nError:'), error instanceof Error ? error.message : 'Unknown error');
      
      if (error instanceof Error && error.message.includes('API')) {
        console.log(chalk.yellow('\n💡 Tip: Check your API key and internet connection\n'));
      }
      
      process.exit(1);
    }

  } catch (error) {
    console.error(chalk.red('\nError:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
