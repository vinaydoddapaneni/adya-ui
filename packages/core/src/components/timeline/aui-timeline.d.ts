import { AuiElement } from '../../base/aui-element';
export type AuiTimelinePosition = 'left' | 'right' | 'alternate';
/**
 * AuiTimeline - A timeline component for displaying chronological events
 *
 * @element aui-timeline
 *
 * @attr {string} position - Timeline position: 'left' | 'right' | 'alternate'
 *
 * @slot - Default slot for timeline items
 */
export declare class AuiTimeline extends AuiElement {
    static get observedAttributes(): string[];
    constructor();
    get position(): AuiTimelinePosition;
    set position(val: AuiTimelinePosition);
    protected render(): void;
}
//# sourceMappingURL=aui-timeline.d.ts.map