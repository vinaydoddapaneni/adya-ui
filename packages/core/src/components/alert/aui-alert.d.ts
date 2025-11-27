import { AuiElement } from '../../base/aui-element';
export type AuiAlertSeverity = 'success' | 'info' | 'warning' | 'error';
export type AuiAlertVariant = 'filled' | 'outlined' | 'standard';
/**
 * AuiAlert - A feedback component
 *
 * @element aui-alert
 *
 * @attr {string} severity - Alert severity: 'success' | 'info' | 'warning' | 'error'
 * @attr {string} variant - Alert variant: 'filled' | 'outlined' | 'standard'
 * @attr {boolean} dismissible - Whether the alert can be dismissed
 * @attr {boolean} open - Whether the alert is visible
 * @attr {string} title - Alert title
 * @attr {number} duration - Auto-dismiss duration in milliseconds
 *
 * @slot - Default slot for content
 * @slot icon - Slot for custom icon
 * @slot title - Slot for alert title
 * @slot action - Slot for action buttons
 *
 * @fires close - Emitted when the alert is closed
 * @fires show - Emitted when the alert is shown
 * @fires hide - Emitted when the alert is hidden
 */
export declare class AuiAlert extends AuiElement {
    private autoDismissTimer;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void;
    get severity(): AuiAlertSeverity;
    set severity(value: AuiAlertSeverity);
    get variant(): AuiAlertVariant;
    set variant(value: AuiAlertVariant);
    get dismissible(): boolean;
    set dismissible(value: boolean);
    get open(): boolean;
    set open(value: boolean);
    get title(): string;
    set title(value: string);
    get duration(): number;
    set duration(value: number);
    close(): void;
    show(): void;
    private handleAutoDismiss;
    private clearAutoDismissTimer;
    protected render(): void;
    private setupEventListeners;
    private getDefaultIcon;
}
//# sourceMappingURL=aui-alert.d.ts.map