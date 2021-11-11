import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagerComponent} from './pager/pager.component';
import {IconModule} from '../icon/icon.module';

@NgModule({
  declarations: [PagerComponent],
  exports: [PagerComponent],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class PagerModule {
}
