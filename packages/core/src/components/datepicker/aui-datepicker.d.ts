import { AuiElement } from '../../base/aui-element';
/**
 * AuiDatePicker - A date picker component
 *
 * @element aui-datepicker
 *
 * @attr {string} value - Selected date (ISO format: YYYY-MM-DD)
 * @attr {string} placeholder - Input placeholder
 * @attr {string} min - Minimum selectable date (ISO format)
 * @attr {string} max - Maximum selectable date (ISO format)
 *
 * @fires change - Emitted when date changes
 */
export declare class AuiDatePicker extends AuiElement {
    static get observedAttributes(): string[];
    private isOpen;
    private currentMonth;
    private currentYear;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    get value(): string;
    set value(val: string);
    get placeholder(): string;
    set placeholder(val: string);
    get min(): string;
    set min(val: string);
    get max(): string;
    set max(val: string);
    private handleDocumentClick;
    private toggleCalendar;
    private closeCalendar;
    private prevMonth;
    private nextMonth;
    private selectDate;
    private getDaysInMonth;
    private getFirstDayOfMonth;
    private formatDate;
    private isDateDisabled;
    protected render(): void;
}
//# sourceMappingURL=aui-datepicker.d.ts.map