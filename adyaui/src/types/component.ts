export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface FrameworkExample {
  import: string;
  code: string;
  installation: string;
}

export interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  category: 'General' | 'Layout' | 'Navigation' | 'Data Entry' | 'Data Display' | 'Feedback';
  examples: {
    react: FrameworkExample;
    vue: FrameworkExample;
    core: FrameworkExample;
  };
  props: ComponentProp[];
}

export interface CategoryGroup {
  name: string;
  components: ComponentInfo[];
}
