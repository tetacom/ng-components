export class DateFilterValue {
  /**
   * Значение должно быть меньше чем
   */
  lessThan: Date | undefined | null;
  /**
   * Значение должно быть больше чем
   */
  greaterThan: Date | undefined | null;

  constructor(options?: { lessThan?: Date | undefined | null; greaterThan?: Date | undefined | null }) {
    if (options) {
      this.lessThan = typeof options.lessThan === 'string' ? new Date(options.lessThan) : options.lessThan;
      this.greaterThan = typeof options.greaterThan === 'string' ? new Date(options.greaterThan) : options.greaterThan;
    }
  }
}
