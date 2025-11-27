import { AuiElement } from '../../base/aui-element';
export type AuiTypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
export type AuiTypographyColor = 'primary' | 'secondary' | 'text-primary' | 'text-secondary' | 'success' | 'error' | 'warning';
export type AuiTypographyAlign = 'left' | 'center' | 'right';
/**
 * AuiTypography - A component for consistent text styling
 *
 * @element aui-typography
 *
 * @attr {string} variant - Text variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline'
 * @attr {string} color - Text color: 'primary' | 'secondary' | 'text-primary' | 'text-secondary' | 'success' | 'error' | 'warning'
 * @attr {string} align - Text alignment: 'left' | 'center' | 'right'
 *
 * @slot - Default slot for text content
 */
export declare class AuiTypography extends AuiElement {
    static get observedAttributes(): string[];
    get variant(): AuiTypographyVariant;
    set variant(value: AuiTypographyVariant);
    get color(): AuiTypographyColor;
    set color(value: AuiTypographyColor);
    get align(): AuiTypographyAlign;
    set align(value: AuiTypographyAlign);
    protected render(): void;
    private getTagName;
}
//# sourceMappingURL=aui-typography.d.ts.map