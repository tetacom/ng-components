import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent, IChartConfig, SeriesType, TooltipTracking } from '@tetacom/svg-charts';
import { trajectory } from './data/tr';
import { construction } from './data/cs';

@Component({
    selector: 'teta-test-chart',
    imports: [CommonModule, ChartComponent],
    templateUrl: './test-chart.component.html',
    styleUrl: './test-chart.component.css'
})
export class TestChartComponent {
  config: IChartConfig;

  constructor() {
    this.config = this.getConfig();
  }

  point = {
    md: 1705,
    r: 0.001,
  };

  getConfig(): IChartConfig {
    // const tr = this.getTrSeries(trajectory)
    const traRad = trajectory.map((item) => {
      const res = { ...item };
      res.zenithAngle = (res.zenithAngle * Math.PI) / 180;
      res.azimuthAngle = (res.azimuthAngle * Math.PI) / 180;
      return res;
    });

    const aa = this.getPoint(this.point, traRad);

    console.log(aa);
    const tr = this.getTrSeries(traRad);
    const cs = this.getCasingSeries(
      construction.casing.sort((a, b) => a.intervalTopMd - b.intervalTopMd),
      traRad,
    );
    return {
      tooltip: {
        tracking: TooltipTracking.y,
      },
      xAxis: [
        {
          title: 'x',
        },
      ],
      yAxis: [
        {
          title: 'y',
          inverted: true,
        },
      ],
      series: [
        {
          type: SeriesType.line,
          data: tr,
          xAxisIndex: 0,
          yAxisIndex: 0,
        },
        {
          type: SeriesType.line,
          data: cs,
          xAxisIndex: 0,
          yAxisIndex: 0,
        },
      ],
    };
  }

  getTrSeries(trajectory) {
    return trajectory.map((point) => {
      return {
        x: point.wellboreDistance,
        y: point.coordZ,
      };
    });
  }

  getCasingSeries(casing, trajectory) {
    const points = [];

    casing.forEach((cs) => {
      console.log('cs.intervalBottomMd', cs.intervalBottomMd);
      // const diff = (cs.intervalBottomMd - cs.intervalTopMd) / 100;
      for (let depth = cs.intervalTopMd; depth < cs.intervalBottomMd; depth += 1.3) {
        const point = this.getPoint(
          {
            md: depth,
            r: 10,
            // r: cs.columnOuterDiameter / 1000
          },
          trajectory,
        );
        console.log('point, depth', point, depth, cs.columnOuterDiameter / 1000);
        points.push(point);
      }
    });
    return points;
  }

  getPoint(
    point: {
      md: number;
      r: number;
    },
    trajectory,
  ) {
    const { prev, next } = this.findPreviousNextPoints(trajectory, point.md);
    console.log(prev, next, point.md);
    const zenithAngle =
      prev.zenithAngle +
      ((next.zenithAngle - prev.zenithAngle) * (point.md - prev.measuredDepth)) /
        (next.measuredDepth - prev.measuredDepth);
    const azimuthAngle =
      prev.azimuthAngle +
      ((next.azimuthAngle - prev.azimuthAngle) * (point.md - prev.measuredDepth)) /
        (next.measuredDepth - prev.measuredDepth);

    const beta = Math.acos(
      Math.cos(zenithAngle - prev.zenithAngle) -
        Math.sin(prev.zenithAngle) * Math.sin(zenithAngle) * (1 - Math.cos(azimuthAngle - prev.azimuthAngle)),
    );
    console.log('zenithAngle', zenithAngle, 'azimuthAngle', azimuthAngle, 'beta', beta);

    console.log('beta', beta);

    const x =
      prev.coordX +
      ((point.md - prev.measuredDepth) *
        (Math.sin(prev.zenithAngle) * Math.sin(prev.azimuthAngle) + Math.sin(zenithAngle) * Math.sin(azimuthAngle)) *
        Math.tan(beta / 2)) /
        beta;
    const y =
      prev.coordY +
      ((point.md - prev.measuredDepth) *
        (Math.sin(prev.zenithAngle) * Math.cos(prev.azimuthAngle) + Math.sin(zenithAngle) * Math.cos(azimuthAngle)) *
        Math.tan(beta / 2)) /
        beta;
    const z =
      prev.coordZ +
      ((point.md - prev.measuredDepth) * (Math.cos(prev.zenithAngle) + Math.cos(zenithAngle)) * Math.tan(beta / 2)) /
        beta;

    console.log('x,    y,   z', x, y, z);

    const X0 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    console.log('X0', X0);

    // console.log('x', x, 'y', y, 'X0', X0);

    const Z0 = z;

    let X = X0 + point.r * Math.sin(zenithAngle - Math.PI / 2) * Math.sin(azimuthAngle);
    let Z = Z0 + point.r * Math.cos(zenithAngle - Math.PI / 2);

    // console.log('XZ', X, Z);

    X = X0 + point.r * Math.sin(zenithAngle + Math.PI / 2) * Math.sin(azimuthAngle);
    Z = Z0 + point.r * Math.cos(zenithAngle + Math.PI / 2);

    // console.log('XZ', X, Z);
    return {
      x: X,
      y: Z,
    };
  }

  findPreviousNextPoints(trajectory: any[], md: number) {
    trajectory = trajectory.sort((a, b) => a.measuredDepth - b.measuredDepth);
    let prev: any = trajectory[0];
    let next: any = null;

    for (let i = 0; i < trajectory.length; i++) {
      if (trajectory[i].measuredDepth >= md) {
        next = trajectory[i];
        if (i > 0) {
          prev = trajectory[i - 1];
        }
        break;
      }
    }
    return { prev, next };
  }
}
