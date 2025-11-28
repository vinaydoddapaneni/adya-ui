import React from 'react';
import 'adya-ui-core';

export interface TextFieldProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium' | 'large';
}

export const TextField = React.forwardRef<HTMLElement, TextFieldProps>((props, ref) => {
  const { children, ...rest } = props;
  return React.createElement('aui-textfield', { ref, ...rest }, children);
});

TextField.displayName = 'TextField';
