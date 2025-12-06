import { describe, it, expect, vi, beforeEach } from 'vitest';

import { OpenAIService } from '../src/services/openai-service.js';
import type { ProjectContext } from '../src/types/index.js';

// Mock OpenAI
const mockCreate = vi.fn();
vi.mock('openai', () => {
  return {
    default: class {
      chat = {
        completions: {
          create: mockCreate
        }
      };
    }
  };
});

describe('OpenAIService', () => {
  let service: OpenAIService;
  const context: ProjectContext = {
    framework: 'react',
    typescript: true,
    styleFormat: 'css-modules',
    componentDir: 'src/components',
    rootDir: '/test'
  };

  beforeEach(() => {
    service = new OpenAIService({ apiKey: 'test-key' });
    mockCreate.mockReset();
  });

  it('should analyze prompt and return intent', async () => {
    const mockResponse = {
      type: 'component',
      name: 'TestComponent',
      components: []
    };

    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify(mockResponse)
          }
        }
      ]
    });

    const result = await service.analyzePrompt('Create a test component', context);

    expect(result).toEqual(mockResponse);
    expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
      model: 'gpt-4-turbo-preview',
      response_format: { type: 'json_object' }
    }));
  });

  it('should handle API errors', async () => {
    mockCreate.mockRejectedValue(new Error('API Error'));

    await expect(service.analyzePrompt('test', context)).rejects.toThrow('OpenAI API error: API Error');
  });

  it('should clean markdown from response', async () => {
    const mockResponse = {
      type: 'component',
      name: 'TestComponent',
      components: []
    };

    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: '```json\n' + JSON.stringify(mockResponse) + '\n```'
          }
        }
      ]
    });

    const result = await service.analyzePrompt('test', context);
    expect(result).toEqual(mockResponse);
  });
});
