import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableDemoComponent} from './table-demo/table-demo.component';
import {TableModule} from '../table.module';
import {TabsModule} from '../../tabs/tabs.module';
import {IconModule} from '../../icon/icon.module';
import {ToolbarModule} from '../../toolbar/toolbar.module';
import {ButtonModule} from '../../button/button.module';

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
    IconModule,
    ToolbarModule,
    ButtonModule
  ]
})
export class TableDemoModule {
}
