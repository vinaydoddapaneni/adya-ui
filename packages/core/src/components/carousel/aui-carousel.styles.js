import { css } from '../../base/utils';
export const styles = css `
  :host {
    display: block;
    position: relative;
    overflow: hidden;
    font-family: var(--aui-font-family);
  }

  .aui-carousel {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .aui-carousel__track {
    display: flex;
    transition: transform var(--aui-transition-normal);
    height: 100%;
  }

  .aui-carousel__slide {
    flex: 0 0 100%;
    min-width: 100%;
    height: 100%;
  }

  .aui-carousel__controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    padding: 0 var(--aui-spacing-md);
    box-sizing: border-box;
  }

  .aui-carousel__button {
    pointer-events: auto;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--aui-transition-fast);
  }

  .aui-carousel__button:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .aui-carousel__button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .aui-carousel__indicators {
    position: absolute;
    bottom: var(--aui-spacing-md);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: var(--aui-spacing-xs);
  }

  .aui-carousel__indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background-color var(--aui-transition-fast);
  }

  .aui-carousel__indicator--active {
    background-color: rgba(255, 255, 255, 1);
  }

  :host([autoplay]) .aui-carousel__track {
    transition: transform var(--aui-transition-slow);
  }
`;
//# sourceMappingURL=aui-carousel.styles.js.map