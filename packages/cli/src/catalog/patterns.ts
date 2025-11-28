import type { UIPattern } from '../types/index.js';

/**
 * Common UI patterns and their component compositions
 */
export const PATTERNS: Record<string, UIPattern> = {
  'login-page': {
    name: 'Login Page',
    description: 'Standard login page with email and password',
    category: 'authentication',
    components: [
      {
        name: 'AuiCard',
        props: { elevation: 2, padding: 'large' },
        children: [
          {
            name: 'AuiTextField',
            props: { label: 'Email', type: 'email', required: true }
          },
          {
            name: 'AuiTextField',
            props: { label: 'Password', type: 'password', required: true }
          },
          {
            name: 'AuiCheckbox',
            props: { label: 'Remember me' }
          },
          {
            name: 'AuiButton',
            props: { variant: 'primary', fullWidth: true },
            content: 'Login'
          }
        ]
      }
    ],
    layout: {
      type: 'flex',
      direction: 'column',
      align: 'center',
      justify: 'center'
    }
  },

  'product-grid': {
    name: 'Product Grid',
    description: 'Grid of product cards for e-commerce',
    category: 'e-commerce',
    components: [
      {
        name: 'AuiCard',
        props: { hoverable: true },
        children: [
          { name: 'img', props: { alt: 'Product', src: '/placeholder.jpg' } },
          { name: 'h3', content: 'Product Name' },
          { name: 'AuiChip', props: { label: '$99.99', color: 'primary' } },
          {
            name: 'AuiButton',
            props: { variant: 'primary', size: 'small', fullWidth: true },
            content: 'Add to Cart'
          }
        ]
      }
    ],
    layout: {
      type: 'grid',
      columns: 3,
      gap: '1.5rem'
    }
  },

  'dashboard-stats': {
    name: 'Dashboard Stats',
    description: 'Row of metric cards showing key statistics',
    category: 'dashboard',
    components: [
      {
        name: 'AuiCard',
        children: [
          { name: 'h2', content: '1,234' },
          { name: 'p', content: 'Total Users' }
        ]
      }
    ],
    layout: {
      type: 'grid',
      columns: 4,
      gap: '1rem'
    }
  },

  'navbar': {
    name: 'Navigation Bar',
    description: 'Top navigation bar with logo and menu items',
    category: 'navigation',
    components: [
      {
        name: 'AuiAppBar',
        props: { position: 'sticky', color: 'primary' },
        children: [
          { name: 'h1', content: 'Logo' },
          { name: 'nav', children: [
            { name: 'AuiButton', props: { variant: 'text' }, content: 'Home' },
            { name: 'AuiButton', props: { variant: 'text' }, content: 'Products' },
            { name: 'AuiButton', props: { variant: 'text' }, content: 'About' },
            { name: 'AuiButton', props: { variant: 'text' }, content: 'Contact' }
          ]}
        ]
      }
    ],
    layout: {
      type: 'flex',
      direction: 'row',
      align: 'center',
      justify: 'between'
    }
  },

  'contact-form': {
    name: 'Contact Form',
    description: 'Standard contact form with name, email, and message',
    category: 'forms',
    components: [
      {
        name: 'AuiCard',
        children: [
          { name: 'h2', content: 'Contact Us' },
          { name: 'AuiTextField', props: { label: 'Name', required: true } },
          { name: 'AuiTextField', props: { label: 'Email', type: 'email', required: true } },
          { name: 'AuiTextField', props: { label: 'Message', multiline: true, rows: 4, required: true } },
          { name: 'AuiButton', props: { variant: 'primary', fullWidth: true }, content: 'Send Message' }
        ]
      }
    ],
    layout: {
      type: 'flex',
      direction: 'column',
      gap: '1rem'
    }
  },

  'checkout-form': {
    name: 'Checkout Form',
    description: 'E-commerce checkout with shipping and payment',
    category: 'e-commerce',
    components: [
      {
        name: 'AuiCard',
        children: [
          { name: 'h2', content: 'Shipping Information' },
          { name: 'AuiTextField', props: { label: 'Full Name', required: true } },
          { name: 'AuiTextField', props: { label: 'Address', required: true } },
          { name: 'AuiTextField', props: { label: 'City', required: true } },
          { name: 'AuiTextField', props: { label: 'Postal Code', required: true } },
          { name: 'h2', content: 'Payment Method' },
          { name: 'AuiSelect', props: { label: 'Payment', options: [] } },
          { name: 'AuiButton', props: { variant: 'primary', fullWidth: true }, content: 'Place Order' }
        ]
      }
    ],
    layout: {
      type: 'flex',
      direction: 'column',
      gap: '1rem'
    }
  },

  'user-profile': {
    name: 'User Profile',
    description: 'User profile page with avatar and info',
    category: 'user',
    components: [
      {
        name: 'AuiCard',
        children: [
          { name: 'div', content: 'Avatar Upload Area' },
          { name: 'AuiTextField', props: { label: 'Name', required: true } },
          { name: 'AuiTextField', props: { label: 'Email', type: 'email', required: true } },
          { name: 'AuiTextField', props: { label: 'Bio', multiline: true, rows: 3 } },
          { name: 'AuiButton', props: { variant: 'primary' }, content: 'Save Changes' },
          { name: 'AuiButton', props: { variant: 'outlined' }, content: 'Cancel' }
        ]
      }
    ],
    layout: {
      type: 'flex',
      direction: 'column',
      gap: '1rem'
    }
  }
};

/**
 * Get pattern by name
 */
export function getPattern(name: string): UIPattern | undefined {
  return PATTERNS[name];
}

/**
 * Search patterns by keyword
 */
export function searchPatterns(query: string): UIPattern[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(PATTERNS).filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get patterns by category
 */
export function getPatternsByCategory(category: string): UIPattern[] {
  return Object.values(PATTERNS).filter(p => p.category === category);
}
