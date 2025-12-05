import chalk from 'chalk';
import inquirer from 'inquirer';

import {
  COMPONENT_CATALOG,
  getCategories,
  getComponentsByCategory,
  searchComponents,
  type CatalogComponent
} from '../catalog/catalog-data.js';

/**
 * Display component details
 */
function displayComponent(component: CatalogComponent): void {
  console.log(chalk.cyan(`\n📦 ${component.name}`));
  console.log(chalk.gray(`   Category: ${component.category}`));
  console.log(chalk.white(`   ${component.description}`));
  
  if (component.props && Object.keys(component.props).length > 0) {
    console.log(chalk.yellow('\n   Props:'));
    Object.entries(component.props).forEach(([key, value]) => {
      console.log(chalk.gray(`     • ${key}: ${value}`));
    });
  }
  
  if (component.events && component.events.length > 0) {
    console.log(chalk.yellow('\n   Events:'));
    component.events.forEach(event => {
      console.log(chalk.gray(`     • ${event}`));
    });
  }
  
  console.log(chalk.green('\n   Example:'));
  console.log(chalk.gray(`     ${component.example}`));
}

/**
 * Browse components by category
 */
async function browseByCategory(): Promise<void> {
  const categories = getCategories();
  
  const { category } = await inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select a category:',
      choices: categories
    }
  ]);
  
  const components = getComponentsByCategory(category);
  
  console.log(chalk.blue.bold(`\n${category} Components (${components.length}):\n`));
  
  components.forEach(component => {
    displayComponent(component);
  });
}

/**
 * Search components
 */
async function searchCatalog(): Promise<void> {
  const { query } = await inquirer.prompt([
    {
      type: 'input',
      name: 'query',
      message: 'Search components:',
      validate: (input) => input.trim().length > 0 || 'Please enter a search term'
    }
  ]);
  
  const results = searchComponents(query);
  
  if (results.length === 0) {
    console.log(chalk.yellow(`\nNo components found matching "${query}"\n`));
    return;
  }
  
  console.log(chalk.blue.bold(`\nSearch Results (${results.length}):\n`));
  
  results.forEach(component => {
    displayComponent(component);
  });
}

/**
 * List all components
 */
function listAll(): void {
  const categories = getCategories();
  
  console.log(chalk.blue.bold(`\nAdyaUI Component Catalog (${COMPONENT_CATALOG.length} components)\n`));
  
  categories.forEach(category => {
    const components = getComponentsByCategory(category);
    console.log(chalk.cyan(`\n${category} (${components.length}):`));
    components.forEach(component => {
      console.log(chalk.gray(`  • ${component.name} - ${component.description}`));
    });
  });
  
  console.log('');
}

/**
 * Component catalog command
 */
export async function catalogCommand(options: { search?: string; category?: string } = {}): Promise<void> {
  console.log(chalk.blue.bold('\n📚 AdyaUI Component Catalog\n'));
  
  try {
    // If search query provided
    if (options.search) {
      const results = searchComponents(options.search);
      
      if (results.length === 0) {
        console.log(chalk.yellow(`No components found matching "${options.search}"\n`));
        return;
      }
      
      console.log(chalk.blue.bold(`Search Results (${results.length}):\n`));
      results.forEach(component => {
        displayComponent(component);
      });
      return;
    }
    
    // If category provided
    if (options.category) {
      const components = getComponentsByCategory(options.category);
      
      if (components.length === 0) {
        console.log(chalk.yellow(`No components found in category "${options.category}"\n`));
        return;
      }
      
      console.log(chalk.blue.bold(`${options.category} Components (${components.length}):\n`));
      components.forEach(component => {
        displayComponent(component);
      });
      return;
    }
    
    // Interactive mode
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: 'Browse by Category', value: 'browse' },
          { name: 'Search Components', value: 'search' },
          { name: 'List All Components', value: 'list' },
          { name: 'Exit', value: 'exit' }
        ]
      }
    ]);
    
    switch (action) {
      case 'browse':
        await browseByCategory();
        break;
      case 'search':
        await searchCatalog();
        break;
      case 'list':
        listAll();
        break;
      case 'exit':
        console.log(chalk.gray('\nGoodbye!\n'));
        return;
    }
    
    // Show usage tip
    console.log(chalk.blue.bold('\n💡 Tip:'));
    console.log(chalk.gray('  Use the AI command to generate components:'));
    console.log(chalk.white('  adya-ui ai "Create a Button component with primary variant"\n'));
    
  } catch (error) {
    console.error(chalk.red('\nError:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
