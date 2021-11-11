export class DayModel {
  disabled: boolean;
  isCurrentMonth: boolean;
  today: boolean;
  selected: boolean;
  date: Date;
  weekend: boolean;

  public constructor(options?: {
    disabled?: boolean;
    isCurrentMonth?: boolean;
    today?: boolean;
    selected?: boolean;
    date: Date;
    weekend?: boolean;
  }) {
    if (options) {
      this.disabled = options.disabled;
      this.isCurrentMonth = options.isCurrentMonth;
      this.today = options.today;
      this.selected = options.selected;
      this.date = options.date;
      this.weekend = options.weekend;
    }
  }
}
