/**
 * Component catalog data structure
 */
export interface CatalogComponent {
  name: string;
  category: string;
  description: string;
  props?: Record<string, string>;
  events?: string[];
  example: string;
}

/**
 * AdyaUI Component Catalog
 */
export const COMPONENT_CATALOG: CatalogComponent[] = [
  // Form Components
  {
    name: 'Button',
    category: 'Form',
    description: 'A customizable button component with multiple variants',
    props: {
      variant: 'primary | secondary | outline | ghost',
      size: 'sm | md | lg',
      disabled: 'boolean',
      loading: 'boolean'
    },
    events: ['onClick'],
    example: '<Button variant="primary" size="md">Click Me</Button>'
  },
  {
    name: 'Input',
    category: 'Form',
    description: 'Text input field with validation support',
    props: {
      type: 'text | email | password | number',
      placeholder: 'string',
      value: 'string',
      disabled: 'boolean',
      error: 'string'
    },
    events: ['onChange', 'onBlur', 'onFocus'],
    example: '<Input type="email" placeholder="Enter email" />'
  },
  {
    name: 'Select',
    category: 'Form',
    description: 'Dropdown select component',
    props: {
      options: 'Array<{label: string, value: string}>',
      value: 'string',
      placeholder: 'string',
      disabled: 'boolean'
    },
    events: ['onChange'],
    example: '<Select options={options} placeholder="Choose option" />'
  },
  {
    name: 'Checkbox',
    category: 'Form',
    description: 'Checkbox input with label support',
    props: {
      checked: 'boolean',
      label: 'string',
      disabled: 'boolean'
    },
    events: ['onChange'],
    example: '<Checkbox label="Accept terms" />'
  },
  {
    name: 'Radio',
    category: 'Form',
    description: 'Radio button input',
    props: {
      checked: 'boolean',
      label: 'string',
      name: 'string',
      value: 'string'
    },
    events: ['onChange'],
    example: '<Radio name="option" value="1" label="Option 1" />'
  },
  {
    name: 'Switch',
    category: 'Form',
    description: 'Toggle switch component',
    props: {
      checked: 'boolean',
      disabled: 'boolean',
      label: 'string'
    },
    events: ['onChange'],
    example: '<Switch label="Enable notifications" />'
  },
  {
    name: 'Textarea',
    category: 'Form',
    description: 'Multi-line text input',
    props: {
      value: 'string',
      placeholder: 'string',
      rows: 'number',
      disabled: 'boolean'
    },
    events: ['onChange'],
    example: '<Textarea rows={4} placeholder="Enter description" />'
  },

  // Layout Components
  {
    name: 'Container',
    category: 'Layout',
    description: 'Responsive container with max-width',
    props: {
      maxWidth: 'sm | md | lg | xl | full',
      padding: 'boolean'
    },
    example: '<Container maxWidth="lg">Content</Container>'
  },
  {
    name: 'Grid',
    category: 'Layout',
    description: 'CSS Grid layout component',
    props: {
      columns: 'number | string',
      gap: 'string',
      rows: 'number | string'
    },
    example: '<Grid columns={3} gap="1rem">Items</Grid>'
  },
  {
    name: 'Flex',
    category: 'Layout',
    description: 'Flexbox layout component',
    props: {
      direction: 'row | column',
      justify: 'start | center | end | between | around',
      align: 'start | center | end | stretch',
      gap: 'string'
    },
    example: '<Flex direction="row" justify="between">Items</Flex>'
  },
  {
    name: 'Stack',
    category: 'Layout',
    description: 'Vertical or horizontal stack layout',
    props: {
      direction: 'vertical | horizontal',
      spacing: 'string',
      divider: 'boolean'
    },
    example: '<Stack spacing="1rem">Items</Stack>'
  },

  // Navigation Components
  {
    name: 'Navbar',
    category: 'Navigation',
    description: 'Navigation bar component',
    props: {
      logo: 'ReactNode',
      sticky: 'boolean',
      transparent: 'boolean'
    },
    example: '<Navbar logo={<Logo />}>Nav Items</Navbar>'
  },
  {
    name: 'Sidebar',
    category: 'Navigation',
    description: 'Collapsible sidebar navigation',
    props: {
      collapsed: 'boolean',
      width: 'string',
      position: 'left | right'
    },
    events: ['onToggle'],
    example: '<Sidebar width="250px">Menu Items</Sidebar>'
  },
  {
    name: 'Breadcrumb',
    category: 'Navigation',
    description: 'Breadcrumb navigation component',
    props: {
      items: 'Array<{label: string, href: string}>',
      separator: 'string'
    },
    example: '<Breadcrumb items={breadcrumbs} />'
  },
  {
    name: 'Tabs',
    category: 'Navigation',
    description: 'Tabbed navigation component',
    props: {
      items: 'Array<{label: string, content: ReactNode}>',
      defaultTab: 'number',
      variant: 'line | enclosed'
    },
    events: ['onChange'],
    example: '<Tabs items={tabs} variant="line" />'
  },

  // Feedback Components
  {
    name: 'Alert',
    category: 'Feedback',
    description: 'Alert message component',
    props: {
      variant: 'info | success | warning | error',
      title: 'string',
      closable: 'boolean'
    },
    events: ['onClose'],
    example: '<Alert variant="success" title="Success!">Operation completed</Alert>'
  },
  {
    name: 'Toast',
    category: 'Feedback',
    description: 'Toast notification component',
    props: {
      variant: 'info | success | warning | error',
      duration: 'number',
      position: 'top-right | top-left | bottom-right | bottom-left'
    },
    example: 'toast.success("Saved successfully")'
  },
  {
    name: 'Modal',
    category: 'Feedback',
    description: 'Modal dialog component',
    props: {
      open: 'boolean',
      title: 'string',
      size: 'sm | md | lg',
      closable: 'boolean'
    },
    events: ['onClose'],
    example: '<Modal open={isOpen} title="Confirm">Content</Modal>'
  },
  {
    name: 'Spinner',
    category: 'Feedback',
    description: 'Loading spinner component',
    props: {
      size: 'sm | md | lg',
      color: 'string'
    },
    example: '<Spinner size="md" />'
  },
  {
    name: 'Progress',
    category: 'Feedback',
    description: 'Progress bar component',
    props: {
      value: 'number',
      max: 'number',
      variant: 'linear | circular',
      showLabel: 'boolean'
    },
    example: '<Progress value={60} max={100} />'
  },

  // Data Display Components
  {
    name: 'Card',
    category: 'Data Display',
    description: 'Card container component',
    props: {
      title: 'string',
      subtitle: 'string',
      image: 'string',
      hoverable: 'boolean'
    },
    example: '<Card title="Title">Content</Card>'
  },
  {
    name: 'Table',
    category: 'Data Display',
    description: 'Data table component',
    props: {
      columns: 'Array<{key: string, label: string}>',
      data: 'Array<Record<string, any>>',
      sortable: 'boolean',
      pagination: 'boolean'
    },
    example: '<Table columns={columns} data={data} />'
  },
  {
    name: 'Badge',
    category: 'Data Display',
    description: 'Badge component for labels and counts',
    props: {
      variant: 'primary | secondary | success | warning | error',
      size: 'sm | md | lg'
    },
    example: '<Badge variant="primary">New</Badge>'
  },
  {
    name: 'Avatar',
    category: 'Data Display',
    description: 'User avatar component',
    props: {
      src: 'string',
      alt: 'string',
      size: 'sm | md | lg',
      fallback: 'string'
    },
    example: '<Avatar src="/user.jpg" alt="User" size="md" />'
  },
  {
    name: 'Tooltip',
    category: 'Data Display',
    description: 'Tooltip component',
    props: {
      content: 'string | ReactNode',
      position: 'top | bottom | left | right',
      trigger: 'hover | click'
    },
    example: '<Tooltip content="Help text">Hover me</Tooltip>'
  }
];

/**
 * Get components by category
 */
export function getComponentsByCategory(category: string): CatalogComponent[] {
  return COMPONENT_CATALOG.filter(c => c.category === category);
}

/**
 * Get all categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(COMPONENT_CATALOG.map(c => c.category)));
}

/**
 * Search components by name or description
 */
export function searchComponents(query: string): CatalogComponent[] {
  const lowerQuery = query.toLowerCase();
  return COMPONENT_CATALOG.filter(c => 
    c.name.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery)
  );
}
