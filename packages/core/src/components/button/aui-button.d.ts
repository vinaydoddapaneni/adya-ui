import { AuiElement } from '../../base';
export type AuiButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';
export type AuiButtonSize = 'small' | 'medium' | 'large';
/**
 * AuiButton - A versatile button component
 *
 * @element aui-button
 *
 * @attr {string} variant - Button variant: 'primary' | 'secondary' | 'outlined' | 'text'
 * @attr {string} size - Button size: 'small' | 'medium' | 'large'
 * @attr {boolean} disabled - Whether the button is disabled
 * @attr {boolean} loading - Whether the button is in loading state
 * @attr {string} type - Button type: 'button' | 'submit' | 'reset'
 *
 * @fires aui-click - Emitted when button is clicked
 *
 * @slot - Default slot for button content
 * @slot icon - Slot for button icon
 */
export declare class AuiButton extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    get variant(): AuiButtonVariant;
    set variant(value: AuiButtonVariant);
    get size(): AuiButtonSize;
    set size(value: AuiButtonSize);
    get disabled(): boolean;
    set disabled(value: boolean);
    get loading(): boolean;
    set loading(value: boolean);
    get type(): string;
    set type(value: string);
    connectedCallback(): void;
    private setupEventListeners;
    private handleClick;
    protected render(): void;
}
//# sourceMappingURL=aui-button.d.ts.map