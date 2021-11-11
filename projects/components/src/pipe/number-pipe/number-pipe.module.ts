import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberPipe} from './number.pipe';

@NgModule({
  declarations: [NumberPipe],
  exports: [
    NumberPipe
  ],
  imports: [
    CommonModule
  ]
})
export class NumberPipeModule {
}
