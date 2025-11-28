import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context';

const frameworks = [
  { value: 'react', label: 'React', icon: '⚛️' },
  { value: 'vue', label: 'Vue', icon: '💚' },
  { value: 'core', label: 'Core', icon: '🔷' }
] as const;

export const FrameworkSelector: React.FC = () => {
  const { framework, setFramework } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentFramework = frameworks.find(f => f.value === framework);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="framework-selector" ref={dropdownRef}>
      <button
        className="framework-select-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select framework"
        aria-expanded={isOpen}
      >
        <span>{currentFramework?.icon}</span>
        <span>{currentFramework?.label}</span>
        <span style={{ fontSize: '0.75rem' }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="framework-dropdown">
          {frameworks.map(fw => (
            <div
              key={fw.value}
              className={`framework-option ${framework === fw.value ? 'active' : ''}`}
              onClick={() => {
                setFramework(fw.value);
                setIsOpen(false);
              }}
            >
              <span>{fw.icon}</span>
              <span>{fw.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
