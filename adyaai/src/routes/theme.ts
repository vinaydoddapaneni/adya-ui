import { Router, Request, Response } from 'express';
import { ollamaClient } from '../ai/ollama-client.js';
import { PromptBuilder } from '../ai/prompts.js';
import { ResponseParser } from '../ai/parser.js';
import { ThemeRequestSchema } from '../utils/validation.js';

export const themeRouter = Router();

/**
 * POST /api/theme
 * Generate theme based on description
 */
themeRouter.post('/', async (req: Request, res: Response) => {
  try {
    // Validate request
    const { description } = ThemeRequestSchema.parse(req.body);

    // Build prompt
    const prompt = PromptBuilder.buildThemePrompt(description);

    // Generate AI response
    const aiResponse = await ollamaClient.generate({
      prompt,
      system: 'You are a design system expert. Always respond with valid JSON only.',
      temperature: 0.9,
    });

    // Parse response
    const result = ResponseParser.parseTheme(aiResponse.response);

    res.json({
      success: true,
      data: result,
      model: aiResponse.model,
    });
  } catch (error) {
    console.error('Theme generation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
