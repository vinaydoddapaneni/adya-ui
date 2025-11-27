import { AuiElement } from '../../base/aui-element';
/**
 * AuiTimePicker - A time picker component
 *
 * @element aui-timepicker
 *
 * @attr {string} value - Selected time (HH:MM format)
 * @attr {string} placeholder - Input placeholder
 * @attr {boolean} use-24-hour - Use 24-hour format (default: false)
 *
 * @fires change - Emitted when time changes
 */
export declare class AuiTimePicker extends AuiElement {
    static get observedAttributes(): string[];
    private isOpen;
    private selectedHour;
    private selectedMinute;
    private selectedPeriod;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    get value(): string;
    set value(val: string);
    get placeholder(): string;
    set placeholder(val: string);
    get use24Hour(): boolean;
    set use24Hour(val: boolean);
    private handleDocumentClick;
    private parseValue;
    private toggleDropdown;
    private closeDropdown;
    private selectHour;
    private selectMinute;
    private selectPeriod;
    private updateValue;
    private formatTime;
    protected render(): void;
}
//# sourceMappingURL=aui-timepicker.d.ts.map