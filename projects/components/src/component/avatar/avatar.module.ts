import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import {IconModule} from "../icon/icon.module";



@NgModule({
  declarations: [
    AvatarComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports:[
    AvatarComponent
  ]
})
export class AvatarModule { }
