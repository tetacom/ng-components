import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconComponent } from '../icon/icon/icon.component';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';

export default {
  title: 'Component/List',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
} as Meta;

export const basicList = () => ({
  moduleMetadata: {
    imports: [IconComponent, IconSpriteDirective],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-10">
<div class="list shadow-1" style="width: 200px">
  <div class="list-item">
    <teta-icon [name]="'user'" [palette]="'text'" class="margin-right-2"></teta-icon>Jerome Bell
  </div>
  <div class="list-item">
    <teta-icon [name]="'calendar'" [palette]="'text'" class="margin-right-2"></teta-icon>Courtney Henry
  </div>
  <div class="list-item">
    <teta-icon [name]="'eye'" [palette]="'text'" class="margin-right-2"></teta-icon>Wade Warren
  </div>
  <div class="list-item">
    <teta-icon [name]="'folder'" [palette]="'text'" class="margin-right-2"></teta-icon>Ralph Edwards
  </div>
  <div class="list-item">
    <teta-icon [name]="'map'" [palette]="'text'" class="margin-right-2"></teta-icon>Marvin McKinney
  </div>
</div>
</div>`,
});

export const interactiveList = () => ({
  moduleMetadata: {
    imports: [IconComponent, IconSpriteDirective],
  },
  template: `<div class="padding-10">
<div class="list shadow-1" style="width: 200px">
  <div class="list-item list-item_interactive">
    <teta-icon [name]="'user'" [palette]="'text'" class="margin-right-2"></teta-icon>Jerome Bell
  </div>
  <div class="list-item list-item_interactive">
    <teta-icon [name]="'calendar'" [palette]="'text'" class="margin-right-2"></teta-icon>Courtney Henry
  </div>
  <div class="list-item list-item_interactive">
    <teta-icon [name]="'eye'" [palette]="'text'" class="margin-right-2"></teta-icon>Wade Warren
  </div>
  <div class="list-item list-item_interactive">
    <teta-icon [name]="'folder'" [palette]="'text'" class="margin-right-2"></teta-icon>Ralph Edwards
  </div>
  <div class="list-item list-item_interactive">
    <teta-icon [name]="'map'" [palette]="'text'" class="margin-right-2"></teta-icon>Marvin McKinney
  </div>
</div>
</div>`,
});
