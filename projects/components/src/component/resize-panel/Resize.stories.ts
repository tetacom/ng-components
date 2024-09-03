// eslint-disable-next-line id-blacklist
import { Meta } from '@storybook/angular';
import { ResizePanelComponent } from './resize-panel/resize-panel.component';

export default {
  title: 'Component/ResizePanel',
  argTypes: {
    minSize: {
      control: { type: 'number' },
    },
    maxSize: {
      control: { type: 'number' },
    },
  },
  args: {
    minSize: 50,
    maxSize: 500,
  },
} as Meta;

export const vertical = (args) => ({
  moduleMetadata: {
    imports: [ResizePanelComponent],
  },
  props: {
    maxSize: args,
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

                        class="column_6 bg-red-5">
                    I will resize
                  </teta-resize-panel>
                </div>
              </div>`,
});

export const horizontal = (args) => ({
  moduleMetadata: {
    imports: [ResizePanelComponent],
  },
  props: {
    maxSize: args,
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

                        class="row_6 bg-red-5">
                    I will resize
                  </teta-resize-panel>
                </div>
              </div>`,
});
