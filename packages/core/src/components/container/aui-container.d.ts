import { AuiElement } from '../../base/aui-element';
export type AuiContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
/**
 * AuiContainer - A component to center content horizontally
 *
 * @element aui-container
 *
 * @attr {string} max-width - Max width of the container: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
 *
 * @slot - Default slot for content
 */
export declare class AuiContainer extends AuiElement {
    static get observedAttributes(): string[];
    get maxWidth(): AuiContainerMaxWidth;
    set maxWidth(value: AuiContainerMaxWidth);
    protected render(): void;
}
//# sourceMappingURL=aui-container.d.ts.map