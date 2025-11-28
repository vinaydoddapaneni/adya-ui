import type { ComponentIntent, ProjectContext, AIServiceOptions } from '../types/index.js';

/**
 * Base interface for AI services
 */
export interface AIService {
  /**
   * Analyze natural language prompt and extract component intent
   */
  analyzePrompt(prompt: string, context: ProjectContext): Promise<ComponentIntent>;
}

/**
 * Abstract base class for AI services
 */
export abstract class BaseAIService implements AIService {
  protected apiKey: string;
  protected model: string;
  protected temperature: number;

  constructor(options: AIServiceOptions) {
    this.apiKey = options.apiKey;
    this.model = options.model || this.getDefaultModel();
    this.temperature = options.temperature ?? 0.7;
  }

  abstract analyzePrompt(prompt: string, context: ProjectContext): Promise<ComponentIntent>;
  
  protected abstract getDefaultModel(): string;

  /**
   * Build system prompt with component catalog
   */
  protected buildSystemPrompt(): string {
    return `You are an expert UI developer assistant for AdyaUI, a framework-agnostic component library.

Your task is to analyze user requests and generate component specifications in JSON format.

Available AdyaUI Components:
- AuiButton: Button with variants (primary, secondary, outlined, text)
- AuiTextField: Input field with label and validation
- AuiCard: Container for content grouping
- AuiSelect: Dropdown selection
- AuiCheckbox: Checkbox input
- AuiAlert: Alert/notification messages
- AuiDialog: Modal dialogs
- AuiAppBar: Application header/navbar
- AuiDrawer: Side drawer/sidebar
- AuiChip: Tags and labels

Common UI Patterns:
- login-page: Email + password login form
- product-grid: Grid of product cards
- dashboard-stats: Metric cards
- navbar: Navigation bar
- contact-form: Contact form
- checkout-form: E-commerce checkout
- user-profile: User profile page

Response Format:
Return ONLY a valid JSON object with this structure:
{
  "type": "page" | "component" | "layout",
  "name": "ComponentName",
  "components": [
    {
      "name": "AuiButton",
      "props": { "variant": "primary" },
      "children": [],
      "content": "Button Text"
    }
  ],
  "layout": {
    "type": "grid" | "flex",
    "columns": 3,
    "gap": "1rem"
  },
  "state": [
    { "name": "email", "type": "string", "initialValue": "" }
  ],
  "events": [
    { "name": "handleSubmit", "handler": "handleSubmit", "params": ["event"] }
  ]
}

Guidelines:
1. Use AdyaUI components whenever possible
2. Follow React/Vue best practices
3. Include proper TypeScript types
4. Add accessibility attributes
5. Use semantic HTML
6. Include error handling where appropriate
7. Add loading states for async operations
8. Keep components focused and reusable
9. Use meaningful variable names
10. Return ONLY valid JSON, no markdown or explanations`;
  }

  /**
   * Build user prompt with context
   */
  protected buildUserPrompt(prompt: string, context: ProjectContext): string {
    return `Project Context:
- Framework: ${context.framework}
- TypeScript: ${context.typescript}
- Style Format: ${context.styleFormat}
- Component Directory: ${context.componentDir}

User Request:
${prompt}

Generate a component specification that matches this request. Return ONLY the JSON object, no additional text.`;
  }

  /**
   * Validate and parse AI response
   */
  protected parseResponse(response: string): ComponentIntent {
    try {
      // Remove markdown code blocks if present
      let cleaned = response.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/```\n?/g, '');
      }

      const intent = JSON.parse(cleaned) as ComponentIntent;
      
      // Validate required fields
      if (!intent.type) {
        throw new Error('Missing required field: type');
      }
      if (!intent.components || !Array.isArray(intent.components)) {
        throw new Error('Missing or invalid field: components');
      }

      return intent;
    } catch (error) {
      throw new Error(`Failed to parse AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
