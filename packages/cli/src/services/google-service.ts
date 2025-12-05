import { GoogleGenerativeAI } from '@google/generative-ai';

import type { ComponentIntent, ProjectContext, AIServiceOptions } from '../types/index.js';

import { BaseAIService } from './ai-service.js';

/**
 * Google Gemini implementation of AI service
 */
export class GoogleService extends BaseAIService {
  private client: GoogleGenerativeAI;

  constructor(options: AIServiceOptions) {
    super(options);
    this.client = new GoogleGenerativeAI(this.apiKey);
  }

  protected getDefaultModel(): string {
    return 'gemini-1.5-pro';
  }

  async analyzePrompt(prompt: string, context: ProjectContext): Promise<ComponentIntent> {
    try {
      const model = this.client.getGenerativeModel({
        model: this.model,
        generationConfig: {
          temperature: this.temperature,
          maxOutputTokens: 2000,
          responseMimeType: 'application/json',
        },
      });

      const result = await model.generateContent([
        this.buildSystemPrompt(context),
        this.buildUserPrompt(prompt, context),
      ]);

      const response = result.response;
      const content = response.text();

      if (!content) {
        throw new Error('No response from Google Gemini');
      }

      return this.parseResponse(content);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Google Gemini API error: ${error.message}`);
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
      const model = this.client.getGenerativeModel({
        model: this.model,
        generationConfig: {
          temperature: this.temperature,
          maxOutputTokens: 2000,
          responseMimeType: 'application/json',
        },
      });

      const result = await model.generateContentStream([
        this.buildSystemPrompt(),
        this.buildUserPrompt(prompt, context),
      ]);

      let fullContent = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullContent += chunkText;
        onChunk(chunkText);
      }

      return this.parseResponse(fullContent);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Google Gemini API error: ${error.message}`);
      }
      throw error;
    }
  }
}
