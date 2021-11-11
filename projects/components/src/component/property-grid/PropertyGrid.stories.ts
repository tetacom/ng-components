import { Meta } from '@storybook/angular/types-6-0';
import { withKnobs } from '@storybook/addon-knobs';
import * as faker from 'faker';
import { FilterType } from '../filter/enum/filter-type.enum';
import { action } from '@storybook/addon-actions';
import { PropertyGridModule } from './property-grid.module';
import { TableColumn } from '../table/contract/table-column';
import { IconModule } from '../icon/icon.module';

export default {
  title: 'Component/PropertyGrid',
  decorators: [withKnobs],
  moduleMetadata: {
    imports: [PropertyGridModule],
  },
} as Meta;

const item = () => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  date: faker.date.between(new Date(2010, 0, 1), new Date(2021, 0, 1)),
  value: faker.datatype.number({ min: 0, max: 100 }),
  summary: faker.datatype.number({ min: 0, max: 100000 }),
  ram: faker.helpers.randomize([8, 16, 32, 64, 128]),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  city: faker.address.city(),
  zip: faker.address.zipCode(),
});

export const simplePropertyGrid = () => ({
  moduleMetadata: {
    imports: [PropertyGridModule, IconModule],
    entryComponents: [],
  },
  props: {
    item: item(),
    columns,
    dict,
    log: (name, value) => {
      action(name)(value);
    },
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"
                  class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">
              <teta-property-grid [dataItem]="item"
                          [dict]="dict"
                          [columns]="columns">
              </teta-property-grid>
            </div>`,
});

const dict = {
  filterOptions: [
    { id: 8, name: 8 },
    { id: 16, name: 16 },
    { id: 32, name: 32 },
    { id: 64, name: 64 },
    { id: 128, name: 128 },
  ],
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
