// eslint-disable-next-line id-blacklist

import {Meta} from "@storybook/angular";
import {LoaderDirective} from "./loader.directive";

export default {
  title: 'Directive/Loader',
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [LoaderDirective]
  },
  template: `<div class="bg-panel-50 padding-10 margin-10" [tetaLoader]="true">

              </div>`,
});
