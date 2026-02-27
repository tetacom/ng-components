import { Chart3dComponent } from './chart3d.component';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { Chart3dOptions } from '../model/chart-3d-options';
import { Series3d } from '../model/series-3d';
import { Base3dPoint } from '../model/base-3d-point';

function generateWellTrajectory(
  name: string,
  color: string,
  offsetX: number = 0,
  offsetZ: number = 0,
  points: number = 50
): Series3d<Base3dPoint> {
  const trajectory: Base3dPoint[] = [];
  let cumulativeMD = 0;

  for (let i = 0; i < points; i++) {
    const depth = i * 100;
    const x = offsetX + Math.sin(i * 0.2) * 20 + i * 2;
    const z = offsetZ + Math.cos(i * 0.2) * 20 + i * 2;

    if (i > 0) {
      const prevPoint = trajectory[i - 1];
      const dx = x - prevPoint.x;
      const dy = depth - prevPoint.y;
      const dz = z - prevPoint.z;
      const segmentLength = Math.sqrt(dx * dx + dy * dy + dz * dz);
      cumulativeMD += segmentLength;
    }

    trajectory.push({ x, y: depth, z, md: cumulativeMD + 10 });
  }

  return new Series3d({
    name,
    color,
    points: trajectory,
  });
}

// Helper function to create chart configuration
function createChart3dConfig(): Chart3dOptions {
  return new Chart3dOptions({
    axes: {
      max: 200,
    },
    unit: 'm',
    series: [
      generateWellTrajectory('Well A', '#ff6b6b', 0, 0),
      generateWellTrajectory('Well B', '#4ecdc4', 30, 30),
      generateWellTrajectory('Well C', '#45b7d1', -100, 30),
    ],
  });
}

export default {
  title: 'Component/Chart3d',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  component: Chart3dComponent,
  moduleMetadata: {
    imports: [Chart3dComponent],
  },
} as Meta;

export const basicChart3d: StoryFn = () => ({
  moduleMetadata: {
    imports: [Chart3dComponent],
  },
  props: {
    config: createChart3dConfig(),
  },
  template: `
    <div class="bg-global-bgmain padding-3" style="width: 100%; height: 100vh">
      <div class="bg-global-bgcard" style="width: 100%; height: 100%">
        <teta-chart3d [config]="config"></teta-chart3d>
      </div>
    </div>
  `,
});

export const singleWell: StoryFn = () => ({
  moduleMetadata: {
    imports: [Chart3dComponent],
  },
  props: {
    config: new Chart3dOptions({
      axes: { max: 7000 },
      unit: 'm',
      series: [generateWellTrajectory('Single Well', '#ff6b6b', 0, 0, 80)],
    }),
  },
  template: `
    <div class="bg-global-bgmain padding-3" style="width: 100%; height: 100vh">
      <div class="bg-global-bgcard" style="width: 100%; height: 100%">
        <teta-chart3d [config]="config"></teta-chart3d>
      </div>
    </div>
  `,
});

export const multipleWells: StoryFn = () => ({
  moduleMetadata: {
    imports: [Chart3dComponent],
  },
  props: {
    config: new Chart3dOptions({
      axes: { max: 250 },
      unit: 'm',
      series: [
        generateWellTrajectory('Well 1', '#ff6b6b', 0, 0),
        generateWellTrajectory('Well 2', '#4ecdc4', 40, 20),
        generateWellTrajectory('Well 3', '#45b7d1', -40, 20),
        generateWellTrajectory('Well 4', '#f9ca24', 20, -40),
        generateWellTrajectory('Well 5', '#6c5ce7', -20, -40),
      ],
    }),
  },
  template: `
    <div class="bg-global-bgmain padding-3" style="width: 100%; height: 100vh">
      <div class="bg-global-bgcard" style="width: 100%; height: 100%">
        <teta-chart3d [config]="config"></teta-chart3d>
      </div>
    </div>
  `,
});

export const withFeetUnit: StoryFn = () => ({
  moduleMetadata: {
    imports: [Chart3dComponent],
  },
  props: {
    config: new Chart3dOptions({
      axes: { max: 250 },
      unit: 'ft',
      series: [
        generateWellTrajectory('Well A', '#ff6b6b', 0, 0, 50),
        generateWellTrajectory('Well B', '#4ecdc4', 40, 20, 50),
        generateWellTrajectory('Well C', '#45b7d1', -40, 20, 50),
      ],
    }),
  },
  template: `
    <div class="bg-global-bgmain padding-3" style="width: 100%; height: 100vh">
      <div class="bg-global-bgcard" style="width: 100%; height: 100%">
        <teta-chart3d [config]="config"></teta-chart3d>
      </div>
    </div>
  `,
});
