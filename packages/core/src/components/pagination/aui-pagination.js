import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-pagination.styles';
/**
 * AuiPagination - A pagination component
 *
 * @element aui-pagination
 *
 * @attr {number} page - Current page (1-indexed)
 * @attr {number} total - Total number of pages
 * @attr {number} siblings - Number of sibling pages to show on each side
 * @attr {boolean} show-first-last - Whether to show first/last buttons
 *
 * @fires change - Emitted when page changes
 */
export class AuiPagination extends AuiElement {
    static get observedAttributes() {
        return ['page', 'total', 'siblings', 'show-first-last'];
    }
    constructor() {
        super();
    }
    get page() {
        return parseInt(this.getAttribute('page') || '1', 10);
    }
    set page(val) {
        this.setAttribute('page', val.toString());
    }
    get total() {
        return parseInt(this.getAttribute('total') || '1', 10);
    }
    set total(val) {
        this.setAttribute('total', val.toString());
    }
    get siblings() {
        return parseInt(this.getAttribute('siblings') || '1', 10);
    }
    set siblings(val) {
        this.setAttribute('siblings', val.toString());
    }
    get showFirstLast() {
        return this.hasAttribute('show-first-last');
    }
    set showFirstLast(val) {
        if (val) {
            this.setAttribute('show-first-last', '');
        }
        else {
            this.removeAttribute('show-first-last');
        }
    }
    handlePageClick(newPage) {
        if (newPage < 1 || newPage > this.total || newPage === this.page) {
            return;
        }
        this.page = newPage;
        this.emit('change', { page: newPage });
    }
    getPageNumbers() {
        const current = this.page;
        const total = this.total;
        const siblings = this.siblings;
        const pages = [];
        if (total <= 7) {
            // Show all pages if total is small
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        }
        else {
            // Always show first page
            pages.push(1);
            const leftSibling = Math.max(2, current - siblings);
            const rightSibling = Math.min(total - 1, current + siblings);
            if (leftSibling > 2) {
                pages.push('ellipsis');
            }
            for (let i = leftSibling; i <= rightSibling; i++) {
                pages.push(i);
            }
            if (rightSibling < total - 1) {
                pages.push('ellipsis');
            }
            // Always show last page
            pages.push(total);
        }
        return pages;
    }
    render() {
        const pages = this.getPageNumbers();
        const current = this.page;
        const total = this.total;
        let buttonsHTML = '';
        // First button
        if (this.showFirstLast) {
            buttonsHTML += `
        <button 
          class="aui-pagination__button" 
          ${current === 1 ? 'disabled' : ''}
          data-page="1"
        >
          First
        </button>
      `;
        }
        // Previous button
        buttonsHTML += `
      <button 
        class="aui-pagination__button" 
        ${current === 1 ? 'disabled' : ''}
        data-page="${current - 1}"
      >
        ‹
      </button>
    `;
        // Page numbers
        pages.forEach(page => {
            if (page === 'ellipsis') {
                buttonsHTML += '<span class="aui-pagination__ellipsis">...</span>';
            }
            else {
                buttonsHTML += `
          <button 
            class="aui-pagination__button ${page === current ? 'aui-pagination__button--active' : ''}" 
            data-page="${page}"
          >
            ${page}
          </button>
        `;
            }
        });
        // Next button
        buttonsHTML += `
      <button 
        class="aui-pagination__button" 
        ${current === total ? 'disabled' : ''}
        data-page="${current + 1}"
      >
        ›
      </button>
    `;
        // Last button
        if (this.showFirstLast) {
            buttonsHTML += `
        <button 
          class="aui-pagination__button" 
          ${current === total ? 'disabled' : ''}
          data-page="${total}"
        >
          Last
        </button>
      `;
        }
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <nav role="navigation" aria-label="Pagination">
        ${buttonsHTML}
      </nav>
    `;
        // Add click listeners
        this._shadowRoot.querySelectorAll('[data-page]').forEach(button => {
            button.addEventListener('click', () => {
                const page = parseInt(button.dataset.page || '1', 10);
                this.handlePageClick(page);
            });
        });
    }
}
if (!customElements.get('aui-pagination')) {
    customElements.define('aui-pagination', AuiPagination);
}
//# sourceMappingURL=aui-pagination.js.map