import { AuiElement } from '../../base/aui-element';
/**
 * AuiDialog - A modal dialog component
 *
 * @element aui-dialog
 *
 * @attr {boolean} open - Whether the dialog is open
 * @attr {string} headline - Dialog headline
 *
 * @slot - Default slot for content
 * @slot actions - Slot for action buttons
 *
 * @fires close - Emitted when dialog is closed
 */
export declare class AuiDialog extends AuiElement {
    static get observedAttributes(): string[];
    get open(): boolean;
    set open(value: boolean);
    get headline(): string;
    set headline(value: string);
    protected render(): void;
    private setupEventListeners;
    close(): void;
}
//# sourceMappingURL=aui-dialog.d.ts.map