import { AuiElement } from '../../base/aui-element';
export declare class AuiRadio extends AuiElement {
    static get observedAttributes(): string[];
    get checked(): boolean;
    set checked(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    get name(): string;
    set name(value: string);
    get value(): string;
    set value(value: string);
    get label(): string;
    set label(value: string);
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleClick;
    protected render(): void;
}
//# sourceMappingURL=aui-radio.d.ts.map