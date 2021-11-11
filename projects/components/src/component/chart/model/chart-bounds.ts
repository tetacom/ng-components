export class ChartBounds {
  top = 35;
  right = 50;
  bottom = 50;
  left = 35;

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
