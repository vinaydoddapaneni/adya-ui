import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuiAvatar } from './aui-avatar';

// Register the element if not already registered
if (!customElements.get('aui-avatar')) {
  customElements.define('aui-avatar', AuiAvatar);
}

describe('AuiAvatar', () => {
  let avatar: AuiAvatar;

  beforeEach(() => {
    avatar = new AuiAvatar();
    document.body.appendChild(avatar);
  });

  afterEach(() => {
    document.body.removeChild(avatar);
  });

  it('should render with default attributes', () => {
    expect(avatar.shadowRoot).toBeTruthy();
    const avatarElement = avatar.shadowRoot!.querySelector('.aui-avatar');
    expect(avatarElement).toBeTruthy();
    expect(avatarElement!.classList.contains('size-medium')).toBe(true);
    expect(avatarElement!.classList.contains('variant-circular')).toBe(true);
  });

  it('should render image when src is provided', () => {
    avatar.setAttribute('src', 'https://example.com/avatar.jpg');
    avatar.setAttribute('alt', 'User Avatar');
    
    const img = avatar.shadowRoot!.querySelector('.avatar-image') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toBe('https://example.com/avatar.jpg');
    expect(img.alt).toBe('User Avatar');
  });

  it('should render initials when provided', () => {
    avatar.setAttribute('initials', 'AB');
    
    const initials = avatar.shadowRoot!.querySelector('.avatar-initials');
    expect(initials).toBeTruthy();
    expect(initials!.textContent).toBe('AB');
  });

  it('should render placeholder when no src or initials', () => {
    const placeholder = avatar.shadowRoot!.querySelector('.avatar-placeholder');
    expect(placeholder).toBeTruthy();
    expect(placeholder!.querySelector('svg')).toBeTruthy();
  });

  it('should apply size variants correctly', () => {
    avatar.setAttribute('size', 'large');
    
    const avatarElement = avatar.shadowRoot!.querySelector('.aui-avatar');
    expect(avatarElement!.classList.contains('size-large')).toBe(true);
  });

  it('should apply shape variants correctly', () => {
    avatar.setAttribute('variant', 'rounded');
    
    const avatarElement = avatar.shadowRoot!.querySelector('.aui-avatar');
    expect(avatarElement!.classList.contains('variant-rounded')).toBe(true);
  });

  it('should update when attributes change', () => {
    avatar.setAttribute('initials', 'XY');
    expect(avatar.shadowRoot!.querySelector('.avatar-initials')!.textContent).toBe('XY');
    
    avatar.setAttribute('src', 'https://example.com/new.jpg');
    expect(avatar.shadowRoot!.querySelector('.avatar-image')).toBeTruthy();
    expect(avatar.shadowRoot!.querySelector('.avatar-initials')).toBeFalsy();
  });
});
