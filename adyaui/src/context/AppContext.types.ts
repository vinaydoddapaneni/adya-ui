export type Framework = 'react' | 'vue' | 'core';
export type Theme = 'light' | 'dark';

export interface AppContextType {
  framework: Framework;
  setFramework: (framework: Framework) => void;
  theme: Theme;
  toggleTheme: () => void;
}
