import {withKnobs} from '@storybook/addon-knobs';
import {PropertyGridModule} from './property-grid.module';

import {PropertyGridDemoModule} from "./property-grid-demo/property-grid-demo.module";
import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {IconComponent} from "../icon/icon/icon.component";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";

export default {
  title: 'Component/PropertyGrid',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
  moduleMetadata: {
    imports: [PropertyGridModule, PropertyGridDemoModule],
  },
} as Meta;

export const simplePropertyGrid = () => ({
  moduleMetadata: {
    imports: [PropertyGridModule, PropertyGridDemoModule,IconSpriteDirective],
    entryComponents: [],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"
                  class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">
              <teta-property-grid-demo></teta-property-grid-demo>
            </div>`,
});
