import { AuiElement } from '../../base/aui-element';
export type AuiTextFieldVariant = 'outlined' | 'filled' | 'standard';
export type AuiTextFieldSize = 'small' | 'medium' | 'large';
/**
 * AuiTextField - A versatile text input component
 *
 * @element aui-textfield
 *
 * @attr {string} label - Input label
 * @attr {string} placeholder - Input placeholder
 * @attr {string} value - Input value
 * @attr {string} type - Input type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
 * @attr {string} variant - Visual variant: 'outlined' | 'filled' | 'standard'
 * @attr {string} size - Size: 'small' | 'medium' | 'large'
 * @attr {boolean} disabled - Whether the input is disabled
 * @attr {boolean} readonly - Whether the input is readonly
 * @attr {boolean} required - Whether the input is required
 * @attr {boolean} error - Whether the input is in error state
 * @attr {string} helper-text - Helper text to display below input
 * @attr {number} maxlength - Maximum length of input
 * @attr {number} minlength - Minimum length of input
 *
 * @slot prefix - Slot for prefix icon or content
 * @slot suffix - Slot for suffix icon or content
 *
 * @fires input - Emitted when value changes
 * @fires change - Emitted when value is committed
 * @fires focus - Emitted when input is focused
 * @fires blur - Emitted when input is blurred
 */
export declare class AuiTextField extends AuiElement {
    static get observedAttributes(): string[];
    get label(): string;
    set label(value: string);
    get placeholder(): string;
    set placeholder(value: string);
    get value(): string;
    set value(value: string);
    get type(): string;
    set type(value: string);
    get variant(): AuiTextFieldVariant;
    set variant(value: AuiTextFieldVariant);
    get size(): AuiTextFieldSize;
    set size(value: AuiTextFieldSize);
    get disabled(): boolean;
    set disabled(value: boolean);
    get readonly(): boolean;
    set readonly(value: boolean);
    get required(): boolean;
    set required(value: boolean);
    get error(): boolean;
    set error(value: boolean);
    get helperText(): string;
    set helperText(value: string);
    get maxlength(): number | null;
    set maxlength(value: number | null);
    get minlength(): number | null;
    set minlength(value: number | null);
    protected render(): void;
    private setupEventListeners;
}
//# sourceMappingURL=aui-textfield.d.ts.map