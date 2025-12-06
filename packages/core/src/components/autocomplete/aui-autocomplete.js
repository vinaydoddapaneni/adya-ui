import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-autocomplete.styles';
/**
 * AuiAutocomplete - An autocomplete input component
 *
 * @element aui-autocomplete
 *
 * @attr {string} value - Selected value
 * @attr {string} placeholder - Input placeholder
 * @attr {boolean} disabled - Whether the input is disabled
 * @attr {boolean} loading - Whether options are loading
 * @attr {number} min-chars - Minimum characters to trigger suggestions (default: 1)
 *
 * @fires change - Emitted when value changes
 * @fires input - Emitted when input value changes
 */
export class AuiAutocomplete extends AuiElement {
    static get observedAttributes() {
        return ['value', 'placeholder', 'disabled', 'loading', 'min-chars'];
    }
    constructor() {
        super();
        this.options = [];
        this.filteredOptions = [];
        this.isOpen = false;
        this.highlightedIndex = -1;
        this.inputValue = '';
        this.handleDocumentClick = (e) => {
            if (!this.contains(e.target)) {
                this.closeDropdown();
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this.handleDocumentClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this.handleDocumentClick);
    }
    get value() {
        return this.getAttribute('value') || '';
    }
    set value(val) {
        this.setAttribute('value', val);
    }
    get placeholder() {
        return this.getAttribute('placeholder') || '';
    }
    set placeholder(val) {
        this.setAttribute('placeholder', val);
    }
    get disabled() {
        return this.hasAttribute('disabled');
    }
    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '');
        }
        else {
            this.removeAttribute('disabled');
        }
    }
    get loading() {
        return this.hasAttribute('loading');
    }
    set loading(val) {
        if (val) {
            this.setAttribute('loading', '');
        }
        else {
            this.removeAttribute('loading');
        }
    }
    get minChars() {
        return parseInt(this.getAttribute('min-chars') || '1', 10);
    }
    set minChars(val) {
        this.setAttribute('min-chars', val.toString());
    }
    setOptions(options) {
        this.options = options;
        this.filterOptions();
    }
    handleInput(e) {
        const input = e.target;
        this.inputValue = input.value;
        this.emit('input', { value: this.inputValue });
        if (this.inputValue.length >= this.minChars) {
            this.filterOptions();
            this.openDropdown();
        }
        else {
            this.closeDropdown();
        }
    }
    handleKeyDown(e) {
        if (!this.isOpen) {
            if (e.key === 'ArrowDown') {
                this.openDropdown();
                e.preventDefault();
            }
            return;
        }
        switch (e.key) {
            case 'ArrowDown':
                this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.filteredOptions.length - 1);
                this.render();
                e.preventDefault();
                break;
            case 'ArrowUp':
                this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
                this.render();
                e.preventDefault();
                break;
            case 'Enter':
                if (this.highlightedIndex >= 0) {
                    const selectedOption = this.filteredOptions[this.highlightedIndex];
                    if (selectedOption) {
                        this.selectOption(selectedOption);
                    }
                }
                e.preventDefault();
                break;
            case 'Escape':
                this.closeDropdown();
                e.preventDefault();
                break;
        }
    }
    filterOptions() {
        const query = this.inputValue.toLowerCase();
        this.filteredOptions = this.options.filter(option => option.label.toLowerCase().includes(query));
        this.highlightedIndex = this.filteredOptions.length > 0 ? 0 : -1;
        this.render();
    }
    selectOption(option) {
        this.value = option.value;
        this.inputValue = option.label;
        this.emit('change', { value: option.value, label: option.label });
        this.closeDropdown();
        this.render();
    }
    openDropdown() {
        this.isOpen = true;
        this.render();
    }
    closeDropdown() {
        this.isOpen = false;
        this.highlightedIndex = -1;
        this.render();
    }
    render() {
        const isOpen = this.isOpen;
        const loading = this.loading;
        const disabled = this.disabled;
        let dropdownContent = '';
        if (loading) {
            dropdownContent = '<div class="aui-autocomplete__loading">Loading...</div>';
        }
        else if (this.filteredOptions.length === 0) {
            dropdownContent = '<div class="aui-autocomplete__no-options">No options found</div>';
        }
        else {
            dropdownContent = this.filteredOptions.map((option, index) => {
                const isHighlighted = index === this.highlightedIndex;
                const isSelected = option.value === this.value;
                return `
          <div 
            class="aui-autocomplete__option ${isHighlighted ? 'aui-autocomplete__option--highlighted' : ''} ${isSelected ? 'aui-autocomplete__option--selected' : ''}"
            data-index="${index}"
          >
            ${option.label}
          </div>
        `;
            }).join('');
        }
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-autocomplete">
        <input
          type="text"
          class="aui-autocomplete__input"
          placeholder="${this.placeholder}"
          value="${this.inputValue}"
          ${disabled ? 'disabled' : ''}
        />
        <div class="aui-autocomplete__dropdown ${isOpen ? 'aui-autocomplete__dropdown--open' : ''}">
          ${dropdownContent}
        </div>
      </div>
    `;
        // Add event listeners
        const input = this._shadowRoot.querySelector('.aui-autocomplete__input');
        input?.addEventListener('input', (e) => this.handleInput(e));
        input?.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this._shadowRoot.querySelectorAll('.aui-autocomplete__option').forEach((option, index) => {
            option.addEventListener('click', () => {
                const selectedOption = this.filteredOptions[index];
                if (selectedOption) {
                    this.selectOption(selectedOption);
                }
            });
        });
    }
}
if (!customElements.get('aui-autocomplete')) {
    customElements.define('aui-autocomplete', AuiAutocomplete);
}
//# sourceMappingURL=aui-autocomplete.js.map