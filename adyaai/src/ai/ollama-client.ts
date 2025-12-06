import ollama from 'ollama';

import { config } from '../config/index.js';

export interface GenerateOptions {
  prompt: string;
  system?: string;
  temperature?: number;
  stream?: boolean;
}

export interface GenerateResponse {
  response: string;
  model: string;
  done: boolean;
}

/**
 * Ollama client wrapper for AI interactions
 */
export class OllamaClient {
  private host: string;
  private model: string;

  constructor() {
    this.host = config.ollama.host;
    this.model = config.ollama.model;
  }

  /**
   * Generate AI response
   */
  async generate(options: GenerateOptions): Promise<GenerateResponse> {
    try {
      const response = await ollama.generate({
        model: this.model,
        prompt: options.prompt,
        system: options.system,
        stream: false,
        options: {
          temperature: options.temperature || 0.7,
        },
      });

      return {
        response: response.response,
        model: this.model,
        done: response.done,
      };
    } catch (error) {
      console.error('Ollama generation error:', error);
      throw new Error(`Failed to generate AI response: ${error}`);
    }
  }

  /**
   * Check if Ollama is available
   */
  async checkHealth(): Promise<boolean> {
    try {
      await ollama.list();
      return true;
    } catch (error) {
      console.error('Ollama health check failed:', error);
      return false;
    }
  }

  /**
   * Get available models
   */
  async listModels(): Promise<string[]> {
    try {
      const response = await ollama.list();
      return response.models.map((m) => m.name);
    } catch (error) {
      console.error('Failed to list models:', error);
      return [];
    }
  }

  /**
   * Check if the configured model is available
   */
  async isModelAvailable(): Promise<boolean> {
    const models = await this.listModels();
    return models.some((m) => m.includes(this.model));
  }
}

// Create singleton instance
export const ollamaClient = new OllamaClient();
