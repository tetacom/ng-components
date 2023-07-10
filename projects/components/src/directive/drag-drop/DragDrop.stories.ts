import {withKnobs} from '@storybook/addon-knobs';
import {DragDropModule} from './drag-drop.module';
import {DragDropDemoModule} from './drag-drop-demo/drag-drop-demo.module';
import {Meta} from "@storybook/angular";

export default {
  title: 'Directive/DragDrop',
  decorators: [withKnobs],
} as Meta;

export const dragDrop = () => ({
  moduleMetadata: {
    imports: [DragDropModule, DragDropDemoModule],
  },
  props: {},
  template: `<teta-drag-drop-demo></teta-drag-drop-demo>`,
});
