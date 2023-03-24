import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {PropertyGridModule} from './property-grid.module';
import {IconModule} from '../icon/icon.module';
import {PropertyGridDemoModule} from "./property-grid-demo/property-grid-demo.module";

export default {
  title: 'Component/PropertyGrid',
  decorators: [withKnobs],
  moduleMetadata: {
    imports: [PropertyGridModule, PropertyGridDemoModule],
  },
} as Meta;

export const simplePropertyGrid = () => ({
  moduleMetadata: {
    imports: [PropertyGridModule, IconModule, PropertyGridDemoModule],
    entryComponents: [],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"
                  class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">
              <teta-property-grid-demo></teta-property-grid-demo>
            </div>`,
});
