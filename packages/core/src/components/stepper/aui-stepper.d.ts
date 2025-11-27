import { AuiElement } from '../../base/aui-element';
export type AuiStepperOrientation = 'horizontal' | 'vertical';
/**
 * AuiStepper - A stepper component for multi-step processes
 *
 * @element aui-stepper
 *
 * @attr {number} active - Active step index (0-based)
 * @attr {string} orientation - Stepper orientation: 'horizontal' | 'vertical'
 *
 * @slot - Default slot for step elements
 *
 * @fires step-change - Emitted when active step changes
 */
export declare class AuiStepper extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    get active(): number;
    set active(val: number);
    get orientation(): AuiStepperOrientation;
    set orientation(val: AuiStepperOrientation);
    private getSteps;
    private handleStepClick;
    protected render(): void;
}
//# sourceMappingURL=aui-stepper.d.ts.map