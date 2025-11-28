import { useContext } from 'react';
import { AppContext } from './AppContext.context';
import type { AppContextType } from './AppContext.types';

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
