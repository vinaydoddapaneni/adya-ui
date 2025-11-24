import { z } from 'zod';

/**
 * Response schemas for validation
 */
export const SuggestionSchema = z.object({
  suggestions: z.array(
    z.object({
      component: z.string(),
      reason: z.string(),
      example: z.string(),
      props: z.array(z.string()),
    })
  ),
});

export const UIGenerationSchema = z.object({
  html: z.string(),
  components: z.array(z.string()),
  explanation: z.string(),
});

export const ThemeSchema = z.object({
  css: z.string(),
  tokens: z.record(z.string()),
  explanation: z.string(),
});

export const AnalysisSchema = z.object({
  issues: z.array(
    z.object({
      type: z.enum(['error', 'warning', 'suggestion']),
      component: z.string(),
      message: z.string(),
      fix: z.string(),
    })
  ),
  improvements: z.array(
    z.object({
      current: z.string(),
      improved: z.string(),
      reason: z.string(),
    })
  ),
  score: z.number(),
  summary: z.string(),
});

export const ImprovementSchema = z.object({
  improved: z.string(),
  changes: z.array(z.string()),
  explanation: z.string(),
});

/**
 * Parse and validate AI responses
 */
export class ResponseParser {
  /**
   * Extract JSON from AI response
   */
  static extractJSON(response: string): unknown {
    console.log('Raw AI response:', response.substring(0, 500)); // Log first 500 chars
    
    // Try multiple strategies to extract JSON
    
    // Strategy 1: Look for JSON code blocks
    const codeBlockMatch = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (codeBlockMatch) {
      try {
        const parsed = JSON.parse(codeBlockMatch[1]);
        console.log('Extracted JSON from code block');
        return parsed;
      } catch (error) {
        console.warn('Failed to parse code block JSON:', error);
      }
    }
    
    // Strategy 2: Find the first complete JSON object
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('Extracted JSON from response');
        return parsed;
      } catch (error) {
        console.warn('Failed to parse matched JSON:', error);
      }
    }
    
    // Strategy 3: Try to find JSON between specific markers
    const markerMatch = response.match(/(?:response:|answer:|json:)?\s*(\{[\s\S]*\})/i);
    if (markerMatch) {
      try {
        const parsed = JSON.parse(markerMatch[1]);
        console.log('Extracted JSON with markers');
        return parsed;
      } catch (error) {
        console.warn('Failed to parse marker JSON:', error);
      }
    }
    
    console.error('No valid JSON found in response');
    throw new Error('No JSON found in AI response. Response preview: ' + response.substring(0, 200));
  }

  /**
   * Parse suggestion response
   */
  static parseSuggestion(response: string): z.infer<typeof SuggestionSchema> {
    const json = this.extractJSON(response);
    return SuggestionSchema.parse(json);
  }

  /**
   * Parse UI generation response
   */
  static parseUIGeneration(response: string): z.infer<typeof UIGenerationSchema> {
    const json = this.extractJSON(response);
    return UIGenerationSchema.parse(json);
  }

  /**
   * Parse theme response
   */
  static parseTheme(response: string): z.infer<typeof ThemeSchema> {
    const json = this.extractJSON(response);
    return ThemeSchema.parse(json);
  }

  /**
   * Parse analysis response
   */
  static parseAnalysis(response: string): z.infer<typeof AnalysisSchema> {
    const json = this.extractJSON(response);
    return AnalysisSchema.parse(json);
  }

  /**
   * Parse improvement response
   */
  static parseImprovement(response: string): z.infer<typeof ImprovementSchema> {
    const json = this.extractJSON(response);
    return ImprovementSchema.parse(json);
  }

  /**
   * Safe parse with fallback
   */
  static safeParse<T>(
    response: string,
    parser: (response: string) => T,
    fallback: T
  ): T {
    try {
      return parser(response);
    } catch (error) {
      console.error('Parse error:', error);
      return fallback;
    }
  }
}
