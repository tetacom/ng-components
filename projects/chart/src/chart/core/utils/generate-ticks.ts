import * as d3 from 'd3';

export function generateTicks(extremes: number[], count = 10) {
  const [min, max] = extremes;
  const tickStep = (max - min) / count;

  const ticks = d3
    .range(min, max + tickStep, tickStep)
    .filter((step) => step <= max);

  return ticks;
}
