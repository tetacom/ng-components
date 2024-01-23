import {select, withKnobs} from '@storybook/addon-knobs';

import {EditType} from './enum/edit-type.enum';
import {EditEvent} from './enum/edit-event.enum';
import {SelectType} from './enum/select-type.enum';


import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Component/Table',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const basicTable = () => ({
  moduleMetadata: {
    imports: [],
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
        multiple: SelectType.checkBox,
        single: SelectType.mouse,
      },
      SelectType.checkBox
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
                  class="bg-panel-0 padding-10"
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
    imports: [],
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
        multiple: SelectType.checkBox,
        single: SelectType.mouse,
      },
      SelectType.checkBox
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
                  class="bg-panel-0 padding-10"
                  style="display: flex; width: 1200px; height: 600px;">
                <teta-table-demo [size]="100"
                                  [editEvent]="editEvent"
                                  [editType]="editType"
                                  [selectType]="selectType"
                                  [virtual]="true"></teta-table-demo>
            </div>`,
});
