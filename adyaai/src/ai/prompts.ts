import { ComponentMetadata } from '../metadata/extractor.js';

/**
 * Prompt templates for different AI modes
 */
export class PromptBuilder {
  /**
   * Build component suggestion prompt
   */
  static buildSuggestionPrompt(
    userInput: string,
    components: Record<string, ComponentMetadata>
  ): string {
    const componentList = Object.values(components)
      .map((comp) => {
        return `- **${comp.tagName}**: ${comp.description}
  Attributes: ${comp.attributes.map((a) => a.name).join(', ')}
  Use Cases: ${comp.useCases.slice(0, 2).join(', ')}`;
      })
      .join('\n');

    return `You are an expert UI component advisor for AdyaUI, a Web Components library.

Available Components:
${componentList}

User Request: "${userInput}"

Analyze the user's request and suggest the most appropriate AdyaUI components. Return your response as a JSON array with this exact structure:

{
  "suggestions": [
    {
      "component": "component-tag-name",
      "reason": "Why this component is recommended",
      "example": "HTML code example using the component",
      "props": ["list", "of", "recommended", "properties"]
    }
  ]
}

Rules:
1. Only suggest components from the available list above
2. Provide 1-3 most relevant suggestions
3. Include practical, working code examples with CAPITALIZED component names (e.g., <Aui-button> not <aui-button>)
4. Explain WHY each component fits the user's needs
5. Return ONLY valid JSON, no additional text

Your response:`;
  }

  /**
   * Build UI generation prompt
   */
  static buildUIGenerationPrompt(
    description: string,
    components: Record<string, ComponentMetadata>
  ): string {
    const componentList = Object.values(components)
      .map((comp) => {
        const examples = comp.examples.slice(0, 1).join('\n');
        return `- **${comp.tagName}**: ${comp.description}
  Example: ${examples}`;
      })
      .join('\n');

    return `You are an expert UI developer using AdyaUI Web Components.

Available Components:
${componentList}

Task: Create a complete, semantic HTML page for: "${description}"

Return your response as JSON with this exact structure:

{
  "html": "Complete HTML code using AdyaUI components",
  "components": ["list", "of", "components", "used"],
  "explanation": "Brief explanation of the UI structure and design decisions"
}

Requirements:
1. Use ONLY AdyaUI components from the list above with CAPITALIZED names (e.g., <Aui-button>, <Aui-textfield>)
2. Create semantic, accessible HTML structure
3. Include proper attributes for each component
4. Make it responsive and user-friendly
5. Add appropriate labels, placeholders, and helper text
6. Return ONLY valid JSON, no additional text

Your response:`;
  }

  /**
   * Build theme generation prompt
   */
  static buildThemePrompt(description: string): string {
    return `You are a UI/UX design expert specializing in design systems and theming.

Task: Create a custom theme for AdyaUI based on: "${description}"

AdyaUI uses CSS custom properties for theming. Generate a cohesive color palette and design tokens.

Return your response as JSON with this exact structure:

{
  "css": "Complete CSS with :root { --aui-* custom properties }",
  "tokens": {
    "primary": "#hexcolor",
    "secondary": "#hexcolor",
    "success": "#hexcolor",
    "error": "#hexcolor",
    "warning": "#hexcolor",
    "info": "#hexcolor",
    "background": "#hexcolor",
    "surface": "#hexcolor",
    "text": "#hexcolor",
    "border": "#hexcolor"
  },
  "explanation": "Brief explanation of the color choices and theme concept"
}

Requirements:
1. Create a harmonious, accessible color palette
2. Ensure sufficient contrast ratios (WCAG AA minimum)
3. Include primary, secondary, and semantic colors
4. Add background, surface, and text colors
5. Return ONLY valid JSON, no additional text

Your response:`;
  }

  /**
   * Build code analysis prompt
   */
  static buildAnalysisPrompt(
    code: string,
    components: Record<string, ComponentMetadata>
  ): string {
    const componentList = Object.keys(components).join(', ');

    return `You are a code review expert for AdyaUI Web Components.

Available Components: ${componentList}

Code to Analyze:
\`\`\`html
${code}
\`\`\`

Analyze this code and provide suggestions for improvement. Return your response as JSON with this exact structure:

{
  "issues": [
    {
      "type": "error|warning|suggestion",
      "component": "component-name",
      "message": "Description of the issue",
      "fix": "Suggested fix or improvement"
    }
  ],
  "improvements": [
    {
      "current": "Current code snippet",
      "improved": "Improved code snippet",
      "reason": "Why this is better"
    }
  ],
  "score": 85,
  "summary": "Overall assessment of the code quality"
}

Look for:
1. Incorrect component usage
2. Missing required attributes
3. Accessibility issues
4. Better component alternatives
5. Best practice violations
6. Return ONLY valid JSON, no additional text

Your response:`;
  }

  /**
   * Build code improvement prompt
   */
  static buildImprovementPrompt(
    code: string,
    components: Record<string, ComponentMetadata>
  ): string {
    return `You are an expert at refactoring UI code with AdyaUI components.

Available Components: ${Object.keys(components).join(', ')}

Current Code:
\`\`\`html
${code}
\`\`\`

Improve this code using AdyaUI best practices. Return your response as JSON:

{
  "improved": "Refactored HTML code",
  "changes": ["List of improvements made"],
  "explanation": "Why these changes improve the code"
}

Focus on:
1. Using the most appropriate components with CAPITALIZED names (e.g., <Aui-button>)
2. Adding proper attributes and accessibility features
3. Improving semantic structure
4. Following AdyaUI conventions
5. Return ONLY valid JSON, no additional text

Your response:`;
  }
}
