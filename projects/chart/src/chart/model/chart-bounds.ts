export class ChartBounds {
  top?: number = 0;
  right?: number = 0;
  bottom?: number = 0;
  left?: number = 0;

  constructor(options?: { top?: number; right?: number; bottom?: number; left?: number }) {
    this.top = options?.top || 0;
    this.right = options?.right || 0;
    this.bottom = options?.bottom || 0;
    this.left = options?.left || 0;
  }
}
