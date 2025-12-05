import { HfInference } from '@huggingface/inference';

import { BaseAIService } from './ai-service.js';

import type { ComponentIntent, ProjectContext, AIServiceOptions } from '../types/index.js';

/**
 * Hugging Face implementation of AI service
 */
export class HuggingFaceService extends BaseAIService {
  private client: HfInference;

  constructor(options: AIServiceOptions) {
    super(options);
    this.client = new HfInference(this.apiKey);
  }

  protected getDefaultModel(): string {
    // Mixtral is a strong open model for code
    return 'mistralai/Mixtral-8x7B-Instruct-v0.1';
  }

  async analyzePrompt(prompt: string, context: ProjectContext): Promise<ComponentIntent> {
    try {
      const response = await this.client.chatCompletion({
        model: this.model,
        messages: [
          { role: 'system', content: this.buildSystemPrompt(context) },
          { role: 'user', content: this.buildUserPrompt(prompt, context) }
        ],
        temperature: this.temperature,
        max_tokens: 2000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from Hugging Face');
      }

      return this.parseResponse(content);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Hugging Face API error: ${error.message}`);
      }
      throw error;
    }
  }
}
