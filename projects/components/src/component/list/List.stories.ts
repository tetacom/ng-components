import { Meta } from '@storybook/angular/types-6-0';
import { IconModule } from '../icon/icon.module';

export default {
  title: 'Component/List',
} as Meta;

export const basicList = () => ({
  moduleMetadata: {
    imports: [IconModule],
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
    imports: [IconModule],
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
