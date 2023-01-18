import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DividerComponent} from "./divider/divider.component";

@NgModule({
  declarations: [DividerComponent],
  exports: [DividerComponent],
  imports: [
    CommonModule
  ]
})
export class DividerModule {
}
