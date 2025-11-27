import { AuiElement } from '../../base/aui-element';
/**
 * AuiSelect - A dropdown selection component
 *
 * @element aui-select
 *
 * @attr {string} label - Input label
 * @attr {string} placeholder - Input placeholder
 * @attr {string} value - Selected value
 * @attr {boolean} disabled - Whether the input is disabled
 *
 * @fires change - Emitted when value changes
 */
export declare class AuiSelect extends AuiElement {
    static get observedAttributes(): string[];
    get label(): string;
    set label(value: string);
    get placeholder(): string;
    set placeholder(value: string);
    get value(): string;
    set value(value: string);
    get disabled(): boolean;
    set disabled(value: boolean);
    protected render(): void;
    private setupEventListeners;
    private syncOptions;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
//# sourceMappingURL=aui-select.d.ts.map