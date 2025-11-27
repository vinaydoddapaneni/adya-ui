import React from 'react';
import '@adyaui/core';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLElement, CardProps>((props, ref) => {
  const { children, ...rest } = props;
  return React.createElement('aui-card', { ref, ...rest }, children);
});

Card.displayName = 'Card';
