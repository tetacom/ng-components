export class PickerLocaleModel {
  dayNames: string[];
  dayNamesShort: string[];
  dayNamesMin: string[];
  monthNames: string[];
  monthNamesShort: string[];
  today: string;

  public constructor(options?: {
    dayNames: string[];
    dayNamesShort: string[];
    dayNamesMin: string[];
    monthNames: string[];
    monthNamesShort: string[];
    today: string;
  }) {
    if (options) {
      this.dayNames = options.dayNames;
      this.dayNamesShort = options.dayNamesShort;
      this.dayNamesMin = options.dayNamesMin;
      this.monthNames = options.monthNames;
      this.monthNamesShort = options.monthNamesShort;
      this.today = options.today;
    }
  }
}
