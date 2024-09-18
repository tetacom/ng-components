import { Meta } from '@storybook/angular';
import { DragDropDemoComponent } from './drag-drop-demo/drag-drop-demo/drag-drop-demo.component';

export default {
  title: 'Directive/DragDrop',
} as Meta;

export const dragDrop = () => ({
  moduleMetadata: {
    imports: [DragDropDemoComponent],
  },
  props: {},
  template: `<teta-drag-drop-demo></teta-drag-drop-demo>`,
});
