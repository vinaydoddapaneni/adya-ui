import Prism from 'prismjs';
import React, { useState } from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'typescript',
  showLineNumbers = false 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const highlighted = Prism.highlight(
    code,
    Prism.languages[language] || Prism.languages.typescript,
    language
  );

  return (
    <div className="code-block-container">
      <div className="code-block">
        <div className="code-block-header">
          <span className="code-block-language">{language}</span>
          <button
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            aria-label="Copy code"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        <pre className={showLineNumbers ? 'line-numbers' : ''}>
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
};
