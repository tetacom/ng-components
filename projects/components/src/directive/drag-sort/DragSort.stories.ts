import {withKnobs} from '@storybook/addon-knobs';


import {Meta} from "@storybook/angular";

export default {
  title: 'Directive/DragSort',
  decorators: [withKnobs],
} as Meta;

export const dragSort = () => ({
  moduleMetadata: {
    imports: [],
  },
  props: {},
  template: `<teta-drag-sort-demo></teta-drag-sort-demo>`,
});
