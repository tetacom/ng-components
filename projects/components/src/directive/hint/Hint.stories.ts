import {number, select, withKnobs} from '@storybook/addon-knobs';

import {PopupContentComponent} from '../../component/dynamic-component/popup-content/popup-content.component';

import {Align} from '../../common/enum/align.enum';
import {VerticalAlign} from '../../common/enum/vertical-align.enum';

import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {IconComponent} from "../../component/icon/icon/icon.component";
import {IconSpriteDirective} from "../../component/icon/icon-sprite.directive";
import {ButtonComponent} from "../../component/button/button/button.component";
import {HintDirective} from "./hint.directive";

export default {
  title: 'Directive/Hint',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
} as Meta;

export const fromString = () => ({
  moduleMetadata: {
    imports: [IconComponent,IconSpriteDirective,ButtonComponent,HintDirective],
    entryComponents: [PopupContentComponent],
  },
  props: {
    align: select(
      'align',
      {
        left: Align.left,
        right: Align.right,
        center: Align.center,
        auto: Align.auto,
      },
      Align.center
    ),
    verticalAlign: select(
      'verticalAlign',
      {
        bottom: VerticalAlign.bottom,
        top: VerticalAlign.top,
        center: VerticalAlign.center,
        auto: VerticalAlign.auto,
      },
      VerticalAlign.top
    ),
    delay: number('delay', 0, {
      max: 5000,
      min: 0,
      range: true,
      step: 100,
    }),
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="bg-panel-50 padding-10 margin-10">
              <button teta-button
                     [palette]="'primary'"
                     [tetaHint]="'You can get it now, right?'"
                     [align]="align"
                     viewType="rounded"
                     [verticalAlign]="verticalAlign"
                     [delay]="delay"
                     [className]="'one'">
                <teta-icon [palette]="'background'" [name]="'settings'" class="margin-right-2"></teta-icon>
                Hover me
              </button>
            </div>`,
});

export const fromTemplate = () => ({
  moduleMetadata: {
    imports: [IconComponent,IconSpriteDirective,ButtonComponent,HintDirective],
    entryComponents: [PopupContentComponent],
  },
  props: {
    test: 'AAAAA',
    align: select(
      'align',
      {
        left: Align.left,
        right: Align.right,
        center: Align.center,
        auto: Align.auto,
      },
      Align.center
    ),
    verticalAlign: select(
      'verticalAlign',
      {
        bottom: VerticalAlign.bottom,
        top: VerticalAlign.top,
        center: VerticalAlign.center,
        auto: VerticalAlign.auto,
      },
      VerticalAlign.top
    ),
    delay: number('delay', 0, {
      max: 5000,
      min: 0,
      range: true,
      step: 100,
    }),
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="bg-panel-50 padding-10 margin-10">
              <ng-template #hint>
                <div>{{test}}</div>
              </ng-template>
              <button teta-button
                     [palette]="'primary'"
                     [tetaHint]="hint"
                     [align]="align"
                     [verticalAlign]="verticalAlign"
                     [delay]="delay"
                     [className]="'one'">
                <teta-icon [palette]="'background'" [name]="'settings'" class="margin-right-2"></teta-icon>
                Hover me
              </button>
            </div>`,
});
