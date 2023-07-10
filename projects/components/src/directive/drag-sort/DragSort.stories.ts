import {withKnobs} from '@storybook/addon-knobs';
import {DragSortModule} from './drag-sort.module';
import {DragSortDemoModule} from './drag-sort-demo/drag-sort-demo.module';
import {Meta} from "@storybook/angular";

export default {
  title: 'Directive/DragSort',
  decorators: [withKnobs],
} as Meta;

export const dragSort = () => ({
  moduleMetadata: {
    imports: [DragSortModule, DragSortDemoModule],
  },
  props: {},
  template: `<teta-drag-sort-demo></teta-drag-sort-demo>`,
});
