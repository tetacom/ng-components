export class PlotLine {
  id: number;
  width?: number;
  value: number;
  label?: string;
  color?: string;
  dashed?: boolean;
  min?: number;
  max?: number;

  constructor(options?: {
    id: number;
    width?: number;
    value: number;
    label?: string;
    color?: string;
    dashed?: boolean;
    min?: number;
    max?: number;
  }) {
    this.id = options?.id;
    this.width = options?.width || 1;
    this.value = options?.value;
    this.label = options?.label;
    this.dashed = options?.dashed || false;
    this.color = options?.color || 'var(--color-text-70)';
    this.min = options?.min;
    this.max = options?.max;
  }
}
