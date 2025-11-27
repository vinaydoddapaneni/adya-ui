import { AuiElement } from '../../base/aui-element';
/**
 * AuiIcon - A component for displaying icons
 *
 * @element aui-icon
 *
 * @attr {string} name - The name of the icon (if using an icon library)
 * @attr {string} src - The URL of the SVG icon
 * @attr {string} label - The accessible label for the icon
 * @attr {string} size - The size of the icon: 'small' | 'medium' | 'large'
 */
export declare class AuiIcon extends AuiElement {
    static get observedAttributes(): string[];
    get name(): string;
    set name(value: string);
    get src(): string;
    set src(value: string);
    get label(): string;
    set label(value: string);
    get size(): 'small' | 'medium' | 'large';
    set size(value: 'small' | 'medium' | 'large');
    protected render(): void;
}
//# sourceMappingURL=aui-icon.d.ts.map