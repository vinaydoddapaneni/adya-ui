import type { ComponentMetadata } from '../types/index.js';

/**
 * AdyaUI Component Catalog
 * Metadata for all available components
 */
export const COMPONENT_CATALOG: ComponentMetadata[] = [
  {
    name: 'AuiButton',
    category: 'form',
    description: 'Versatile button component with multiple variants and sizes',
    props: [
      {
        name: 'variant',
        type: '"primary" | "secondary" | "outlined" | "text"',
        required: false,
        default: 'primary',
        description: 'Visual style variant'
      },
      {
        name: 'size',
        type: '"small" | "medium" | "large"',
        required: false,
        default: 'medium',
        description: 'Button size'
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Disable button interaction'
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Make button full width'
      }
    ],
    events: [
      { name: 'click', handler: 'onClick', params: ['event'] }
    ],
    examples: ['Login button', 'Submit form', 'Call to action', 'Add to cart'],
    keywords: ['button', 'click', 'action', 'submit', 'cta', 'primary', 'secondary'],
    relatedComponents: []
  },
  {
    name: 'AuiTextField',
    category: 'form',
    description: 'Input field with label, validation, and helper text',
    props: [
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text'
      },
      {
        name: 'type',
        type: '"text" | "email" | "password" | "number" | "tel" | "url"',
        required: false,
        default: 'text',
        description: 'Input type'
      },
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        description: 'Placeholder text'
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: 'Input value'
      },
      {
        name: 'required',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Mark field as required'
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Disable input'
      },
      {
        name: 'error',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Show error state'
      },
      {
        name: 'helperText',
        type: 'string',
        required: false,
        description: 'Helper or error text'
      }
    ],
    events: [
      { name: 'change', handler: 'onChange', params: ['event'] },
      { name: 'input', handler: 'onInput', params: ['event'] },
      { name: 'blur', handler: 'onBlur', params: ['event'] }
    ],
    examples: ['Email input', 'Password field', 'Search box', 'Name input'],
    keywords: ['input', 'textfield', 'form', 'email', 'password', 'text'],
    relatedComponents: ['AuiSelect', 'AuiCheckbox']
  },
  {
    name: 'AuiCard',
    category: 'layout',
    description: 'Container component for content grouping',
    props: [
      {
        name: 'elevation',
        type: 'number',
        required: false,
        default: 1,
        description: 'Shadow elevation (0-5)'
      },
      {
        name: 'hoverable',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Add hover effect'
      },
      {
        name: 'padding',
        type: '"none" | "small" | "medium" | "large"',
        required: false,
        default: 'medium',
        description: 'Internal padding'
      }
    ],
    events: [
      { name: 'click', handler: 'onClick', params: ['event'] }
    ],
    examples: ['Product card', 'User profile', 'Dashboard widget', 'Content container'],
    keywords: ['card', 'container', 'box', 'panel'],
    relatedComponents: []
  },
  {
    name: 'AuiSelect',
    category: 'form',
    description: 'Dropdown selection component',
    props: [
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text'
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: 'Selected value'
      },
      {
        name: 'options',
        type: 'Array<{value: string, label: string}>',
        required: true,
        description: 'Selection options'
      },
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        description: 'Placeholder text'
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Disable select'
      }
    ],
    events: [
      { name: 'change', handler: 'onChange', params: ['event'] }
    ],
    examples: ['Country selector', 'Category filter', 'Sort dropdown'],
    keywords: ['select', 'dropdown', 'picker', 'options'],
    relatedComponents: ['AuiTextField', 'AuiAutocomplete']
  },
  {
    name: 'AuiCheckbox',
    category: 'form',
    description: 'Checkbox input component',
    props: [
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text'
      },
      {
        name: 'checked',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Checked state'
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Disable checkbox'
      }
    ],
    events: [
      { name: 'change', handler: 'onChange', params: ['event'] }
    ],
    examples: ['Terms agreement', 'Remember me', 'Feature toggle'],
    keywords: ['checkbox', 'check', 'toggle', 'boolean'],
    relatedComponents: ['AuiSwitch', 'AuiRadio']
  },
  {
    name: 'AuiAlert',
    category: 'feedback',
    description: 'Alert message component',
    props: [
      {
        name: 'variant',
        type: '"success" | "error" | "warning" | "info"',
        required: false,
        default: 'info',
        description: 'Alert type'
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: 'Alert title'
      },
      {
        name: 'dismissible',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Show close button'
      }
    ],
    events: [
      { name: 'close', handler: 'onClose', params: [] }
    ],
    examples: ['Success message', 'Error notification', 'Warning banner'],
    keywords: ['alert', 'message', 'notification', 'banner'],
    relatedComponents: ['AuiSnackbar']
  },
  {
    name: 'AuiDialog',
    category: 'overlay',
    description: 'Modal dialog component',
    props: [
      {
        name: 'open',
        type: 'boolean',
        required: true,
        description: 'Dialog open state'
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: 'Dialog title'
      },
      {
        name: 'maxWidth',
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        required: false,
        default: 'sm',
        description: 'Maximum width'
      }
    ],
    events: [
      { name: 'close', handler: 'onClose', params: [] }
    ],
    slots: [
      { name: 'default', description: 'Dialog content' },
      { name: 'actions', description: 'Dialog actions (buttons)' }
    ],
    examples: ['Confirmation dialog', 'Form modal', 'Details popup'],
    keywords: ['dialog', 'modal', 'popup', 'overlay'],
    relatedComponents: ['AuiDrawer']
  },
  {
    name: 'AuiAppBar',
    category: 'navigation',
    description: 'Application header bar',
    props: [
      {
        name: 'position',
        type: '"fixed" | "sticky" | "static"',
        required: false,
        default: 'static',
        description: 'Positioning'
      },
      {
        name: 'color',
        type: '"primary" | "secondary" | "transparent"',
        required: false,
        default: 'primary',
        description: 'Background color'
      }
    ],
    events: [],
    slots: [
      { name: 'default', description: 'AppBar content' }
    ],
    examples: ['Top navbar', 'Header with logo', 'Navigation bar'],
    keywords: ['appbar', 'navbar', 'header', 'toolbar'],
    relatedComponents: ['AuiDrawer', 'AuiMenu']
  },
  {
    name: 'AuiDrawer',
    category: 'navigation',
    description: 'Side drawer/sidebar component',
    props: [
      {
        name: 'open',
        type: 'boolean',
        required: true,
        description: 'Drawer open state'
      },
      {
        name: 'anchor',
        type: '"left" | "right" | "top" | "bottom"',
        required: false,
        default: 'left',
        description: 'Drawer position'
      },
      {
        name: 'variant',
        type: '"temporary" | "persistent" | "permanent"',
        required: false,
        default: 'temporary',
        description: 'Drawer behavior'
      }
    ],
    events: [
      { name: 'close', handler: 'onClose', params: [] }
    ],
    examples: ['Side navigation', 'Mobile menu', 'Settings panel'],
    keywords: ['drawer', 'sidebar', 'sidenav', 'menu'],
    relatedComponents: ['AuiAppBar', 'AuiMenu']
  },
  {
    name: 'AuiChip',
    category: 'data-display',
    description: 'Compact element for tags, labels, or categories',
    props: [
      {
        name: 'label',
        type: 'string',
        required: true,
        description: 'Chip text'
      },
      {
        name: 'variant',
        type: '"filled" | "outlined"',
        required: false,
        default: 'filled',
        description: 'Visual variant'
      },
      {
        name: 'color',
        type: '"primary" | "secondary" | "success" | "error"',
        required: false,
        default: 'primary',
        description: 'Chip color'
      },
      {
        name: 'deletable',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Show delete icon'
      }
    ],
    events: [
      { name: 'delete', handler: 'onDelete', params: [] },
      { name: 'click', handler: 'onClick', params: ['event'] }
    ],
    examples: ['Tag', 'Category label', 'Filter chip', 'Status badge'],
    keywords: ['chip', 'tag', 'label', 'badge'],
    relatedComponents: ['AuiBadge']
  }
];

/**
 * Get component by name
 */
export function getComponent(name: string): ComponentMetadata | undefined {
  return COMPONENT_CATALOG.find(c => c.name === name);
}

/**
 * Search components by keyword
 */
export function searchComponents(query: string): ComponentMetadata[] {
  const lowerQuery = query.toLowerCase();
  return COMPONENT_CATALOG.filter(c => 
    c.keywords.some(k => k.includes(lowerQuery)) ||
    c.name.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get components by category
 */
export function getComponentsByCategory(category: string): ComponentMetadata[] {
  return COMPONENT_CATALOG.filter(c => c.category === category);
}
