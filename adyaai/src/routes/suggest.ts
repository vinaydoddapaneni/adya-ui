import { Router, Request, Response } from 'express';
import { componentRegistry } from '../metadata/registry.js';
import { ollamaClient } from '../ai/ollama-client.js';
import { PromptBuilder } from '../ai/prompts.js';
import { ResponseParser } from '../ai/parser.js';
import { SuggestRequestSchema } from '../utils/validation.js';

export const suggestRouter = Router();

/**
 * POST /api/suggest
 * Suggest components based on user input
 */
suggestRouter.post('/', async (req: Request, res: Response) => {
  try {
    // Validate request
    const { input } = SuggestRequestSchema.parse(req.body);

    // Get component metadata
    const components = componentRegistry.getAll();

    // Build prompt
    const prompt = PromptBuilder.buildSuggestionPrompt(input, components);

    // Generate AI response
    const aiResponse = await ollamaClient.generate({
      prompt,
      system: 'You are a helpful UI component advisor. Always respond with valid JSON only.',
      temperature: 0.7,
    });

    // Parse response
    const result = ResponseParser.parseSuggestion(aiResponse.response);

    res.json({
      success: true,
      data: result,
      model: aiResponse.model,
    });
  } catch (error) {
    console.error('Suggest error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
