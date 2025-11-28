import React from 'react';
import 'adya-ui-core';

export interface AlertProps extends React.HTMLAttributes<HTMLElement> {
  severity?: 'success' | 'info' | 'warning' | 'error';
  variant?: 'standard' | 'filled' | 'outlined';
  dismissible?: boolean;
  title?: string;
  open?: boolean;
}

export const Alert = React.forwardRef<HTMLElement, AlertProps>((props, ref) => {
  const { children, ...rest } = props;
  return React.createElement('aui-alert', { ref, ...rest }, children);
});

Alert.displayName = 'Alert';
