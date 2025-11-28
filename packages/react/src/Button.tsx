import React from 'react';
import 'adya-ui-core';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { children, ...rest } = props;
  return React.createElement('aui-button', { ref, ...rest }, children);
});

Button.displayName = 'Button';
