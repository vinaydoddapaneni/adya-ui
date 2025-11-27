import { AuiElement } from '../../base/aui-element';
export type AuiAppBarPosition = 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
export type AuiAppBarColor = 'primary' | 'secondary' | 'default' | 'transparent';
/**
 * AuiAppBar - A top app bar component
 *
 * @element aui-app-bar
 *
 * @attr {string} position - Positioning: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'
 * @attr {string} color - Background color: 'primary' | 'secondary' | 'default' | 'transparent'
 * @attr {boolean} dense - Reduces the height of the app bar
 * @attr {boolean} flat - Removes the shadow
 * @attr {boolean} outlined - Applies an outlined style
 *
 * @slot - Default slot for title or center content
 * @slot start - Slot for navigation icon or start content
 * @slot end - Slot for action items or end content
 */
export declare class AuiAppBar extends AuiElement {
    static get observedAttributes(): string[];
    get position(): AuiAppBarPosition;
    set position(value: AuiAppBarPosition);
    get color(): AuiAppBarColor;
    set color(value: AuiAppBarColor);
    get dense(): boolean;
    set dense(value: boolean);
    get flat(): boolean;
    set flat(value: boolean);
    get outlined(): boolean;
    set outlined(value: boolean);
    protected render(): void;
}
//# sourceMappingURL=aui-app-bar.d.ts.map