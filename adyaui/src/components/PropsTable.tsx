import React from 'react';
import type { ComponentProp } from '../types/component';

interface PropsTableProps {
  props: ComponentProp[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  if (!props || props.length === 0) {
    return null;
  }

  return (
    <div className="props-table-container">
      <table className="props-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, index) => (
            <tr key={index}>
              <td>
                <code className="prop-name">{prop.name}</code>
              </td>
              <td>
                <code className="prop-type">{prop.type}</code>
              </td>
              <td>
                {prop.default ? (
                  <code className="prop-default">{prop.default}</code>
                ) : (
                  <span style={{ color: 'var(--color-text-disabled)' }}>-</span>
                )}
              </td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
