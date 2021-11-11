import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { FilterModule } from '../filter/filter.module';
import { NumericCellComponent } from './default/numeric-cell/numeric-cell.component';
import { ListCellComponent } from './default/list-cell/list-cell.component';
import { DateCellComponent } from './default/date-cell/date-cell.component';
import { StringCellComponent } from './default/string-cell/string-cell.component';
import { HeadCellHostComponent } from './head-cell-host/head-cell-host.component';
import { TableHeadComponent } from './table-head/table-head.component';
import { TableBodyComponent } from './table-body/table-body.component';
import { CellComponent } from './cell/cell.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { CellHostComponent } from './cell-host/cell-host.component';
import { GroupRowComponent } from './default/group-row/group-row.component';
import { TableHeadGroupComponent } from './table-head-group/table-head-group.component';
import { HeadCellComponent } from './head-cell/head-cell.component';
import { DefaultHeadCellComponent } from './default/default-head-cell/default-head-cell.component';
import { IconModule } from '../icon/icon.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { TabsModule } from '../tabs/tabs.module';
import { SelectModule } from '../select/select.module';
import { NumberPipeModule } from '../../pipe/number-pipe/number-pipe.module';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { ButtonModule } from '../button/button.module';
import { SelectionCellComponent } from './selection-cell/selection-cell.component';
import { SelectionHeadCellComponent } from './selection-head-cell/selection-head-cell.component';
import { HintModule } from '../../directive/hint/hint.module';
import { TreeModule } from '../tree/tree.module';
import { HeadCellDropdownComponent } from './head-cell-dropdown/head-cell-dropdown.component';
import { DateTimeCellComponent } from './default/date-time-cell/date-time-cell.component';
import { OnlyNumberModule } from '../../directive/only-number/only-number.module';
import { BooleanCellComponent } from './default/boolean-cell/boolean-cell.component';
import { UiScrollModule } from 'ngx-ui-scroll';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { ClickOutsideModule } from '../../directive/click-outside/click-outside.module';
import {ResizeDragModule} from '../../directive/resize-drag/resize-drag.module';

@NgModule({
  declarations: [
    TableComponent,
    NumericCellComponent,
    ListCellComponent,
    DateCellComponent,
    StringCellComponent,
    HeadCellHostComponent,
    TableHeadComponent,
    TableBodyComponent,
    CellComponent,
    CellHostComponent,
    GroupRowComponent,
    TableHeadGroupComponent,
    HeadCellComponent,
    DefaultHeadCellComponent,
    SelectionCellComponent,
    SelectionHeadCellComponent,
    HeadCellDropdownComponent,
    DateTimeCellComponent,
    BooleanCellComponent,
  ],
  exports: [
    TableComponent,
    NumericCellComponent,
    ListCellComponent,
    DateCellComponent,
    StringCellComponent,
    HeadCellHostComponent,
    TableHeadComponent,
    TableBodyComponent,
    CellComponent,
    CellHostComponent,
    GroupRowComponent,
    DateTimeCellComponent,
    BooleanCellComponent,
  ],
  imports: [
    CommonModule,
    FilterModule,
    FormsModule,
    CheckboxModule,
    IconModule,
    DropdownModule,
    TabsModule,
    SelectModule,
    NumberPipeModule,
    DatePickerModule,
    ButtonModule,
    HintModule,
    TreeModule,
    OnlyNumberModule,
    UiScrollModule,
    ToolbarModule,
    ClickOutsideModule,
    ResizeDragModule,
  ],
})
export class TableModule {}
