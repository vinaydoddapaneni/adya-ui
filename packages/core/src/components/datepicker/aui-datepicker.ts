import { AuiElement } from '../../base/aui-element';

import { styles } from './aui-datepicker.styles';

/**
 * AuiDatePicker - A date picker component
 * 
 * @element aui-datepicker
 * 
 * @attr {string} value - Selected date (ISO format: YYYY-MM-DD)
 * @attr {string} placeholder - Input placeholder
 * @attr {string} min - Minimum selectable date (ISO format)
 * @attr {string} max - Maximum selectable date (ISO format)
 * 
 * @fires change - Emitted when date changes
 */
export class AuiDatePicker extends AuiElement {
  static get observedAttributes() {
    return ['value', 'placeholder', 'min', 'max'];
  }

  private isOpen = false;
  private currentMonth = new Date().getMonth();
  private currentYear = new Date().getFullYear();

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
  }

  get value(): string {
    return this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
  }

  get placeholder(): string {
    return this.getAttribute('placeholder') || 'Select date';
  }

  set placeholder(val: string) {
    this.setAttribute('placeholder', val);
  }

  get min(): string {
    return this.getAttribute('min') || '';
  }

  set min(val: string) {
    this.setAttribute('min', val);
  }

  get max(): string {
    return this.getAttribute('max') || '';
  }

  set max(val: string) {
    this.setAttribute('max', val);
  }

  private handleDocumentClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this.closeCalendar();
    }
  };

  private toggleCalendar() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.value) {
      const date = new Date(this.value);
      this.currentMonth = date.getMonth();
      this.currentYear = date.getFullYear();
    }
    this.render();
  }

  private closeCalendar() {
    this.isOpen = false;
    this.render();
  }

  private prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.render();
  }

  private nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.render();
  }

  private selectDate(year: number, month: number, day: number) {
    const date = new Date(year, month, day);
    this.value = date.toISOString().split('T')[0]!;
    this.emit('change', { value: this.value });
    this.closeCalendar();
  }

  private getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  private isDateDisabled(year: number, month: number, day: number): boolean {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split('T')[0]!;

    if (this.min && dateStr < this.min) return true;
    if (this.max && dateStr > this.max) return true;

    return false;
  }

  protected render() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
    const firstDay = this.getFirstDayOfMonth(this.currentYear, this.currentMonth);
    const today = new Date();
    const selectedDate = this.value ? new Date(this.value) : null;

    let daysHTML = '';

    // Previous month days
    const prevMonthDays = this.getDaysInMonth(
      this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear,
      this.currentMonth === 0 ? 11 : this.currentMonth - 1
    );

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      daysHTML += `<div class="aui-datepicker__day aui-datepicker__day--other-month">${day}</div>`;
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day &&
        today.getMonth() === this.currentMonth &&
        today.getFullYear() === this.currentYear;

      const isSelected = selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === this.currentMonth &&
        selectedDate.getFullYear() === this.currentYear;

      const isDisabled = this.isDateDisabled(this.currentYear, this.currentMonth, day);

      let classes = 'aui-datepicker__day';
      if (isToday) classes += ' aui-datepicker__day--today';
      if (isSelected) classes += ' aui-datepicker__day--selected';
      if (isDisabled) classes += ' aui-datepicker__day--disabled';

      daysHTML += `<div class="${classes}" data-day="${day}">${day}</div>`;
    }

    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="aui-datepicker">
        <input
          type="text"
          class="aui-datepicker__input"
          placeholder="${this.placeholder}"
          value="${this.formatDate(this.value)}"
          readonly
        />
        <div class="aui-datepicker__calendar ${this.isOpen ? 'aui-datepicker__calendar--open' : ''}">
          <div class="aui-datepicker__header">
            <button class="aui-datepicker__nav-button aui-datepicker__nav-button--prev">‹</button>
            <div class="aui-datepicker__month-year">${monthNames[this.currentMonth]} ${this.currentYear}</div>
            <button class="aui-datepicker__nav-button aui-datepicker__nav-button--next">›</button>
          </div>
          <div class="aui-datepicker__weekdays">
            ${weekdays.map(day => `<div class="aui-datepicker__weekday">${day}</div>`).join('')}
          </div>
          <div class="aui-datepicker__days">
            ${daysHTML}
          </div>
        </div>
      </div>
    `;

    // Add event listeners
    const input = this._shadowRoot.querySelector('.aui-datepicker__input');
    input?.addEventListener('click', () => this.toggleCalendar());

    const prevBtn = this._shadowRoot.querySelector('.aui-datepicker__nav-button--prev');
    const nextBtn = this._shadowRoot.querySelector('.aui-datepicker__nav-button--next');

    prevBtn?.addEventListener('click', () => this.prevMonth());
    nextBtn?.addEventListener('click', () => this.nextMonth());

    this._shadowRoot.querySelectorAll('.aui-datepicker__day[data-day]').forEach(dayEl => {
      dayEl.addEventListener('click', () => {
        const day = parseInt((dayEl as HTMLElement).dataset.day || '0', 10);
        this.selectDate(this.currentYear, this.currentMonth, day);
      });
    });
  }
}

if (!customElements.get('aui-datepicker')) {
  customElements.define('aui-datepicker', AuiDatePicker);
}
