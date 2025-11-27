import { AuiElement } from '../../base/aui-element';
export type AuiCardVariant = 'elevated' | 'outlined';
export type AuiCardPadding = 'none' | 'sm' | 'md' | 'lg';
/**
 * AuiCard - A versatile surface for content
 *
 * @element aui-card
 *
 * @attr {string} variant - Card variant: 'elevated' | 'outlined'
 * @attr {string} padding - Content padding: 'none' | 'sm' | 'md' | 'lg'
 *
 * @slot - Default slot for content
 */
export declare class AuiCard extends AuiElement {
    static get observedAttributes(): string[];
    get variant(): AuiCardVariant;
    set variant(value: AuiCardVariant);
    get padding(): AuiCardPadding;
    set padding(value: AuiCardPadding);
    protected render(): void;
}
//# sourceMappingURL=aui-card.d.ts.map