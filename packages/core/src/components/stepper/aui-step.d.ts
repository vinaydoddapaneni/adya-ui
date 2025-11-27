import { AuiElement } from '../../base/aui-element';
/**
 * AuiStep - A single step in a stepper
 *
 * @element aui-step
 *
 * @attr {string} label - Step label
 * @attr {string} description - Step description (optional)
 *
 * @slot - Default slot for step content
 */
export declare class AuiStep extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    get label(): string;
    set label(val: string);
    get description(): string;
    set description(val: string);
    protected render(): void;
}
//# sourceMappingURL=aui-step.d.ts.map