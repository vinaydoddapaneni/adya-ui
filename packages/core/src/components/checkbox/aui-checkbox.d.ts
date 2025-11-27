import { AuiElement } from '../../base/aui-element';
export type AuiCheckboxSize = 'small' | 'medium' | 'large';
export type AuiCheckboxColor = 'primary' | 'secondary' | 'success' | 'error';
/**
 * AuiCheckbox - A boolean selection component
 *
 * @element aui-checkbox
 *
 * @attr {boolean} checked - Whether the checkbox is checked
 * @attr {boolean} indeterminate - Whether the checkbox is in indeterminate state
 * @attr {boolean} disabled - Whether the checkbox is disabled
 * @attr {boolean} required - Whether the checkbox is required
 * @attr {string} label - Label to display next to checkbox
 * @attr {string} name - Name of the checkbox input
 * @attr {string} value - Value of the checkbox input
 * @attr {string} size - Size: 'small' | 'medium' | 'large'
 * @attr {string} color - Color: 'primary' | 'secondary' | 'success' | 'error'
 *
 * @fires change - Emitted when checked state changes
 */
export declare class AuiCheckbox extends AuiElement {
    static get observedAttributes(): string[];
    get checked(): boolean;
    set checked(value: boolean);
    get indeterminate(): boolean;
    set indeterminate(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    get required(): boolean;
    set required(value: boolean);
    get label(): string;
    set label(value: string);
    get name(): string;
    set name(value: string);
    get value(): string;
    set value(value: string);
    get size(): AuiCheckboxSize;
    set size(value: AuiCheckboxSize);
    get color(): AuiCheckboxColor;
    set color(value: AuiCheckboxColor);
    protected render(): void;
    private setupEventListeners;
}
//# sourceMappingURL=aui-checkbox.d.ts.map