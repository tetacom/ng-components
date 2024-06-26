import { EditType } from './enum/edit-type.enum';
import { EditEvent } from './enum/edit-event.enum';
import { SelectType } from './enum/select-type.enum';

import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TableDemoComponent } from './table-demo/table-demo/table-demo.component';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';

export default {
  title: 'Component/Table',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  argTypes: {
    selectType: {
      options: ['SelectType.none', 'SelectType.checkBox', 'SelectType.mouse'],
      control: { type: 'select' },
    },
    editType: {
      options: ['EditType.row', 'EditType.cell'],
      control: { type: 'select' },
    },
    editEvent: {
      options: ['EditEvent.focus', 'EditEvent.click', 'EditEvent.doubleClick'],
      control: { type: 'select' },
    },
  },
  args: {
    selectType: 'SelectType.none',
    editType: 'EditType.cell',
    editEvent: 'EditEvent.doubleClick',
  },
  moduleMetadata: {
    imports: [],
  },
} as Meta;
const selectTypeMap = new Map<string, SelectType>()
  .set('SelectType.none', SelectType.none)
  .set('SelectType.checkBox', SelectType.checkBox)
  .set('SelectType.mouse', SelectType.mouse);
const editEventMap = new Map<string, EditEvent>()
  .set('EditEvent.focus', EditEvent.focus)
  .set('EditEvent.click', EditEvent.click)
  .set('EditEvent.doubleClick', EditEvent.doubleClick);
const editTypeMap = new Map<string, EditType>()
  .set('EditType.row', EditType.row)
  .set('EditType.cell', EditType.cell);
export const basicTable = (args) => ({
  moduleMetadata: {
    imports: [TableDemoComponent, IconSpriteDirective],
  },
  props: { ...args, selectTypeMap, editEventMap, editTypeMap },
  template: `<div [tetaIconSprite]="['assets/icons.svg', 'assets/color-icons.svg']"
                  class="bg-panel-0 padding-10"
                  style="display: flex; flex-direction: column; width: 1200px; height: 100vh;">
                  <h1 style="margin-bottom: 0.5em">Таблица</h1>
                <teta-table-demo [size]="50"
                                  [editEvent]="editEventMap.get(editEvent)"
                                  [editType]="editTypeMap.get(editType)"
                                  [selectType]="selectTypeMap.get(selectType)"
                                  [virtual]="false"></teta-table-demo>
            </div>`,
});

export const virtualTable = (args) => ({
  moduleMetadata: {
    imports: [TableDemoComponent, IconSpriteDirective],
  },
  props: { ...args, selectTypeMap, editEventMap, editTypeMap },
  template: `<div [tetaIconSprite]="['assets/icons.svg', 'assets/color-icons.svg']"
                  class="bg-panel-0 padding-10"
                  style="display: flex; flex-direction: column; width: 1200px; height: 100vh;">
                  <h1 style="margin-bottom: 0.5em">Таблица с виртуальной прокруткой</h1>
                <teta-table-demo [size]="100"
                                  [editEvent]="editEvent"
                                  [editType]="editType"
                                  [selectType]="selectType"
                                  [virtual]="true"></teta-table-demo>
            </div>`,
});
