import { AuiElement } from '../../base/aui-element';
export declare class AuiBadge extends AuiElement {
    static get observedAttributes(): string[];
    get value(): string;
    set value(v: string | number);
    get variant(): string;
    set variant(v: string);
    get size(): string;
    set size(v: string);
    get max(): number | string;
    set max(v: number | string);
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void;
    render(): void;
}
//# sourceMappingURL=aui-badge.d.ts.map