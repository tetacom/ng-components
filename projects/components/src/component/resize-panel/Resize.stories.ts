import { Meta } from '@storybook/angular/types-6-0';
// eslint-disable-next-line id-blacklist
import { number, select, withKnobs } from '@storybook/addon-knobs';
import { ResizePanelModule } from './resize-panel.module';

export default {
  title: 'Component/ResizePanel',
  decorators: [withKnobs],
} as Meta;

export const horizontal = () => ({
  moduleMetadata: {
    imports: [ResizePanelModule],
  },
  props: {
    maxSize: number('maxSize', 500, {
      min: 300,
      max: 450,
      range: true,
      step: 10,
    }),
    minSize: number('minSize', 50, {
      min: 50,
      max: 150,
      range: true,
      step: 10,
    }),
    grabPosition: select('grabPosition', ['left', 'right'], 'left'),
  },
  template: `<div class="bg-panel-50 padding-10 margin-10">
                <div class="row bg-white-50"
                      style="width: 500px; height: 500px;">
                  <div class="column_6 bg-primary-5">
                    I will surrender
                  </div>
                  <teta-resize-panel
                        [maxSize]="maxSize"
                        [minSize]="minSize"
                        [direction]="'vertical'"
                        [grabPosition]="grabPosition"
                        class="column_6 bg-red-5">
                    I will resize
                  </teta-resize-panel>
                </div>
              </div>`,
});

export const vertical = () => ({
  moduleMetadata: {
    imports: [ResizePanelModule],
  },
  props: {
    maxSize: number('maxSize', 500, {
      min: 300,
      max: 450,
      range: true,
      step: 10,
    }),
    minSize: number('minSize', 50, {
      min: 50,
      max: 150,
      range: true,
      step: 10,
    }),
    grabPosition: select('grabPosition', ['top', 'bottom'], 'top'),
  },
  template: `<div class="bg-panel-50 padding-10 margin-10">
                <div class="column bg-white-50"
                      style="width: 500px; height: 500px;">
                  <div class="row_6 bg-primary-5">
                    I will surrender
                  </div>
                  <teta-resize-panel
                        [maxSize]="maxSize"
                        [minSize]="minSize"
                        [direction]="'horizontal'"
                        [grabPosition]="grabPosition"
                        class="row_6 bg-red-5">
                    I will resize
                  </teta-resize-panel>
                </div>
              </div>`,
});
