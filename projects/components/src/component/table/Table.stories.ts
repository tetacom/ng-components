import { Meta } from '@storybook/angular/types-6-0';
import { select, withKnobs } from '@storybook/addon-knobs';
import { TableModule } from './table.module';
import { StringCellComponent } from './default/string-cell/string-cell.component';
import { TableColumn } from './contract/table-column';
import { TableService } from './service/table.service';
import { DefaultHeadCellComponent } from './default/default-head-cell/default-head-cell.component';
import * as faker from 'faker';
import { ListFilterComponent } from '../filter/list-filter/list-filter.component';
import { StringFilterComponent } from '../filter/string-filter/string-filter.component';
import { NumericFilterComponent } from '../filter/numeric-filter/numeric-filter.component';
import { DateFilterComponent } from '../filter/date-filter/date-filter.component';
import { DateCellComponent } from './default/date-cell/date-cell.component';
import { NumericCellComponent } from './default/numeric-cell/numeric-cell.component';
import { ListCellComponent } from './default/list-cell/list-cell.component';
import { FilterType } from '../filter/enum/filter-type.enum';
import { EditType } from './enum/edit-type.enum';
import { EditEvent } from './enum/edit-event.enum';
import { action } from '@storybook/addon-actions';
import { SelectType } from './enum/select-type.enum';
import { PopupContentComponent } from '../dynamic-component/popup-content/popup-content.component';
import { IconModule } from '../icon/icon.module';

export default {
  title: 'Component/Table',
  decorators: [withKnobs],
  moduleMetadata: {
    imports: [TableModule],
  },
} as Meta;

const getLong = () => {
  const res = [];
  for (let i = 0; i <= 10; i++) {
    res.push({
      id: i,
      name: `${faker.address.city()} ${faker.address.country()} ${faker.address.state()} ${faker.address.zipCode()}`,
    });
  }
  return res;
};

const getData = (size) => {
  const res = [];
  for (let i = 0; i < size; i++) {
    res.push({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      date: faker.date.between(new Date(2010, 0, 1), new Date(2021, 0, 1)),
      long: faker.helpers.randomize([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      value: faker.datatype.number({ min: 0, max: 100 }),
      summary: faker.datatype.number({ min: 0, max: 100000 }),
      ram: faker.helpers.randomize([8, 16, 32, 64, 128]),
      address: faker.address.streetAddress(),
      state: faker.address.state(),
      city: faker.address.city(),
      zip: faker.address.zipCode(),
    });
  }
  return res;
};

export const basicTable = () => ({
  moduleMetadata: {
    imports: [TableModule, IconModule],
    entryComponents: [
      DefaultHeadCellComponent,
      StringCellComponent,
      DateCellComponent,
      NumericCellComponent,
      ListCellComponent,
      StringFilterComponent,
      ListFilterComponent,
      NumericFilterComponent,
      PopupContentComponent,
      DateFilterComponent,
    ],
    providers: [TableService],
  },
  props: {
    data: getData(15),
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
      EditEvent.focus
    ),
    columns,
    dict,
    log: (name, value) => {
      action(name)(value);
    },
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="bg-panel-50 padding-3" style="display: flex; width: 1200px; height: 600px;">
              <div [tetaIconSprite]="'assets/color-icons.svg'"></div>
              <teta-table [data]="data"
                          [cookieName]="'table-stories'"
                          [columns]="columns"
                          [dict]="dict"
                          [editType]="editType"
                          [editEvent]="editEvent"
                          [selectType]="selectType"
                          (bodyLeft)="log('bodyLeft', $event)"
                          (cellClick)="log('cellClick', $event)"
                          (cellDoubleClick)="log('cellDoubleClick', $event)"
                          (cellEditEnd)="log('cellEditEnd', $event)"
                          (cellEditStart)="log('cellEditStart', $event)"
                          (cellFocus)="log('cellFocus', $event)"
                          (cellKeyUp)="log('cellKeyUp', $event)"
                          (rowEditEnd)="log('rowEditEnd', $event)"
                          (rowEditStart)="log('rowEditStart', $event)"
                          (rowLeft)="log('rowLeft', $event)"
                          (selectedRowsChange)="log('selectedRowsChange', $event)"
                          (stateChange)="log('stateChange', $event)"
                          (valueChange)="log('valueChange', $event)"
                          (activeRowChange)="log('activeRowChange', $event)"></teta-table>
            </div>`,
});

export const virtualTable = () => ({
  moduleMetadata: {
    imports: [TableModule, IconModule],
    entryComponents: [
      DefaultHeadCellComponent,
      StringCellComponent,
      DateCellComponent,
      NumericCellComponent,
      ListCellComponent,
      StringFilterComponent,
      ListFilterComponent,
      NumericFilterComponent,
      PopupContentComponent,
      DateFilterComponent,
    ],
    providers: [TableService],
  },
  props: {
    data: getData(1000),
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
      EditEvent.focus
    ),
    columns,
    dict,
    log: (name, value) => {
      action(name)(value);
    },
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="bg-panel-50 padding-3" style="display: flex; width: 1200px; height: 600px;">
              <teta-table [data]="data"
                          [cookieName]="'table-stories'"
                          [columns]="columns"
                          [dict]="dict"
                          [editType]="editType"
                          [editEvent]="editEvent"
                          [selectType]="selectType"
                          [virtual]="true"
                          (bodyLeft)="log('bodyLeft', $event)"
                          (cellClick)="log('cellClick', $event)"
                          (cellDoubleClick)="log('cellDoubleClick', $event)"
                          (cellEditEnd)="log('cellEditEnd', $event)"
                          (cellEditStart)="log('cellEditStart', $event)"
                          (cellFocus)="log('cellFocus', $event)"
                          (cellKeyUp)="log('cellKeyUp', $event)"
                          (rowEditEnd)="log('rowEditEnd', $event)"
                          (rowEditStart)="log('rowEditStart', $event)"
                          (rowLeft)="log('rowLeft', $event)"
                          (selectedRowsChange)="log('selectedRowsChange', $event)"
                          (stateChange)="log('stateChange', $event)"
                          (valueChange)="log('valueChange', $event)"
                          (activeRowChange)="log('activeRowChange', $event)"></teta-table>
            </div>`,
});
const dict = {
  ram: [
    { id: 8, name: 8 },
    { id: 16, name: 16 },
    { id: 32, name: 32 },
    { id: 64, name: 64 },
    { id: 128, name: 128 },
  ],
  long: getLong(),
};
const columns = [
  new TableColumn({
    name: 'name',
    flex: 1,
    locked: true,
    filterType: FilterType.string,
  }),
  new TableColumn({
    name: 'date',
    locked: true,
    filterType: FilterType.date,
  }),
  new TableColumn({
    name: 'long',
    locked: true,
    filterType: FilterType.list,
  }),
  new TableColumn({
    name: 'value',
    locked: true,
    filterType: FilterType.number,
  }),
  new TableColumn({
    name: 'summary',
    filterType: FilterType.number,
  }),
  new TableColumn({
    name: 'ram',
    caption: 'RAM',
    filterType: FilterType.list,
  }),
  new TableColumn({
    name: 'location',
    columns: [
      new TableColumn({
        name: 'city',
        filterType: FilterType.string,
      }),
      new TableColumn({
        name: 'state',
        filterType: FilterType.string,
      }),
      new TableColumn({
        name: 'address',
        flex: 2,
        filterType: FilterType.string,
      }),
      new TableColumn({
        name: 'zip',
        filterType: FilterType.string,
      }),
    ],
  }),
];
