import React from 'react';
import { NavLink } from 'react-router-dom';

import { groupedComponents, categories } from '../data/componentList';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav>
        {categories.map(category => (
          <div key={category} className="sidebar-category">
            <div className="sidebar-category-title">{category}</div>
            <ul className="sidebar-links">
              {groupedComponents[category]?.map(component => (
                <li key={component.id}>
                  <NavLink
                    to={`/components/${component.id}`}
                    className={({ isActive }) => 
                      `sidebar-link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => {
                      // Close mobile sidebar when clicking a link
                      if (window.innerWidth <= 768) {
                        onClose();
                      }
                    }}
                  >
                    {component.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};
