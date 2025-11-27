import { AuiElement } from '../../base/aui-element';
import { styles } from './aui-timepicker.styles';
/**
 * AuiTimePicker - A time picker component
 *
 * @element aui-timepicker
 *
 * @attr {string} value - Selected time (HH:MM format)
 * @attr {string} placeholder - Input placeholder
 * @attr {boolean} use-24-hour - Use 24-hour format (default: false)
 *
 * @fires change - Emitted when time changes
 */
export class AuiTimePicker extends AuiElement {
    static get observedAttributes() {
        return ['value', 'placeholder', 'use-24-hour'];
    }
    constructor() {
        super();
        this.isOpen = false;
        this.selectedHour = 12;
        this.selectedMinute = 0;
        this.selectedPeriod = 'AM';
        this.handleDocumentClick = (e) => {
            if (!this.contains(e.target)) {
                this.closeDropdown();
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this.handleDocumentClick);
        this.parseValue();
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
        this.parseValue();
    }
    get placeholder() {
        return this.getAttribute('placeholder') || 'Select time';
    }
    set placeholder(val) {
        this.setAttribute('placeholder', val);
    }
    get use24Hour() {
        return this.hasAttribute('use-24-hour');
    }
    set use24Hour(val) {
        if (val) {
            this.setAttribute('use-24-hour', '');
        }
        else {
            this.removeAttribute('use-24-hour');
        }
    }
    parseValue() {
        if (!this.value)
            return;
        const parts = this.value.split(':');
        if (parts.length !== 2)
            return;
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        if (isNaN(hours) || isNaN(minutes))
            return;
        this.selectedMinute = minutes;
        if (this.use24Hour) {
            this.selectedHour = hours;
        }
        else {
            if (hours === 0) {
                this.selectedHour = 12;
                this.selectedPeriod = 'AM';
            }
            else if (hours === 12) {
                this.selectedHour = 12;
                this.selectedPeriod = 'PM';
            }
            else if (hours > 12) {
                this.selectedHour = hours - 12;
                this.selectedPeriod = 'PM';
            }
            else {
                this.selectedHour = hours;
                this.selectedPeriod = 'AM';
            }
        }
    }
    toggleDropdown() {
        this.isOpen = !this.isOpen;
        this.render();
    }
    closeDropdown() {
        this.isOpen = false;
        this.render();
    }
    selectHour(hour) {
        this.selectedHour = hour;
        this.updateValue();
    }
    selectMinute(minute) {
        this.selectedMinute = minute;
        this.updateValue();
    }
    selectPeriod(period) {
        this.selectedPeriod = period;
        this.updateValue();
    }
    updateValue() {
        let hours = this.selectedHour;
        if (!this.use24Hour) {
            if (this.selectedPeriod === 'PM' && hours !== 12) {
                hours += 12;
            }
            else if (this.selectedPeriod === 'AM' && hours === 12) {
                hours = 0;
            }
        }
        const value = `${String(hours).padStart(2, '0')}:${String(this.selectedMinute).padStart(2, '0')}`;
        this.value = value;
        this.emit('change', { value });
        this.render();
    }
    formatTime() {
        if (!this.value)
            return '';
        if (this.use24Hour) {
            return this.value;
        }
        else {
            const hourStr = String(this.selectedHour).padStart(2, '0');
            const minuteStr = String(this.selectedMinute).padStart(2, '0');
            return `${hourStr}:${minuteStr} ${this.selectedPeriod}`;
        }
    }
    render() {
        const maxHour = this.use24Hour ? 23 : 12;
        const startHour = this.use24Hour ? 0 : 1;
        const hoursHTML = Array.from({ length: maxHour - startHour + 1 }, (_, i) => {
            const hour = startHour + i;
            const isSelected = hour === this.selectedHour;
            return `
        <div class="aui-timepicker__option ${isSelected ? 'aui-timepicker__option--selected' : ''}" data-hour="${hour}">
          ${String(hour).padStart(2, '0')}
        </div>
      `;
        }).join('');
        const minutesHTML = Array.from({ length: 60 }, (_, i) => {
            const isSelected = i === this.selectedMinute;
            return `
        <div class="aui-timepicker__option ${isSelected ? 'aui-timepicker__option--selected' : ''}" data-minute="${i}">
          ${String(i).padStart(2, '0')}
        </div>
      `;
        }).join('');
        const periodHTML = !this.use24Hour ? `
      <div class="aui-timepicker__column">
        <div class="aui-timepicker__option ${this.selectedPeriod === 'AM' ? 'aui-timepicker__option--selected' : ''}" data-period="AM">AM</div>
        <div class="aui-timepicker__option ${this.selectedPeriod === 'PM' ? 'aui-timepicker__option--selected' : ''}" data-period="PM">PM</div>
      </div>
    ` : '';
        this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-timepicker">
        <input
          type="text"
          class="aui-timepicker__input"
          placeholder="${this.placeholder}"
          value="${this.formatTime()}"
          readonly
        />
        <div class="aui-timepicker__dropdown ${this.isOpen ? 'aui-timepicker__dropdown--open' : ''}">
          <div class="aui-timepicker__column">${hoursHTML}</div>
          <div class="aui-timepicker__column">${minutesHTML}</div>
          ${periodHTML}
        </div>
      </div>
    `;
        // Add event listeners
        const input = this._shadowRoot.querySelector('.aui-timepicker__input');
        input?.addEventListener('click', () => this.toggleDropdown());
        this._shadowRoot.querySelectorAll('[data-hour]').forEach(el => {
            el.addEventListener('click', () => {
                const hour = parseInt(el.dataset.hour || '0', 10);
                this.selectHour(hour);
            });
        });
        this._shadowRoot.querySelectorAll('[data-minute]').forEach(el => {
            el.addEventListener('click', () => {
                const minute = parseInt(el.dataset.minute || '0', 10);
                this.selectMinute(minute);
            });
        });
        this._shadowRoot.querySelectorAll('[data-period]').forEach(el => {
            el.addEventListener('click', () => {
                const period = el.dataset.period;
                this.selectPeriod(period);
            });
        });
    }
}
if (!customElements.get('aui-timepicker')) {
    customElements.define('aui-timepicker', AuiTimePicker);
}
//# sourceMappingURL=aui-timepicker.js.map