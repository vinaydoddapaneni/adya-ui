import Anthropic from '@anthropic-ai/sdk';
import { BaseAIService } from './ai-service.js';
import type { ComponentIntent, ProjectContext, AIServiceOptions } from '../types/index.js';

/**
 * Anthropic Claude implementation of AI service
 */
export class AnthropicService extends BaseAIService {
  private client: Anthropic;

  constructor(options: AIServiceOptions) {
    super(options);
    this.client = new Anthropic({
      apiKey: this.apiKey,
    });
  }

  protected getDefaultModel(): string {
    return 'claude-3-5-sonnet-20241022';
  }

  async analyzePrompt(prompt: string, context: ProjectContext): Promise<ComponentIntent> {
    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: 2000,
        temperature: this.temperature,
        messages: [
          {
            role: 'user',
            content: `${this.buildSystemPrompt(context)}\n\n${this.buildUserPrompt(prompt, context)}`,
          },
        ],
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Anthropic');
      }

      return this.parseResponse(content.text);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Anthropic API error: ${error.message}`);
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
      const stream = await this.client.messages.create({
        model: this.model,
        max_tokens: 2000,
        temperature: this.temperature,
        stream: true,
        messages: [
          {
            role: 'user',
            content: `${this.buildSystemPrompt(context)}\n\n${this.buildUserPrompt(prompt, context)}`,
          },
        ],
      });

      let fullContent = '';
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          const delta = event.delta.text;
          fullContent += delta;
          onChunk(delta);
        }
      }

      return this.parseResponse(fullContent);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Anthropic API error: ${error.message}`);
      }
      throw error;
    }
  }
}
