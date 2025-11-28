import React from 'react';
import { useParams } from 'react-router-dom';
import { componentList } from '../data/componentList';
import { useApp } from '../context';
import { CodeBlock } from '../components/CodeBlock';
import { PropsTable } from '../components/PropsTable';

export const ComponentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { framework } = useApp();
  const component = componentList.find(c => c.id === id);

  if (!component) {
    return (
      <div className="component-page">
        <h1>Component not found</h1>
        <p>The component you're looking for doesn't exist.</p>
      </div>
    );
  }

  const currentExample = component.examples[framework];

  return (
    <div className="component-page">
      {/* Header */}
      <div className="component-header">
        <h1 className="component-title">{component.name}</h1>
        <p className="component-description">{component.description}</p>
      </div>

      {/* Installation */}
      <div className="component-section">
        <h2 className="section-title">Installation</h2>
        <div className="installation-command">
          <code>{currentExample.installation}</code>
          <button
            className="copy-button"
            onClick={() => navigator.clipboard.writeText(currentExample.installation)}
          >
            Copy
          </button>
        </div>
      </div>

      {/* Import */}
      <div className="component-section">
        <h2 className="section-title">Import</h2>
        <CodeBlock code={currentExample.import} language="typescript" />
      </div>

      {/* Basic Usage */}
      <div className="component-section">
        <h2 className="section-title">Basic Usage</h2>
        <CodeBlock 
          code={currentExample.code} 
          language={framework === 'vue' ? 'html' : 'tsx'} 
        />
      </div>

      {/* API Reference */}
      {component.props && component.props.length > 0 && (
        <div className="component-section">
          <h2 className="section-title">API Reference</h2>
          <PropsTable props={component.props} />
        </div>
      )}
    </div>
  );
};
