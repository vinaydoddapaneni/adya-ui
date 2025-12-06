import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';

import type { Framework, InitOptions } from '../types/index.js';
import { ConfigManager } from '../utils/config-manager.js';
import { ProjectDetector } from '../utils/project-detector.js';

/**
 * Initialize AdyaUI in the project
 */
export async function initCommand(options: InitOptions = {}): Promise<void> {
  console.log(chalk.blue.bold('\n🚀 Initializing AdyaUI AI CLI\n'));

  const spinner = ora('Detecting project configuration...').start();

  try {
    // Detect project
    const detector = new ProjectDetector();
    const isValid = await detector.isValidProject();

    if (!isValid) {
      spinner.fail('No package.json found. Please run this command from your project root.');
      return;
    }

    const context = await detector.detect();
    spinner.succeed('Project detected');

    // Check if already initialized
    const configManager = new ConfigManager();
    const exists = await configManager.exists();

    if (exists && !options.force) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'AdyaUI is already initialized. Overwrite configuration?',
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.yellow('\nInitialization cancelled.'));
        return;
      }
    }

    // Provider names for dynamic API key prompt
    const providerNames: Record<string, string> = {
      openai: 'OpenAI',
      google: 'Google',
      anthropic: 'Anthropic',
      cohere: 'Cohere',
      mistral: 'Mistral',
      huggingface: 'Hugging Face',
    };

    // Prompt for configuration
    const answers = await inquirer.prompt<{
      framework: Framework;
      typescript: boolean;
      componentDir: string;
      aiProvider: string;
      apiKey: string;
    }>([
      {
        type: 'list',
        name: 'framework',
        message: 'Select your framework:',
        choices: [
          { name: 'React', value: 'react' },
          { name: 'Vue', value: 'vue' },
          { name: 'Vanilla (Web Components)', value: 'core' },
        ],
        default: context.framework,
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Use TypeScript?',
        default: context.typescript,
      },
      {
        type: 'input',
        name: 'componentDir',
        message: 'Component directory:',
        default: context.componentDir,
      },
      {
        type: 'list',
        name: 'aiProvider',
        message: 'AI Provider:',
        choices: [
          { name: 'OpenAI (GPT-4)', value: 'openai' },
          { name: 'Google (Gemini)', value: 'google' },
          { name: 'Anthropic (Claude)', value: 'anthropic' },
          { name: 'Cohere (Command)', value: 'cohere' },
          { name: 'Mistral AI', value: 'mistral' },
          { name: 'Hugging Face', value: 'huggingface' },
        ],
        default: 'openai',
      },
      {
        type: 'password',
        name: 'apiKey',
        message: (currentAnswers: { aiProvider: string }) => {
          return `${providerNames[currentAnswers.aiProvider] || 'API'} API Key (optional, can be set later):`;
        },
      },
    ]);

    // Save configuration
    spinner.start('Saving configuration...');
    await configManager.initialize(
      answers.framework,
      answers.typescript,
      answers.componentDir
    );

    if (answers.apiKey) {
      await configManager.setApiKey(answers.apiKey);
    }

    spinner.succeed('Configuration saved');

    // Success message
    console.log(chalk.green.bold('\n✅ AdyaUI AI CLI initialized successfully!\n'));
    console.log(chalk.cyan('Configuration:'));
    console.log(chalk.gray(`  Framework: ${answers.framework}`));
    console.log(chalk.gray(`  TypeScript: ${answers.typescript ? 'Yes' : 'No'}`));
    console.log(chalk.gray(`  Component Directory: ${answers.componentDir}`));
    console.log(chalk.gray(`  AI Provider: ${answers.aiProvider}`));
    console.log(chalk.gray(`  API Key: ${answers.apiKey ? '***' + answers.apiKey.slice(-4) : 'Not set'}\n`));

    // Next steps
    console.log(chalk.blue.bold('Next steps:\n'));
    console.log(chalk.white('  1. Generate components with AI:'));
    console.log(chalk.gray('     adya-ui ai\n'));
    console.log(chalk.white('  2. Or use a direct prompt:'));
    console.log(chalk.gray('     adya-ui ai -p "Create a login page"\n'));
    console.log(chalk.white('  3. Add specific components:'));
    console.log(chalk.gray('     adya-ui add Button TextField Card\n'));

    if (!answers.apiKey) {
      console.log(chalk.yellow('⚠️  API key not set. Set it with:'));
      console.log(chalk.gray('   export ADYAUI_AI_API_KEY="your-key-here"\n'));
    }
  } catch (error) {
    spinner.fail('Initialization failed');
    console.error(chalk.red('\nError:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
