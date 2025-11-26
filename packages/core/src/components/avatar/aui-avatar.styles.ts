export const styles = `
  :host {
    display: inline-block;
  }

  .aui-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: var(--aui-color-primary-100, #e3f2fd);
    color: var(--aui-color-primary-700, #1976d2);
    font-weight: 500;
    user-select: none;
  }

  /* Variants */
  .variant-circular {
    border-radius: 50%;
  }

  .variant-rounded {
    border-radius: var(--aui-border-radius-md, 8px);
  }

  .variant-square {
    border-radius: 0;
  }

  /* Sizes */
  .size-small {
    width: 32px;
    height: 32px;
    font-size: 0.875rem;
  }

  .size-medium {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .size-large {
    width: 56px;
    height: 56px;
    font-size: 1.25rem;
  }

  .size-xlarge {
    width: 72px;
    height: 72px;
    font-size: 1.5rem;
  }

  /* Content */
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-initials {
    text-transform: uppercase;
  }

  .avatar-placeholder svg {
    width: 60%;
    height: 60%;
  }
`;
