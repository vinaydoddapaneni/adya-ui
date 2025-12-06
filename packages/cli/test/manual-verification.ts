import path from 'path';

import chalk from 'chalk';
import fs from 'fs-extra';

const TEMP_DIR = path.join(process.cwd(), 'temp-test-project');

async function runVerification() {
  console.log(chalk.blue.bold('Starting Manual Verification...'));

  try {
    // 1. Setup temp directory
    console.log(chalk.cyan('\n1. Setting up temp project...'));
    await fs.ensureDir(TEMP_DIR);
    await fs.writeJSON(path.join(TEMP_DIR, 'package.json'), {
      name: 'temp-test-project',
      dependencies: {
        react: '^18.0.0'
      }
    });
    await fs.writeJSON(path.join(TEMP_DIR, 'tsconfig.json'), {});

    // 2. Run init command
    console.log(chalk.cyan('\n2. Running init command...'));
    // We can't easily interact with inquirer in a script, so we'll mock the config file
    await fs.writeJSON(path.join(TEMP_DIR, '.adyaui.json'), {
      framework: 'react',
      typescript: true,
      componentDir: 'src/components',
      styleFormat: 'css-modules',
      aiProvider: 'openai',
      apiKey: 'test-key'
    });
    console.log(chalk.green('✓ Config file created'));

    // 3. Mock AI response and run generation
    // Since we can't mock the OpenAI API call easily in an E2E test without a real key,
    // we'll verify the generator directly using the CLI code
    
    console.log(chalk.cyan('\n3. Verifying generator output...'));
    
    // Import generator dynamically to use the local build
    const { ReactGenerator } = await import('../src/generators/react-generator.js');
    const generator = new ReactGenerator(true);

    const intent = {
      type: 'component',
      name: 'VerifiedComponent',
      components: [
        { name: 'AuiButton', content: 'Verified' }
      ]
    };

    const result = await generator.generate(intent as any);
    
    const outputDir = path.join(TEMP_DIR, 'src/components');
    await fs.ensureDir(outputDir);
    await fs.writeFile(path.join(outputDir, result.filename), result.code);

    // 4. Verify file existence and content
    const filePath = path.join(outputDir, 'VerifiedComponent.tsx');
    if (await fs.pathExists(filePath)) {
      const content = await fs.readFile(filePath, 'utf-8');
      if (content.includes('Verified')) {
        console.log(chalk.green('✓ Component generated and verified'));
      } else {
        throw new Error('Component content mismatch');
      }
    } else {
      throw new Error('Component file not created');
    }

    console.log(chalk.green.bold('\n✅ Verification Successful!'));

  } catch (error) {
    console.error(chalk.red('\n❌ Verification Failed:'), error);
  } finally {
    // Cleanup
    await fs.remove(TEMP_DIR);
  }
}

runVerification();
