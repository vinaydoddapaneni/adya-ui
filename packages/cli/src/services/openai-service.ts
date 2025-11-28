import OpenAI from 'openai';
import { BaseAIService } from './ai-service.js';
import type { ComponentIntent, ProjectContext, AIServiceOptions } from '../types/index.js';

/**
 * OpenAI implementation of AI service
 */
export class OpenAIService extends BaseAIService {
  private client: OpenAI;

  constructor(options: AIServiceOptions) {
    super(options);
    this.client = new OpenAI({
      apiKey: this.apiKey,
    });
  }

  protected getDefaultModel(): string {
    return 'gpt-4-turbo-preview';
  }

  async analyzePrompt(prompt: string, context: ProjectContext): Promise<ComponentIntent> {
    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: this.buildSystemPrompt() },
          { role: 'user', content: this.buildUserPrompt(prompt, context) }
        ],
        response_format: { type: 'json_object' },
        temperature: this.temperature,
        max_tokens: 2000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      return this.parseResponse(content);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenAI API error: ${error.message}`);
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
      const stream = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: this.buildSystemPrompt() },
          { role: 'user', content: this.buildUserPrompt(prompt, context) }
        ],
        response_format: { type: 'json_object' },
        temperature: this.temperature,
        max_tokens: 2000,
        stream: true,
      });

      let fullContent = '';
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || '';
        fullContent += delta;
        onChunk(delta);
      }

      return this.parseResponse(fullContent);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenAI API error: ${error.message}`);
      }
      throw error;
    }
  }
}
