import {Meta} from '@storybook/angular/types-6-0';
import {boolean, withKnobs} from '@storybook/addon-knobs';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SidebarModule} from './sidebar.module';
import {SidebarPosition} from './sidebar-position.enum';
import {IconModule} from '../icon/icon.module';
import {ButtonModule} from '../button/button.module';

export default {
  title: 'Component/Sidebar',
  decorators: [withKnobs],
  component: SidebarComponent,
  moduleMetadata: {
    imports: [SidebarModule]
  }
} as Meta;

export const basic = () => ({
  moduleMetadata: {
    imports: [SidebarModule, IconModule, ButtonModule]
  },
  props: {
    backdrop: boolean('backdrop', false),
    position: SidebarPosition,
    open1: false,
    open2: false,
    open3: false,
    open4: false
  },
  template: `<div class="padding-14 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-sidebar [backdrop]="backdrop" [position]="position.left" [open]="open1" [className]="'bg-primary-30'">
      <div class="font-title-1">Sidebar</div>
      <div>Sidebar content</div>
    </teta-sidebar>
    <teta-sidebar [backdrop]="backdrop" [position]="position.right" [open]="open2" [className]="'bg-primary-30'">
      <div class="font-title-1">Sidebar</div>
      <div>Sidebar content</div>
    </teta-sidebar>
    <teta-sidebar [backdrop]="backdrop" [position]="position.top" [open]="open3" [className]="'bg-primary-30'">
      <div class="font-title-1">Sidebar</div>
      <div>Sidebar content</div>
    </teta-sidebar>
    <teta-sidebar [backdrop]="backdrop" [position]="position.bottom" [open]="open4" [className]="'bg-primary-30'">
      <div class="font-title-1">Sidebar</div>
      <div>Sidebar content</div>
    </teta-sidebar>
    <button teta-button [palette]="'primary'" (click)="open1=!open1;open2=open3=open4=false;">
      <teta-icon [name]="'arrowLeft'"></teta-icon>
    </button>
    <button teta-button [palette]="'primary'" (click)="open2=!open2;open1=open3=open4=false;">
      <teta-icon [name]="'arrowRight'"></teta-icon>
    </button>
    <button teta-button [palette]="'primary'" (click)="open3=!open3;open2=open1=open4=false;">
      <teta-icon [name]="'arrowUp'"></teta-icon>
    </button>
    <button teta-button [palette]="'primary'" (click)="open4=!open4;open2=open3=open1=false;">
      <teta-icon [name]="'arrowDown'"></teta-icon>
    </button>
  </div>`
});

