import { Mistral } from '@mistralai/mistralai';
import { BaseAIService } from './ai-service.js';
import type { ComponentIntent, ProjectContext, AIServiceOptions } from '../types/index.js';

/**
 * Mistral AI implementation of AI service
 */
export class MistralService extends BaseAIService {
  private client: Mistral;

  constructor(options: AIServiceOptions) {
    super(options);
    this.client = new Mistral({
      apiKey: this.apiKey,
    });
  }

  protected getDefaultModel(): string {
    return 'mistral-large-latest';
  }

  async analyzePrompt(prompt: string, context: ProjectContext): Promise<ComponentIntent> {
    try {
      const response = await this.client.chat.complete({
        model: this.model,
        messages: [
          { role: 'system', content: this.buildSystemPrompt(context) },
          { role: 'user', content: this.buildUserPrompt(prompt, context) }
        ],
        temperature: this.temperature,
        maxTokens: 2000,
        responseFormat: { type: 'json_object' },
      });

      const content = response.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('No response from Mistral AI');
      }

      // Handle content as string or array
      const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
      return this.parseResponse(contentStr);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Mistral AI API error: ${error.message}`);
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
      const stream = await this.client.chat.stream({
        model: this.model,
        messages: [
          { role: 'system', content: this.buildSystemPrompt(context) },
          { role: 'user', content: this.buildUserPrompt(prompt, context) }
        ],
        temperature: this.temperature,
        maxTokens: 2000,
        responseFormat: { type: 'json_object' },
      });

      let fullContent = '';
      for await (const chunk of stream) {
        const delta = chunk.data.choices[0]?.delta?.content;
        if (delta) {
          const deltaStr = typeof delta === 'string' ? delta : '';
          fullContent += deltaStr;
          onChunk(deltaStr);
        }
      }

      return this.parseResponse(fullContent);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Mistral AI API error: ${error.message}`);
      }
      throw error;
    }
  }
}
