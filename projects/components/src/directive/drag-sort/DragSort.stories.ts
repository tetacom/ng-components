import {withKnobs} from '@storybook/addon-knobs';


import {Meta} from "@storybook/angular";
import {DragSortDemoComponent} from "./drag-sort-demo/drag-sort-demo/drag-sort-demo.component";

export default {
  title: 'Directive/DragSort',
  decorators: [withKnobs],
} as Meta;

export const dragSort = () => ({
  moduleMetadata: {
    imports: [DragSortDemoComponent],
  },
  props: {},
  template: `<teta-drag-sort-demo></teta-drag-sort-demo>`,
});
