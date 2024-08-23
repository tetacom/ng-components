import {SidebarComponent} from './sidebar/sidebar.component';

import {SidebarPosition} from './sidebar-position.enum';


import {applicationConfig, Meta} from "@storybook/angular";
import {provideHttpClient} from "@angular/common/http";
import {IconComponent} from "../icon/icon/icon.component";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";
import {ButtonComponent} from "../button/button/button.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export default {
  title: 'Component/Sidebar',
  decorators: [

    applicationConfig({
      providers: [
        provideHttpClient()
      ],
    }),
  ],
  argTypes: {
    backdrop: {
      control: {type: 'boolean'}
    },
    position: {
      options: ['SidebarPosition.left', 'SidebarPosition.bottom', 'SidebarPosition.top', 'SidebarPosition.right'],
      control: {type: 'select'}
    },
  },
  args: {
    backdrop: false,
    position: 'SidebarPosition.left'
  },
  component: SidebarComponent,
  moduleMetadata: {
    imports: []
  }
} as Meta;
const sidebarPositionMap = new Map<string, SidebarPosition>()
  .set('SidebarPosition.left', SidebarPosition.left)
  .set('SidebarPosition.bottom', SidebarPosition.bottom)
  .set('SidebarPosition.top', SidebarPosition.top)
  .set('SidebarPosition.right', SidebarPosition.right);
export const basic = (args) => ({
  moduleMetadata: {
    imports: [SidebarComponent, ButtonComponent, IconComponent, IconSpriteDirective, BrowserAnimationsModule]
  },
  props: {
    ...args,
    sidebarPositionMap,
    open1: false,
  },
  template: `<div class="padding-14 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-sidebar [backdrop]="backdrop" [position]="sidebarPositionMap.get(position)" [open]="open1" [className]="'bg-primary-30'">
      <div class="font-title-1">Sidebar</div>
      <div>Sidebar content</div>
    </teta-sidebar>
    <button teta-button [palette]="'primary'" (click)="open1=!open1">
      <teta-icon [name]="'arrowLeft'"></teta-icon>
    </button>
  </div>`
});

