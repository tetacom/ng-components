
import { PopupContentComponent } from '../../component/dynamic-component/popup-content/popup-content.component';

import { Align } from '../../common/enum/align.enum';
import { VerticalAlign } from '../../common/enum/vertical-align.enum';

import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {IconComponent} from "../../component/icon/icon/icon.component";
import {IconSpriteDirective} from "../../component/icon/icon-sprite.directive";
import {TooltipDirective} from "./tooltip.directive";
import {ButtonComponent} from "../../component/button/button/button.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Directive/Tooltip',
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
  argTypes:{
    align: {
      options: ['Align.left', ' Align.right', 'Align.center', 'Align.auto'],
      control: { type: 'select' }
    }, verticalAlign: {
      options: ['VerticalAlign.bottom', 'VerticalAlign.top', 'VerticalAlign.center', 'VerticalAlign.auto', 'VerticalAlign.innerAuto', 'VerticalAlign.innerBottom', 'VerticalAlign.innerTop'],
      control: { type: 'select' }
    },
    text:{
      control:{type:'text'}
    }
  },
  args:{
    verticalAlign:'VerticalAlign.auto',
    align:'Align.auto',
    text:'You can get it now, right?'
  }
} as Meta;
const alignMap = new Map<string, Align>()
  .set('Align.left', Align.left)
  .set('Align.auto', Align.auto)
  .set('Align.center', Align.center)
  .set('Align.right', Align.right);
const valignMap = new Map<string, VerticalAlign>()
  .set('VerticalAlign.bottom', VerticalAlign.bottom)
  .set('VerticalAlign.top', VerticalAlign.top)
  .set('VerticalAlign.center', VerticalAlign.center)
  .set('VerticalAlign.auto', VerticalAlign.auto)
  .set('VerticalAlign.innerAuto', VerticalAlign.innerAuto)
  .set('VerticalAlign.innerBottom', VerticalAlign.innerBottom)
  .set('VerticalAlign.innerTop', VerticalAlign.innerTop);
export const fromString = (args) => ({
  moduleMetadata: {
    imports: [TooltipDirective,IconComponent,IconSpriteDirective,ButtonComponent,BrowserAnimationsModule],
    entryComponents: [PopupContentComponent],
  },
  props:{...args,valignMap,alignMap},
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="bg-panel-50 padding-10 margin-10">
                <button teta-button
                         [palette]="'primary'"

                         [tetaTooltip]="text"
                         [align]="alignMap.get(align)"
                          [verticalAlign]="valignMap.get(verticalAlign)"
                         [className]="'one'">
                  <teta-icon [palette]="'background'" [name]="'settings'" class="margin-right-2"></teta-icon>
                  Click me
                </button>
              </div>`,
});

export const fromTemplate = (args) => ({
  moduleMetadata: {
    imports: [TooltipDirective,IconComponent,IconSpriteDirective,ButtonComponent],
    entryComponents: [PopupContentComponent],
  },
  props:{...args,valignMap,alignMap},
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="bg-panel-50 padding-10 margin-10">
                <ng-template #hint>
                  From template
                </ng-template>
                <button teta-button
                         [palette]="'primary'"
                         [tetaTooltip]="hint"
                      [align]="alignMap.get(align)"
                          [verticalAlign]="valignMap.get(verticalAlign)"
                         [className]="'one'">
                  <teta-icon [palette]="'background'" [name]="'settings'" class="margin-right-2"></teta-icon>
                  Click me
                </button>
              </div>`,
});
