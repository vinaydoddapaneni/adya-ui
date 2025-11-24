import { Router, Request, Response } from 'express';
import { componentRegistry } from '../metadata/registry.js';
import { ollamaClient } from '../ai/ollama-client.js';
import { PromptBuilder } from '../ai/prompts.js';
import { ResponseParser } from '../ai/parser.js';
import { GenerateUIRequestSchema } from '../utils/validation.js';

export const generateUIRouter = Router();

/**
 * POST /api/generate-ui
 * Generate complete UI based on description
 */
generateUIRouter.post('/', async (req: Request, res: Response) => {
  try {
    // Validate request
    const { description } = GenerateUIRequestSchema.parse(req.body);

    // Get component metadata
    const components = componentRegistry.getAll();

    // Build prompt
    const prompt = PromptBuilder.buildUIGenerationPrompt(description, components);

    // Generate AI response
    const aiResponse = await ollamaClient.generate({
      prompt,
      system: 'You are an expert UI developer. Always respond with valid JSON only.',
      temperature: 0.8,
    });

    // Parse response
    const result = ResponseParser.parseUIGeneration(aiResponse.response);

    res.json({
      success: true,
      data: result,
      model: aiResponse.model,
    });
  } catch (error) {
    console.error('Generate UI error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
