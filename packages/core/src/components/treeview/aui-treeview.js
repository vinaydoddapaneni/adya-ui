import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-treeview.styles';
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
export class AuiTreeView extends AuiElement {
    static get observedAttributes() {
        return ['selected'];
    }
    constructor() {
        super();
        this.nodes = [];
        this.expandedNodes = new Set();
    }
    get selected() {
        return this.getAttribute('selected') || '';
    }
    set selected(val) {
        this.setAttribute('selected', val);
    }
    setNodes(nodes) {
        this.nodes = nodes;
        this.render();
    }
    expandNode(nodeId) {
        this.expandedNodes.add(nodeId);
        this.emit('node-expand', { nodeId });
        this.render();
    }
    collapseNode(nodeId) {
        this.expandedNodes.delete(nodeId);
        this.emit('node-collapse', { nodeId });
        this.render();
    }
    expandAll() {
        const collectIds = (nodes) => {
            nodes.forEach(node => {
                if (node.children && node.children.length > 0) {
                    this.expandedNodes.add(node.id);
                    collectIds(node.children);
                }
            });
        };
        collectIds(this.nodes);
        this.render();
    }
    collapseAll() {
        this.expandedNodes.clear();
        this.render();
    }
    toggleNode(nodeId) {
        if (this.expandedNodes.has(nodeId)) {
            this.collapseNode(nodeId);
        }
        else {
            this.expandNode(nodeId);
        }
    }
    selectNode(nodeId) {
        this.selected = nodeId;
        this.emit('node-select', { nodeId });
        this.render();
    }
    renderNode(node) {
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = this.expandedNodes.has(node.id);
        const isSelected = this.selected === node.id;
        const expandIcon = hasChildren
            ? `<span class="aui-treeview__expand-icon ${isExpanded ? 'aui-treeview__expand-icon--expanded' : ''}" data-toggle="${node.id}">▶</span>`
            : '<span class="aui-treeview__expand-icon aui-treeview__expand-icon--empty"></span>';
        const icon = node.icon
            ? `<span class="aui-treeview__icon">${node.icon}</span>`
            : '';
        const childrenHTML = hasChildren
            ? `<ul class="aui-treeview__children">${node.children.map(child => this.renderNode(child)).join('')}</ul>`
            : '';
        return `
      <li class="aui-treeview__item ${isExpanded ? 'aui-treeview__item--expanded' : ''} ${isSelected ? 'aui-treeview__item--selected' : ''}" data-id="${node.id}">
        <div class="aui-treeview__item-content" data-select="${node.id}">
          ${expandIcon}
          ${icon}
          <span class="aui-treeview__label">${node.label}</span>
        </div>
        ${childrenHTML}
      </li>
    `;
    }
    render() {
        const nodesHTML = this.nodes.map(node => this.renderNode(node)).join('');
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <ul class="aui-treeview">
        ${nodesHTML}
      </ul>
    `;
        // Add event listeners
        this._shadowRoot.querySelectorAll('[data-toggle]').forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const nodeId = icon.dataset.toggle || '';
                this.toggleNode(nodeId);
            });
        });
        this._shadowRoot.querySelectorAll('[data-select]').forEach(content => {
            content.addEventListener('click', () => {
                const nodeId = content.dataset.select || '';
                this.selectNode(nodeId);
            });
        });
    }
}
if (!customElements.get('aui-treeview')) {
    customElements.define('aui-treeview', AuiTreeView);
}
//# sourceMappingURL=aui-treeview.js.map