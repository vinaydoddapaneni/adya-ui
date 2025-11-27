import React from 'react';
import '@adyaui/core';

export interface CheckboxProps extends React.HTMLAttributes<HTMLElement> {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  value?: string;
}

export const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>((props, ref) => {
  const { children, ...rest } = props;
  return React.createElement('aui-checkbox', { ref, ...rest }, children);
});

Checkbox.displayName = 'Checkbox';
