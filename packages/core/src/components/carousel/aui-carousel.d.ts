import { AuiElement } from '../../base/aui-element';
/**
 * AuiCarousel - A carousel/slider component
 *
 * @element aui-carousel
 *
 * @attr {number} active - Active slide index (0-based)
 * @attr {boolean} autoplay - Enable autoplay
 * @attr {number} interval - Autoplay interval in milliseconds (default: 3000)
 * @attr {boolean} loop - Enable infinite loop
 * @attr {boolean} show-controls - Show navigation controls
 * @attr {boolean} show-indicators - Show slide indicators
 *
 * @slot - Default slot for carousel slides
 *
 * @fires slide-change - Emitted when active slide changes
 */
export declare class AuiCarousel extends AuiElement {
    static get observedAttributes(): string[];
    private autoplayTimer;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    get active(): number;
    set active(val: number);
    get autoplay(): boolean;
    set autoplay(val: boolean);
    get interval(): number;
    set interval(val: number);
    get loop(): boolean;
    set loop(val: boolean);
    get showControls(): boolean;
    set showControls(val: boolean);
    get showIndicators(): boolean;
    set showIndicators(val: boolean);
    private getSlides;
    private goToSlide;
    private next;
    private prev;
    private startAutoplay;
    private stopAutoplay;
    private updateTrackPosition;
    protected render(): void;
}
//# sourceMappingURL=aui-carousel.d.ts.map