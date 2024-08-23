import {PopupContentComponent} from '../../component/dynamic-component/popup-content/popup-content.component';
import {Align} from '../../common/enum/align.enum';
import {VerticalAlign} from '../../common/enum/vertical-align.enum';
import {applicationConfig, Meta} from '@storybook/angular';
import {provideHttpClient} from '@angular/common/http';
import {IconComponent} from '../../component/icon/icon/icon.component';
import {IconSpriteDirective} from '../../component/icon/icon-sprite.directive';
import {ButtonComponent} from '../../component/button/button/button.component';
import {HintDirective} from './hint.directive';

export default {
  title: 'Directive/Hint',
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient()
      ]
    })
  ],
  argTypes: {
    align: {
      options: ['Align.left', ' Align.right', 'Align.center', 'Align.auto'],
      control: {type: 'select'}
    }, verticalAlign: {
      options: ['VerticalAlign.bottom', 'VerticalAlign.top', 'VerticalAlign.center', 'VerticalAlign.auto', 'VerticalAlign.innerAuto', 'VerticalAlign.innerBottom', 'VerticalAlign.innerTop'],
      control: {type: 'select'}
    },
    delay: {
      control: {type: 'number'}
    },
    text: {
      control: {type: 'text'}
    }
  },
  args: {
    verticalAlign: 'VerticalAlign.auto',
    align: 'Align.auto',
    text: 'text',
    delay: 50
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
    imports: [IconComponent, IconSpriteDirective, ButtonComponent, HintDirective],
    entryComponents: [PopupContentComponent]
  },
  props: {...args, valignMap, alignMap},
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="bg-panel-50 padding-10 margin-10">
              <button teta-button
                     [palette]="'primary'"
                     [tetaHint]="text"
                     [align]="alignMap.get(align)"
                     viewType="rounded"
                     [verticalAlign]="valignMap.get(verticalAlign)"
                     [delay]="delay"
                     [className]="'one'">
                <teta-icon [palette]="'background'" [name]="'settings'" class="margin-right-2"></teta-icon>
                Hover me
              </button>
            </div>`
});

export const fromTemplate = (args) => ({
  moduleMetadata: {
    imports: [IconComponent, IconSpriteDirective, ButtonComponent, HintDirective],
    entryComponents: [PopupContentComponent]
  },
  props: {...args, valignMap, alignMap},
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="bg-panel-50 padding-10 margin-10">
              <ng-template #hint>
                <div>{{text}}</div>
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
            </div>`
});
