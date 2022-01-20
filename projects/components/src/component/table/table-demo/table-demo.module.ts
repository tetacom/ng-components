import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableDemoComponent} from './table-demo/table-demo.component';
import {TableModule} from '../table.module';
import {TabsModule} from '../../tabs/tabs.module';
import {IconModule} from '../../icon/icon.module';

@NgModule({
  declarations: [
    TableDemoComponent
  ],
  exports: [
    TableDemoComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    TabsModule,
    IconModule
  ]
})
export class TableDemoModule {
}
