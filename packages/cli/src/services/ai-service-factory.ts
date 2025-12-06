import type { AIServiceOptions } from '../types/index.js';

import { AIService } from './ai-service.js';
import { AnthropicService } from './anthropic-service.js';
import { CohereService } from './cohere-service.js';
import { GoogleService } from './google-service.js';
import { HuggingFaceService } from './huggingface-service.js';
import { MistralService } from './mistral-service.js';
import { OpenAIService } from './openai-service.js';

/**
 * Factory for creating AI services
 */
export class AIServiceFactory {
  static createService(provider: string, options: AIServiceOptions): AIService {
    switch (provider) {
      case 'openai':
        return new OpenAIService(options);
      case 'huggingface':
        return new HuggingFaceService(options);
      case 'anthropic':
        return new AnthropicService(options);
      case 'google':
        return new GoogleService(options);
      case 'cohere':
        return new CohereService(options);
      case 'mistral':
        return new MistralService(options);
      default:
        throw new Error(`Unknown AI provider: ${provider}. Supported providers: openai, anthropic, huggingface, google, cohere, mistral`);
    }
  }
}
