import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { FrameworkSelector } from '../components/FrameworkSelector';
import { componentList } from '../data/componentList';

interface TopNavProps {
  onMenuClick: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filteredComponents = componentList.filter(component =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSelect = (componentId: string) => {
    navigate(`/components/${componentId}`);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <nav className="top-nav">
      <div className="top-nav-content">
        <div className="top-nav-left">
          <button
            className="mobile-menu-btn"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <Link to="/" className="top-nav-logo">
            <span>🎨</span>
            <span>AdyaUI</span>
          </Link>
        </div>

        <div className="top-nav-right">
          <div className="search-bar" ref={searchRef}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery && setShowResults(true)}
            />
            {showResults && filteredComponents.length > 0 && (
              <div className="search-results">
                {filteredComponents.map(component => (
                  <div
                    key={component.id}
                    className="search-result-item"
                    onClick={() => handleSearchSelect(component.id)}
                  >
                    <div className="search-result-name">{component.name}</div>
                    <div className="search-result-description">
                      {component.description}
                    </div>
                    <div className="search-result-category">{component.category}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <FrameworkSelector />

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <a
            href="https://github.com/yourusername/adyaui"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              padding: 'var(--spacing-sm)', 
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="GitHub repository"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};
