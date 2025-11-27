import { AuiElement } from '../../base/aui-element';
/**
 * AuiSwitch - A toggle switch component
 *
 * @element aui-switch
 *
 * @attr {boolean} checked - Whether the switch is checked
 * @attr {boolean} disabled - Whether the switch is disabled
 * @attr {string} label - Label to display next to switch
 * @attr {string} name - Name of the switch input
 * @attr {string} value - Value of the switch input
 *
 * @fires change - Emitted when checked state changes
 */
export declare class AuiSwitch extends AuiElement {
    static get observedAttributes(): string[];
    get checked(): boolean;
    set checked(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    get label(): string;
    set label(value: string);
    get name(): string;
    set name(value: string);
    get value(): string;
    set value(value: string);
    protected render(): void;
    private setupEventListeners;
}
//# sourceMappingURL=aui-switch.d.ts.map