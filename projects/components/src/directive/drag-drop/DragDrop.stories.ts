import {withKnobs} from '@storybook/addon-knobs';


import {Meta} from "@storybook/angular";

export default {
  title: 'Directive/DragDrop',
  decorators: [withKnobs],
} as Meta;

export const dragDrop = () => ({
  moduleMetadata: {
    imports: [],
  },
  props: {},
  template: `<teta-drag-drop-demo></teta-drag-drop-demo>`,
});
