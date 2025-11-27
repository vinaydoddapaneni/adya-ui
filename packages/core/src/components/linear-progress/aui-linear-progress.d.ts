import { AuiElement } from '../../base/aui-element';
/**
 * AuiLinearProgress - A linear progress indicator
 *
 * @element aui-linear-progress
 *
 * @attr {number} value - The progress value (0-100)
 * @attr {number} buffer - The buffer value (0-100)
 * @attr {boolean} indeterminate - Whether the progress is indeterminate
 */
export declare class AuiLinearProgress extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    get value(): number;
    set value(val: number);
    get buffer(): number;
    set buffer(val: number);
    get indeterminate(): boolean;
    set indeterminate(val: boolean);
    protected render(): void;
}
//# sourceMappingURL=aui-linear-progress.d.ts.map