import { Meta } from '@storybook/angular';

export default {
  title: 'Component/Scrollable',
} as Meta;

export const scrollable = () => ({
  moduleMetadata: {
    imports: [],
  },
  template: `<div class="bg-panel-50 padding-10 margin-10">
                <teta-scrollable style="width: 500px; height: 300px;background: cyan">
                  <div style="width: 800px;height: 600px;background: linear-gradient(100deg, #FF0000, blue)"></div>
                </teta-scrollable>
            </div>`,
});
