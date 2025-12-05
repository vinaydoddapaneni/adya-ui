
import React from 'react';

interface CardProps {
  title: string;
  description?: string;
  variant?: 'default' | 'elevated';
  onClick?: () => void;
}

/**
 * A reusable card component for displaying content
 */
export const Card: React.FC<CardProps> = ({ title, description, variant = 'default', onClick }) => {
  return (
    <div className={`card card--${variant}`} onClick={onClick}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};
