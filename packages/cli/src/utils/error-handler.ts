import chalk from 'chalk';

/**
 * Custom error types
 */
export class APIError extends Error {
  constructor(
    message: string,
    public provider: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public suggestion?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class FileSystemError extends Error {
  constructor(
    message: string,
    public path: string,
    public operation: 'read' | 'write' | 'delete'
  ) {
    super(message);
    this.name = 'FileSystemError';
  }
}

/**
 * Error handler utility
 */
export class ErrorHandler {
  /**
   * Format and display error message
   */
  static handle(error: Error): void {
    console.error(chalk.red('\n❌ Error:'), error.message);

    if (error instanceof APIError) {
      this.handleAPIError(error);
    } else if (error instanceof ValidationError) {
      this.handleValidationError(error);
    } else if (error instanceof FileSystemError) {
      this.handleFileSystemError(error);
    } else {
      this.handleGenericError(error);
    }

    console.log(''); // Empty line
  }

  /**
   * Handle API errors
   */
  private static handleAPIError(error: APIError): void {
    console.log(chalk.yellow('\n💡 Suggestions:'));
    
    if (error.statusCode === 401 || error.message.includes('API key')) {
      console.log(chalk.gray('  • Check your API key is correct'));
      console.log(chalk.gray('  • Verify the API key has not expired'));
      console.log(chalk.gray(`  • Run: adya-ui init to reconfigure`));
    } else if (error.statusCode === 429) {
      console.log(chalk.gray('  • You have exceeded the rate limit'));
      console.log(chalk.gray('  • Wait a few minutes and try again'));
      console.log(chalk.gray('  • Consider upgrading your API plan'));
    } else if (error.statusCode === 500 || error.statusCode === 503) {
      console.log(chalk.gray(`  • ${error.provider} service is experiencing issues`));
      console.log(chalk.gray('  • Try again in a few minutes'));
      console.log(chalk.gray('  • Check service status page'));
    } else if (error.message.includes('network') || error.message.includes('ENOTFOUND')) {
      console.log(chalk.gray('  • Check your internet connection'));
      console.log(chalk.gray('  • Verify firewall/proxy settings'));
      console.log(chalk.gray('  • Try again in a moment'));
    } else {
      console.log(chalk.gray('  • Check your internet connection'));
      console.log(chalk.gray('  • Verify your API key is valid'));
      console.log(chalk.gray('  • Try a different AI provider'));
    }
  }

  /**
   * Handle validation errors
   */
  private static handleValidationError(error: ValidationError): void {
    console.log(chalk.yellow(`\n💡 Issue with: ${error.field}`));
    
    if (error.suggestion) {
      console.log(chalk.gray(`  • ${error.suggestion}`));
    }

    if (error.field === 'componentName') {
      console.log(chalk.gray('  • Component names must be in PascalCase (e.g., MyComponent)'));
      console.log(chalk.gray('  • Only letters and numbers allowed'));
      console.log(chalk.gray('  • Must start with a capital letter'));
    } else if (error.field === 'outputPath') {
      console.log(chalk.gray('  • Path must be within the project directory'));
      console.log(chalk.gray('  • Use relative paths (e.g., src/components)'));
      console.log(chalk.gray('  • Avoid absolute paths outside the project'));
    }
  }

  /**
   * Handle file system errors
   */
  private static handleFileSystemError(error: FileSystemError): void {
    console.log(chalk.yellow(`\n💡 File operation failed: ${error.operation}`));
    console.log(chalk.gray(`  Path: ${error.path}`));
    
    if (error.operation === 'write') {
      console.log(chalk.gray('  • Check you have write permissions'));
      console.log(chalk.gray('  • Ensure the directory exists'));
      console.log(chalk.gray('  • Verify disk space is available'));
    } else if (error.operation === 'read') {
      console.log(chalk.gray('  • Check the file exists'));
      console.log(chalk.gray('  • Verify you have read permissions'));
      console.log(chalk.gray('  • Ensure the path is correct'));
    }
  }

  /**
   * Handle generic errors
   */
  private static handleGenericError(error: Error): void {
    console.log(chalk.yellow('\n💡 Suggestions:'));
    console.log(chalk.gray('  • Check the error message above for details'));
    console.log(chalk.gray('  • Try running the command again'));
    console.log(chalk.gray('  • Report this issue if it persists'));
    
    if (error.stack) {
      console.log(chalk.gray('\n📋 Stack trace:'));
      console.log(chalk.gray(error.stack));
    }
  }

  /**
   * Retry function with exponential backoff
   */
  static async retry<T>(
    fn: () => Promise<T>,
    options: {
      maxRetries?: number;
      initialDelay?: number;
      maxDelay?: number;
      onRetry?: (attempt: number, error: Error) => void;
    } = {}
  ): Promise<T> {
    const {
      maxRetries = 3,
      initialDelay = 1000,
      maxDelay = 10000,
      onRetry
    } = options;

    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < maxRetries) {
          const delay = Math.min(initialDelay * Math.pow(2, attempt), maxDelay);
          
          if (onRetry) {
            onRetry(attempt + 1, lastError);
          }
          
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }
}

/**
 * Validation utilities
 */
export class Validator {
  /**
   * Validate component name
   */
  static validateComponentName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new ValidationError(
        'Component name cannot be empty',
        'componentName',
        'Provide a valid component name'
      );
    }

    // Must be PascalCase
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
      throw new ValidationError(
        `Invalid component name: ${name}`,
        'componentName',
        'Use PascalCase (e.g., MyComponent, UserProfile)'
      );
    }

    // Reserved words
    const reserved = ['Component', 'Element', 'React', 'Vue', 'Props', 'State'];
    if (reserved.includes(name)) {
      throw new ValidationError(
        `Component name "${name}" is reserved`,
        'componentName',
        'Choose a different name'
      );
    }
  }

  /**
   * Validate output path
   */
  static validateOutputPath(outputPath: string, projectRoot: string): void {
    const path = require('path');
    const absolutePath = path.resolve(projectRoot, outputPath);
    
    // Must be within project
    if (!absolutePath.startsWith(projectRoot)) {
      throw new ValidationError(
        'Output path must be within the project directory',
        'outputPath',
        'Use a relative path within your project'
      );
    }

    // Check for suspicious patterns
    if (outputPath.includes('..') && !absolutePath.startsWith(projectRoot)) {
      throw new ValidationError(
        'Invalid output path: contains parent directory references',
        'outputPath',
        'Avoid using ".." in paths'
      );
    }
  }
}
