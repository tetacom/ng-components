import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableDemoComponent} from './table-demo/table-demo.component';
import {TableModule} from '../table.module';

@NgModule({
  declarations: [
    TableDemoComponent
  ],
  exports: [
    TableDemoComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class TableDemoModule {
}
