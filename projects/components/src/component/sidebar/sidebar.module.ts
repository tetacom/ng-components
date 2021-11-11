import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {ButtonModule} from '../button/button.module';
import {IconModule} from '../icon/icon.module';

@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule
  ]
})
export class SidebarModule { }
