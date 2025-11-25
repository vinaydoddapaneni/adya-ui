export const styles = `
  :host {
    display: block;
    width: 100%;
    font-family: var(--aui-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif);
  }

  .aui-table-container {
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
    background: var(--aui-surface-color, #ffffff);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid var(--aui-border-color, #e5e7eb);
  }

  .aui-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    color: var(--aui-text-color, #1f2937);
  }

  /* Table Header */
  .aui-table thead {
    background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
    border-bottom: 2px solid var(--aui-primary, #3b82f6);
  }

  .aui-table th {
    padding: 16px 20px;
    text-align: left;
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--aui-text-secondary, #4b5563);
    white-space: nowrap;
    background: transparent;
  }

  .aui-table th.sortable {
    cursor: pointer;
    user-select: none;
    position: relative;
    padding-right: 36px;
    transition: all 0.2s ease;
  }

  .aui-table th.sortable:hover {
    background: rgba(59, 130, 246, 0.05);
    color: var(--aui-primary, #3b82f6);
  }

  .aui-table th.sorted {
    color: var(--aui-primary, #3b82f6);
    background: rgba(59, 130, 246, 0.08);
  }

  .sort-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    opacity: 0.6;
  }

  .sort-icon.asc {
    border-bottom: 7px solid currentColor;
  }

  .sort-icon.desc {
    border-top: 7px solid currentColor;
  }

  /* Table Body */
  .aui-table tbody tr {
    border-bottom: 1px solid var(--aui-border-color, #f3f4f6);
    transition: all 0.2s ease;
  }

  .aui-table tbody tr:last-child {
    border-bottom: none;
  }

  .aui-table td {
    padding: 16px 20px;
    font-size: 14px;
    color: var(--aui-text-color, #374151);
  }

  /* Variants */
  :host([striped]) .aui-table tbody tr:nth-child(even) {
    background: linear-gradient(to right, #fafafa, #f9fafb);
  }

  :host([bordered]) .aui-table {
    border: 1px solid var(--aui-border-color, #e5e7eb);
  }

  :host([bordered]) .aui-table th,
  :host([bordered]) .aui-table td {
    border-right: 1px solid var(--aui-border-color, #f3f4f6);
  }

  :host([bordered]) .aui-table th:last-child,
  :host([bordered]) .aui-table td:last-child {
    border-right: none;
  }

  :host([hoverable]) .aui-table tbody tr:hover {
    background: linear-gradient(to right, #f0f9ff, #e0f2fe);
    cursor: pointer;
    transform: scale(1.001);
    box-shadow: 0 1px 3px rgba(59, 130, 246, 0.1);
  }

  /* Selection */
  :host([selectable]) .aui-table tbody tr.selected {
    background: linear-gradient(to right, #dbeafe, #bfdbfe);
    border-left: 3px solid var(--aui-primary, #3b82f6);
  }

  .selection-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--aui-primary, #3b82f6);
    border-radius: 4px;
  }

  /* Alignment */
  .align-left { text-align: left; }
  .align-center { text-align: center; }
  .align-right { text-align: right; }

  /* Pagination */
  .aui-table-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-top: 1px solid var(--aui-border-color, #f3f4f6);
    background: linear-gradient(to bottom, #fafafa, #ffffff);
  }

  .pagination-info {
    font-size: 14px;
    color: var(--aui-text-secondary, #6b7280);
    font-weight: 500;
  }

  .pagination-controls {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .pagination-button {
    padding: 8px 16px;
    border: 1px solid var(--aui-border-color, #d1d5db);
    background: white;
    color: var(--aui-text-color, #374151);
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .pagination-button:hover:not(:disabled) {
    background: var(--aui-primary, #3b82f6);
    color: white;
    border-color: var(--aui-primary, #3b82f6);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
  }

  .pagination-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: #f9fafb;
  }

  .pagination-button.active {
    background: var(--aui-primary, #3b82f6);
    color: white;
    border-color: var(--aui-primary, #3b82f6);
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
  }

  .page-size-select {
    padding: 8px 12px;
    border: 1px solid var(--aui-border-color, #d1d5db);
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    background: white;
    color: var(--aui-text-color, #374151);
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .page-size-select:hover {
    border-color: var(--aui-primary, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .page-size-select:focus {
    outline: none;
    border-color: var(--aui-primary, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  /* Loading State */
  .aui-table-loading {
    position: relative;
    min-height: 200px;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--aui-border-color, #e0e0e0);
    border-top-color: var(--aui-primary, #2196f3);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Empty State */
  .aui-table-empty {
    padding: 48px 24px;
    text-align: center;
    color: var(--aui-text-secondary, #666);
    font-size: 14px;
  }

  /* Responsive */
  :host([responsive]) .aui-table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  @media (max-width: 768px) {
    :host([responsive]) .aui-table {
      font-size: 12px;
    }

    :host([responsive]) .aui-table th,
    :host([responsive]) .aui-table td {
      padding: 8px 12px;
    }

    .aui-table-pagination {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }

    .pagination-controls {
      justify-content: center;
    }
  }

  /* Dark Mode */
  :host([data-theme="dark"]) .aui-table-container,
  :host-context([data-theme="dark"]) .aui-table-container {
    background: var(--aui-surface-dark, #1e1e1e);
    color: var(--aui-text-dark, #e0e0e0);
  }

  :host([data-theme="dark"]) .aui-table thead,
  :host-context([data-theme="dark"]) .aui-table thead {
    background: var(--aui-surface-secondary-dark, #2a2a2a);
  }

  :host([data-theme="dark"]) .aui-table tbody tr,
  :host-context([data-theme="dark"]) .aui-table tbody tr {
    border-bottom-color: var(--aui-border-dark, #333);
  }

  :host([data-theme="dark"][striped]) .aui-table tbody tr:nth-child(even),
  :host-context([data-theme="dark"]):host([striped]) .aui-table tbody tr:nth-child(even) {
    background: var(--aui-surface-secondary-dark, #252525);
  }

  /* ========================================
     PREMIUM VARIANTS - Unique to AdyaUI
     ======================================== */

  /* Glass Morphism Variant */
  :host([variant="glass"]) .aui-table-container {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  }

  :host([variant="glass"]) .aui-table thead {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2));
    border-bottom: 2px solid rgba(59, 130, 246, 0.3);
  }

  :host([variant="glass"]) .aui-table tbody tr:hover {
    background: rgba(59, 130, 246, 0.1);
    backdrop-filter: blur(10px);
  }

  /* Neon Glow Variant */
  :host([variant="neon"]) .aui-table-container {
    background: #0a0e27;
    border: 2px solid #00d4ff;
    box-shadow: 
      0 0 20px rgba(0, 212, 255, 0.3),
      0 0 40px rgba(0, 212, 255, 0.2),
      inset 0 0 20px rgba(0, 212, 255, 0.05);
  }

  :host([variant="neon"]) .aui-table {
    color: #e0e0e0;
  }

  :host([variant="neon"]) .aui-table thead {
    background: linear-gradient(135deg, #1a1f3a, #0f1729);
    border-bottom: 2px solid #00d4ff;
    box-shadow: 0 2px 10px rgba(0, 212, 255, 0.3);
  }

  :host([variant="neon"]) .aui-table th {
    color: #00d4ff;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  }

  :host([variant="neon"]) .aui-table tbody tr {
    border-bottom: 1px solid rgba(0, 212, 255, 0.2);
  }

  :host([variant="neon"]) .aui-table tbody tr:hover {
    background: rgba(0, 212, 255, 0.1);
    box-shadow: inset 0 0 20px rgba(0, 212, 255, 0.1);
  }

  :host([variant="neon"]) .aui-table td {
    color: #b0b0b0;
  }

  /* Gradient Card Variant */
  :host([variant="gradient-card"]) .aui-table-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 2px;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
  }

  :host([variant="gradient-card"]) .aui-table {
    background: white;
    border-radius: 10px;
    overflow: hidden;
  }

  :host([variant="gradient-card"]) .aui-table thead {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-bottom: 2px solid #667eea;
  }

  :host([variant="gradient-card"]) .aui-table th {
    color: #667eea;
    font-weight: 800;
  }

  :host([variant="gradient-card"]) .aui-table tbody tr:hover {
    background: linear-gradient(90deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  }

  /* Minimal Elegant Variant */
  :host([variant="minimal"]) .aui-table-container {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  :host([variant="minimal"]) .aui-table thead {
    background: transparent;
    border-bottom: 3px solid #1f2937;
  }

  :host([variant="minimal"]) .aui-table th {
    color: #1f2937;
    font-weight: 800;
    font-size: 11px;
    padding-bottom: 12px;
  }

  :host([variant="minimal"]) .aui-table tbody tr {
    border-bottom: 1px solid #e5e7eb;
  }

  :host([variant="minimal"]) .aui-table tbody tr:hover {
    background: #f9fafb;
  }

  /* Animated Gradient Variant */
  :host([variant="animated"]) .aui-table-container {
    position: relative;
    background: white;
    overflow: hidden;
  }

  :host([variant="animated"]) .aui-table-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  :host([variant="animated"]) .aui-table thead {
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    position: relative;
    overflow: hidden;
  }

  :host([variant="animated"]) .aui-table thead::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    animation: slide 2s ease-in-out infinite;
  }

  @keyframes slide {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  /* Neumorphism Variant */
  :host([variant="neomorphic"]) .aui-table-container {
    background: #e0e5ec;
    border: none;
    box-shadow: 
      9px 9px 16px rgba(163, 177, 198, 0.6),
      -9px -9px 16px rgba(255, 255, 255, 0.5);
  }

  :host([variant="neomorphic"]) .aui-table thead {
    background: #e0e5ec;
    border-bottom: none;
  }

  :host([variant="neomorphic"]) .aui-table th {
    color: #4a5568;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  }

  :host([variant="neomorphic"]) .aui-table tbody tr {
    border-bottom: none;
  }

  :host([variant="neomorphic"]) .aui-table td {
    color: #2d3748;
  }

  :host([variant="neomorphic"]) .aui-table tbody tr:hover {
    background: linear-gradient(145deg, #d1d9e6, #e0e5ec);
  }

  /* Premium Dark Variant */
  :host([variant="premium-dark"]) .aui-table-container {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border: 1px solid #2d3561;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  :host([variant="premium-dark"]) .aui-table {
    color: #e0e0e0;
  }

  :host([variant="premium-dark"]) .aui-table thead {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
    border-bottom: 2px solid #3b82f6;
  }

  :host([variant="premium-dark"]) .aui-table th {
    color: #60a5fa;
    font-weight: 700;
  }

  :host([variant="premium-dark"]) .aui-table tbody tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  :host([variant="premium-dark"]) .aui-table tbody tr:hover {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
    box-shadow: inset 0 0 20px rgba(59, 130, 246, 0.1);
  }

  :host([variant="premium-dark"]) .aui-table td {
    color: #cbd5e0;
  }

  /* Colorful Variant */
  :host([variant="colorful"]) .aui-table thead {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border: none;
  }

  :host([variant="colorful"]) .aui-table th {
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  :host([variant="colorful"]) .aui-table tbody tr:nth-child(4n+1):hover {
    background: linear-gradient(90deg, rgba(102, 126, 234, 0.1), transparent);
    border-left: 4px solid #667eea;
  }

  :host([variant="colorful"]) .aui-table tbody tr:nth-child(4n+2):hover {
    background: linear-gradient(90deg, rgba(118, 75, 162, 0.1), transparent);
    border-left: 4px solid #764ba2;
  }

  :host([variant="colorful"]) .aui-table tbody tr:nth-child(4n+3):hover {
    background: linear-gradient(90deg, rgba(240, 147, 251, 0.1), transparent);
    border-left: 4px solid #f093fb;
  }

  :host([variant="colorful"]) .aui-table tbody tr:nth-child(4n+4):hover {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), transparent);
    border-left: 4px solid #3b82f6;
  }

  /* Utility Classes for Cell Content */
  .aui-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .aui-badge.success {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }

  .aui-badge.warning {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  }

  .aui-badge.error {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  }

  .aui-badge.info {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  }

  .aui-badge.neutral {
    background: linear-gradient(135deg, #6b7280, #4b5563);
    color: white;
    box-shadow: 0 2px 8px rgba(107, 114, 128, 0.3);
  }

  /* Progress Bar in Cell */
  .aui-progress {
    width: 100%;
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .aui-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 4px;
    transition: width 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .aui-progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: progress-shimmer 1.5s infinite;
  }

  @keyframes progress-shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  /* Avatar in Cell */
  .aui-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .aui-avatar-group {
    display: flex;
    align-items: center;
  }

  .aui-avatar-group .aui-avatar {
    margin-left: -8px;
  }

  .aui-avatar-group .aui-avatar:first-child {
    margin-left: 0;
  }

  /* Action Buttons */
  .aui-action-button {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin: 0 4px;
  }

  .aui-action-button.primary {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
  }

  .aui-action-button.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  .aui-action-button.danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);
  }

  .aui-action-button.danger:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  }

  /* Hover Effects Enhancement */
  :host([hover-effect="glow"]) .aui-table tbody tr:hover {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    transform: scale(1.002);
  }

  :host([hover-effect="lift"]) .aui-table tbody tr:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  :host([hover-effect="slide"]) .aui-table tbody tr {
    position: relative;
  }

  :host([hover-effect="slide"]) .aui-table tbody tr::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #3b82f6, #8b5cf6);
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  :host([hover-effect="slide"]) .aui-table tbody tr:hover::before {
    transform: scaleY(1);
  }
`;
