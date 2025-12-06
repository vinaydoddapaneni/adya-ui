import { Router, Request, Response } from 'express';

import { ollamaClient } from '../ai/ollama-client.js';
import { ResponseParser } from '../ai/parser.js';
import { PromptBuilder } from '../ai/prompts.js';
import { componentRegistry } from '../metadata/registry.js';
import { AnalyzeRequestSchema, ImproveRequestSchema } from '../utils/validation.js';

export const analyzeRouter = Router();

/**
 * POST /api/analyze
 * Analyze code and provide suggestions
 */
analyzeRouter.post('/', async (req: Request, res: Response) => {
  try {
    // Validate request
    const { code } = AnalyzeRequestSchema.parse(req.body);

    // Get component metadata
    const components = componentRegistry.getAll();

    // Build prompt
    const prompt = PromptBuilder.buildAnalysisPrompt(code, components);

    // Generate AI response
    const aiResponse = await ollamaClient.generate({
      prompt,
      system: 'You are a code review expert. Always respond with valid JSON only.',
      temperature: 0.6,
    });

    // Parse response
    const result = ResponseParser.parseAnalysis(aiResponse.response);

    res.json({
      success: true,
      data: result,
      model: aiResponse.model,
    });
  } catch (error) {
    console.error('Analyze error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/analyze/improve
 * Improve existing code
 */
analyzeRouter.post('/improve', async (req: Request, res: Response) => {
  try {
    // Validate request
    const { code } = ImproveRequestSchema.parse(req.body);

    // Get component metadata
    const components = componentRegistry.getAll();

    // Build prompt
    const prompt = PromptBuilder.buildImprovementPrompt(code, components);

    // Generate AI response
    const aiResponse = await ollamaClient.generate({
      prompt,
      system: 'You are a code refactoring expert. Always respond with valid JSON only.',
      temperature: 0.7,
    });

    // Parse response
    const result = ResponseParser.parseImprovement(aiResponse.response);

    res.json({
      success: true,
      data: result,
      model: aiResponse.model,
    });
  } catch (error) {
    console.error('Improve error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
