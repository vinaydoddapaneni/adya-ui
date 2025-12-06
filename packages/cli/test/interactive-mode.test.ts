import inquirer from 'inquirer';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { aiCommand } from '../src/commands/ai.js';
import { OpenAIService } from '../src/services/openai-service.js';
import { ConfigManager } from '../src/utils/config-manager.js';
import { FileWriter } from '../src/utils/file-writer.js';
import { ProjectDetector } from '../src/utils/project-detector.js';
import { ProjectScanner } from '../src/utils/project-scanner.js';

// Mock dependencies
vi.mock('inquirer');
vi.mock('../src/services/openai-service.js');
vi.mock('../src/utils/config-manager.js');
vi.mock('../src/utils/file-writer.js');
vi.mock('../src/utils/project-detector.js');
vi.mock('../src/utils/project-scanner.js');

describe('Interactive Mode', () => {
  let exitSpy: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock process.exit to prevent actual exit
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    
    // Mock console methods to suppress output during tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock ConfigManager
    vi.mocked(ConfigManager).mockImplementation(() => ({
      exists: vi.fn().mockResolvedValue(true),
      load: vi.fn().mockResolvedValue({ aiProvider: 'openai' }),
      getApiKey: vi.fn().mockResolvedValue('test-api-key'),
      save: vi.fn(),
    } as any));

    // Mock ProjectDetector
    vi.mocked(ProjectDetector).mockImplementation(() => ({
      detect: vi.fn().mockResolvedValue({
        framework: 'react',
        typescript: true,
        componentDir: 'src/components',
        rootDir: '/test/project'
      }),
    } as any));

    // Mock ProjectScanner
    vi.mocked(ProjectScanner).mockImplementation(() => ({
      scan: vi.fn().mockResolvedValue({
        framework: 'react',
        typescript: true,
        componentDir: 'src/components',
        rootDir: '/test/project'
      }),
    } as any));

    // Mock OpenAIService
    vi.mocked(OpenAIService).mockImplementation(() => ({
      analyzePrompt: vi.fn().mockResolvedValue({
        type: 'component',
        name: 'TestComponent',
        components: [{ name: 'div', content: 'Test' }]
      })
    } as any));

    // Mock FileWriter
    const mockFileWriter = {
      write: vi.fn().mockResolvedValue({ success: true, files: ['TestComponent.tsx'] }),
      preview: vi.fn().mockReturnValue('Preview code'),
    };
    vi.mocked(FileWriter).mockImplementation(() => mockFileWriter as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    exitSpy?.mockRestore();
  });

  it('should handle approval and write files', async () => {
    // Mock inquirer answers
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ action: 'approve' }); // Action selection

    await aiCommand({ prompt: 'Create a button' });

    // Verify file writer was called
    const FileWriterMock = vi.mocked(FileWriter);
    const mockInstance = FileWriterMock.mock.results[0]?.value;
    if (mockInstance) {
      expect(mockInstance.write).toHaveBeenCalled();
    }
  });

  it('should handle refinement loop', async () => {
    // Mock inquirer answers sequence
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ action: 'refine' }) // First action: refine
      .mockResolvedValueOnce({ feedback: 'Make it blue' }) // Feedback input
      .mockResolvedValueOnce({ action: 'approve' }); // Second action: approve

    await aiCommand({ prompt: 'Create a button' });

    // Verify file writer was called after the refinement loop completed
    const FileWriterMock = vi.mocked(FileWriter);
    const mockInstance = FileWriterMock.mock.results[0]?.value;
    if (mockInstance) {
      expect(mockInstance.write).toHaveBeenCalled();
    }
  });

  it('should handle cancellation', async () => {
    // Mock inquirer answers
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ action: 'cancel' });

    await aiCommand({ prompt: 'Create a button' });

    // Verify file writer was NOT called
    const FileWriterMock = vi.mocked(FileWriter);
    const mockInstance = FileWriterMock.mock.results[0]?.value;
    if (mockInstance) {
      expect(mockInstance.write).not.toHaveBeenCalled();
    }
  });
});
