import { AuiElement } from '../../base/aui-element';
/**
 * AuiRating - A star rating component
 *
 * @element aui-rating
 *
 * @attr {number} value - Current rating value
 * @attr {number} max - Maximum rating (default: 5)
 * @attr {boolean} readonly - Whether the rating is readonly
 * @attr {boolean} disabled - Whether the rating is disabled
 * @attr {boolean} precision - Allow half-star ratings
 *
 * @fires change - Emitted when rating changes
 */
export declare class AuiRating extends AuiElement {
    static get observedAttributes(): string[];
    private hoverValue;
    constructor();
    get value(): number;
    set value(val: number);
    get max(): number;
    set max(val: number);
    get readonly(): boolean;
    set readonly(val: boolean);
    get disabled(): boolean;
    set disabled(val: boolean);
    get precision(): boolean;
    set precision(val: boolean);
    private handleStarClick;
    private handleStarHover;
    private handleMouseLeave;
    protected render(): void;
}
//# sourceMappingURL=aui-rating.d.ts.map