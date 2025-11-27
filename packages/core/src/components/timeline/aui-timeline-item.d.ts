import { AuiElement } from '../../base/aui-element';
export type AuiTimelineItemVariant = 'filled' | 'outlined';
/**
 * AuiTimelineItem - A single item in a timeline
 *
 * @element aui-timeline-item
 *
 * @attr {string} time - Time/date of the event
 * @attr {string} title - Event title
 * @attr {string} variant - Dot variant: 'filled' | 'outlined'
 *
 * @slot - Default slot for event description
 */
export declare class AuiTimelineItem extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    get time(): string;
    set time(val: string);
    get title(): string;
    set title(val: string);
    get variant(): AuiTimelineItemVariant;
    set variant(val: AuiTimelineItemVariant);
    protected render(): void;
}
//# sourceMappingURL=aui-timeline-item.d.ts.map