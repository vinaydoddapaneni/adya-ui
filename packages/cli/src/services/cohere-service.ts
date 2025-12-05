import { CohereClientV2 } from 'cohere-ai';

import type { ComponentIntent, ProjectContext, AIServiceOptions } from '../types/index.js';

import { BaseAIService } from './ai-service.js';

/**
 * Cohere implementation of AI service
 */
export class CohereService extends BaseAIService {
  private client: CohereClientV2;

  constructor(options: AIServiceOptions) {
    super(options);
    this.client = new CohereClientV2({
      token: this.apiKey,
    });
  }

  protected getDefaultModel(): string {
    return 'command-r-plus-08-2024';
  }

  async analyzePrompt(prompt: string, context: ProjectContext): Promise<ComponentIntent> {
    try {
      const response = await this.client.chat({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.buildSystemPrompt(context),
          },
          {
            role: 'user',
            content: this.buildUserPrompt(prompt, context),
          },
        ],
        temperature: this.temperature,
        maxTokens: 2000,
      });

      // Extract text content from the response
      const textContent = response.message?.content?.find(
        (item) => item.type === 'text'
      );
      const content = textContent && 'text' in textContent ? textContent.text : undefined;
      
      if (!content) {
        throw new Error('No response from Cohere');
      }

      return this.parseResponse(content);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Cohere API error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Stream response for real-time feedback
   */
  async analyzePromptStream(
    prompt: string,
    context: ProjectContext,
    onChunk: (chunk: string) => void
  ): Promise<ComponentIntent> {
    try {
      const stream = await this.client.chatStream({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.buildSystemPrompt(),
          },
          {
            role: 'user',
            content: this.buildUserPrompt(prompt, context),
          },
        ],
        temperature: this.temperature,
        maxTokens: 2000,
      });

      let fullContent = '';
      for await (const chunk of stream) {
        if (chunk.type === 'content-delta' && chunk.delta?.message?.content) {
          const textContent = chunk.delta.message.content;
          if ('text' in textContent) {
            const delta = textContent.text || '';
            fullContent += delta;
            onChunk(delta);
          }
        }
      }

      return this.parseResponse(fullContent);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Cohere API error: ${error.message}`);
      }
      throw error;
    }
  }
}
