import { Meta } from '@storybook/angular/types-6-0';
import { select, withKnobs } from '@storybook/addon-knobs';
import { ButtonModule } from '../../component/button/button.module';
import { PopupContentComponent } from '../../component/dynamic-component/popup-content/popup-content.component';
import { IconModule } from '../../component/icon/icon.module';
import { Align } from '../../common/enum/align.enum';
import { VerticalAlign } from '../../common/enum/vertical-align.enum';
import { TooltipModule } from './tooltip.module';

export default {
  title: 'Directive/Tooltip',
  decorators: [withKnobs],
} as Meta;

export const fromString = () => ({
  moduleMetadata: {
    imports: [TooltipModule, ButtonModule, IconModule],
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
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="bg-panel-50 padding-10 margin-10">
                <button teta-button
                         [palette]="'primary'"
                         [tetaTooltip]="'You can get it now, right?'"
                         [align]="align"
                         [verticalAlign]="verticalAlign"
                         [className]="'one'">
                  <teta-icon [palette]="'background'" [name]="'settings'" class="margin-right-2"></teta-icon>
                  Click me
                </button>
              </div>`,
});

export const fromTemplate = () => ({
  moduleMetadata: {
    imports: [TooltipModule, ButtonModule, IconModule],
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
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="bg-panel-50 padding-10 margin-10">
                <ng-template #hint>
                  From template
                </ng-template>
                <button teta-button
                         [palette]="'primary'"
                         [tetaTooltip]="hint"
                         [align]="align"
                         [verticalAlign]="verticalAlign"
                         [className]="'one'">
                  <teta-icon [palette]="'background'" [name]="'settings'" class="margin-right-2"></teta-icon>
                  Click me
                </button>
              </div>`,
});
