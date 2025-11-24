import { z } from 'zod';

/**
 * Request validation schemas
 */
export const SuggestRequestSchema = z.object({
  input: z.string().min(1, 'Input is required'),
});

export const GenerateUIRequestSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

export const ThemeRequestSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

export const AnalyzeRequestSchema = z.object({
  code: z.string().min(1, 'Code is required'),
});

export const ImproveRequestSchema = z.object({
  code: z.string().min(1, 'Code is required'),
});

export type SuggestRequest = z.infer<typeof SuggestRequestSchema>;
export type GenerateUIRequest = z.infer<typeof GenerateUIRequestSchema>;
export type ThemeRequest = z.infer<typeof ThemeRequestSchema>;
export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;
export type ImproveRequest = z.infer<typeof ImproveRequestSchema>;
