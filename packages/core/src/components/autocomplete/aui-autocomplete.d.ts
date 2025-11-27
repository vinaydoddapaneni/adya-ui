import { AuiElement } from '../../base/aui-element';
export interface AuiAutocompleteOption {
    label: string;
    value: string;
}
/**
 * AuiAutocomplete - An autocomplete input component
 *
 * @element aui-autocomplete
 *
 * @attr {string} value - Selected value
 * @attr {string} placeholder - Input placeholder
 * @attr {boolean} disabled - Whether the input is disabled
 * @attr {boolean} loading - Whether options are loading
 * @attr {number} min-chars - Minimum characters to trigger suggestions (default: 1)
 *
 * @fires change - Emitted when value changes
 * @fires input - Emitted when input value changes
 */
export declare class AuiAutocomplete extends AuiElement {
    static get observedAttributes(): string[];
    private options;
    private filteredOptions;
    private isOpen;
    private highlightedIndex;
    private inputValue;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    get value(): string;
    set value(val: string);
    get placeholder(): string;
    set placeholder(val: string);
    get disabled(): boolean;
    set disabled(val: boolean);
    get loading(): boolean;
    set loading(val: boolean);
    get minChars(): number;
    set minChars(val: number);
    setOptions(options: AuiAutocompleteOption[]): void;
    private handleDocumentClick;
    private handleInput;
    private handleKeyDown;
    private filterOptions;
    private selectOption;
    private openDropdown;
    private closeDropdown;
    protected render(): void;
}
//# sourceMappingURL=aui-autocomplete.d.ts.map