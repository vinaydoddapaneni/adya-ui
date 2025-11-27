import { AuiElement } from '../../base/aui-element';
export interface AuiTreeNode {
    id: string;
    label: string;
    icon?: string;
    children?: AuiTreeNode[];
}
/**
 * AuiTreeView - A tree view component for hierarchical data
 *
 * @element aui-treeview
 *
 * @attr {string} selected - ID of the selected node
 *
 * @fires node-select - Emitted when a node is selected
 * @fires node-expand - Emitted when a node is expanded
 * @fires node-collapse - Emitted when a node is collapsed
 */
export declare class AuiTreeView extends AuiElement {
    static get observedAttributes(): string[];
    private nodes;
    private expandedNodes;
    constructor();
    get selected(): string;
    set selected(val: string);
    setNodes(nodes: AuiTreeNode[]): void;
    expandNode(nodeId: string): void;
    collapseNode(nodeId: string): void;
    expandAll(): void;
    collapseAll(): void;
    private toggleNode;
    private selectNode;
    private renderNode;
    protected render(): void;
}
//# sourceMappingURL=aui-treeview.d.ts.map