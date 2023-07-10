// eslint-disable-next-line id-blacklist
import {boolean, withKnobs} from '@storybook/addon-knobs';
import {LoaderModule} from './loader.module';
import {Meta} from "@storybook/angular";

export default {
  title: 'Directive/Loader',
  decorators: [withKnobs]
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [LoaderModule]
  },
  props: {
    show: boolean('show', true)
  },
  template: `<div class="bg-panel-50 padding-10 margin-10" [tetaLoader]="show">

              </div>`,
});
