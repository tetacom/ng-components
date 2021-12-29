import * as d3 from 'd3';

export function generateTicks(extremes: number[]) {
  const [min, max] = extremes;

  const tickCount = 10;
  const tickStep = (max - min) / tickCount;

  const ticks = d3
    .range(min, max + tickStep, tickStep)
    .filter((step) => step <= max);

  return ticks;
}
