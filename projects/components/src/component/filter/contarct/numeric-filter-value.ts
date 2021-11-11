export class NumericFilterValue {
  /**
   * Значение должно быть меньше чем
   */
  lessThan: number | null | undefined;
  /**
   * Значение должно быть больше чем
   */
  greaterThan: number | null | undefined;
  /**
   * Значение должно быть равно
   */
  equalsTo: number | null | undefined;

  constructor(options?: {
    lessThan?: number | null | undefined;
    greaterThan?: number | null | undefined;
    equalsTo?: number | null | undefined;
  }) {
    if (options) {
      this.lessThan = options.lessThan;
      this.greaterThan = options.greaterThan;
      this.equalsTo = options.equalsTo;
    }
  }
}
