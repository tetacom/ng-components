export class ChartBounds {
  top = 0;
  right = 30;
  bottom = 0;
  left = 0;

  constructor(options?: {
    top?: number;
    right?: number;
    bottom?: number;
    left: number;
  }) {
    this.top = options?.top || this.top;
    this.right = options?.right || this.right;
    this.bottom = options?.bottom || this.bottom;
    this.left = options?.left || this.left;
  }
}
