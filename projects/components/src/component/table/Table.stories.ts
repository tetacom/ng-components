import {Meta} from '@storybook/angular/types-6-0';
import {select, withKnobs} from '@storybook/addon-knobs';
import {TableModule} from './table.module';
import {EditType} from './enum/edit-type.enum';
import {EditEvent} from './enum/edit-event.enum';
import {SelectType} from './enum/select-type.enum';
import {IconModule} from '../icon/icon.module';
import {TableDemoModule} from './table-demo/table-demo.module';

export default {
  title: 'Component/Table',
  decorators: [withKnobs],
  moduleMetadata: {
    imports: [TableModule],
  },
} as Meta;

export const basicTable = () => ({
  moduleMetadata: {
    imports: [TableDemoModule, IconModule],
  },
  props: {
    editType: select(
      'editType',
      {
        row: EditType.row,
        cell: EditType.cell,
      },
      EditType.cell
    ),
    selectType: select(
      'selectType',
      {
        none: SelectType.none,
        multiple: SelectType.multiple,
        single: SelectType.single,
      },
      SelectType.multiple
    ),
    editEvent: select(
      'editEvent',
      {
        focus: EditEvent.focus,
        click: EditEvent.click,
        doubleClick: EditEvent.doubleClick,
      },
      EditEvent.doubleClick
    ),
  },
  template: `<div [tetaIconSprite]="['assets/icons.svg', 'assets/color-icons.svg']"
                  class="bg-panel-50 padding-3"
                  style="display: flex; width: 1200px; height: 600px;">
                <teta-table-demo [size]="50"
                                  [editEvent]="editEvent"
                                  [editType]="editType"
                                  [selectType]="selectType"
                                  [virtual]="false"></teta-table-demo>
            </div>`,
});

export const virtualTable = () => ({
  moduleMetadata: {
    imports: [TableDemoModule, IconModule],
  },
  props: {
    editType: select(
      'editType',
      {
        row: EditType.row,
        cell: EditType.cell,
      },
      EditType.cell
    ),
    selectType: select(
      'selectType',
      {
        none: SelectType.none,
        multiple: SelectType.multiple,
        single: SelectType.single,
      },
      SelectType.multiple
    ),
    editEvent: select(
      'editEvent',
      {
        focus: EditEvent.focus,
        click: EditEvent.click,
        doubleClick: EditEvent.doubleClick,
      },
      EditEvent.doubleClick
    ),
  },
  template: `<div [tetaIconSprite]="['assets/icons.svg', 'assets/color-icons.svg']"
                  class="bg-panel-50 padding-3"
                  style="display: flex; width: 1200px; height: 600px;">
                <teta-table-demo [size]="1000"
                                  [editEvent]="editEvent"
                                  [editType]="editType"
                                  [selectType]="selectType"
                                  [virtual]="true"></teta-table-demo>
            </div>`,
});
