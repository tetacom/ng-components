import {select, withKnobs} from '@storybook/addon-knobs';
import {ContextMenuModule} from './context-menu.module';
import {ButtonModule} from '../../component/button/button.module';
import {PopupContentComponent} from '../../component/dynamic-component/popup-content/popup-content.component';
import {IconModule} from '../../component/icon/icon.module';
import {Align} from '../../common/enum/align.enum';
import {VerticalAlign} from '../../common/enum/vertical-align.enum';
import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Directive/ContextMenu',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
} as Meta;

export const basicContextMenu = () => ({
  moduleMetadata: {
    imports: [ContextMenuModule, ButtonModule, IconModule],
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
      Align.left
    ),
    verticalAlign: select(
      'verticalAlign',
      {
        bottom: VerticalAlign.bottom,
        top: VerticalAlign.top,
        center: VerticalAlign.center,
        auto: VerticalAlign.auto,
      },
      VerticalAlign.bottom
    ),
  },
  template: `<button teta-button
                     [tetaIconSprite]="'assets/icons.svg'"
                     [palette]="'primary'"
                     [tetaContextMenu]="menu"
                     [align]="align"
                     [verticalAlign]="verticalAlign"
                     [className]="'one'">
              <teta-icon [palette]="'background'" [name]="'settings'"></teta-icon>
              Right click on me
            </button>
            <ng-template #menu let-data="data">
              <div class="list shadow-1" style="width: 200px">
                <div class="list-item list-item_interactive">
                  <teta-icon [name]="'addCircle'" [palette]="'text'" class="margin-right-2"></teta-icon>Add
                </div>
                <div class="list-item list-item_interactive">
                  <teta-icon [name]="'closeBig'" [palette]="'text'" class="margin-right-2"></teta-icon>Delete
                </div>
                <div class="list-item list-item_interactive">
                  <teta-icon [name]="'copy'" [palette]="'text'" class="margin-right-2"></teta-icon>Clone
                </div>
              </div>
            </ng-template>`,
});
