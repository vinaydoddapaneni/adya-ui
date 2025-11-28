import React from 'react';
import { Link } from 'react-router-dom';
import { groupedComponents, categories } from '../data/componentList';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h1 style={{ 
          fontSize: 'var(--font-size-4xl)', 
          marginBottom: 'var(--spacing-md)',
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          AdyaUI Component Library
        </h1>
        <p style={{ 
          fontSize: 'var(--font-size-xl)', 
          color: 'var(--color-text-secondary)',
          maxWidth: '800px'
        }}>
          A beautiful, framework-agnostic UI component library built with Web Components. 
          Works seamlessly with React, Vue, and vanilla JavaScript.
        </p>
      </div>

      {/* Features */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--spacing-xl)',
        marginBottom: 'var(--spacing-3xl)'
      }}>
        <div style={{ 
          padding: 'var(--spacing-xl)', 
          backgroundColor: 'var(--color-background-paper)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>⚛️</div>
          <h3>Framework Agnostic</h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Use with React, Vue, Angular, or vanilla JavaScript
          </p>
        </div>

        <div style={{ 
          padding: 'var(--spacing-xl)', 
          backgroundColor: 'var(--color-background-paper)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>🎨</div>
          <h3>Beautiful Design</h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Modern, clean aesthetics with light and dark themes
          </p>
        </div>

        <div style={{ 
          padding: 'var(--spacing-xl)', 
          backgroundColor: 'var(--color-background-paper)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>♿</div>
          <h3>Accessible</h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            WCAG 2.1 AA compliant with full keyboard navigation
          </p>
        </div>

        <div style={{ 
          padding: 'var(--spacing-xl)', 
          backgroundColor: 'var(--color-background-paper)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>📦</div>
          <h3>TypeScript</h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Full TypeScript support with comprehensive type definitions
          </p>
        </div>
      </div>

      {/* Quick Start */}
      <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Quick Start</h2>
        <div style={{ 
          backgroundColor: 'var(--color-code-bg)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-code-border)',
          fontFamily: 'var(--font-family-mono)',
          marginBottom: 'var(--spacing-md)'
        }}>
          <div style={{ marginBottom: 'var(--spacing-sm)' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}># React</span>
          </div>
          <div>npm install adya-ui-react</div>
          
          <div style={{ marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}># Vue</span>
          </div>
          <div>npm install adya-ui-vue</div>
          
          <div style={{ marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}># Core (Vanilla JS)</span>
          </div>
          <div>npm install adya-ui-core</div>
        </div>
      </div>

      {/* Component Categories */}
      <div>
        <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>Components</h2>
        <div style={{ 
          display: 'grid', 
          gap: 'var(--spacing-xl)'
        }}>
          {categories.map(category => (
            <div key={category}>
              <h3 style={{ 
                fontSize: 'var(--font-size-xl)',
                marginBottom: 'var(--spacing-md)',
                color: 'var(--color-primary)'
              }}>
                {category}
              </h3>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 'var(--spacing-md)'
              }}>
                {groupedComponents[category]?.map(component => (
                  <Link
                    key={component.id}
                    to={`/components/${component.id}`}
                    style={{
                      padding: 'var(--spacing-md)',
                      backgroundColor: 'var(--color-background-paper)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      textDecoration: 'none',
                      transition: 'all var(--transition-fast)',
                      display: 'block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ 
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-primary)',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      {component.name}
                    </div>
                    <div style={{ 
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)'
                    }}>
                      {component.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
